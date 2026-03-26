import { useState } from 'react';
import { hasSave, hasCompletedGame, getSavePreview } from '../engine/stateManager';

interface MainMenuProps {
  onNewGame: () => void;
  onContinue: () => void;
  onJournal: () => void;
  onChapterSelect?: (episode: 1 | 2 | 3) => void;
}

export default function MainMenu({ onNewGame, onContinue, onJournal, onChapterSelect }: MainMenuProps) {
  const savedExists = hasSave();
  const hasCompleted = hasCompletedGame();
  const savePreview = savedExists ? getSavePreview() : null;
  const episodeNames: Record<number, string> = { 1: 'Arnavutköy', 2: 'Kadıköy', 3: 'Büyükada' };
  const [showChapters, setShowChapters] = useState(false);

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
              {savePreview && (
                <span
                  className="block mt-1 normal-case"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.05em',
                    color: 'var(--accent-gold-dim)',
                    opacity: 0.7,
                  }}
                >
                  Episode {savePreview.episode} — {episodeNames[savePreview.episode] || 'Istanbul'} · {savePreview.scenesVisited} scenes
                </span>
              )}
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

          {hasCompleted && onChapterSelect && !showChapters && (
            <button
              onClick={() => setShowChapters(true)}
              className="w-64 px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300 text-center"
              style={secondaryButtonStyle}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              Chapter Select
            </button>
          )}

          {showChapters && onChapterSelect && (
            <div className="flex flex-col items-center gap-2 mt-2">
              <p
                className="text-xs mb-1"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'var(--text-secondary)',
                }}
              >
                Begin from:
              </p>
              {([
                [1, 'Episode 1 — Arnavutköy'],
                [2, 'Episode 2 — Kadıköy'],
                [3, 'Episode 3 — Büyükada'],
              ] as const).map(([ep, label]) => (
                <button
                  key={ep}
                  onClick={() => onChapterSelect(ep)}
                  className="w-64 px-8 py-2 text-xs uppercase tracking-widest border transition-all duration-300 text-center"
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    backgroundColor: 'transparent',
                    borderColor: 'var(--accent-gold-dim)',
                    color: 'var(--accent-gold-dim)',
                    letterSpacing: '0.1em',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
                    e.currentTarget.style.color = 'var(--accent-gold-dim)';
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => setShowChapters(false)}
                className="text-xs mt-1 transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
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
