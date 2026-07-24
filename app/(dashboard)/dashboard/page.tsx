'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Sparkles, 
  Users, 
  CreditCard, 
  TrendingUp, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Mail
} from 'lucide-react';
import { MockStore } from '@/lib/supabase/mock-store';
import { Lead, UserProfile } from '@/lib/supabase/types';

export default function DashboardOverviewPage() {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [leads, setLeads] = React.useState<Lead[]>([]);

  React.useEffect(() => {
    setUser(MockStore.getUser());
    setLeads(MockStore.getLeads());
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-8 border border-indigo-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Gemini 1.5 Pro Copilot Active</span>
            </div>
            <h1 className="text-3xl font-black text-white">
              Welcome back, <span className="gradient-text">{user?.full_name || user?.email?.split('@')[0] || 'Web Agency Partner'}</span> 👋
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Upload target company websites to scrape homepage insights, extract core pain points, and generate personalized cold email variations.
            </p>
          </div>

          <Link
            href="/generate"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 shrink-0 group"
          >
            <Zap className="w-4 h-4" />
            <span>Generate Cold Outreach</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining Credits</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{user?.credits_remaining ?? 5}</p>
          <p className="text-[11px] text-slate-400">
            {user?.subscription_status === 'pro' ? '500 monthly credits' : 'Free tier (5 total)'}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Scraped Leads</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{leads.length}</p>
          <p className="text-[11px] text-slate-400">Website context extracted</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Drafts</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{leads.length * 3}</p>
          <p className="text-[11px] text-slate-400">3 variations per company</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Plan</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white capitalize">{user?.subscription_status || 'Free'}</p>
          <Link href="/billing" className="text-[11px] font-semibold text-indigo-400 hover:underline block">
            Manage billing & limits →
          </Link>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Outreach Generations</h3>
            <p className="text-xs text-slate-400">Leads processed by web scraper & Gemini AI</p>
          </div>
          <Link
            href="/leads"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {leads.slice(0, 3).map((lead) => (
            <div key={lead.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-bold flex items-center justify-center text-sm">
                  {lead.company_name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{lead.company_name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{lead.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-0 border-slate-800 pt-3 md:pt-0">
                <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  {lead.target_tone || 'Professional'}
                </span>
                <Link
                  href="/leads"
                  className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors"
                >
                  Inspect Emails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
