import { NextRequest, NextResponse } from 'next/server';
import { createBrowserSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code && isSupabaseConfigured()) {
    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.exchangeCodeForSession(code);
    } catch (err) {
      console.error('[Supabase Auth Callback Error]:', err);
    }
  }

  // Redirect to dashboard after authentication
  return NextResponse.redirect(`${origin}/dashboard`);
}
