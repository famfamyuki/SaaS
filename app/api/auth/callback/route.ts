import { NextRequest, NextResponse } from 'next/server';
import { createBrowserSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ensureUserRecord } from '@/lib/supabase/user-service';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code && isSupabaseConfigured()) {
    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!error && data.user) {
        // Guarantee 5 free credits profile initialization upon OAuth / Magic Link signup
        await ensureUserRecord(
          data.user.id,
          data.user.email || '',
          data.user.user_metadata?.full_name
        );
      }
    } catch (err) {
      console.error('[Supabase Auth Callback Error]:', err);
    }
  }

  // Redirect to dashboard after authentication
  return NextResponse.redirect(`${origin}/dashboard`);
}
