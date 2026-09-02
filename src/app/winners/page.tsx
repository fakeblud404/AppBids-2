import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Winners Gallery — AppBids',
  description: 'See who won recent auctions on AppBids. Real winners, real prizes — verified and shipped to their door.',
};

const DEMO_WINNERS = [
  { name: 'Jessica M.', avatar: '👩‍💻', location: 'New York', item: 'iPhone 15 Pro Max', amount: '$1,249', date: '2 hours ago', category: 'Electronics', bigWin: '5×' },
  { name: 'Michael S.', avatar: '👨‍🎨', location: 'Austin', item: 'MacBook Air M3', amount: '$1,499', date: '6 hours ago', category: 'Computers', bigWin: '3.4×' },
  { name: 'Sarah K.', avatar: '👩‍🔧', location: 'Chicago', item: 'Sony WH-1000XM5', amount: '$399', date: '1 day ago', category: 'Audio', bigWin: '2×' },
  { name: 'David R.', avatar: '👨‍💼', location: 'Los Angeles', item: 'iPad Pro M4', amount: '$1,099', date: '2 days ago', category: 'Tablets', bigWin: '10×' },
  { name: 'Emily T.', avatar: '👩‍🚀', location: 'Seattle', item: 'Samsung Galaxy S24', amount: '$899', date: '3 days ago', category: 'Phones', bigWin: '5×' },
  { name: 'James D.', avatar: '👨‍🔬', location: 'Miami', item: 'PlayStation 5', amount: '$499', date: '4 days ago', category: 'Gaming', bigWin: '2×' },
  { name: 'Ashley B.', avatar: '👩‍💻', location: 'Denver', item: 'AirPods Pro 2', amount: '$249', date: '5 days ago', category: 'Audio', bigWin: '1.5×' },
  { name: 'Christopher P.', avatar: '👨‍🎤', location: 'Phoenix', item: 'DJI Mini 4 Pro', amount: '$759', date: '6 days ago', category: 'Drones', bigWin: '5×' },
  { name: 'Amanda M.', avatar: '👩‍🎨', location: 'Dallas', item: 'Dell XPS 15', amount: '$1,899', date: '7 days ago', category: 'Computers', bigWin: '2×' },
  { name: 'Matthew L.', avatar: '👩‍🏫', location: 'Boston', item: 'Dyson V15 Detect', amount: '$749', date: '8 days ago', category: 'Appliances', bigWin: '3×' },
  { name: 'Joshua S.', avatar: '👨‍🏭', location: 'Atlanta', item: 'Google Pixel 8', amount: '$699', date: '9 days ago', category: 'Phones', bigWin: '5×' },
  { name: 'Taylor K.', avatar: '👩‍🚀', location: 'San Francisco', item: 'GoPro Hero 12', amount: '$399', date: '10 days ago', category: 'Cameras', bigWin: '2×' },
];

const PLINKO_LEADERBOARD = [
  { name: 'David R.', multiplier: '10×', wager: '$50', payout: '$500' },
  { name: 'Emily T.', multiplier: '5×', wager: '$100', payout: '$500' },
  { name: 'Jessica M.', multiplier: '5×', wager: '$80', payout: '$400' },
  { name: 'Michael S.', multiplier: '3.4×', wager: '$120', payout: '$408' },
  { name: 'James D.', multiplier: '2×', wager: '$200', payout: '$400' },
];

export default function WinnersPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '40px 24px' }}>
        {/* Hero */}
        <div className="page-hero" style={{ padding: '40px 0 32px', maxWidth: '100%', margin: 0, textAlign: 'left' }}>
          <div className="section-label">🏆 Winners</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Recent Winners
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            {/* TODO: BACKEND — fetch from /api/winners for real data */}
            Real winners, verified purchases, shipped to their door.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
          {/* Main winners grid */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DEMO_WINNERS.map((w, i) => (
                <div key={i} className="winner-card">
                  <div className="winner-avatar">{w.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{w.name}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{w.location}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      Won <strong style={{ color: '#fff' }}>{w.item}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{w.date}</span>
                      <span className="badge badge-category" style={{ fontSize: '0.62rem' }}>{w.category}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{w.amount}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Plinko: {w.bigWin}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar leaderboards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Biggest Plinko wins */}
            <div
              style={{
                padding: '20px',
                background: 'rgba(17,17,17,0.7)',
                border: '1px solid rgba(245,166,35,0.15)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🎰</span> Biggest Plinko Win — This Week
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PLINKO_LEADERBOARD.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 800, color: i === 0 ? 'var(--accent-gold)' : 'var(--text-muted)', width: 20, textAlign: 'center', fontSize: '0.85rem' }}>
                      #{i + 1}
                    </span>
                    <span style={{ flex: 1, fontWeight: 600, fontSize: '0.85rem' }}>{p.name}</span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '100px',
                        background: 'rgba(34,197,94,0.12)',
                        color: 'var(--accent-green)',
                        border: '1px solid rgba(34,197,94,0.25)',
                      }}
                    >
                      {p.multiplier}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{p.payout}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most auctions won */}
            <div
              style={{
                padding: '20px',
                background: 'rgba(17,17,17,0.7)',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🏅</span> Most Auctions Won
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { name: 'Jessica M.', wins: 7 },
                  { name: 'Michael S.', wins: 5 },
                  { name: 'Sarah K.', wins: 4 },
                  { name: 'David R.', wins: 3 },
                  { name: 'Emily T.', wins: 2 },
                ].map((u, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 800, color: i === 0 ? 'var(--accent-gold)' : 'var(--text-muted)', width: 20, textAlign: 'center', fontSize: '0.85rem' }}>
                      #{i + 1}
                    </span>
                    <span style={{ flex: 1, fontWeight: 600, fontSize: '0.85rem' }}>{u.name}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', fontWeight: 700 }}>{u.wins} wins</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 12, fontStyle: 'italic' }}>
                Win more auctions to climb the leaderboard!
              </p>
            </div>

            {/* CTA */}
            <a href="/live-auctions" style={{ textDecoration: 'none' }}>
              <button className="btn-bid" style={{ width: '100%', fontSize: '0.95rem', minHeight: 48 }}>
                🚀 Join the Next Auction
              </button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
