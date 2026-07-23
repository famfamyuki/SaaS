import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-02-24.acacia',
  appInfo: {
    name: 'OutreachIntelligence AI',
    version: '1.0.0',
  },
});

export interface StripeEnvValidation {
  isConfigured: boolean;
  errorMsg?: string;
  priceId?: string;
}

export const isStripeConfigured = (): boolean => {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key) && !key?.includes('sk_test_mock');
};

export const validateStripeEnv = (): StripeEnvValidation => {
  const key = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRO_PRICE_ID;

  if (!key || key.includes('sk_test_mock') || key.length < 10) {
    return {
      isConfigured: false,
      errorMsg: 'Payment system is currently being configured. Please try again shortly.',
    };
  }

  if (!priceId || priceId.includes('price_1P_mock') || priceId.length < 5) {
    return {
      isConfigured: false,
      errorMsg: 'Payment system is currently being configured. Please try again shortly.',
    };
  }

  return {
    isConfigured: true,
    priceId,
  };
};
