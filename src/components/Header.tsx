'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onPlaceBid?: () => void;
}

const NAV_LINKS = [
  { href: '/live-auctions', label: 'Live Auctions' },
  { href: '/app-predictions', label: '📈 Bet on Apps' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/plinko', label: '🎰 Plinko' },
  { href: '/winners', label: 'Winners' },
];

export default function Header({ onPlaceBid }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img
          src="/logo-transparent.png"
          alt="AppBids Logo"
          style={{ height: 34, objectFit: 'contain' }}
        />
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            color: 'var(--accent-gold)',
            background: 'var(--accent-gold-dim)',
            padding: '2px 8px',
            borderRadius: 100,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          LIVE
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hide-mobile">
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* How It Works — sticky header button */}
        <Link
          href="/how-it-works#how-it-works"
          style={{
            display: 'none',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          className="show-md"
        >
          How It Works
        </Link>

        {onPlaceBid ? (
          <button
            className="btn-bid"
            onClick={onPlaceBid}
            id="header-bid-btn"
            style={{ fontSize: '0.88rem', padding: '9px 20px', minHeight: 38 }}
          >
            Place a Bid
          </button>
        ) : (
          <Link href="/live-auctions">
            <button
              className="btn-bid"
              id="header-bid-btn"
              style={{ fontSize: '0.88rem', padding: '9px 20px', minHeight: 38 }}
            >
              Place a Bid
            </button>
          </Link>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 6,
            display: 'none',
            flexDirection: 'column',
            gap: 5,
          }}
          className="show-mobile-flex"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                transition: 'all 0.25s',
                transform:
                  menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                  menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' :
                  menuOpen && i === 1 ? 'scaleX(0)' : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav
          className="animate-slide-down"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'rgba(10, 15, 30, 0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-xl)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ padding: '12px 16px', display: 'block' }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <Link href="/responsible-gaming" className="nav-link" onClick={() => setMenuOpen(false)} style={{ padding: '12px 16px' }}>
            🛡️ Responsible Gaming
          </Link>
          <Link href="/faq" className="nav-link" onClick={() => setMenuOpen(false)} style={{ padding: '12px 16px' }}>
            ❓ FAQ
          </Link>
        </nav>
      )}
    </header>
  );
}
