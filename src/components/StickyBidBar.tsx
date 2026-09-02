'use client';

interface StickyBidBarProps {
  onBid: () => void;
  currentHighBid?: number; // in cents
  label?: string;
}

export default function StickyBidBar({ onBid, currentHighBid, label = 'Bid Now' }: StickyBidBarProps) {
  return (
    <div className="sticky-bid-bar" role="complementary" aria-label="Quick bid bar">
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>Current Top Bid</div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
          {currentHighBid != null
            ? `$${(currentHighBid / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            : '—'}
        </div>
      </div>
      <button
        className="btn-bid"
        onClick={onBid}
        id="sticky-bid-btn"
        style={{ flex: '0 0 auto', fontSize: '0.95rem', padding: '12px 28px' }}
      >
        ⚡ {label}
      </button>
    </div>
  );
}
