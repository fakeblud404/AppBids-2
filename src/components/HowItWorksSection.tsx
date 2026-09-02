'use client';

import Link from 'next/link';

const STEPS = [
  {
    number: 1,
    icon: '🔍',
    title: 'Browse Live Auctions',
    description:
      'Explore active auctions across categories — electronics, fashion, gadgets and more. Each auction shows the current bid, time left, and number of active bidders.',
    color: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.25)',
  },
  {
    number: 2,
    icon: '💳',
    title: 'Place Your Bid',
    description:
      'Choose your bid amount. Payment is securely processed by Stripe. Platform fee: 5%. Minimum bid: $1. Shipping is included for all winning bids.',
    color: 'rgba(245, 166, 35, 0.15)',
    border: 'rgba(245, 166, 35, 0.25)',
  },
  {
    number: 3,
    icon: '🎰',
    title: 'Spin the Plinko Multiplier',
    description:
      'Your bid passes through our provably fair Plinko game. Land a multiplier from 0.5× to 10× — higher multipliers mean higher ranking on the leaderboard.',
    color: 'rgba(168, 85, 247, 0.15)',
    border: 'rgba(168, 85, 247, 0.25)',
  },
  {
    number: 4,
    icon: '🏆',
    title: 'Win & Claim Your Prize',
    description:
      'The highest final bid at auction close wins. Winners are notified instantly and prizes are shipped within 3–5 business days. Track your order in real time.',
    color: 'rgba(34, 197, 94, 0.15)',
    border: 'rgba(34, 197, 94, 0.25)',
  },
];

interface HowItWorksSectionProps {
  compact?: boolean;
  onStartBidding?: () => void;
}

export default function HowItWorksSection({ compact = false, onStartBidding }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" style={{ padding: compact ? '48px 0' : '80px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="section-label">📘 How It Works</div>
        <h2 className="section-title">Four Simple Steps to Win</h2>
        <p className="section-sub">
          No experience needed. AppBids is designed to be fast, transparent, and fun —
          from first browse to prize delivery.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
          position: 'relative',
        }}
      >
        {STEPS.map((step) => (
          <div key={step.number} className="step-card fade-in-up">
            <div className="step-number">{step.number}</div>
            <div
              className="step-icon"
              style={{
                background: step.color,
                borderColor: step.border,
              }}
            >
              {step.icon}
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
              {step.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Transparent pricing */}
      <div
        style={{
          marginTop: 40,
          padding: '24px 28px',
          background: 'rgba(17,17,17,0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--radius-xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24,
        }}
      >
        {[
          { icon: '💰', label: 'Platform Fee', value: '5% of base bid' },
          { icon: '🚚', label: 'Shipping', value: 'Free for all winners' },
          { icon: '💳', label: 'Payment', value: 'UPI · Card · NetBanking' },
          { icon: '🔒', label: 'Security', value: 'Stripe-secured checkout' },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              {item.label}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {!compact && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          {onStartBidding ? (
            <button className="btn-bid" onClick={onStartBidding} style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
              🚀 Start Bidding Now
            </button>
          ) : (
            <Link href="/live-auctions">
              <button className="btn-bid" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
                🚀 Browse Live Auctions
              </button>
            </Link>
          )}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 12 }}>
            <Link href="/responsible-gaming" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>
              Responsible gaming policy
            </Link>{' '}
            ·{' '}
            <Link href="/faq" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>
              FAQ
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
