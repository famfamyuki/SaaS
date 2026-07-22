import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Sparkles, 
  Globe, 
  Mail, 
  ArrowRight, 
  Monitor, 
  Layout, 
  FileSpreadsheet, 
  Cpu,
  Palette,
  CheckCircle2
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
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Outreach<span className="gradient-text">Intel AI</span>
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
          <span>Tailored for Web Design Agencies &amp; Freelance Web Designers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
          Spot Design Flaws &amp;<br />
          Pitch Website Redesigns <span className="gradient-text">on Autopilot</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          AI analyzes prospect websites for mobile responsiveness, outdated UI/UX, and speed issues—then generates hyper-personalized cold emails that land $3k-$10k web design projects.
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
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Platform</span>
          </a>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl text-left relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono text-slate-400">Web Audit &amp; Redesign AI Copilot v2.6</span>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Live Audit Completed in 1.2s
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Target Website URL
              </div>
              <p className="text-sm font-semibold text-white truncate">https://example-brand.com</p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Current homepage exhibits mobile responsiveness friction, unoptimized CTA hierarchy, and outdated typography.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Detected Design Flaws
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Outdated mobile responsive layout
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Sub-optimal CTA button contrast
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Visual hierarchy &amp; UX friction
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80 bg-gradient-to-b from-indigo-950/30 to-slate-900">
              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pink-400" /> Generated Pitch Email Draft #1
              </div>
              <p className="text-xs font-bold text-white mb-1">Subject: Quick design breakdown &amp; redesign concept for example-brand.com</p>
              <p className="text-[11px] text-slate-300 line-clamp-3">
                &quot;Hi Alex, I was checking out your website and noticed a few quick UI/UX optimization opportunities around mobile navigation and primary CTA placement...&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid for Web Agencies */}
      <section id="features" className="max-w-7xl mx-auto py-20 px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Everything Web Agencies Need to <span className="gradient-text">Close High-Ticket Redesign Projects</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Stop sending generic email templates. Let AI audit every prospect and draft hyper-relevant pitches in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Web UX Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly extracts mobile responsiveness flaws, outdated visual elements, weak CTA buttons, and header hierarchy issues.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">High-Converting Redesign Pitches</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates 3 distinct cold email variations in fluent English based on Western outbound sales best practices.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-pink-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Batch Upload &amp; 1-Click Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload a list of domain URLs via text or CSV and export all audited flaws, subject lines, and email bodies in 1 click.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-5xl mx-auto py-20 px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-sm">Start closing $3k-$10k web design client retainer contracts today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Free Starter</span>
              <h3 className="text-3xl font-black text-white mt-1">$0 <span className="text-xs font-normal text-slate-400">/ month</span></h3>
              <p className="text-xs text-slate-400 mt-1">Perfect for trying out our website audit &amp; AI prompt engine.</p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5 Free generations on signup</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated website flaw detector</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3 English email variations per site</li>
            </ul>
            <Link href="/dashboard" className="block text-center py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-semibold text-xs">
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-950/30 to-slate-950 space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Pro Agency</span>
              <h3 className="text-4xl font-black text-white mt-1">$49 <span className="text-xs font-normal text-slate-400">/ month</span></h3>
              <p className="text-xs text-slate-400 mt-1">Designed for active web design agencies and freelancers.</p>
            </div>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 500 Monthly generations</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority website scraper</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Gemini 1.5 Pro AI engine</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited 1-Click CSV exports</li>
            </ul>
            <Link href="/dashboard" className="block text-center py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30">
              Upgrade to Pro Plan ($49/mo)
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 OutreachIntelligence AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/legal" className="hover:text-slate-300 transition-colors">Legal Notice</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
