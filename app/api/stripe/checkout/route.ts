import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { verifyApiAuth } from '@/lib/auth-guard';

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication Guard Check
    const auth = await verifyApiAuth(req);
    if (!auth.authenticated || !auth.user) {
      return auth.errorResponse || NextResponse.json({ error: 'Unauthorized: Please sign in to upgrade' }, { status: 401 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 2. Validate Stripe Secret Key Configuration
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe payment integration is not configured. Please set STRIPE_SECRET_KEY and STRIPE_PRO_PRICE_ID in environment settings.' },
        { status: 400 }
      );
    }

    const priceId = process.env.STRIPE_PRO_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe Price ID (STRIPE_PRO_PRICE_ID) is missing in server environment.' },
        { status: 400 }
      );
    }

    // 3. Create Live Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing?canceled=true`,
      customer_email: auth.user.email,
      metadata: {
        userId: auth.user.userId,
      },
    });

    if (!session.url) {
      throw new Error('Stripe Checkout Session URL generation failed');
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe Checkout Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to initialize Stripe Checkout Session' },
      { status: 500 }
    );
  }
}
