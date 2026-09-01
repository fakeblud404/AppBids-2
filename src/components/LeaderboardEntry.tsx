'use client';

import { formatDistanceToNow } from 'date-fns';
import type { Ad } from '@/lib/types';

interface LeaderboardEntryProps {
  ad: Ad;
  rank: number;
}

export default function LeaderboardEntry({ ad, rank }: LeaderboardEntryProps) {
  const isFirst = rank === 1;
  const isTop3 = rank <= 3;

  const formattedBid = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(ad.finalBid / 100);

  const timeAgo = formatDistanceToNow(
    ad.createdAt instanceof Date ? ad.createdAt : new Date(ad.createdAt),
    { addSuffix: true }
  );

  const handleVisit = async () => {
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id }),
      });
    } catch {
      // silently fail
    }
    window.open(ad.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={isFirst ? 'gold-glow' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 20px',
        background: isFirst ? 'linear-gradient(90deg, rgba(245,166,35,0.12) 0%, rgba(17,17,17,0.65) 40%)' : 'rgba(17, 17, 17, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isFirst ? 'rgba(245,166,35,0.3)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: isFirst ? '0 8px 32px 0 rgba(245,166,35,0.12)' : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        animation: 'slideUp 0.4s ease',
        animationFillMode: 'backwards',
        animationDelay: `${rank * 50}ms`,
        borderLeft: isFirst ? '4px solid var(--accent-gold)' : undefined,
      }}
      onClick={handleVisit}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isFirst
          ? 'linear-gradient(90deg, rgba(245,166,35,0.18) 0%, rgba(26,26,26,0.8) 40%)'
          : 'rgba(26, 26, 26, 0.8)';
        e.currentTarget.style.borderColor = isFirst ? 'rgba(245,166,35,0.45)' : 'rgba(255, 255, 255, 0.18)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isFirst
          ? 'linear-gradient(90deg, rgba(245,166,35,0.12) 0%, rgba(17,17,17,0.65) 40%)'
          : 'rgba(17, 17, 17, 0.65)';
        e.currentTarget.style.borderColor = isFirst ? 'rgba(245,166,35,0.3)' : 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Rank */}
      <div
        style={{
          minWidth: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isFirst ? '1.1rem' : '0.95rem',
          fontWeight: 800,
          background: isFirst
            ? 'linear-gradient(135deg, var(--accent-gold), #e8930a)'
            : isTop3
            ? 'var(--bg-card-hover)'
            : 'transparent',
          color: isFirst ? '#000' : isTop3 ? 'var(--text-primary)' : 'var(--text-muted)',
          border: isFirst ? 'none' : isTop3 ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {isFirst ? '👑' : `#${rank}`}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span
            style={{
              fontSize: isFirst ? '1.15rem' : '1rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {ad.title}
          </span>
          <span className="badge badge-category">{ad.category}</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>{ad.description}</span>
          <span>•</span>
          <span>{ad.clicks.toLocaleString()} clicks</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* Bid Amount */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div
          style={{
            fontSize: isFirst ? '1.4rem' : '1.15rem',
            fontWeight: 800,
            color: isFirst ? 'var(--accent-gold)' : 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {formattedBid}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginTop: 2,
          }}
        >
          {ad.multiplier}× multiplier
        </div>
      </div>

      {/* Visit arrow */}
      <div
        style={{
          fontSize: '1.1rem',
          color: 'var(--text-muted)',
          transition: 'color 0.2s ease',
        }}
      >
        →
      </div>
    </div>
  );
}
