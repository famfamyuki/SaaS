'use client';

import React from 'react';
import Papa from 'papaparse';
import { 
  Users, 
  Search, 
  FileSpreadsheet, 
  ExternalLink, 
  Copy, 
  Check, 
  Eye, 
  X,
  Trash2,
  Filter
} from 'lucide-react';
import { Lead } from '@/lib/supabase/types';
import { MockStore } from '@/lib/supabase/mock-store';

export default function LeadsHistoryPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [search, setSearch] = React.useState('');
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [copiedDraft, setCopiedDraft] = React.useState<string | null>(null);
  const [activeDraftTab, setActiveDraftTab] = React.useState<1 | 2 | 3>(1);

  React.useEffect(() => {
    setLeads(MockStore.getLeads());
  }, []);

  const filteredLeads = leads.filter((l) => 
    l.company_name.toLowerCase().includes(search.toLowerCase()) ||
    l.website_url.toLowerCase().includes(search.toLowerCase()) ||
    l.summary.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(label);
    setTimeout(() => setCopiedDraft(null), 2000);
  };

  const exportAllToCsv = () => {
    if (leads.length === 0) return;
    const csvData = leads.map((lead) => ({
      ID: lead.id,
      Website: lead.website_url,
      Company: lead.company_name,
      Summary: lead.summary,
      Pain_Points: lead.pain_points?.join(' | '),
      Draft1_Subject: lead.email_draft_1?.subject,
      Draft1_Body: lead.email_draft_1?.body,
      Draft2_Subject: lead.email_draft_2?.subject,
      Draft2_Body: lead.email_draft_2?.body,
      Draft3_Subject: lead.email_draft_3?.subject,
      Draft3_Body: lead.email_draft_3?.body,
      Created_At: lead.created_at,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `OutreachIntel_All_Leads_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white">Scraped Leads & Generated Emails</h1>
          </div>
          <p className="text-xs text-slate-400">
            View history of previous website analyses, pain point extractions, and cold email variations.
          </p>
        </div>

        <button
          onClick={exportAllToCsv}
          disabled={leads.length === 0}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export All ({leads.length}) to CSV</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, website, or summary..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-indigo-400" />
          <span>Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> leads</span>
        </div>
      </div>

      {/* History Data Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Company & Domain</th>
                <th className="py-3.5 px-6">AI Summary</th>
                <th className="py-3.5 px-6">Tone</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Created Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No leads found matching your search query.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                          {lead.company_name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{lead.company_name}</p>
                          <a 
                            href={lead.website_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            {lead.website_url.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 max-w-xs truncate text-slate-400">
                      {lead.summary}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[11px]">
                        {lead.target_tone || 'Professional'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setActiveDraftTab(1);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Emails
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Inspection Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-800 p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedLead.company_name}</h3>
                <p className="text-xs text-indigo-400">{selectedLead.website_url}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Company Insight</h4>
              <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {selectedLead.summary}
              </p>
            </div>

            {/* Pain Points */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Pain Points Identified</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLead.pain_points?.map((pp, idx) => (
                  <span key={idx} className="text-xs bg-slate-900 border border-slate-800 text-indigo-300 px-3 py-1 rounded-xl">
                    ⚡ {pp}
                  </span>
                ))}
              </div>
            </div>

            {/* Draft Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {([1, 2, 3] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => setActiveDraftTab(num)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        activeDraftTab === num
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      Variation #{num}
                    </button>
                  ))}
                </div>

                {(() => {
                  const currentDraft = activeDraftTab === 1 
                    ? selectedLead.email_draft_1 
                    : activeDraftTab === 2 
                    ? selectedLead.email_draft_2 
                    : selectedLead.email_draft_3;

                  return (
                    <button
                      onClick={() => copyToClipboard(`Subject: ${currentDraft?.subject}\n\n${currentDraft?.body}`, `modal-${activeDraftTab}`)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
                    >
                      {copiedDraft === `modal-${activeDraftTab}` ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy This Variation
                        </>
                      )}
                    </button>
                  );
                })()}
              </div>

              {(() => {
                const currentDraft = activeDraftTab === 1 
                  ? selectedLead.email_draft_1 
                  : activeDraftTab === 2 
                  ? selectedLead.email_draft_2 
                  : selectedLead.email_draft_3;

                return (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Subject</span>
                      <p className="text-xs font-semibold text-white bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        {currentDraft?.subject}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email Body</span>
                      <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed">
                        {currentDraft?.body}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
