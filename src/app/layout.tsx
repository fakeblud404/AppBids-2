import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AppBids — Pay-to-Rank Ad Leaderboard",
  description:
    "Bid for the top spot on the advertising leaderboard. Every bid goes through the Plinko multiplier — will you land 10×?",
  keywords: ["advertising", "bidding", "leaderboard", "plinko", "ads"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
