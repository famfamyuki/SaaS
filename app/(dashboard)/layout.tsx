import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { DashboardAuthGuard } from '@/components/dashboard-auth-guard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGuard>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16 flex-1 min-h-screen p-8 overflow-y-auto flex flex-col justify-between">
          <div className="max-w-7xl mx-auto space-y-8 w-full flex-1">
            {children}
          </div>

          {/* Dashboard Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-800/80 text-xs text-slate-500 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <p>© 2026 OutreachIntelligence AI. All rights reserved.</p>
                <span className="hidden sm:inline text-slate-700">|</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Support:</span>
                  <a href="mailto:support@outreachintel.ai" className="hover:text-indigo-400 underline font-mono">
                    support@outreachintel.ai
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link href="/tokushoho" target="_blank" className="hover:text-slate-300 transition-colors">
                  特定商取引法に基づく表記
                </Link>
                <Link href="/terms" target="_blank" className="hover:text-slate-300 transition-colors">
                  利用規約
                </Link>
                <Link href="/privacy" target="_blank" className="hover:text-slate-300 transition-colors">
                  プライバシーポリシー
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </DashboardAuthGuard>
  );
}
