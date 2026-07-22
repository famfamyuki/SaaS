import React from 'react';
import type { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: '利用規約 | OutreachIntelligence AI',
  description: 'OutreachIntelligence AI のサービス利用規約です。',
};

export default function TermsOfServicePage() {
  return (
    <div className="space-y-8 glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>利用規約</span>
        </div>
        <h1 className="text-3xl font-black text-white">サービス利用規約</h1>
        <p className="text-xs text-slate-400 mt-2">最終更新日: 2026年7月23日</p>
      </div>

      <div className="space-y-8 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">第1条（適用および同意）</h2>
          <p>
            本規約は、OutreachIntelligence AI（以下、「当サービス」といいます）が提供するすべてのサービスの利用条件を定めるものです。ユーザーは、アカウントを作成またはサービスを利用することにより、本規約に同意したものとみなされます。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">第2条（サービス内容とクレジット制度）</h2>
          <p>
            当サービスは、ユーザーが指定した対象企業のWebサイトURLを自動スクレイピングし、AI（Google Gemini）を用いて営業文面を生成するB2Bセールスプラットフォームです。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>フリープラン</strong>: 新規登録時に5クレジット（5回の生成）を無料で提供します。</li>
            <li><strong>Proプラン</strong>: 月額料金（$49/月または規定の金額）の支払いで毎月500クレジットが付与されます。</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">第3条（禁止事項）</h2>
          <p>ユーザーは、当サービスの利用にあたり、以下の行為を行ってはなりません。</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>法令または公序良俗に違反するWebサイトのスクレイピングおよび営業メールの生成・送信</li>
            <li>特定電子メール法に違反する迷惑メール（スパム）の大量送信目的での利用</li>
            <li>当サービスのサーバーやネットワークシステムに過度な負荷をかける行為</li>
            <li>不正アクセス、リバースエンジニアリング、または当サービスの運営を妨害する行為</li>
            <li>第三者の著作権、プライバシー権、名誉、その他の権利を侵害する行為</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">第4条（AI生成物に関する免責）</h2>
          <p>
            当サービスが提供するAI生成メール文面、企業要約、および課題抽出結果は人工知能によって生成された参考情報です。当サービスは、生成物の完全性、正確性、有用性、または特定の営業成約結果を保証するものではありません。生成されたメールを第三者に送信する際は、ユーザー自身の責任において内容の確認と送信判断を行ってください。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">第5条（有料サブスクリプションおよび解約・返金）</h2>
          <p>
            Proプランの利用料金は Stripe 決済を通じて自動更新されます。ユーザーは当サービスの料金管理画面からいつでもサブスクリプションの自動更新を解除・解約することができます。解約後も現在の請求期間終了まではサービスをご利用いただけます。デジタルコンテンツの性質上、既にお支払いいただいた利用料金の返金には応じかねます。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">第6条（サービスの変更・停止および管轄）</h2>
          <p>
            当サービスは、メンテナンス、システム障害、その他運営上の都合により、事前通知なくサービスの一部または全部を中断または変更することがあります。本規約に関する紛争については、日本の法律を準拠法とし、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>
      </div>
    </div>
  );
}
