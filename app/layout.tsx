import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OutreachIntelligence AI - Spot Design Flaws & Pitch Redesigns",
  description: "AI analyzes prospect websites for mobile responsiveness, outdated UI/UX, and speed issues—then generates hyper-personalized cold emails that land $3k-$10k web design projects.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
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
