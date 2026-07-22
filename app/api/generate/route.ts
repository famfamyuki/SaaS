import { NextRequest, NextResponse } from 'next/server';
import { scrapeTargetWebsite } from '@/lib/scraper/web-scraper';
import { generateOutreachWithGemini } from '@/lib/ai/gemini';
import { MockStore } from '@/lib/supabase/mock-store';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { urls, target_tone = 'Professional', value_proposition = '' } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one valid website URL' },
        { status: 400 }
      );
    }

    // Filter valid URLs (max 10 per batch)
    const validUrls = urls
      .map((u: string) => u.trim())
      .filter((u: string) => u.length > 3)
      .slice(0, 10);

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs provided' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminSupabaseClient();
    const results = [];

    for (const targetUrl of validUrls) {
      // 1. Deduct Credit
      let creditDeducted = false;

      if (supabaseAdmin) {
        // Real Supabase DB logic can be added here
        creditDeducted = true;
      } else {
        const creditResult = MockStore.deductCredit();
        if (!creditResult.success) {
          return NextResponse.json(
            { error: 'Insufficient credits remaining. Please upgrade your subscription.' },
            { status: 402 }
          );
        }
        creditDeducted = true;
      }

      // 2. Web Scrape Target Website
      const scrapedData = await scrapeTargetWebsite(targetUrl);

      // 3. Call Gemini AI Engine
      const aiResult = await generateOutreachWithGemini(
        scrapedData,
        value_proposition,
        target_tone
      );

      // 4. Save Lead Record
      const leadPayload = {
        user_id: 'demo-user-123',
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
        // Save to Supabase
        const { data, error } = await supabaseAdmin
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

    return NextResponse.json({
      success: true,
      count: results.length,
      leads: results,
    });
  } catch (err: any) {
    console.error('[API /api/generate Error]:', err);
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during email generation' },
      { status: 500 }
    );
  }
}
