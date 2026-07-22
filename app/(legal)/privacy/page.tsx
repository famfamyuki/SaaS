import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | OutreachIntelligence AI',
  description: 'OutreachIntelligence AI における個人情報の取り扱い方針およびプライバシーポリシーです。',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>プライバシーの保護</span>
        </div>
        <h1 className="text-3xl font-black text-white">プライバシーポリシー</h1>
        <p className="text-xs text-slate-400 mt-2">最終更新日: 2026年7月23日</p>
      </div>

      <div className="space-y-8 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. はじめに</h2>
          <p>
            OutreachIntelligence AI（以下、「当サービス」といいます）は、お客様の個人情報の重要性を認識し、その適切な保護と取り扱いを徹底するため、以下の通りプライバシーポリシー（以下、「本ポリシー」といいます）を定めます。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. 取得する情報</h2>
          <p>当サービスは、サービスの提供および向上のため、以下の情報を収集・取得する場合があります。</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>アカウント情報</strong>: 氏名、メールアドレス、パスワード等のユーザー登録情報</li>
            <li><strong>入力データ</strong>: ユーザーが入力した対象WebサイトURL、営業オファー内容、生成されたメール履歴</li>
            <li><strong>決済関連情報</strong>: クレジットカード情報の識別子（決済処理は Stripe 社のセキュアなシステムを通じて行われ、当サービスがカード番号を直接保持することはありません）</li>
            <li><strong>ログおよび技術情報</strong>: IPアドレス、アクセス日時、ブラウザの種類、クッキー（Cookie）情報</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. 利用目的</h2>
          <p>取得した個人情報は、以下の目的で利用いたします。</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>当サービスの提供、運用、およびアカウントの維持・管理のため</li>
            <li>WebスクレイピングおよびGoogle Gemini APIを活用したAIパーソナライズメール生成機能の実行のため</li>
            <li>有料プランの請求、決済処理、および利用クレジットの管理のため</li>
            <li>カスタマーサポートおよびお問い合わせへの対応のため</li>
            <li>不正利用の防止、セキュリティの強化、およびサービスの改善のため</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. 生成AI（Google Gemini API）に関する取り扱い</h2>
          <p>
            当サービスは、メール文面の自動生成のために Google Gemini API を使用します。ユーザーが入力したWebサイトの公開テキストおよびオファー情報は、生成処理の目的においてのみGoogleのAPIに送信されます。API経由で送信されるデータは、モデルのトレーニング目的には利用されません。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. 第三者提供・外部サービスの活用</h2>
          <p>
            当サービスは、法令に基づく場合を除き、ユーザーの同意を得ることなく個人情報を第三者に提供することはありません。ただし、サービスインフラとして以下の安全な外部プラットフォームを活用しています。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>Supabase Inc.</strong>: ユーザー認証およびデータベースの管理</li>
            <li><strong>Stripe Inc.</strong>: クレジットカード決済およびサブスクリプション管理</li>
            <li><strong>Vercel Inc.</strong>: クラウドインフラおよびアプリケーションのホスティング</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">6. 安全管理措置</h2>
          <p>
            当サービスは、個人情報の漏洩、滅失、または毀損を防止するため、SSL/TLSによる通信の暗号化、アクセス制限、およびRow Level Security (RLS) によるデータ分離等の安全管理措置を実施します。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">7. お問い合わせ窓口</h2>
          <p>
            本ポリシーに関するご質問、個人情報の開示・訂正・削除のご請求につきましては、当サービスのサポート窓口（support@outreachintelligence.ai）までお問い合わせください。
          </p>
        </section>
      </div>
    </div>
  );
}
