import { NextRequest, NextResponse } from 'next/server';
import { scrapeTargetWebsite, validateAndSanitizeUrl } from '@/lib/scraper/web-scraper';
import { generateOutreachWithGemini } from '@/lib/ai/gemini';
import { MockStore } from '@/lib/supabase/mock-store';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { verifyApiAuth } from '@/lib/auth-guard';
import { ensureUserRecord } from '@/lib/supabase/user-service';

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication Guard Check
    const auth = await verifyApiAuth(req);
    if (!auth.authenticated || !auth.user) {
      return auth.errorResponse || NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { urls, target_tone = 'Professional', value_proposition = '' } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one valid website URL' },
        { status: 400 }
      );
    }

    // 2. Validate & Sanitize Input URLs (SSRF & Protocol Guard)
    const validUrls: string[] = [];
    const invalidUrlErrors: string[] = [];

    for (const rawUrl of urls.slice(0, 10)) {
      const v = validateAndSanitizeUrl(rawUrl);
      if (v.isValid && v.sanitizedUrl) {
        validUrls.push(v.sanitizedUrl);
      } else {
        invalidUrlErrors.push(v.error || `Invalid URL: ${rawUrl}`);
      }
    }

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: `Invalid target URLs provided: ${invalidUrlErrors.join(', ')}` },
        { status: 400 }
      );
    }

    const urlCount = validUrls.length;

    // 3. PRE-EXECUTION CREDIT CHECK (Must have at least N credits for N URLs)
    const userProfile = await ensureUserRecord(
      auth.user.userId,
      auth.user.email,
      auth.user.user.full_name || undefined
    );

    const supabaseAdmin = createAdminSupabaseClient();
    const initialCredits = userProfile.credits_remaining ?? 5;

    if (initialCredits < urlCount || initialCredits <= 0) {
      return NextResponse.json(
        { 
          error: `Insufficient credits. You need ${urlCount} credits to audit ${urlCount} website URLs, but only have ${initialCredits} remaining. Please upgrade your subscription to Pro.`,
          creditsRemaining: initialCredits,
          requiredCredits: urlCount
        },
        { status: 402 }
      );
    }

    // 4. Processing Pipelines (Scrape -> Gemini AI -> Save Lead)
    const results = [];

    for (const targetUrl of validUrls) {
      // Scrape target URL dynamically
      const scrapedData = await scrapeTargetWebsite(targetUrl);

      // Invoke Gemini AI Engine with dynamic site context
      const aiResult = await generateOutreachWithGemini(
        scrapedData,
        value_proposition,
        target_tone
      );

      // Save Lead Record
      const leadPayload = {
        user_id: auth.user.userId,
        website_url: targetUrl,
        company_name: aiResult.company_name,
        summary: aiResult.summary,
        pain_points: aiResult.pain_points,
        target_tone,
        value_proposition,
        email_draft_1: aiResult.email_draft_1,
        email_draft_2: aiResult.email_draft_2,
        email_draft_3: aiResult.email_draft_3,
        status: 'completed' as const,
      };

      let savedLead;
      if (supabaseAdmin) {
        const { data } = await supabaseAdmin
          .from('leads')
          .insert([leadPayload])
          .select()
          .single();
        savedLead = data || MockStore.addLead(leadPayload);
      } else {
        savedLead = MockStore.addLead(leadPayload);
      }

      results.push(savedLead);
    }

    // 5. ACCURATE N-CREDIT DEDUCTION ON SUCCESSFUL BATCH COMPLETION
    const processedCount = results.length;
    const finalBalance = Math.max(0, initialCredits - processedCount);

    if (supabaseAdmin) {
      await supabaseAdmin
        .from('users')
        .update({
          credits_remaining: finalBalance,
          updated_at: new Date().toISOString(),
        })
        .eq('id', auth.user.userId);
    }

    MockStore.updateUser({ credits_remaining: finalBalance });

    return NextResponse.json({
      success: true,
      count: processedCount,
      leads: results,
      creditsRemaining: finalBalance,
    });
  } catch (err: any) {
    console.error('[API /api/generate Error]:', err);
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during email generation' },
      { status: 500 }
    );
  }
}
