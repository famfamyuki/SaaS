export type SubscriptionStatus = 'free' | 'pro' | 'canceled';
export type LeadStatus = 'pending' | 'completed' | 'failed';

export interface EmailDraft {
  subject: string;
  body: string;
  hook: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  stripe_customer_id: string | null;
  subscription_status: SubscriptionStatus;
  credits_remaining: number;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  user_id: string;
  website_url: string;
  company_name: string;
  summary: string;
  pain_points: string[];
  target_tone: string;
  value_proposition: string;
  email_draft_1: EmailDraft;
  email_draft_2: EmailDraft;
  email_draft_3: EmailDraft;
  status: LeadStatus;
  error_message?: string;
  created_at: string;
}
