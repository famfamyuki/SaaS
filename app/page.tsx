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
  Smartphone, 
  Layers, 
  FileSpreadsheet, 
  Cpu,
  Palette
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
          <a href="#features" className="hover:text-white transition-colors">機能特徴</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">提案の流れ</a>
          <a href="#pricing" className="hover:text-white transition-colors">料金プラン</a>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
          >
            ログイン
          </Link>
          <Link 
            href="/dashboard"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            <span>無料で試す</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center pt-16 pb-20 px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Web制作会社・フリーランスWebデザイナー特化型 営業AI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
          URLを入れるだけ。<br />
          相手サイトの課題をAIが自動検知し、<br className="hidden sm:inline" />
          3秒で<span className="gradient-text">『サイトリニューアル提案メール』</span>を作成
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          ターゲット企業のURLを入力するだけで、デザインの古さ・モバイル対応・CTAの弱さ等の課題をAIが自動診断。海外営業や案件獲得にそのまま使える高コンバージョンな英語提案メール（3パターン）を瞬時に自動生成します。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >
            <span>今すぐサイトリニューアル提案を作成（5クレジット無料）</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Hero Interactive Preview Card for Web Redesign */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl text-left relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono text-slate-400">Web Audit & Redesign AI Agent v2.5</span>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Web Audit Completed in 1.4s
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Target Website URL
              </div>
              <p className="text-sm font-semibold text-white truncate">https://example-saas-corp.com</p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                Current website exhibits outdated layout hierarchy, unoptimized mobile navigation, and low-contrast CTA buttons.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Detected Site Issues
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Outdated mobile responsive layout
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Weak CTA button placement
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Visual typography & UI friction
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80 bg-gradient-to-b from-indigo-950/30 to-slate-900">
              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pink-400" /> English Cold Redesign Pitch
              </div>
              <p className="text-xs font-bold text-white mb-1">Subject: Quick design breakdown & redesign concept for example-saas-corp.com</p>
              <p className="text-[11px] text-slate-300 line-clamp-3">
                &quot;Hi Alex, I was checking out your homepage and noticed a few quick UI/UX optimization opportunities around mobile navigation &amp; CTA placement...&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid for Web Agencies */}
      <section id="features" className="max-w-7xl mx-auto py-20 px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Web制作会社・フリーランスの<span className="gradient-text">直営業・案件獲得を自動化</span>
          </h2>
          <p className="text-slate-400 text-sm">
            定型文の送信は終わり。AIが1社ごとのサイト課題を分析し、刺さるリニューアル提案メールを自動生成します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">サイト課題の自動AI診断</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ターゲットURLからレイアウトの古さ、モバイル対応、CTA導線、テキスト視認性の弱さをAIが即座に診断・抽出。
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">英文リニューアル提案メール</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              海外案件獲得やグローバル直営業でそのまま送れる、説得力の高い英語Cold Email文面（3パターン）を自動作成。
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-pink-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">URL一括分析＆CSVエクスポート</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              数十社のサイトURLをCSVで一括アップロード。生成された診断結果と提案メールをワンクリックでCSV出力。
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
