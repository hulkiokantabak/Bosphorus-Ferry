import { useState } from 'react';

interface PauseMenuProps {
  onResume: () => void;
  onSave: () => void;
  onJournal: () => void;
  onExit: () => void;
}

export default function PauseMenu({ onResume, onSave, onJournal, onExit }: PauseMenuProps) {
  const [saved, setSaved] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const buttonStyle = {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: 'transparent',
    borderColor: 'var(--border-subtle)',
    color: 'var(--text-secondary)',
    letterSpacing: '0.15em',
    borderRadius: '2px',
  };

  const hoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
    e.currentTarget.style.color = 'var(--text-primary)';
    e.currentTarget.style.backgroundColor = 'rgba(201, 168, 76, 0.05)';
  };

  const hoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'var(--border-subtle)';
    e.currentTarget.style.color = 'var(--text-secondary)';
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center fade-in"
      style={{ backgroundColor: 'rgba(10, 14, 23, 0.9)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onResume();
      }}
    >
      <div className="text-center px-6 w-full max-w-sm">
        <h2
          className="text-xs uppercase tracking-widest mb-10"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--accent-gold-dim)',
            letterSpacing: '0.25em',
          }}
        >
          Paused
        </h2>

        <div className="space-y-3">
          {/* Resume */}
          <button
            onClick={onResume}
            className="block w-full px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={{
              ...buttonStyle,
              borderColor: 'var(--accent-gold-dim)',
              color: 'var(--accent-gold)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Resume
          </button>

          {/* Save Game */}
          <button
            onClick={handleSave}
            className="block w-full px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={buttonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            {saved ? 'Saved!' : 'Save Game'}
          </button>

          {/* Story Journal */}
          <button
            onClick={onJournal}
            className="block w-full px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={buttonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Story Journal
          </button>

          {/* Exit to Menu */}
          {!confirmExit ? (
            <button
              onClick={() => setConfirmExit(true)}
              className="block w-full px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
              style={buttonStyle}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              Exit to Menu
            </button>
          ) : (
            <div className="fade-in">
              <p
                className="text-xs mb-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'var(--text-secondary)',
                }}
              >
                Progress is auto-saved. Exit?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onExit}
                  className="flex-1 px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300"
                  style={{
                    ...buttonStyle,
                    borderColor: 'var(--accent-gold-dim)',
                    color: 'var(--accent-gold)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Yes, Exit
                </button>
                <button
                  onClick={() => setConfirmExit(false)}
                  className="flex-1 px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300"
                  style={buttonStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
