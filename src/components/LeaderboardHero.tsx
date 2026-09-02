'use client';

interface LeaderboardHeroProps {
  activeAdsCount: number;
}

export default function LeaderboardHero({ activeAdsCount }: LeaderboardHeroProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '56rem',
        margin: '0 auto',
        borderRadius: '1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px -10px rgba(245, 158, 11, 0.15)',
        padding: '24px 32px',
      }}
    >
      {/* Top-right Live badge */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          borderRadius: 9999,
          background: 'rgba(6, 78, 59, 0.55)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          backdropFilter: 'blur(8px)',
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
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 500,
            color: '#34d399',
            letterSpacing: '0.04em',
          }}
        >
          Live
        </span>
      </div>

      {/* Main content row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Trophy icon badge */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'rgba(245, 158, 11, 0.10)',
            border: '1px solid rgba(245, 158, 11, 0.20)',
            fontSize: '1.75rem',
            filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.45))',
          }}
        >
          <span className="trophy-glimmer">🏆</span>
        </div>

        {/* Text stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1
            style={{
              margin: 0,
              fontSize: '1.65rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              background: 'linear-gradient(180deg, #ffffff 30%, #fde68a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            App Leaderboards
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '0.85rem',
              fontWeight: 400,
              color: '#94a3b8',
              letterSpacing: '0.01em',
            }}
          >
            {activeAdsCount} active ads&nbsp;&bull;&nbsp;Highest bids rank first
          </p>
        </div>
      </div>
    </div>
  );
}
