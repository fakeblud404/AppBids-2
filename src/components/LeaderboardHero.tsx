'use client';

import Link from 'next/link';

interface LeaderboardHeroProps {
  activeAdsCount: number;
  onStartBidding?: () => void;
}

export default function LeaderboardHero({ activeAdsCount, onStartBidding }: LeaderboardHeroProps) {
  return (
    <div className="hero-section" style={{ padding: '72px 0 56px', textAlign: 'center', position: 'relative' }}>
      {/* Background orbs */}
      <div
        className="hero-gradient-orb"
        style={{ width: 600, height: 400, background: 'rgba(59,130,246,0.25)', top: -100, left: '50%', transform: 'translateX(-50%)' }}
      />
      <div
        className="hero-gradient-orb"
        style={{ width: 300, height: 300, background: 'rgba(168,85,247,0.2)', top: 0, right: '10%' }}
      />

      {/* Live badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 14px',
          borderRadius: 9999,
          background: 'rgba(6, 78, 59, 0.5)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        <span
          className="live-pulse-dot"
          style={{
            display: 'inline-block',
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 6px 2px rgba(16, 185, 129, 0.6)',
          }}
        />
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#34d399', letterSpacing: '0.04em' }}>
          {activeAdsCount} Live Auctions Right Now
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          margin: '0 auto 20px',
          maxWidth: 820,
          background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #93c5fd 70%, #a5f3fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
        }}
      >
        Bid on real products in live auctions — fast, fair, and mobile-first
      </h1>

      {/* Subtext */}
      <p
        style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          maxWidth: 580,
          margin: '0 auto 36px',
          lineHeight: 1.65,
          position: 'relative',
        }}
      >
        Place a bid, spin the provably fair Plinko multiplier, and land the highest final bid to win.
        Winners get real products shipped to their door — no tricks, no hidden fees.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: 'flex',
          gap: 14,
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          marginBottom: 48,
        }}
      >
        {onStartBidding ? (
          <button
            className="btn-bid"
            onClick={onStartBidding}
            id="hero-start-bidding-btn"
            style={{ fontSize: '1.05rem', padding: '14px 36px' }}
          >
            🚀 Start Bidding
          </button>
        ) : (
          <Link href="/live-auctions">
            <button className="btn-bid" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
              🚀 Start Bidding
            </button>
          </Link>
        )}
        <Link href="/how-it-works">
          <button
            style={{
              fontSize: '1.05rem',
              padding: '14px 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              minHeight: 44,
            }}
          >
            📖 How It Works
          </button>
        </Link>
      </div>

      {/* Social proof stats */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 32,
          position: 'relative',
        }}
      >
        {[
          { value: '12,400+', label: 'Auctions Won' },
          { value: '$5M+', label: 'In Prizes Given Away' },
          { value: '97%', label: 'Avg Plinko RTP' },
          { value: '4.8★', label: 'User Rating' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 3 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
