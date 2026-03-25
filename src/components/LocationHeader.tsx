import { useState, useEffect } from 'react';
import { isAudioEnabled, setAudioEnabled, setAmbience } from '../engine/audioManager';

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
  const [audioOn, setAudioOn] = useState(isAudioEnabled());

  // Update ambience when location changes
  useEffect(() => {
    if (audioOn) {
      setAmbience(location);
    }
  }, [location, audioOn]);

  const toggleAudio = () => {
    const next = !audioOn;
    setAudioOn(next);
    setAudioEnabled(next);
    if (next) {
      setAmbience(location);
    }
  };

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

          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className="audio-toggle p-2"
            style={{
              color: audioOn ? 'var(--accent-gold-dim)' : 'var(--text-secondary)',
              opacity: audioOn ? 1 : 0.4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={audioOn ? 'Mute ambient sound' : 'Enable ambient sound'}
            title={audioOn ? 'Sound on' : 'Sound off'}
          >
            {audioOn ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

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
