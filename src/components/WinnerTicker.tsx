'use client';

// Demo winner data — TODO: BACKEND — replace with /api/winners fetch
const DEMO_WINNERS = [
  { name: 'Jessica M.', item: 'iPhone 15 Pro Max', amount: '$1,249', emoji: '🏆' },
  { name: 'Michael S.', item: 'MacBook Air M3', amount: '$1,499', emoji: '🎉' },
  { name: 'Sarah K.', item: 'Sony WH-1000XM5', amount: '$399', emoji: '🎊' },
  { name: 'David R.', item: 'iPad Pro 12.9"', amount: '$1,099', emoji: '⭐' },
  { name: 'Emily T.', item: 'Samsung Galaxy S24', amount: '$899', emoji: '🔥' },
  { name: 'James D.', item: 'Google Pixel 8', amount: '$699', emoji: '💎' },
  { name: 'Ashley B.', item: 'AirPods Pro 2', amount: '$249', emoji: '🥇' },
  { name: 'Christopher P.', item: 'PlayStation 5', amount: '$499', emoji: '🎮' },
  { name: 'Amanda M.', item: 'Dell XPS 15', amount: '$1,899', emoji: '🖥️' },
  { name: 'Matthew L.', item: 'Dyson V15 Detect', amount: '$749', emoji: '✨' },
];

export default function WinnerTicker() {
  // Duplicate list for seamless infinite scroll
  const items = [...DEMO_WINNERS, ...DEMO_WINNERS];

  return (
    <div className="winner-ticker-wrap" role="marquee" aria-label="Recent winners">
      <div className="winner-ticker-inner">
        {items.map((w, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginRight: 48,
              fontSize: '0.82rem',
              color: '#d1fae5',
            }}
          >
            <span>{w.emoji}</span>
            <span style={{ fontWeight: 600, color: '#6ee7b7' }}>{w.name}</span>
            <span style={{ color: '#a7f3d0' }}>just won</span>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>{w.item}</span>
            <span
              style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '100px',
                padding: '1px 8px',
                fontWeight: 700,
                color: '#34d399',
              }}
            >
              {w.amount}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
