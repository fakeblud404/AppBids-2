'use client';

import { CATEGORIES, type Category } from '@/lib/types';

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        overflowX: 'auto',
        padding: '16px 0',
        scrollbarWidth: 'none',
      }}
    >
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 100,
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border)',
              background: isActive ? 'var(--accent-blue-dim)' : 'transparent',
              color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
