'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  CreditCard, 
  Settings, 
  Zap, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MockStore } from '@/lib/supabase/mock-store';

const NAV_ITEMS = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Generate Emails',
    href: '/generate',
    icon: Sparkles,
    badge: 'AI Engine',
  },
  {
    name: 'Leads & History',
    href: '/leads',
    icon: Users,
  },
  {
    name: 'Billing & Plan',
    href: '/billing',
    icon: CreditCard,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [credits, setCredits] = React.useState<number>(5);
  const [subscription, setSubscription] = React.useState<string>('free');

  React.useEffect(() => {
    const user = MockStore.getUser();
    setCredits(user.credits_remaining);
    setSubscription(user.subscription_status);
  }, [pathname]);

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bottom-0 glass-panel border-r border-slate-800/60 flex flex-col justify-between z-40">
      <div>
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/60">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap className="w-5 h-5 text-white animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              Outreach<span className="gradient-text">Intel</span>
            </h1>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
              AI Sales Suite
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Credit Status Card */}
      <div className="p-4 border-t border-slate-800/60">
        <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Remaining Credits
            </span>
            <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
              {credits}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, (credits / (subscription === 'pro' ? 500 : 5)) * 100))}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            {subscription === 'pro' ? 'Pro Plan (500/mo)' : 'Free Tier (5 limit)'}
          </p>

          <Link
            href="/billing"
            className="w-full text-xs font-medium py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
          >
            <span>Upgrade Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
