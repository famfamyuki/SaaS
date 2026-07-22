import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Sparkles, 
  Globe, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Cpu
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Outreach<span className="gradient-text">Intel</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/dashboard"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center pt-16 pb-20 px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Next-Gen B2B Cold Outreach Engine Powered by Gemini AI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-6">
          Turn Prospect Website URLs into <br className="hidden sm:inline" />
          <span className="gradient-text">Hyper-Personalized Cold Emails</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload target company websites. Our scraper extracts value propositions & pain points while Gemini AI crafts tailored email variations that double response rates.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >
            <span>Start Free Trial (5 Credits Included)</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2"
          >
            <span>Watch 2-Min Demo</span>
          </a>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl text-left relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono text-slate-400">OutreachIntel AI Engine v2.4</span>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Live Scrape Completed in 1.4s
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Target Website
              </div>
              <p className="text-sm font-semibold text-white truncate">https://stripe.com</p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Financial infrastructure platform for software and internet businesses handling payments and billing globally.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> AI Pain Point Extraction
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> International payment decline rates
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Multi-region billing compliance
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Enterprise API integration friction
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80 bg-gradient-to-b from-indigo-950/30 to-slate-900">
              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pink-400" /> AI Generated Draft #1
              </div>
              <p className="text-xs font-bold text-white mb-1">Subject: Optimizing Stripe payment authorization rates by 18%</p>
              <p className="text-[11px] text-slate-300 line-clamp-3">
                &quot;Hi Alex, Notice how scaling international transactions often increases authorization decline rates. We built an AI routing engine...&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto py-20 px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Everything B2B Sales Teams Need to <span className="gradient-text">Book 3x More Demos</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Stop sending generic templates. Our scraper + LLM pipeline analyzes every prospect in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Web Scraper</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts homepage titles, meta descriptions, H1 headers, value props, and About Us sections from target URLs instantly.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Gemini AI Prompt Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identifies key business pain points and drafts 3 distinct personalized cold emails tailored to target tone and your product value prop.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-pink-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1-Click CSV Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export generated company summaries, pain points, subject lines, and email bodies directly to CSV for Smartlead, Instantly, or Lemlist.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 OutreachIntelligence AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">利用規約</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</Link>
            <Link href="/legal" className="hover:text-slate-300 transition-colors">特定商取引法に基づく表記</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
