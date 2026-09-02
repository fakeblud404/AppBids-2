'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 36,
            marginBottom: 36,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <img src="/logo-transparent.png" alt="AppBids" style={{ height: 28, objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 16px' }}>
              India&apos;s most transparent live auction platform. Bid fair, win big.
              Provably fair Plinko multipliers.
            </p>
            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="ssl-badge">🔒 SSL Secured</span>
              <span className="payment-icon">💳 Stripe</span>
              <span className="payment-icon">📱 UPI</span>
              <span className="payment-icon">🏦 NetBanking</span>
            </div>
          </div>

          {/* Auctions */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>
              Auctions
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/live-auctions" className="footer-link">Live Auctions</Link>
              <Link href="/winners" className="footer-link">Recent Winners</Link>
              <Link href="/how-it-works" className="footer-link">How It Works</Link>
              <Link href="/plinko" className="footer-link">Plinko Game</Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>
              Support
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/faq" className="footer-link">FAQ</Link>
              <Link href="/support" className="footer-link">Contact Support</Link>
              <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@appbids.in'}`} className="footer-link">
                support@appbids.in
              </a>
            </nav>
          </div>

          {/* Responsible Gaming */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>
              Responsible Gaming
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/responsible-gaming" className="footer-link">Set Your Limits</Link>
              <Link href="/responsible-gaming#self-exclusion" className="footer-link">Self-Exclusion</Link>
              <a
                href="tel:9152987821"
                className="footer-link"
                style={{ color: 'var(--accent-amber)' }}
              >
                📞 iCall Helpline: 9152987821
              </a>
              <a
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                BeGambleAware ↗
              </a>
            </nav>
          </div>
        </div>

        {/* Responsible gaming disclaimer */}
        <div
          style={{
            padding: '14px 18px',
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.15)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 24,
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
        >
          ⚠️ <strong style={{ color: 'var(--accent-amber)' }}>18+ Only.</strong> AppBids involves real-money
          bidding. Please bid responsibly. Set limits before you start. If you feel your bidding is a problem,
          call iCall at <strong>9152987821</strong> or visit{' '}
          <a
            href="https://www.begambleaware.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-amber)', textDecoration: 'underline' }}
          >
            BeGambleAware.org
          </a>
          .
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            paddingTop: 20,
            borderTop: '1px solid var(--border)',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
            © {year} AppBids. All rights reserved.
          </p>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <Link href="/terms" className="footer-link">Terms of Service</Link>
            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/responsible-gaming" className="footer-link">Responsible Gaming</Link>
            <Link href="/faq" className="footer-link">FAQ</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
