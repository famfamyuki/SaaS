import React from 'react';
import Link from 'next/link';
import { Zap, ArrowLeft, Mail } from 'lucide-react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-800 glass-panel sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-base">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span>Outreach<span className="gradient-text">Intel</span></span>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>トップページに戻る</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-xs text-slate-500 bg-slate-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© 2026 OutreachIntelligence AI. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>サポート窓口:</span>
              <a href="mailto:support@outreachintel.ai" className="hover:text-indigo-400 underline font-mono">
                support@outreachintel.ai
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/tokushoho" className="hover:text-slate-300 transition-colors">
              特定商取引法に基づく表記
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              利用規約
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
