import React from 'react';
import type { Metadata } from 'next';
import { Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | OutreachIntelligence AI',
  description: 'OutreachIntelligence AI の特定商取引法に基づく表記です。',
};

export default function SpecifiedCommercialTransactionsPage() {
  return (
    <div className="space-y-8 glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5 text-pink-400" />
          <span>特定商取引法に基づく表記</span>
        </div>
        <h1 className="text-3xl font-black text-white">特定商取引法に基づく表記</h1>
        <p className="text-xs text-slate-400 mt-2">最終更新日: 2026年7月23日</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <tbody className="divide-y divide-slate-800">
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 w-1/3 border-b border-slate-800">
                販売事業者
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300">
                OutreachIntelligence AI 運営事務局
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                運営責任者
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300">
                Famfam Yuki（代表）
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                所在地
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-400">
                ※請求があった場合、遅滞なく開示いたします（お問い合わせ窓口までご連絡ください）。
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                お問い合わせ窓口
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-indigo-400">
                support@outreachintelligence.ai
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                販売価格
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300 space-y-1">
                <p>・<strong>フリープラン</strong>: $0 / 月（5クレジット付与）</p>
                <p>・<strong>Proプラン</strong>: $49 / 月（500クレジット付与 / 月額自動更新）</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                商品代金以外の必要料金
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300">
                インターネット接続料金および通信費用（お客様負担）
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                お支払い方法
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300">
                クレジットカード決済（Stripe社によるオンライン決済）
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                代金の支払時期
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300">
                初回登録時即時、以降は毎月同日に自動課金されます。
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                役務の提供時期
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300">
                決済完了後、即時にProプラン機能および追加クレジットが反映されます。
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40">
              <th className="py-4 px-4 font-bold text-white bg-slate-900/80 border-b border-slate-800">
                キャンセル・解約方針
              </th>
              <td className="py-4 px-4 border-b border-slate-800 text-slate-300">
                マイページの「Billing（料金管理）」画面より、いつでも翌月以降の自動更新を解除・解約いただけます。解約後も現在の契約期間満了までサービスをご利用いただけます。デジタルコンテンツの性質上、決済完了後の返金はお受けできません。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
