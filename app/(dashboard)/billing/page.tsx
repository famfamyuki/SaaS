'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MockStore } from '@/lib/supabase/mock-store';
import { UserProfile } from '@/lib/supabase/types';

function BillingContent() {
  const searchParams = useSearchParams();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const u = MockStore.getUser();
    setUser(u);

    if (searchParams.get('success') === 'true') {
      setToastMessage('🎉 Payment Submitted! Stripe is confirming your subscription. Pro credits will update upon webhook confirmation.');
    } else if (searchParams.get('canceled') === 'true') {
      setErrorMessage('Checkout was canceled. No charges were made.');
    }
  }, [searchParams]);

  const handleSubscribePro = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to initialize Stripe checkout session');
      }

      if (data.url) {
        // Redirect browser to official Stripe Checkout page
        window.location.href = data.url;
      } else {
        throw new Error('Stripe Checkout URL was not returned by server');
      }
    } catch (err: any) {
      console.error('[Stripe Checkout Button Error]:', err);
      setErrorMessage(err.message || 'Payment checkout initialization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-emerald-200 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
          <button 
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-rose-200 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-purple-950/50 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white">Subscription &amp; Credit Plans</h1>
          </div>
          <p className="text-xs text-slate-400">
            Flexible monthly plans and credit packages tailored for growing web design agencies &amp; freelancers.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-400">Active Tier:</span>
          <span className="font-bold text-white uppercase bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
            {user?.subscription_status || 'free'}
          </span>
          <span className="text-slate-400 border-l border-slate-800 pl-3">Credits:</span>
          <span className="font-bold text-amber-400">{user?.credits_remaining ?? 5}</span>
        </div>
      </div>

      {/* Pricing Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Free Starter
            </div>
            <div>
              <h3 className="text-3xl font-black text-white">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></h3>
              <p className="text-xs text-slate-400 mt-1">Perfect for trying out our website audit &amp; AI prompt engine.</p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span><strong>5 Free Generations</strong> on signup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Automated Web UX Audit Scraper</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>3 AI Cold Email Proposals per Site</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Check className="w-4 h-4 text-slate-600" />
                <span>CSV Batch Export</span>
              </div>
            </div>
          </div>

          <button
            disabled={user?.subscription_status === 'free'}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700 cursor-default"
          >
            {user?.subscription_status === 'free' ? 'Current Active Plan' : 'Downgrade to Free'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="glass-panel p-8 rounded-3xl border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-950/30 via-slate-900 to-slate-950 space-y-6 relative flex flex-col justify-between shadow-2xl shadow-indigo-600/20">
          <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            Most Popular
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Pro Agency Retainer
            </div>
            <div>
              <h3 className="text-4xl font-black text-white">$49 <span className="text-xs font-normal text-slate-400">/ month</span></h3>
              <p className="text-xs text-slate-400 mt-1">For active web design agencies and freelancers.</p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span><strong>500 Monthly Generations</strong> ($0.09/lead)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Priority Website Audit Scraper</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Gemini 1.5 Pro AI Pitch Copilot</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Unlimited 1-Click CSV Exports</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Custom Outreach Tone Preferences</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubscribePro}
            disabled={loading || user?.subscription_status === 'pro'}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {user?.subscription_status === 'pro' ? (
              <span>Plan Active (500 Credits)</span>
            ) : loading ? (
              <span>Redirecting to Stripe Checkout...</span>
            ) : (
              <>
                <span>Upgrade to Pro ($49/mo)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
        Loading Billing Plans...
      </div>
    }>
      <BillingContent />
    </Suspense>
  );
}
