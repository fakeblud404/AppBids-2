'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import LeaderboardEntry from '@/components/LeaderboardEntry';
import RecentMultipliersTicker from '@/components/RecentMultipliersTicker';
import BidModal from '@/components/BidModal';
import LeaderboardHero from '@/components/LeaderboardHero';
import BigPlinkoWinners from '@/components/BigPlinkoWinners';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQAccordion from '@/components/FAQAccordion';
import Footer from '@/components/Footer';
import StickyBidBar from '@/components/StickyBidBar';
import type { Ad, Category } from '@/lib/types';

// Demo seed data enriched with auction-style fields
const now = Date.now();
const DEMO_ADS: Ad[] = [
  {
    id: '1', title: 'Acme AI Tools', description: 'AI-powered productivity suite for modern engineering teams',
    url: 'https://acme.ai', category: 'AI', baseBid: 500000, multiplier: 3.4,
    finalBid: 1700000, clicks: 43586, status: 'active', stripePaymentId: 'pi_demo1',
    createdAt: new Date(now - 18 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 2 * 60 * 60 * 1000 + 14 * 60 * 1000), bidderCount: 38, productImage: '🤖',
  },
  {
    id: '2', title: 'SEO Wizard Pro', description: 'Rank #1 on Google with AI-driven content and backlink analytics',
    url: 'https://seowizard.pro', category: 'SEO', baseBid: 250000, multiplier: 5,
    finalBid: 1250000, clicks: 28441, status: 'active', stripePaymentId: 'pi_demo2',
    createdAt: new Date(now - 2 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 5 * 60 * 1000), bidderCount: 67, productImage: '📈', auctionStatus: 'ending-soon',
  },
  {
    id: '3', title: 'CryptoTrack Pro', description: 'Real-time portfolio tracking, DeFi analytics & whale alert bot',
    url: 'https://cryptotrack.io', category: 'Crypto', baseBid: 410000, multiplier: 2,
    finalBid: 820000, clicks: 15220, status: 'active', stripePaymentId: 'pi_demo3',
    createdAt: new Date(now - 5 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 8 * 60 * 60 * 1000), bidderCount: 21, productImage: '₿',
  },
  {
    id: '4', title: 'LaunchPad SaaS', description: 'Ship your Next.js & Tailwind SaaS MVP in a single weekend',
    url: 'https://launchpad.dev', category: 'SaaS', baseBid: 150000, multiplier: 5,
    finalBid: 750000, clicks: 12800, status: 'active', stripePaymentId: 'pi_demo4',
    createdAt: new Date(now - 8 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 12 * 60 * 60 * 1000), bidderCount: 44, productImage: '🚀',
  },
  {
    id: '5', title: 'MarketBot AI', description: 'Automate multi-platform social media marketing and scheduling',
    url: 'https://marketbot.co', category: 'Marketing', baseBid: 300000, multiplier: 2,
    finalBid: 600000, clicks: 9820, status: 'active', stripePaymentId: 'pi_demo5',
    createdAt: new Date(now - 12 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 3 * 24 * 60 * 60 * 1000), bidderCount: 15, productImage: '📣',
  },
  {
    id: '6', title: 'DevStack Cloud', description: 'Next-gen edge developer infrastructure and serverless deployments',
    url: 'https://devstack.cloud', category: 'Dev Tools', baseBid: 200000, multiplier: 2,
    finalBid: 400000, clicks: 7640, status: 'active', stripePaymentId: 'pi_demo6',
    createdAt: new Date(now - 24 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 18 * 60 * 60 * 1000), bidderCount: 9, productImage: '💻',
  },
  {
    id: '7', title: 'FinVault Enterprise', description: 'Enterprise-grade financial data vault and automated compliance',
    url: 'https://finvault.com', category: 'Finance', baseBid: 100000, multiplier: 3.4,
    finalBid: 340000, clicks: 5200, status: 'active', stripePaymentId: 'pi_demo7',
    createdAt: new Date(now - 36 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 7 * 60 * 60 * 1000), bidderCount: 12, productImage: '💹',
  },
  {
    id: '8', title: 'ShopEngine Headless', description: 'Ultra-fast headless e-commerce engine for modern DTC brands',
    url: 'https://shopengine.io', category: 'E-Commerce', baseBid: 50000, multiplier: 5,
    finalBid: 250000, clicks: 3100, status: 'active', stripePaymentId: 'pi_demo8',
    createdAt: new Date(now - 48 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 1 * 24 * 60 * 60 * 1000), bidderCount: 7, productImage: '🛍️',
  },
  {
    id: '9', title: 'NeuralWrite AI', description: 'Generative AI content tool that creates natural, human-like copy',
    url: 'https://neuralwrite.ai', category: 'AI', baseBid: 120000, multiplier: 2,
    finalBid: 240000, clicks: 2800, status: 'active', stripePaymentId: 'pi_demo9',
    createdAt: new Date(now - 72 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 4 * 60 * 60 * 1000), bidderCount: 5, productImage: '✍️',
  },
  {
    id: '10', title: 'TokenSwap DeFi', description: 'Instant cross-chain liquidity aggregator & token swap protocol',
    url: 'https://tokenswap.fi', category: 'Crypto', baseBid: 80000, multiplier: 2,
    finalBid: 160000, clicks: 1950, status: 'active', stripePaymentId: 'pi_demo10',
    createdAt: new Date(now - 96 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 0), bidderCount: 3, productImage: '🔄', auctionStatus: 'closed',
  },
  {
    id: '11', title: 'LinkForge SEO', description: 'Automated authority backlink building and rank tracking software',
    url: 'https://linkforge.io', category: 'SEO', baseBid: 70000, multiplier: 2,
    finalBid: 140000, clicks: 1420, status: 'active', stripePaymentId: 'pi_demo11',
    createdAt: new Date(now - 120 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 14 * 60 * 60 * 1000), bidderCount: 11, productImage: '🔗',
  },
  {
    id: '12', title: 'CloudDeploy Studio', description: 'Zero-config one-click deployments for Fullstack Node & React apps',
    url: 'https://clouddeploy.dev', category: 'Dev Tools', baseBid: 50000, multiplier: 2,
    finalBid: 100000, clicks: 890, status: 'active', stripePaymentId: 'pi_demo12',
    createdAt: new Date(now - 168 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 22 * 60 * 60 * 1000), bidderCount: 6, productImage: '☁️',
  },
  {
    id: '13', title: 'FitTrack Pro', description: 'AI personal trainer, workout logging & calorie tracking app',
    url: 'https://fittrack.fit', category: 'Other', baseBid: 95000, multiplier: 3.4,
    finalBid: 323000, clicks: 4120, status: 'active', stripePaymentId: 'pi_demo13',
    createdAt: new Date(now - 10 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 9 * 60 * 60 * 1000), bidderCount: 19, productImage: '🏋️‍♂️',
  },
  {
    id: '14', title: 'BudgetBuddy Expense', description: 'Smart budgeting, subscription tracking & expense management',
    url: 'https://budgetbuddy.app', category: 'Finance', baseBid: 110000, multiplier: 2,
    finalBid: 220000, clicks: 3540, status: 'active', stripePaymentId: 'pi_demo14',
    createdAt: new Date(now - 45 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 16 * 60 * 60 * 1000), bidderCount: 14, productImage: '💳',
  },
  {
    id: '15', title: 'NoteMaster AI', description: 'AI-assisted markdown note-taking, second brain & knowledge graph',
    url: 'https://notemaster.io', category: 'SaaS', baseBid: 85000, multiplier: 2.5,
    finalBid: 212500, clicks: 2980, status: 'active', stripePaymentId: 'pi_demo15',
    createdAt: new Date(now - 30 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 11 * 60 * 60 * 1000), bidderCount: 8, productImage: '📝',
  },
];

