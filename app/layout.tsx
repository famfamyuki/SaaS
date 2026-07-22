import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OutreachIntelligence AI - Personalised B2B Cold Outreach Engine",
  description: "Upload prospect website URLs, scrape homepage context, and generate highly personalized cold outreach emails powered by Gemini AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
