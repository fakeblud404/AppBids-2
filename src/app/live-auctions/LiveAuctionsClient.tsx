'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import LeaderboardEntry from '@/components/LeaderboardEntry';
import BidModal from '@/components/BidModal';
import StickyBidBar from '@/components/StickyBidBar';
import Footer from '@/components/Footer';
import BigPlinkoWinners from '@/components/BigPlinkoWinners';
import type { Ad, Category } from '@/lib/types';

const now = Date.now();
const DEMO_ADS: Ad[] = [
  {
    id: '1', title: 'Acme AI Tools', description: 'AI-powered productivity suite for engineering teams', url: 'https://acme.ai',
    category: 'AI', baseBid: 500000, multiplier: 3.4, finalBid: 1700000, clicks: 43586,
    status: 'active', stripePaymentId: 'pi_demo1', createdAt: new Date(now - 18 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 2 * 60 * 60 * 1000), bidderCount: 38, productImage: '🤖',
  },
  {
    id: '2', title: 'SEO Wizard Pro', description: 'Rank #1 on Google with AI-driven content & backlinks', url: 'https://seowizard.pro',
    category: 'SEO', baseBid: 250000, multiplier: 5, finalBid: 1250000, clicks: 28441,
    status: 'active', stripePaymentId: 'pi_demo2', createdAt: new Date(now - 2 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 5 * 60 * 1000), bidderCount: 67, productImage: '📈', auctionStatus: 'ending-soon',
  },
  {
    id: '3', title: 'CryptoTrack Pro', description: 'DeFi analytics & real-time whale alert bot', url: 'https://cryptotrack.io',
    category: 'Crypto', baseBid: 410000, multiplier: 2, finalBid: 820000, clicks: 15220,
    status: 'active', stripePaymentId: 'pi_demo3', createdAt: new Date(now - 5 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 8 * 60 * 60 * 1000), bidderCount: 21, productImage: '₿',
  },
  {
    id: '4', title: 'LaunchPad SaaS', description: 'Ship your Next.js SaaS MVP in a single weekend', url: 'https://launchpad.dev',
    category: 'SaaS', baseBid: 150000, multiplier: 5, finalBid: 750000, clicks: 12800,
    status: 'active', stripePaymentId: 'pi_demo4', createdAt: new Date(now - 8 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 12 * 60 * 60 * 1000), bidderCount: 44, productImage: '🚀',
  },
  {
    id: '5', title: 'MarketBot AI', description: 'Automate social media marketing & scheduling', url: 'https://marketbot.co',
    category: 'Marketing', baseBid: 300000, multiplier: 2, finalBid: 600000, clicks: 9820,
    status: 'active', stripePaymentId: 'pi_demo5', createdAt: new Date(now - 12 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 3 * 24 * 60 * 60 * 1000), bidderCount: 15, productImage: '📣',
  },
  {
    id: '6', title: 'DevStack Cloud', description: 'Next-gen edge infrastructure & serverless deployments', url: 'https://devstack.cloud',
    category: 'Dev Tools', baseBid: 200000, multiplier: 2, finalBid: 400000, clicks: 7640,
    status: 'active', stripePaymentId: 'pi_demo6', createdAt: new Date(now - 24 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 18 * 60 * 60 * 1000), bidderCount: 9, productImage: '💻',
  },
  {
    id: '7', title: 'FinVault Enterprise', description: 'Financial data vault & automated compliance', url: 'https://finvault.com',
    category: 'Finance', baseBid: 100000, multiplier: 3.4, finalBid: 340000, clicks: 5200,
    status: 'active', stripePaymentId: 'pi_demo7', createdAt: new Date(now - 36 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 7 * 60 * 60 * 1000), bidderCount: 12, productImage: '💹',
  },
  {
    id: '8', title: 'ShopEngine Headless', description: 'Headless e-commerce engine for DTC brands', url: 'https://shopengine.io',
    category: 'E-Commerce', baseBid: 50000, multiplier: 5, finalBid: 250000, clicks: 3100,
    status: 'active', stripePaymentId: 'pi_demo8', createdAt: new Date(now - 48 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 1 * 24 * 60 * 60 * 1000), bidderCount: 7, productImage: '🛍️',
  },
  {
    id: '9', title: 'NeuralWrite AI', description: 'Generative AI content & copywriter tool', url: 'https://neuralwrite.ai',
    category: 'AI', baseBid: 120000, multiplier: 2, finalBid: 240000, clicks: 2800,
    status: 'active', stripePaymentId: 'pi_demo9', createdAt: new Date(now - 72 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 4 * 60 * 60 * 1000), bidderCount: 5, productImage: '✍️',
  },
  {
    id: '10', title: 'TokenSwap DeFi', description: 'Instant cross-chain DEX & token swap protocol', url: 'https://tokenswap.fi',
    category: 'Crypto', baseBid: 80000, multiplier: 2, finalBid: 160000, clicks: 1950,
    status: 'active', stripePaymentId: 'pi_demo10', createdAt: new Date(now - 96 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 0), bidderCount: 3, productImage: '🔄', auctionStatus: 'closed',
  },
  {
    id: '11', title: 'LinkForge SEO', description: 'Automated authority backlink building platform', url: 'https://linkforge.io',
    category: 'SEO', baseBid: 70000, multiplier: 2, finalBid: 140000, clicks: 1420,
    status: 'active', stripePaymentId: 'pi_demo11', createdAt: new Date(now - 120 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 14 * 60 * 60 * 1000), bidderCount: 11, productImage: '🔗',
  },
  {
    id: '12', title: 'CloudDeploy Studio', description: 'Zero-config Node & React app deployments', url: 'https://clouddeploy.dev',
    category: 'Dev Tools', baseBid: 50000, multiplier: 2, finalBid: 100000, clicks: 890,
    status: 'active', stripePaymentId: 'pi_demo12', createdAt: new Date(now - 168 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 22 * 60 * 60 * 1000), bidderCount: 6, productImage: '☁️',
  },
  {
    id: '13', title: 'FitTrack Pro', description: 'AI workout logging & calorie tracking mobile app', url: 'https://fittrack.fit',
    category: 'Other', baseBid: 95000, multiplier: 3.4, finalBid: 323000, clicks: 4120,
    status: 'active', stripePaymentId: 'pi_demo13', createdAt: new Date(now - 10 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 9 * 60 * 60 * 1000), bidderCount: 19, productImage: '🏋️‍♂️',
  },
  {
    id: '14', title: 'BudgetBuddy Expense', description: 'Smart budgeting & subscription tracking app', url: 'https://budgetbuddy.app',
    category: 'Finance', baseBid: 110000, multiplier: 2, finalBid: 220000, clicks: 3540,
    status: 'active', stripePaymentId: 'pi_demo14', createdAt: new Date(now - 45 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 16 * 60 * 60 * 1000), bidderCount: 14, productImage: '💳',
  },
  {
    id: '15', title: 'NoteMaster AI', description: 'AI markdown note-taking & second brain tool', url: 'https://notemaster.io',
    category: 'SaaS', baseBid: 85000, multiplier: 2.5, finalBid: 212500, clicks: 2980,
    status: 'active', stripePaymentId: 'pi_demo15', createdAt: new Date(now - 30 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 11 * 60 * 60 * 1000), bidderCount: 8, productImage: '📝',
  },
];