export default function HomePage() {
  const [ads, setAds] = useState<Ad[]>(DEMO_ADS);
  const [category, setCategory] = useState<Category>('All');
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (category !== 'All') params.set('category', category);
      const res = await fetch(`/api/ads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.ads && data.ads.length > 0) {
          const apiAds = data.ads as Ad[];
          const merged = [...apiAds, ...DEMO_ADS.filter(d => !apiAds.some(a => a.title === d.title))];
          setAds(merged);
        }
      }
    } catch { /* Keep defaults */ }
    finally { setLoading(false); }
  }, [category]);

  useEffect(() => {
    fetchAds();
    // TODO: BACKEND — replace polling with WebSocket / SSE for real-time bid updates
    const interval = setInterval(fetchAds, 30000);
    return () => clearInterval(interval);
  }, [fetchAds]);

  const filteredAds = category === 'All' ? ads : ads.filter(a => a.category === category);
  const topBid = filteredAds.length > 0 ? filteredAds[0].finalBid : undefined;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Splash */}
      {showSplash && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: '#000000',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div className="animate-logo-spin" style={{ width: 260, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/logo-transparent.png" alt="AppBids Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      )}

      <Header onPlaceBid={() => setBidModalOpen(true)} />

      {/* Big Plinko Winners Banner */}
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <BigPlinkoWinners />
      </div>

      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        {/* Hero */}
        <LeaderboardHero activeAdsCount={filteredAds.length} onStartBidding={() => setBidModalOpen(true)} />

        {/* Category Filter */}
        <CategoryFilter selected={category} onSelect={setCategory} />

        {/* Live Auctions Section */}
        <div style={{ marginBottom: 8 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>🔴 Live Auctions</div>
        </div>

        {/* Leaderboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 24 }}>
          {loading && filteredAds.length === 0 ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 80, borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            ))
          ) : filteredAds.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>🏜️</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No auctions in this category</div>
              <div style={{ fontSize: '0.85rem' }}>Be the first to place a bid!</div>
            </div>
          ) : (
            filteredAds.map((ad, index) => (
              <LeaderboardEntry
                key={ad.id}
                ad={ad}
                rank={index + 1}
                onBid={() => setBidModalOpen(true)}
              />
            ))
          )}
        </div>

        <hr className="section-divider" />

        {/* How It Works */}
        <HowItWorksSection onStartBidding={() => setBidModalOpen(true)} />

        <hr className="section-divider" />

        {/* Testimonials */}
        <TestimonialsSection />

        <hr className="section-divider" />

        {/* FAQ */}
        <section style={{ padding: '64px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="section-label">❓ FAQ</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Everything you need to know about bidding, Plinko, and winning.</p>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <FAQAccordion limit={6} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <a href="/faq" style={{ color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
              View all FAQs →
            </a>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Contact/Support */}
        <section style={{ padding: '48px 0', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>💬 Support</div>
          <h2 className="section-title" style={{ fontSize: '1.6rem' }}>Need Help?</h2>
          <p className="section-sub" style={{ marginBottom: 24 }}>
            Our support team is available 7 days a week. Average response time: 2 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/support">
              <button className="btn-primary" style={{ minHeight: 44 }}>📩 Contact Support</button>
            </a>
            <a href="/faq">
              <button
                style={{
                  padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
                  background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, minHeight: 44,
                }}
              >
                Browse FAQ
              </button>
            </a>
          </div>
        </section>
      </main>

      {/* Fixed Ticker at bottom (desktop) */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60 }} className="hide-mobile-show-md">
        <RecentMultipliersTicker />
      </div>

      {/* Mobile Sticky Bid Bar */}
      <StickyBidBar onBid={() => setBidModalOpen(true)} currentHighBid={topBid} />

      {/* Footer */}
      <div style={{ paddingBottom: 60 }}>
        <Footer />
      </div>

      {/* Bid Modal */}
      <BidModal
        isOpen={bidModalOpen}
        onClose={() => setBidModalOpen(false)}
        onBidPlaced={fetchAds}
      />
    </div>
  );
}
