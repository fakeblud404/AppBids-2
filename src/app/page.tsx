'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import LeaderboardEntry from '@/components/LeaderboardEntry';
import RecentMultipliersTicker from '@/components/RecentMultipliersTicker';
import BidModal from '@/components/BidModal';
import LeaderboardHero from '@/components/LeaderboardHero';
import type { Ad, Category } from '@/lib/types';

// Demo seed data for when Firebase isn't configured
const DEMO_ADS: Ad[] = [
  {
    id: '1', title: 'Acme AI Tools', description: 'AI-powered productivity suite for teams',
    url: 'https://acme.ai', category: 'AI', baseBid: 500000, multiplier: 3.4,
    finalBid: 1700000, clicks: 43586, status: 'active', stripePaymentId: 'pi_demo1',
    createdAt: new Date(Date.now() - 18 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '2', title: 'SEO Wizard Pro', description: 'Rank #1 on Google with AI-driven SEO',
    url: 'https://seowizard.pro', category: 'SEO', baseBid: 250000, multiplier: 5,
    finalBid: 1250000, clicks: 28441, status: 'active', stripePaymentId: 'pi_demo2',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '3', title: 'CryptoTrack', description: 'Real-time portfolio tracking & analytics',
    url: 'https://cryptotrack.io', category: 'Crypto', baseBid: 410000, multiplier: 2,
    finalBid: 820000, clicks: 15220, status: 'active', stripePaymentId: 'pi_demo3',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '4', title: 'LaunchPad SaaS', description: 'Ship your SaaS in a weekend',
    url: 'https://launchpad.dev', category: 'SaaS', baseBid: 150000, multiplier: 5,
    finalBid: 750000, clicks: 12800, status: 'active', stripePaymentId: 'pi_demo4',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '5', title: 'MarketBot', description: 'Automate your social media marketing',
    url: 'https://marketbot.co', category: 'Marketing', baseBid: 300000, multiplier: 2,
    finalBid: 600000, clicks: 9820, status: 'active', stripePaymentId: 'pi_demo5',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '6', title: 'DevStack Cloud', description: 'Next-gen developer infrastructure',
    url: 'https://devstack.cloud', category: 'Dev Tools', baseBid: 200000, multiplier: 2,
    finalBid: 400000, clicks: 7640, status: 'active', stripePaymentId: 'pi_demo6',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '7', title: 'FinVault', description: 'Enterprise-grade financial data vault',
    url: 'https://finvault.com', category: 'Finance', baseBid: 100000, multiplier: 3.4,
    finalBid: 340000, clicks: 5200, status: 'active', stripePaymentId: 'pi_demo7',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '8', title: 'ShopEngine', description: 'Headless e-commerce for modern brands',
    url: 'https://shopengine.io', category: 'E-Commerce', baseBid: 50000, multiplier: 5,
    finalBid: 250000, clicks: 3100, status: 'active', stripePaymentId: 'pi_demo8',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '9', title: 'NeuralWrite', description: 'AI content generation that sounds human',
    url: 'https://neuralwrite.ai', category: 'AI', baseBid: 120000, multiplier: 2,
    finalBid: 240000, clicks: 2800, status: 'active', stripePaymentId: 'pi_demo9',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '10', title: 'TokenSwap DeFi', description: 'Instant cross-chain token swaps',
    url: 'https://tokenswap.fi', category: 'Crypto', baseBid: 80000, multiplier: 2,
    finalBid: 160000, clicks: 1950, status: 'active', stripePaymentId: 'pi_demo10',
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '11', title: 'LinkForge SEO', description: 'Build high-authority backlinks at scale',
    url: 'https://linkforge.io', category: 'SEO', baseBid: 70000, multiplier: 2,
    finalBid: 140000, clicks: 1420, status: 'active', stripePaymentId: 'pi_demo11',
    createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000), updatedAt: new Date(),
  },
  {
    id: '12', title: 'CloudDeploy', description: 'One-click deployments for any framework',
    url: 'https://clouddeploy.dev', category: 'Dev Tools', baseBid: 50000, multiplier: 2,
    finalBid: 100000, clicks: 890, status: 'active', stripePaymentId: 'pi_demo12',
    createdAt: new Date(Date.now() - 168 * 60 * 60 * 1000), updatedAt: new Date(),
  },
];

export default function HomePage() {
  const [ads, setAds] = useState<Ad[]>(DEMO_ADS);
  const [category, setCategory] = useState<Category>('All');
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
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
          // Merge API ads (newest/user-created) at the top and eliminate duplicates
          const apiAds = data.ads as Ad[];
          const merged = [...apiAds, ...DEMO_ADS.filter(demo => !apiAds.some(api => api.title === demo.title))];
          setAds(merged);
        }
      }
    } catch {
      // Keep defaults
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchAds();
    // Refetch every 30 seconds for near-real-time updates
    const interval = setInterval(fetchAds, 30000);
    return () => clearInterval(interval);
  }, [fetchAds]);

  const filteredAds =
    category === 'All'
      ? ads
      : ads.filter((ad) => ad.category === category);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showSplash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {/* Logo with 1-second interval rotation */}
          <div className="animate-logo-spin" style={{ width: 260, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/logo-transparent.png"
              alt="AppBids Logo"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
      <Header onPlaceBid={() => setBidModalOpen(true)} />

      <main
        style={{
          flex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          padding: '0 24px',
        }}
      >
        {/* Leaderboard Hero Banner */}
        <div style={{ padding: '72px 0 16px 0' }}>
          <LeaderboardHero activeAdsCount={filteredAds.length} />
        </div>

        {/* Category Filter */}
        <CategoryFilter selected={category} onSelect={setCategory} />

        {/* Leaderboard */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            paddingBottom: 40,
          }}
        >
          {loading && filteredAds.length === 0 ? (
            // Skeleton loading
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 80,
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            ))
          ) : filteredAds.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>🏜️</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No ads in this category</div>
              <div style={{ fontSize: '0.85rem' }}>Be the first to place a bid!</div>
            </div>
          ) : (
            filteredAds.map((ad, index) => (
              <LeaderboardEntry key={ad.id} ad={ad} rank={index + 1} />
            ))
          )}
        </div>
      </main>

      {/* Ticker */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <RecentMultipliersTicker />
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
