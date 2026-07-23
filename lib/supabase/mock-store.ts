import { Lead, UserProfile } from './types';

const INITIAL_MOCK_USER: UserProfile = {
  id: 'user-free-default',
  email: 'alex.sales@outreachintel.ai',
  full_name: 'Alex Vance',
  stripe_customer_id: null,
  subscription_status: 'free',
  credits_remaining: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: 'lead-001',
    user_id: 'user-free-default',
    website_url: 'https://stripe.com',
    company_name: 'Stripe',
    summary: 'Financial infrastructure platform for software and internet businesses handling payments and billing globally.',
    pain_points: [
      'Managing high-volume international fraud and chargebacks',
      'Scaling enterprise billing compliance across 40+ countries',
      'Minimizing API integration friction for developer-led startups'
    ],
    target_tone: 'Professional',
    value_proposition: 'AI-driven payment routing optimization reducing payment decline rates by 18%.',
    email_draft_1: {
      subject: 'Optimizing Stripe payment authorization rates by 18%',
      hook: "Saw Stripe's recent update on global payment orchestration across new markets.",
      body: `Hi Alex,\n\nNotice how scaling international transactions often increases authorization decline rates. We've built an AI routing middleware that plugs right into payment engines to boost success rates by 18%.\n\nWould you be open to a 10-minute briefing next Tuesday?`
    },
    email_draft_2: {
      subject: 'Quick question regarding payment authorization declines at Stripe',
      hook: "Impressive work on Stripe Connect's multi-currency settlement engine.",
      body: `Hi team,\n\nQuick thought: cross-border decline spikes remain one of the top causes of churn for high-growth merchants.\n\nOur intelligent routing engine dynamically reduces false flags before hitting issuing banks.\n\nWorth a brief 5-min look this week?`
    },
    email_draft_3: {
      subject: 'Idea for Stripe merchant revenue recovery',
      hook: "Loved the developer experience documented in Stripe's v2 API release notes.",
      body: `Hey Alex,\n\nWe helped a peer payment processor recover $1.2M in annual decline revenue using automated retry routing.\n\nCould I send over a 2-page teardown tailored to Stripe?`
    },
    status: 'completed',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'lead-002',
    user_id: 'user-free-default',
    website_url: 'https://vercel.com',
    company_name: 'Vercel',
    summary: 'Frontend cloud platform enabling developer teams to deploy Next.js apps with instant global CDN and serverless compute.',
    pain_points: [
      'Optimizing cold-start latency for complex serverless functions',
      'Reducing enterprise bandwidth costs on video and image delivery',
      'Streamlining multi-region preview environment collaboration'
    ],
    target_tone: 'Casual',
    value_proposition: 'Zero-overhead edge caching accelerator for high-concurrency Next.js dynamic apps.',
    email_draft_1: {
      subject: 'Cutting serverless cold-starts on Next.js preview deployments',
      hook: 'Huge fan of Vercel Ship and the latest Turbopack performance wins!',
      body: `Hey Alex,\n\nWith dynamic serverless rendering exploding, cold-start latency can still hit peak traffic spikes.\n\nWe built an edge warming strategy that reduces cold-start delays by 65% with zero config change.\n\nUp for a quick coffee chat?`
    },
    email_draft_2: {
      subject: 'Vercel + Next.js cold-start optimization proposal',
      hook: 'Noticed Vercel expanding enterprise edge middleware capabilities.',
      body: `Hi Alex,\n\nQuick note—our team developed a pre-warming algorithm tailored specifically for Next.js App Router deployments.\n\nWould love to share benchmark stats with your platform team if you have 10 mins.`
    },
    email_draft_3: {
      subject: 'Idea for Vercel enterprise bandwidth reduction',
      hook: 'Congratulation on Vercel AI SDK 3.0 adoption numbers!',
      body: `Hey Alex,\n\nWe helped an enterprise SaaS running on Vercel trim edge bandwidth bills by 22% using automated asset compression.\n\nOpen to taking a quick look at the breakdown?`
    },
    status: 'completed',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  }
];

export class MockStore {
  static getUser(): UserProfile {
    if (typeof window === 'undefined') return INITIAL_MOCK_USER;
    const stored = localStorage.getItem('outreach_mock_user');
    if (!stored) {
      localStorage.setItem('outreach_mock_user', JSON.stringify(INITIAL_MOCK_USER));
      return INITIAL_MOCK_USER;
    }
    try {
      const parsed: UserProfile = JSON.parse(stored);
      // Auto-purge legacy unconfirmed Pro status entries
      if (parsed.subscription_status === 'pro' && (!parsed.stripe_customer_id || parsed.stripe_customer_id === 'cus_demo_123' || parsed.stripe_customer_id === 'cus_stripe_mock')) {
        console.log('[Security Sanitizer] Resetting legacy mock user subscription status back to Free.');
        parsed.subscription_status = 'free';
        parsed.credits_remaining = 5;
        localStorage.setItem('outreach_mock_user', JSON.stringify(parsed));
      }

      // Auto-replenish 5 initial free credits if existing free testing account is stuck at 0
      if (parsed.subscription_status === 'free' && (parsed.credits_remaining === undefined || parsed.credits_remaining <= 0)) {
        parsed.credits_remaining = 5;
        localStorage.setItem('outreach_mock_user', JSON.stringify(parsed));
      }

      return parsed;
    } catch (e) {
      localStorage.setItem('outreach_mock_user', JSON.stringify(INITIAL_MOCK_USER));
      return INITIAL_MOCK_USER;
    }
  }

  static resetUserToFree(email?: string, name?: string): UserProfile {
    const freshUser: UserProfile = {
      id: 'user-' + Date.now(),
      email: email || 'user@webagency.com',
      full_name: name || (email ? email.split('@')[0] : 'Web Designer'),
      stripe_customer_id: null,
      subscription_status: 'free',
      credits_remaining: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('outreach_mock_user', JSON.stringify(freshUser));
    }
    return freshUser;
  }

  static updateUser(updates: Partial<UserProfile>): UserProfile {
    const current = this.getUser();
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
    if (typeof window !== 'undefined') {
      localStorage.setItem('outreach_mock_user', JSON.stringify(updated));
    }
    return updated;
  }

  static deductCredit(): { success: boolean; creditsRemaining: number } {
    const user = this.getUser();
    if (user.credits_remaining <= 0) {
      return { success: false, creditsRemaining: 0 };
    }
    const updated = this.updateUser({ credits_remaining: user.credits_remaining - 1 });
    return { success: true, creditsRemaining: updated.credits_remaining };
  }

  static getLeads(): Lead[] {
    if (typeof window === 'undefined') return INITIAL_MOCK_LEADS;
    const stored = localStorage.getItem('outreach_mock_leads');
    if (!stored) {
      localStorage.setItem('outreach_mock_leads', JSON.stringify(INITIAL_MOCK_LEADS));
      return INITIAL_MOCK_LEADS;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_MOCK_LEADS;
    }
  }

  static addLead(lead: Omit<Lead, 'id' | 'created_at'>): Lead {
    const newLead: Lead = {
      ...lead,
      id: 'lead-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const current = this.getLeads();
    const updated = [newLead, ...current];
    if (typeof window !== 'undefined') {
      localStorage.setItem('outreach_mock_leads', JSON.stringify(updated));
    }
    return newLead;
  }
}
