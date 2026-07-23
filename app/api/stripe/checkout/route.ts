import { NextRequest, NextResponse } from 'next/server';
import { stripe, validateStripeEnv } from '@/lib/stripe';
import { verifyApiAuth } from '@/lib/auth-guard';

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication Guard Check
    const auth = await verifyApiAuth(req);
    if (!auth.authenticated || !auth.user) {
      return auth.errorResponse || NextResponse.json(
        { error: 'Unauthorized: Please sign in to upgrade' },
        { status: 401 }
      );
    }

    // 2. Safe Environment Variables Validation
    const envValidation = validateStripeEnv();
    if (!envValidation.isConfigured || !envValidation.priceId) {
      return NextResponse.json(
        { error: envValidation.errorMsg || 'Payment system is currently being configured. Please try again shortly.' },
        { status: 400 }
      );
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 3. Create Stripe Checkout Session with Safe Error Handling
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: envValidation.priceId,
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
    } catch (stripeErr: any) {
      console.error('[Stripe SDK Error]:', stripeErr.message);
      return NextResponse.json(
        { error: 'Payment system is currently being configured. Please try again shortly.' },
        { status: 400 }
      );
    }

    if (!session || !session.url) {
      return NextResponse.json(
        { error: 'Payment system is currently being configured. Please try again shortly.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe Checkout Catch All Error]:', err?.message || err);
    return NextResponse.json(
      { error: 'Payment system is currently being configured. Please try again shortly.' },
      { status: 500 }
    );
  }
}
