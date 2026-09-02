'use client';

import { useState, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import CountdownTimer from './CountdownTimer';
import type { Ad, AuctionStatus } from '@/lib/types';

interface LeaderboardEntryProps {
  ad: Ad;
  rank: number;
  onBid?: () => void;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  AI: '🤖', SEO: '📈', Crypto: '₿', SaaS: '⚙️',
  Marketing: '📣', 'Dev Tools': '💻', Finance: '💹',
  'E-Commerce': '🛍️', Other: '🔮',
};

function getAuctionStatus(ad: Ad): AuctionStatus {
  if (ad.auctionStatus) return ad.auctionStatus;
  if (!ad.endsAt) return 'live';
  const diff = ad.endsAt.getTime() - Date.now();
  if (diff <= 0) return 'closed';
  if (diff <= 600_000) return 'ending-soon';
  return 'live';
}

export default function LeaderboardEntry({ ad, rank, onBid }: LeaderboardEntryProps) {
  const [hover, setHover] = useState(false);
  const isGold = rank === 1;
  const status = getAuctionStatus(ad);
  const isClosed = status === 'closed';

  const statusLabel = status === 'live' ? 'LIVE' : status === 'ending-soon' ? 'ENDING SOON' : 'CLOSED';
  const statusBadgeClass = status === 'live' ? 'badge-live' : status === 'ending-soon' ? 'badge-ending' : 'badge-closed';

  const handleBid = useCallback(() => {
    if (onBid) onBid();
  }, [onBid]);

  const handleVisit = useCallback(async () => {
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id }),
      });
    } catch { /* silent */ }
    window.open(ad.url, '_blank', 'noopener,noreferrer');
  }, [ad.id, ad.url]);

  const finalBidDisplay = `$${(ad.finalBid / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 18px',
        borderRadius: 'var(--radius-lg)',
        background: hover ? 'rgba(26,26,26,0.85)' : 'rgba(17,17,17,0.75)',
        border: isGold
          ? '1px solid rgba(245,166,35,0.35)'
          : status === 'ending-soon'
          ? '1px solid rgba(239,68,68,0.2)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: isGold
          ? '0 0 30px rgba(245,166,35,0.12), 0 0 60px rgba(245,166,35,0.05)'
          : hover
          ? '0 8px 24px rgba(0,0,0,0.3)'
          : 'none',
        borderLeft: isGold ? '4px solid var(--accent-gold)' : undefined,
        transition: 'all 0.2s ease',
        opacity: isClosed ? 0.65 : 1,
        backdropFilter: 'blur(10px)',
        cursor: 'default',
        flexWrap: 'wrap',
      }}
      role="listitem"
    >
      {/* Rank */}
      <div
        style={{
          width: 36,
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        {isGold ? (
          <span style={{ fontSize: '1.4rem' }} className="trophy-glimmer">👑</span>
        ) : (
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 800,
              color: rank <= 3 ? 'var(--accent-gold)' : 'var(--text-muted)',
            }}
          >
            #{rank}
          </span>
        )}
      </div>

      {/* Product icon / image */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          background: isGold ? 'rgba(245,166,35,0.1)' : 'rgba(59,130,246,0.08)',
          border: `1px solid ${isGold ? 'rgba(245,166,35,0.2)' : 'rgba(255,255,255,0.08)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          flexShrink: 0,
        }}
      >
        {ad.productImage || CATEGORY_EMOJIS[ad.category] || '📦'}
      </div>

      {/* Title + Meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: '0.95rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '200px',
            }}
          >
            {ad.title}
          </span>
          <span className={`badge ${statusBadgeClass}`} style={{ fontSize: '0.6rem', padding: '2px 7px' }}>
            {statusLabel}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
          }}
        >
          <span className="badge badge-category" style={{ fontSize: '0.65rem' }}>{ad.category}</span>
          <span>👁 {ad.clicks.toLocaleString()} clicks</span>
          <span>{formatDistanceToNow(new Date(ad.createdAt), { addSuffix: true })}</span>
          {ad.bidderCount != null && (
            <span>👥 {ad.bidderCount} bidders</span>
          )}
        </div>
      </div>

      {/* Bid info + Countdown */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div
          style={{
            fontSize: isGold ? '1.2rem' : '1rem',
            fontWeight: 800,
            color: isGold ? 'var(--accent-gold)' : 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {finalBidDisplay}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>
          {ad.multiplier}× multiplier
        </div>
        {ad.endsAt && (
          <CountdownTimer endsAt={new Date(ad.endsAt)} compact />
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        {!isClosed && (
          <button
            className="btn-bid"
            onClick={handleBid}
            id={`bid-btn-${ad.id}`}
            style={{ fontSize: '0.85rem', padding: '10px 18px', minHeight: 44 }}
            aria-label={`Bid on ${ad.title}`}
          >
            ⚡ Bid
          </button>
        )}
        <button
          onClick={handleVisit}
          style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.82rem',
            transition: 'all 0.2s',
            minHeight: 44,
          }}
          aria-label={`Visit ${ad.title}`}
        >
          Visit ↗
        </button>
      </div>
    </div>
  );
}