export default function LiveAuctionsClient() {
  const [ads, setAds] = useState<Ad[]>(DEMO_ADS);
  const [category, setCategory] = useState<Category>('All');
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (category !== 'All') params.set('category', category);
      const res = await fetch(`/api/ads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.ads?.length > 0) {
          const apiAds = data.ads as Ad[];
          setAds([...apiAds, ...DEMO_ADS.filter(d => !apiAds.some((a: Ad) => a.title === d.title))]);
        }
      }
    } catch { /* Keep defaults */ }
    finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, [category]);

  useEffect(() => {
    fetchAds();
    // TODO: BACKEND — replace with WebSocket / SSE for real-time updates
    const interval = setInterval(fetchAds, 30000);
    return () => clearInterval(interval);
  }, [fetchAds]);

  const filtered = category === 'All' ? ads : ads.filter(a => a.category === category);
  const topBid = filtered[0]?.finalBid;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onPlaceBid={() => setBidModalOpen(true)} />
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <BigPlinkoWinners />
      </div>

      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '40px 24px' }}>
        {/* Page Hero */}
        <div className="page-hero" style={{ padding: '40px 0 32px', textAlign: 'left', maxWidth: '100%', margin: 0 }}>
          <div className="section-label">🔴 Live Now</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Live Auctions
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              {filtered.length} active auctions · Real-time updates
            </p>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span
                className="live-pulse-dot"
                style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)' }}
              />
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <CategoryFilter selected={category} onSelect={setCategory} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 80 }}>
          {loading && filtered.length === 0 ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ height: 82, borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border)', animation: 'pulse 2s ease-in-out infinite' }} />
            ))
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏜️</div>
              <div style={{ fontWeight: 600 }}>No auctions in this category yet</div>
              <div style={{ fontSize: '0.85rem', marginTop: 6 }}>Be the first to start one!</div>
            </div>
          ) : (
            filtered.map((ad, i) => (
              <LeaderboardEntry key={ad.id} ad={ad} rank={i + 1} onBid={() => setBidModalOpen(true)} />
            ))
          )}
        </div>
      </main>

      <StickyBidBar onBid={() => setBidModalOpen(true)} currentHighBid={topBid} />
      <Footer />
      <BidModal isOpen={bidModalOpen} onClose={() => setBidModalOpen(false)} onBidPlaced={fetchAds} />
    </div>
  );
}
