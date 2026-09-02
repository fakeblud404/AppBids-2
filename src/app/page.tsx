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
    id: '1', title: 'iPhone 15 Pro Max', description: 'Apple iPhone 15 Pro Max 256GB — Sealed box with warranty',
    url: 'https://apple.com', category: 'AI', baseBid: 500000, multiplier: 3.4,
    finalBid: 1700000, clicks: 43586, status: 'active', stripePaymentId: 'pi_demo1',
    createdAt: new Date(now - 18 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 2 * 60 * 60 * 1000 + 14 * 60 * 1000), bidderCount: 38, productImage: '📱',
  },
  {
    id: '2', title: 'MacBook Air M3', description: 'Apple MacBook Air M3 15" 16GB RAM 512GB SSD',
    url: 'https://apple.com', category: 'Dev Tools', baseBid: 250000, multiplier: 5,
    finalBid: 1250000, clicks: 28441, status: 'active', stripePaymentId: 'pi_demo2',
    createdAt: new Date(now - 2 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 5 * 60 * 1000), bidderCount: 67, productImage: '💻', auctionStatus: 'ending-soon',
  },
  {
    id: '3', title: 'Sony WH-1000XM5', description: 'Industry-leading noise cancellation headphones',
    url: 'https://sony.com', category: 'Other', baseBid: 410000, multiplier: 2,
    finalBid: 820000, clicks: 15220, status: 'active', stripePaymentId: 'pi_demo3',
    createdAt: new Date(now - 5 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 8 * 60 * 60 * 1000), bidderCount: 21, productImage: '🎧',
  },
  {
    id: '4', title: 'PlayStation 5 Disc Edition', description: 'Sony PS5 with DualSense controller',
    url: 'https://playstation.com', category: 'Other', baseBid: 150000, multiplier: 5,
    finalBid: 750000, clicks: 12800, status: 'active', stripePaymentId: 'pi_demo4',
    createdAt: new Date(now - 8 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 12 * 60 * 60 * 1000), bidderCount: 44, productImage: '🎮',
  },
  {
    id: '5', title: 'Samsung Galaxy S24 Ultra', description: 'Samsung Galaxy S24 Ultra 512GB — Titanium Black',
    url: 'https://samsung.com', category: 'AI', baseBid: 300000, multiplier: 2,
    finalBid: 600000, clicks: 9820, status: 'active', stripePaymentId: 'pi_demo5',
    createdAt: new Date(now - 12 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 3 * 24 * 60 * 60 * 1000), bidderCount: 15, productImage: '📲',
  },
  {
    id: '6', title: 'Dell XPS 15 (2024)', description: 'Intel Core i9, RTX 4060, 32GB RAM, 1TB SSD',
    url: 'https://dell.com', category: 'Dev Tools', baseBid: 200000, multiplier: 2,
    finalBid: 400000, clicks: 7640, status: 'active', stripePaymentId: 'pi_demo6',
    createdAt: new Date(now - 24 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 18 * 60 * 60 * 1000), bidderCount: 9, productImage: '🖥️',
  },
  {
    id: '7', title: 'DJI Mini 4 Pro Drone', description: '4K/60fps, 34min flight time, obstacle avoidance',
    url: 'https://dji.com', category: 'Other', baseBid: 100000, multiplier: 3.4,
    finalBid: 340000, clicks: 5200, status: 'active', stripePaymentId: 'pi_demo7',
    createdAt: new Date(now - 36 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 7 * 60 * 60 * 1000), bidderCount: 12, productImage: '🚁',
  },
  {
    id: '8', title: 'iPad Pro M4 13"', description: 'Apple iPad Pro 13" M4 256GB WiFi — Space Black',
    url: 'https://apple.com', category: 'AI', baseBid: 50000, multiplier: 5,
    finalBid: 250000, clicks: 3100, status: 'active', stripePaymentId: 'pi_demo8',
    createdAt: new Date(now - 48 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 1 * 24 * 60 * 60 * 1000), bidderCount: 7, productImage: '📱',
  },
  {
    id: '9', title: 'Dyson V15 Detect', description: 'Laser dust detection, 60-min runtime cordless vacuum',
    url: 'https://dyson.com', category: 'Other', baseBid: 120000, multiplier: 2,
    finalBid: 240000, clicks: 2800, status: 'active', stripePaymentId: 'pi_demo9',
    createdAt: new Date(now - 72 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 4 * 60 * 60 * 1000), bidderCount: 5, productImage: '🌀',
  },
  {
    id: '10', title: 'AirPods Pro 2 (USB-C)', description: 'Active noise cancellation, Adaptive Audio, H2 chip',
    url: 'https://apple.com', category: 'Other', baseBid: 80000, multiplier: 2,
    finalBid: 160000, clicks: 1950, status: 'active', stripePaymentId: 'pi_demo10',
    createdAt: new Date(now - 96 * 60 * 60 * 1000), updatedAt: new Date(),
    endsAt: new Date(now + 0), bidderCount: 3, productImage: '🎵', auctionStatus: 'closed',
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
