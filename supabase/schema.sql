-- ================================================================
-- OUTREACHINTELLIGENCE AI - SUPABASE DATABASE SCHEMA
-- ================================================================

-- 1. Create Public Users Table with 5 Initial Free Credits Default
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  stripe_customer_id TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'free',
  credits_remaining INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- User Access RLS Policy
CREATE POLICY "Users can view and update own profile" ON public.users
  FOR ALL USING (auth.uid() = id);

-- Service Role Admin Bypass Policy
CREATE POLICY "Service Role full access on users" ON public.users
  FOR ALL USING (true);

-- 2. Create Public Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  website_url TEXT NOT NULL,
  company_name TEXT NOT NULL,
  summary TEXT NOT NULL,
  pain_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  target_tone TEXT NOT NULL DEFAULT 'Professional',
  value_proposition TEXT NOT NULL,
  email_draft_1 JSONB NOT NULL,
  email_draft_2 JSONB NOT NULL,
  email_draft_3 JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own leads" ON public.leads
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service Role full access on leads" ON public.leads
  FOR ALL USING (true);

-- 3. Automatic Database Trigger: Insert User Profile with 5 Free Credits on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, subscription_status, credits_remaining)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'free',
    5
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
