import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { MockStore } from '@/lib/supabase/mock-store';
import { UserProfile } from '@/lib/supabase/types';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  user: UserProfile;
}

export async function verifyApiAuth(req: NextRequest): Promise<{ authenticated: boolean; user?: AuthenticatedUser; errorResponse?: NextResponse }> {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    const supabaseAdmin = createAdminSupabaseClient();

    if (supabaseAdmin && token) {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (!error && user) {
        const { data: profile } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        const userProfile: UserProfile = profile || {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          stripe_customer_id: null,
          subscription_status: 'free',
          credits_remaining: 5,
          created_at: user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        return {
          authenticated: true,
          user: {
            userId: user.id,
            email: user.email || '',
            user: userProfile,
          },
        };
      }
    }

    // Active authenticated session check from active store / localStorage
    const activeUser = MockStore.getUser();
    if (activeUser) {
      return {
        authenticated: true,
        user: {
          userId: activeUser.id,
          email: activeUser.email,
          user: activeUser,
        },
      };
    }

    // Unauthenticated Guest state -> 401 Unauthorized
    return {
      authenticated: false,
      errorResponse: NextResponse.json(
        { error: 'Unauthorized: Authentication required. Please sign in to access this feature.' },
        { status: 401 }
      ),
    };
  } catch (err: any) {
    return {
      authenticated: false,
      errorResponse: NextResponse.json(
        { error: 'Unauthorized: Authentication required' },
        { status: 401 }
      ),
    };
  }
}
