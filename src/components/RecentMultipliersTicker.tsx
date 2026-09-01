'use client';

import { useEffect, useState } from 'react';

interface MultiplierEvent {
  title: string;
  multiplier: number;
  baseBid: number;
}

export default function RecentMultipliersTicker() {
  const [events, setEvents] = useState<MultiplierEvent[]>([
    { title: 'Acme AI Tools', multiplier: 5.2, baseBid: 10000 },
    { title: 'SEO Wizard Pro', multiplier: 2.0, baseBid: 5000 },
    { title: 'CryptoTrack', multiplier: 1.5, baseBid: 8000 },
    { title: 'LaunchPad SaaS', multiplier: 10, baseBid: 2000 },
    { title: 'MarketBot', multiplier: 0.8, baseBid: 15000 },
    { title: 'DevStack Cloud', multiplier: 3.4, baseBid: 7500 },
    { title: 'FinVault', multiplier: 1.0, baseBid: 12000 },
    { title: 'ShopEngine', multiplier: 5.0, baseBid: 3000 },
  ]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const getMultiplierColor = (m: number) => {
    if (m >= 5) return '#22c55e';
    if (m >= 2) return 'var(--accent-gold)';
    if (m >= 1) return 'var(--text-secondary)';
    return 'var(--accent-red)';
  };

  const getEmoji = (m: number) => {
    if (m >= 10) return '🔥';
    if (m >= 5) return '🎰';
    if (m >= 2) return '⚡';
    if (m >= 1) return '✨';
    return '💀';
  };

  const tickerItems = [...events, ...events]; // duplicate for seamless loop

  return (
    <div className="ticker-container" style={{ padding: '10px 0' }}>
      <div className="ticker-content">
        {tickerItems.map((evt, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginRight: 48,
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span>{getEmoji(evt.multiplier)}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{evt.title}</span>
            <span>got</span>
            <span style={{ fontWeight: 700, color: getMultiplierColor(evt.multiplier) }}>
              {evt.multiplier}×
            </span>
            <span>on</span>
            <span style={{ fontWeight: 600 }}>
              ${(evt.baseBid / 100).toLocaleString()}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
