interface LocationHeaderProps {
  location: string;
  episode: number;
  onMenuToggle?: () => void;
}

const episodeNames: Record<number, string> = {
  1: 'Arnavutköy',
  2: 'Kadıköy',
  3: 'Büyükada',
};

export default function LocationHeader({ location, episode, onMenuToggle }: LocationHeaderProps) {
  return (
    <div
      className="mb-8 pb-4"
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className="text-xs uppercase tracking-widest"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--accent-gold-dim)',
            letterSpacing: '0.2em',
          }}
        >
          Episode {episode} — {episodeNames[episode] || 'The Bosphorus'}
        </span>

        <div className="flex items-center gap-3">
          <span
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-secondary)',
              opacity: 0.6,
              letterSpacing: '0.15em',
            }}
          >
            {location}
          </span>

          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
              aria-label="Open menu"
              title="Menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
