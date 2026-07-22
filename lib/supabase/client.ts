import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-project') &&
    !supabaseUrl.includes('mock.supabase.co')
  );
};

export function createBrowserSupabaseClient() {
  if (!isSupabaseConfigured()) {
    // Return dummy client if unconfigured
    return createClient('https://mock.supabase.co', 'mock-anon-key');
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
