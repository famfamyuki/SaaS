import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-02-24.acacia',
  appInfo: {
    name: 'OutreachIntelligence AI',
    version: '1.0.0',
  },
});

export const isStripeConfigured = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key) && !key?.includes('sk_test_mock');
};
