'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  ChevronDown
} from 'lucide-react';
import { MockStore } from '@/lib/supabase/mock-store';
import { UserProfile } from '@/lib/supabase/types';

export function Header() {
  const router = useRouter();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const refreshUser = () => setUser(MockStore.getUser());
    refreshUser();

    if (typeof window !== 'undefined') {
      window.addEventListener('user-credits-updated', refreshUser);
      return () => window.removeEventListener('user-credits-updated', refreshUser);
    }
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    router.push('/login');
  };

  return (
    <header className="h-16 pl-64 fixed top-0 right-0 left-0 glass-panel border-b border-slate-800/60 z-30 flex items-center justify-between px-8">
      {/* Search / Status Indicator */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search leads, domains or emails..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI Engine Online (Gemini 1.5 Pro)
        </div>
      </div>

      {/* Action Items & User Menu */}
      <div className="flex items-center gap-4">
        {/* Generate Shortcut CTA */}
        <Link 
          href="/generate"
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-semibold hover:opacity-95 transition-all shadow-md shadow-indigo-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Campaign</span>
        </Link>

        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
              {user?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-white leading-tight">{user?.full_name || 'Alex Vance'}</p>
              <p className="text-[10px] text-slate-400 capitalize">{user?.subscription_status || 'free'} tier</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Menu Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl border border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-3 border-b border-slate-800/80">
                <p className="text-xs font-semibold text-white">{user?.full_name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <div className="py-1 space-y-0.5">
                <Link
                  href="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
                >
                  <User className="w-3.5 h-3.5 text-indigo-400" /> Account Settings
                </Link>
                <Link
                  href="/billing"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Manage Subscription
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-800/80">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
