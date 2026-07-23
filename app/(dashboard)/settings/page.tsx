'use client';

import React from 'react';
import { Settings, User, Key, Shield, Check, Save } from 'lucide-react';
import { MockStore } from '@/lib/supabase/mock-store';
import { UserProfile } from '@/lib/supabase/types';

export default function SettingsPage() {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [fullName, setFullName] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    const u = MockStore.getUser();
    setUser(u);
    setFullName(u?.full_name || '');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    MockStore.updateUser({ full_name: fullName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Settings className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-white">Account Settings & AI Preferences</h1>
        </div>
        <p className="text-xs text-slate-400">
          Manage profile parameters, defaults, and API keys.
        </p>
      </div>

      {/* Account Settings Form */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" /> User Profile Information
        </h3>

        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
            <input
              type="email"
              disabled
              value={user?.email || 'alex@outreachintel.ai'}
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Saved Changes</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* API Key Status Info */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-purple-400" /> Integrated AI & Web Scraper Service Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Google Gemini API</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Connected
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">Gemini 1.5 Pro AI engine for structured sales outreach.</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Cheerio Web Scraper</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Active
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">Parses title, meta tags, H1/H2 headers, and About text.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
