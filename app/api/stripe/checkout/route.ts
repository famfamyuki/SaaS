import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    if (!isStripeConfigured()) {
      // Sandbox fallback checkout response
      return NextResponse.json({
        url: `${origin}/billing?success=true&mock=true`,
        mock: true,
      });
    }

    const priceId = process.env.STRIPE_PRO_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || 'price_1P_mock',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/billing?success=true`,
      cancel_url: `${origin}/billing?canceled=true`,
      metadata: {
        userId: 'demo-user-123',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe Checkout Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to initialize Stripe checkout' },
      { status: 500 }
    );
  }
}
