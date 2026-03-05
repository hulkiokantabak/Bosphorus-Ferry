import { useState, useEffect, useCallback } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'dark' | 'creator' | 'title' | 'tagline' | 'fade'>('dark');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('creator'), 600),
      setTimeout(() => setPhase('title'), 2400),
      setTimeout(() => setPhase('tagline'), 4200),
      setTimeout(() => setPhase('fade'), 6500),
      setTimeout(() => onComplete(), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const skip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center z-50 cursor-pointer select-none"
      style={{
        backgroundColor: 'var(--bg-primary)',
        transition: 'opacity 1s ease-in-out',
        opacity: phase === 'fade' ? 0 : 1,
      }}
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') skip();
      }}
      tabIndex={0}
      role="button"
      aria-label="Click to skip intro"
    >
      <div className="flex-1 flex items-center">
      <div className="text-center px-6">

        {/* Creator credit — stays visible once shown */}
        {phase !== 'dark' && (
          <p
            className="slow-fade text-xs uppercase tracking-widest mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--accent-gold-dim)',
              letterSpacing: '0.25em',
            }}
          >
            Hulki Okan Tabak presents
          </p>
        )}

        {/* Game title */}
        {(phase === 'title' || phase === 'tagline' || phase === 'fade') && (
          <>
            <p
              className="type-in text-xs uppercase mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--accent-gold-dim)',
                letterSpacing: '0.3em',
              }}
            >
              An Istanbul Mystery
            </p>
            <h1
              className="slow-fade text-5xl md:text-7xl font-bold mb-4"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                color: 'var(--text-primary)',
              }}
            >
              Bosphorus Ferry
            </h1>
          </>
        )}

        {/* Tagline */}
        {(phase === 'tagline' || phase === 'fade') && (
          <>
            <div
              className="slow-fade w-16 h-px mx-auto mb-6"
              style={{ backgroundColor: 'var(--accent-gold-dim)' }}
            />
            <p
              className="slow-fade text-lg italic"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                color: 'var(--text-secondary)',
                animationDelay: '0.3s',
                opacity: 0,
              }}
            >
              Your sister didn't drown.
            </p>
          </>
        )}

        {/* Skip hint */}
        {phase !== 'fade' && phase !== 'dark' && (
          <p
            className="fixed bottom-8 left-0 right-0 text-center text-xs slow-fade"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-secondary)',
              opacity: 0,
              animationDelay: '1s',
            }}
          >
            Click anywhere to skip
          </p>
        )}
      </div>
      </div>
    </div>
  );
}
