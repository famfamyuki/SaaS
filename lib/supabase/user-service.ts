import { createAdminSupabaseClient } from './server';
import { UserProfile } from './types';
import { MockStore } from './mock-store';

/**
 * Ensures a user record exists in the database with 5 initial free credits upon signup or login.
 * Automatically programmatically heals/replenishes 5 free credits if credits are missing (null/undefined/0).
 */
export async function ensureUserRecord(userId: string, email: string, fullName?: string): Promise<UserProfile> {
  const supabaseAdmin = createAdminSupabaseClient();

  if (!supabaseAdmin) {
    return MockStore.resetUserToFree(email, fullName);
  }

  try {
    // 1. Check if user profile already exists in public.users table
    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    // Programmatic Fallback: If user exists but credits are missing or 0 on free tier, auto-heal to 5 credits
    if (existingUser && !selectError) {
      if (
        existingUser.credits_remaining === null ||
        existingUser.credits_remaining === undefined ||
        (existingUser.subscription_status === 'free' && existingUser.credits_remaining <= 0)
      ) {
        console.log(`[User Service Programmatic Fallback] Auto-granting 5 free credits to user ${userId} (${email})`);
        const { data: healedUser } = await supabaseAdmin
          .from('users')
          .update({
            credits_remaining: 5,
            subscription_status: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)
          .select()
          .single();

        if (healedUser) {
          return healedUser as UserProfile;
        }
      }
      return existingUser as UserProfile;
    }

    // 2. Insert new user profile with 5 initial free credits
    const newUserRecord: Partial<UserProfile> = {
      id: userId,
      email: email,
      full_name: fullName || (email ? email.split('@')[0] : 'Web Designer'),
      stripe_customer_id: null,
      subscription_status: 'free',
      credits_remaining: 5,
      updated_at: new Date().toISOString(),
    };

    const { data: insertedUser, error: insertError } = await supabaseAdmin
      .from('users')
      .upsert([newUserRecord], { onConflict: 'id' })
      .select()
      .single();

    if (insertError || !insertedUser) {
      console.warn('[User Service] Failed to insert user profile to Supabase DB:', insertError?.message);
      return MockStore.resetUserToFree(email, fullName);
    }

    return insertedUser as UserProfile;
  } catch (err: any) {
    console.error('[User Service Error]:', err.message);
    return MockStore.resetUserToFree(email, fullName);
  }
}
