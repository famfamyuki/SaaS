'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MockStore } from '@/lib/supabase/mock-store';
import { createBrowserSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ShieldAlert, LogIn, UserPlus } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';

export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');

  React.useEffect(() => {
    async function verifySession() {
      // 1. Check local active user store
      const activeUser = MockStore.getUser();
      if (activeUser) {
        setAuthenticated(true);
        setChecked(true);
        return;
      }

      // 2. Check Supabase session if configured
      if (isSupabaseConfigured()) {
        try {
          const supabase = createBrowserSupabaseClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            MockStore.updateUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              subscription_status: 'free',
              credits_remaining: 5,
            });
            setAuthenticated(true);
            setChecked(true);
            return;
          }
        } catch (e) {
          console.error('[DashboardAuthGuard] Session check error:', e);
        }
      }

      // 3. Unauthenticated Guest State
      setAuthenticated(false);
      setChecked(true);
    }

    verifySession();
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Verifying authentication session...</span>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <>
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Authentication Required</h1>
          <p className="text-sm text-slate-400 max-w-md mb-8">
            You are currently in Guest mode. Please Sign In or Create an Account to access your website audit and AI outreach dashboard.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-100 font-bold text-xs flex items-center gap-2 transition-all shadow-xl"
            >
              <LogIn className="w-4 h-4 text-indigo-400" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setAuthModalOpen(true);
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/30"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up Free</span>
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
        />
      </>
    );
  }

  return <>{children}</>;
}
