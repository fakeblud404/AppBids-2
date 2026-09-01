'use client';

import { useState } from 'react';

interface HeaderProps {
  onPlaceBid: () => void;
}

export default function Header({ onPlaceBid }: HeaderProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 16,
        zIndex: 50,
        maxWidth: 1200,
        margin: '0 auto',
        width: 'calc(100% - 32px)',
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}
    >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/logo-transparent.png"
            alt="AppBids Logo"
            style={{
              height: 36,
              objectFit: 'contain',
            }}
          />
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              background: 'var(--accent-gold-dim)',
              padding: '2px 8px',
              borderRadius: 100,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            LIVE
          </span>
        </div>

        {/* CTA */}
        <button
          className="btn-primary"
          onClick={onPlaceBid}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: hovering ? 'translateY(-1px)' : 'none',
          }}
        >
          Place a Bid
        </button>
    </header>
  );
}
