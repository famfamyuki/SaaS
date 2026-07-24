import { Lead, UserProfile } from './types';

export class MockStore {
  /**
   * Returns current authenticated user or null if unauthenticated (Guest state).
   * Strictly avoids initializing hardcoded dummy accounts.
   */
  static getUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('outreach_user_session');
    if (!stored) return null;

    try {
      const parsed: UserProfile = JSON.parse(stored);

      // Auto-purge any legacy mock user data
      if (
        !parsed.id ||
        parsed.id === 'user-free-default' ||
        parsed.id === 'demo-user-123' ||
        parsed.email === 'alex.sales@outreachintel.ai' ||
        parsed.full_name === 'Alex Vance'
      ) {
        localStorage.removeItem('outreach_user_session');
        localStorage.removeItem('outreach_mock_user');
        return null;
      }

      return parsed;
    } catch (e) {
      localStorage.removeItem('outreach_user_session');
      return null;
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
      localStorage.setItem('outreach_user_session', JSON.stringify(freshUser));
      window.dispatchEvent(new Event('user-credits-updated'));
    }
    return freshUser;
  }

  static updateUser(updates: Partial<UserProfile>): UserProfile {
    const current = this.getUser();
    const updated: UserProfile = {
      id: current?.id || 'user-' + Date.now(),
      email: current?.email || updates.email || 'user@webagency.com',
      full_name: current?.full_name || updates.full_name || 'Web Designer',
      stripe_customer_id: updates.stripe_customer_id ?? current?.stripe_customer_id ?? null,
      subscription_status: updates.subscription_status || current?.subscription_status || 'free',
      credits_remaining: updates.credits_remaining ?? current?.credits_remaining ?? 5,
      created_at: current?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...updates,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('outreach_user_session', JSON.stringify(updated));
      window.dispatchEvent(new Event('user-credits-updated'));
    }
    return updated;
  }

  static clearUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('outreach_user_session');
      localStorage.removeItem('outreach_mock_user');
      window.dispatchEvent(new Event('user-credits-updated'));
    }
  }

  static deductCredit(): { success: boolean; creditsRemaining: number } {
    const user = this.getUser();
    if (!user || user.credits_remaining <= 0) {
      return { success: false, creditsRemaining: 0 };
    }
    const updated = this.updateUser({ credits_remaining: user.credits_remaining - 1 });
    return { success: true, creditsRemaining: updated.credits_remaining };
  }

  static getLeads(): Lead[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('outreach_user_leads');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
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
      localStorage.setItem('outreach_user_leads', JSON.stringify(updated));
    }
    return newLead;
  }
}
