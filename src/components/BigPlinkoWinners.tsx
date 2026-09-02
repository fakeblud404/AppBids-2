'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface PlinkoWinnerItem {
  id: string;
  name: string;
  amount: number; // in USD dollars
  multiplier?: string;
}

const INITIAL_WINNERS: PlinkoWinnerItem[] = [
  { id: '1', name: 'Jessica', amount: 4250, multiplier: '10×' },
  { id: '2', name: 'Michael', amount: 12800, multiplier: '10×' },
  { id: '3', name: 'Sarah', amount: 3100, multiplier: '5×' },
  { id: '4', name: 'David', amount: 8500, multiplier: '10×' },
  { id: '5', name: 'Emily', amount: 6200, multiplier: '5×' },
  { id: '6', name: 'James', amount: 15400, multiplier: '10×' },
  { id: '7', name: 'Ashley', amount: 2900, multiplier: '5×' },
  { id: '8', name: 'Christopher', amount: 9600, multiplier: '10×' },
  { id: '9', name: 'Amanda', amount: 5100, multiplier: '5×' },
  { id: '10', name: 'Matthew', amount: 11200, multiplier: '10×' },
];

const AMERICAN_NAMES = [
  'Jessica', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Ashley', 
  'Christopher', 'Amanda', 'Matthew', 'Joshua', 'Taylor', 'Brandon', 
  'Megan', 'Daniel', 'Lauren', 'Justin', 'Rachel', 'Andrew', 'Hannah'
];

export default function BigPlinkoWinners() {
  const [winners, setWinners] = useState<PlinkoWinnerItem[]>(INITIAL_WINNERS);

  // Periodically inject new random dummy wins
  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = AMERICAN_NAMES[Math.floor(Math.random() * AMERICAN_NAMES.length)];
      const randomAmount = Math.floor(Math.random() * 170 + 15) * 100 + (Math.random() > 0.5 ? 50 : 0);
      const mults = ['5×', '10×'];
      const randomMult = mults[Math.floor(Math.random() * mults.length)];

      const newWin: PlinkoWinnerItem = {
        id: Date.now().toString(),
        name: randomName,
        amount: randomAmount,
        multiplier: randomMult,
      };

      setWinners((prev) => [newWin, ...prev.slice(0, 14)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate items for continuous smooth marquee loop
  const marqueeItems = [...winners, ...winners];

  return (
    <section 
      style={{
        margin: '16px 0 28px',
        padding: '14px 20px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 46, 22, 0.45) 50%, rgba(15, 23, 42, 0.6) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Big Plinko Winners"
    >
      {/* Glow orb */}
      <div 
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          background: 'rgba(34, 197, 94, 0.25)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.3rem' }} className="trophy-glimmer">
            💰
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2
              style={{
                margin: 0,
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Big Plinko Winners
            </h2>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#34d399',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                padding: '2px 8px',
                borderRadius: '100px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span className="live-pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} />
              Live Drops
            </span>
          </div>
        </div>

        <Link
          href="/winners"
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#34d399',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 0.2s ease',
          }}
          className="hover:underline"
        >
          See all big winners &rarr;
        </Link>
      </div>

      {/* Continuous Marquee Scrolling Ticker Container */}
      <div 
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
          padding: '4px 0',
        }}
      >
        <div className="ticker-content" style={{ display: 'inline-block', animationDuration: '35s' }}>
          {marqueeItems.map((w, i) => (
            <div
              key={`${w.id}-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginRight: 36,
                padding: '6px 14px',
                background: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.85rem',
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>🏆</span>
              <span style={{ fontWeight: 700, color: '#ffffff' }}>{w.name}</span>
              <span style={{ color: '#94a3b8' }}>won</span>
              <span style={{ fontWeight: 800, color: '#34d399' }}>
                ${w.amount.toLocaleString('en-US')}
              </span>
              <span style={{ color: '#94a3b8' }}>on Plinko</span>
              {w.multiplier && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#f59e0b',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    marginLeft: 2,
                  }}
                >
                  {w.multiplier}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
