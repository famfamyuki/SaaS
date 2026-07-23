'use client';

import React from 'react';
import Papa from 'papaparse';
import { 
  Sparkles, 
  Globe, 
  Upload, 
  Zap, 
  Copy, 
  Check, 
  Download, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  FileSpreadsheet,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Lead, UserProfile } from '@/lib/supabase/types';
import { MockStore } from '@/lib/supabase/mock-store';

import { copyToClipboard } from '@/lib/clipboard';

const TONES = [
  { id: 'Professional', label: 'Professional', desc: 'Formal & executive' },
  { id: 'Casual', label: 'Casual', desc: 'Friendly & conversational' },
  { id: 'Direct', label: 'Direct', desc: 'Concise & punchy' },
  { id: 'Witty', label: 'Witty', desc: 'Clever & engaging' },
  { id: 'High-Energy', label: 'High-Energy', desc: 'Enthusiastic' },
];

export default function GeneratePage() {
  const [urlInput, setUrlInput] = React.useState('https://stripe.com\nhttps://vercel.com');
  const [targetTone, setTargetTone] = React.useState('Professional');
  const [valueProp, setValueProp] = React.useState(
    'High-converting modern website redesign, UI/UX optimization, and mobile responsiveness upgrades for scaling B2B brands.'
  );

  const [loading, setLoading] = React.useState(false);
  const [stepText, setStepText] = React.useState('');
  const [results, setResults] = React.useState<Lead[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [selectedTabDraft, setSelectedTabDraft] = React.useState<Record<string, 1 | 2 | 3>>({});
  const [user, setUser] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const refreshUser = () => setUser(MockStore.getUser());
    refreshUser();

    if (typeof window !== 'undefined') {
      window.addEventListener('user-credits-updated', refreshUser);
      return () => window.removeEventListener('user-credits-updated', refreshUser);
    }
  }, []);

  // CSV File Upload Parser
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (res) => {
        const extractedUrls: string[] = [];
        res.data.forEach((row: any) => {
          if (Array.isArray(row)) {
            row.forEach((cell: any) => {
              if (typeof cell === 'string' && (cell.includes('http') || cell.includes('.'))) {
                extractedUrls.push(cell.trim());
              }
            });
          } else if (typeof row === 'object' && row !== null) {
            Object.values(row).forEach((val: any) => {
              if (typeof val === 'string' && (val.includes('http') || val.includes('.'))) {
                extractedUrls.push(val.trim());
              }
            });
          }
        });

        if (extractedUrls.length > 0) {
          setUrlInput(extractedUrls.join('\n'));
        }
      },
      header: false,
    });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    const urls = urlInput
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 3);

    if (urls.length === 0) {
      setError('Please enter at least one target website URL.');
      return;
    }

    setLoading(true);
    setStepText('🔍 Scraping target website context...');

    try {
      setTimeout(() => setStepText('🧠 Gemini AI analyzing company pain points...'), 1200);
      setTimeout(() => setStepText('✍️ Crafting 3 custom email variations...'), 2400);

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls,
          target_tone: targetTone,
          value_proposition: valueProp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setResults(data.leads || []);

      if (data.creditsRemaining !== undefined) {
        MockStore.updateUser({ credits_remaining: data.creditsRemaining });
      }
      
      const tabState: Record<string, 1 | 2 | 3> = {};
      (data.leads || []).forEach((lead: Lead) => {
        tabState[lead.id] = 1;
      });
      setSelectedTabDraft(tabState);
    } catch (err: any) {
      setError(err.message || 'Failed to generate outreach');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const exportResultsToCsv = () => {
    if (results.length === 0) return;

    const csvData = results.map((lead) => ({
      Domain: lead.website_url,
      Company: lead.company_name,
      Summary: lead.summary,
      Pain_Points: lead.pain_points?.join(' | '),
      Draft1_Subject: lead.email_draft_1?.subject,
      Draft1_Body: lead.email_draft_1?.body,
      Draft2_Subject: lead.email_draft_2?.subject,
      Draft2_Body: lead.email_draft_2?.body,
      Draft3_Subject: lead.email_draft_3?.subject,
      Draft3_Body: lead.email_draft_3?.body,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `OutreachIntel_Leads_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 p-6 rounded-3xl border border-indigo-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white">Website Redesign Pitch Generator</h1>
          </div>
          <p className="text-xs text-slate-400">
            Enter target prospect website URLs. AI analyzes mobile layout flaws &amp; CTA friction, generating 3 high-converting English proposal drafts per site.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">Available Credits:</span>
            <span className="font-bold text-amber-400 text-sm">{user?.credits_remaining ?? 5}</span>
          </div>

          {results.length > 0 && (
            <button
              onClick={exportResultsToCsv}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Batch ({results.length}) to CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Generator Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleGenerate} className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          {/* Target Website URLs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-400" /> Target Website URLs
              </label>
              <label className="cursor-pointer text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
                <Upload className="w-3 h-3" /> Upload CSV
                <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
              </label>
            </div>
            <textarea
              rows={4}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://stripe.com&#10;https://vercel.com"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">Enter 1 URL per line (Max 10 per batch).</p>
          </div>

          {/* Value Proposition */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">
              Your Offer / Value Proposition
            </label>
            <textarea
              rows={3}
              value={valueProp}
              onChange={(e) => setValueProp(e.target.value)}
              placeholder="What are you offering? E.g., AI sales email automation that increases reply rates by 2.5x."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Target Tone */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">
              Select Target Email Tone
            </label>
            <div className="grid grid-cols-1 gap-2">
              {TONES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTargetTone(t.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                    targetTone === t.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-semibold">{t.label}</span>
                  <span className="text-[10px] text-slate-500">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
              {(error.includes('Insufficient credits') || error.includes('credits')) && (
                <button
                  onClick={() => {
                    MockStore.resetUserToFree();
                    setError(null);
                    window.location.reload();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs shadow-md transition-all shrink-0 ml-4"
                >
                  Replenish 5 Free Demo Credits
                </button>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Generating Intelligence...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Scrape & Generate Emails (1 Credit/URL)</span>
              </>
            )}
          </button>
        </form>

        {/* Live Generation Results Container */}
        <div className="lg:col-span-2 space-y-6">
          {loading && (
            <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/30">
                <Sparkles className="w-8 h-8 text-white animate-spin" />
              </div>
              <h3 className="text-lg font-bold text-white">{stepText}</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Parsing website headers, analyzing value propositions, and structuring personalized outreach hooks.
              </p>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="glass-panel p-12 rounded-3xl border border-slate-800/80 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
                <Globe className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-white">Ready for Generation</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Enter target company website URLs on the left or upload a CSV file to scrape context and generate cold email variations.
              </p>
            </div>
          )}

          {!loading && results.map((lead) => {
            const activeDraftNum = selectedTabDraft[lead.id] || 1;
            const draft = activeDraftNum === 1 
              ? lead.email_draft_1 
              : activeDraftNum === 2 
              ? lead.email_draft_2 
              : lead.email_draft_3;

            return (
              <div key={lead.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 hover:border-indigo-500/30 transition-all">
                {/* Header Metadata */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{lead.company_name}</h3>
                      <a 
                        href={lead.website_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        {lead.website_url.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{lead.summary}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
                    Scraped & Completed
                  </span>
                </div>

                {/* Key Pain Points extracted by AI */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Extracted Business Pain Points
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {lead.pain_points?.map((pp, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-slate-900 border border-slate-800 text-indigo-300 px-3 py-1 rounded-xl"
                      >
                        ⚡ {pp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Email Variations Tabs & Content */}
                <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <div className="flex gap-2">
                      {([1, 2, 3] as const).map((num) => (
                        <button
                          key={num}
                          onClick={() => setSelectedTabDraft({ ...selectedTabDraft, [lead.id]: num })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            activeDraftNum === num
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Draft #{num} {num === 1 ? '(PAS)' : num === 2 ? '(Short)' : '(Social Proof)'}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(draft?.subject || '', `${lead.id}-subj-${activeDraftNum}`)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1 transition-all"
                      >
                        {copiedId === `${lead.id}-subj-${activeDraftNum}` ? (
                          <span className="text-emerald-400 font-bold">✓ Subject Copied</span>
                        ) : (
                          <span>Copy Subject</span>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(draft?.body || '', `${lead.id}-body-${activeDraftNum}`)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1 transition-all"
                      >
                        {copiedId === `${lead.id}-body-${activeDraftNum}` ? (
                          <span className="text-emerald-400 font-bold">✓ Body Copied</span>
                        ) : (
                          <span>Copy Body</span>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(`Subject: ${draft?.subject}\n\n${draft?.body}`, `${lead.id}-full-${activeDraftNum}`)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
                      >
                        {copiedId === `${lead.id}-full-${activeDraftNum}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied Full Email!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Full Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Subject Line & Hook */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Subject Line</span>
                    <p className="text-xs font-semibold text-white bg-slate-900 p-2.5 rounded-xl border border-slate-850">
                      {draft?.subject}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Personalized Hook</span>
                    <p className="text-xs text-indigo-300 bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-900/40">
                      {draft?.hook}
                    </p>
                  </div>

                  {/* Body Text */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Body</span>
                    <div className="text-xs text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-850 whitespace-pre-wrap leading-relaxed">
                      {draft?.body}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
