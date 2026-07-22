import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { MockStore } from '@/lib/supabase/mock-store';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    if (webhookSecret && !webhookSecret.includes('whsec_mock')) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`[Stripe Webhook Signature Verification Error]: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle Subscription Events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const userId = session.metadata?.userId || 'demo-user-123';

      console.log(`[Stripe Webhook] Payment completed for user ${userId}. Upgrading to Pro (500 Credits).`);

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
          stripe_customer_id: (session.customer as string) || 'cus_stripe_mock',
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any;
      console.log(`[Stripe Webhook] Subscription canceled: ${subscription.id}`);

      MockStore.updateUser({
        subscription_status: 'canceled',
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
