import { hasSave } from '../engine/stateManager';

interface MainMenuProps {
  onNewGame: () => void;
  onContinue: () => void;
  onJournal: () => void;
}

export default function MainMenu({ onNewGame, onContinue, onJournal }: MainMenuProps) {
  const savedExists = hasSave();

  const secondaryButtonStyle = {
    fontFamily: "'Inter', sans-serif" as const,
    backgroundColor: 'transparent',
    borderColor: 'var(--border-subtle)',
    color: 'var(--text-secondary)',
    letterSpacing: '0.15em',
    borderRadius: '2px',
  };

  const hoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
    e.currentTarget.style.color = 'var(--text-primary)';
  };

  const hoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'var(--border-subtle)';
    e.currentTarget.style.color = 'var(--text-secondary)';
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-lg px-6">
        {/* Title */}
        <p
          className="text-xs mb-4 tracking-widest"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--accent-gold-dim)',
            letterSpacing: '0.3em',
            fontVariant: 'small-caps',
          }}
        >
          An Istanbul Mystery{' '}
          <span
            style={{
              fontVariant: 'small-caps',
              textTransform: 'none',
              letterSpacing: '0.15em',
            }}
          >
            by Hulki Okan Tabak
          </span>
        </p>

        <h1
          className="text-5xl md:text-6xl font-bold mb-3"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            color: 'var(--text-primary)',
          }}
        >
          Bosphorus Ferry
        </h1>

        <div
          className="w-16 h-px mx-auto mb-6"
          style={{ backgroundColor: 'var(--accent-gold-dim)' }}
        />

        <p
          className="text-base italic mb-12"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
          }}
        >
          Your sister didn't drown.
        </p>

        {/* Menu buttons */}
        <div className="space-y-4 flex flex-col items-center">
          {savedExists && (
            <button
              onClick={onContinue}
              className="w-64 px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300 text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: 'transparent',
                borderColor: 'var(--accent-gold-dim)',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Continue
            </button>
          )}

          <button
            onClick={onNewGame}
            className="w-64 px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300 text-center"
            style={secondaryButtonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            New Game
          </button>

          {savedExists && (
            <button
              onClick={onJournal}
              className="w-64 px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300 text-center"
              style={secondaryButtonStyle}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              Story Journal
            </button>
          )}
        </div>

        {/* Footer */}
        <p
          className="mt-16 text-xs"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--text-secondary)',
            opacity: 0.4,
          }}
        >
          A choice-driven text adventure
        </p>
      </div>
    </div>
  );
}
