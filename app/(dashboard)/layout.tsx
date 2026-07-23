import React from 'react';
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
        <main className="pl-64 pt-16 flex-1 min-h-screen p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </DashboardAuthGuard>
  );
}
