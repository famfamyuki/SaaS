import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { MockStore } from '@/lib/supabase/mock-store';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[Stripe Webhook Error]: STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook Secret unconfigured' }, { status: 500 });
  }

  // 1. Strict Webhook Signature Cryptographic Verification
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[Stripe Webhook Signature Error]: ${err.message}`);
    return NextResponse.json({ error: `Webhook Signature Verification Failed: ${err.message}` }, { status: 400 });
  }

  // 2. Process Verified Stripe Event Types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const userId = session.metadata?.userId || 'demo-user-123';

      console.log(`[Stripe Webhook Verified] Payment confirmed for user ${userId}. Granting 500 Pro Credits.`);

      const supabaseAdmin = createAdminSupabaseClient();
      if (supabaseAdmin) {
        await supabaseAdmin
          .from('users')
          .update({
            subscription_status: 'pro',
            credits_remaining: 500,
            stripe_customer_id: session.customer as string,
          })
          .eq('id', userId);
      } else {
        MockStore.updateUser({
          subscription_status: 'pro',
          credits_remaining: 500,
          stripe_customer_id: (session.customer as string) || 'cus_stripe_live',
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any;
      console.log(`[Stripe Webhook Verified] Subscription canceled: ${subscription.id}`);

      const supabaseAdmin = createAdminSupabaseClient();
      if (supabaseAdmin) {
        await supabaseAdmin
          .from('users')
          .update({
            subscription_status: 'canceled',
          })
          .eq('stripe_customer_id', subscription.customer as string);
      } else {
        MockStore.updateUser({
          subscription_status: 'canceled',
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
