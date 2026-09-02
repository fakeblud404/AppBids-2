'use client';

const TESTIMONIALS = [
  {
    name: 'Jessica Miller',
    location: 'New York',
    avatar: '👩‍💻',
    stars: 5,
    quote:
      "I won an iPhone 15 Pro for $420 — couldn't believe it! The countdown was intense and the Plinko multiplier gave me a 3× boost. Delivery was in 3 days. Will be back for the MacBook auction!",
    item: 'Won iPhone 15 Pro',
    badge: '🏆 Verified Winner',
  },
  {
    name: 'Michael Smith',
    location: 'Austin',
    avatar: '👨‍🎨',
    stars: 5,
    quote:
      "Super transparent — you can see every bid live. I liked that the Plinko game is provably fair with a hash I could verify. Got a 5× multiplier and jumped to #1 with just $150.",
    item: 'Won Sony WH-1000XM5',
    badge: '✅ Verified Bidder',
  },
  {
    name: 'Sarah Johnson',
    location: 'Chicago',
    avatar: '👩‍🔧',
    stars: 5,
    quote:
      "Love the responsible gaming tools — I set a weekly limit and the app actually respects it. No tricks. Got outbid twice but won on the third try. The sticky Bid button on mobile is super convenient.",
    item: 'Won Dell XPS 15',
    badge: '🛡️ Responsible Bidder',
  },
];

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '64px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="section-label">⭐ Testimonials</div>
        <h2 className="section-title">What Winners Are Saying</h2>
        <p className="section-sub">
          Real stories from real winners. Join thousands of happy bidders across India.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testimonial-card">
            {/* Stars */}
            <div className="star-rating" style={{ fontSize: '1rem', marginBottom: 12 }}>
              {'★'.repeat(t.stars)}
            </div>

            {/* Quote */}
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: '0 0 20px',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(245, 166, 35, 0.12)',
                  border: '1px solid rgba(245, 166, 35, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.location}</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: '0.7rem',
                    padding: '3px 8px',
                    borderRadius: '100px',
                    background: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    color: 'var(--accent-green)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.badge}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{t.item}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust signals row */}
      <div
        style={{
          marginTop: 40,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 16,
          padding: '20px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {[
          { icon: '🔒', label: '256-bit SSL' },
          { icon: '✅', label: 'KYC Verified Users' },
          { icon: '🎯', label: 'Provably Fair' },
          { icon: '🚚', label: 'Free Shipping' },
          { icon: '🛡️', label: 'Responsible Gaming' },
          { icon: '💬', label: '24/7 Support' },
        ].map((trust) => (
          <div
            key={trust.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>{trust.icon}</span>
            <span>{trust.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
