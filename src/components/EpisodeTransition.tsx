import { useState, useEffect } from 'react';

interface EpisodeTransitionProps {
  episode: number;
  onComplete: () => void;
}

const transitionData: Record<number, { title: string; subtitle: string; description: string }> = {
  1: {
    title: 'Episode One',
    subtitle: 'Arnavutköy',
    description: 'The blue house past the mosque',
  },
  2: {
    title: 'Episode Two',
    subtitle: 'Kadıköy',
    description: 'The print shop on the side street',
  },
  3: {
    title: 'Episode Three',
    subtitle: 'Büyükada',
    description: 'The mansion on the hill',
  },
};

export default function EpisodeTransition({ episode, onComplete }: EpisodeTransitionProps) {
  const [phase, setPhase] = useState<'dark' | 'title' | 'subtitle' | 'ready'>('dark');
  const data = transitionData[episode];

  useEffect(() => {
    setPhase('dark');
    const timers = [
      setTimeout(() => setPhase('title'), 800),
      setTimeout(() => setPhase('subtitle'), 2200),
      setTimeout(() => setPhase('ready'), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [episode]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={phase === 'ready' ? onComplete : undefined}
    >
      <div className="text-center">
        {(phase === 'title' || phase === 'subtitle' || phase === 'ready') && (
          <p
            className="type-in text-xs uppercase mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--accent-gold-dim)',
              letterSpacing: '0.3em',
            }}
          >
            {data.title}
          </p>
        )}
        {(phase === 'subtitle' || phase === 'ready') && (
          <>
            <h1
              className="slow-fade text-4xl md:text-5xl font-semibold mb-4"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                color: 'var(--text-primary)',
              }}
            >
              {data.subtitle}
            </h1>
            <p
              className="slow-fade text-base italic"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                color: 'var(--text-secondary)',
                animationDelay: '0.5s',
                opacity: 0,
              }}
            >
              {data.description}
            </p>
          </>
        )}
        {phase === 'ready' && (
          <p
            className="blink mt-12 text-sm"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '0.1em',
            }}
          >
            Click to continue
          </p>
        )}
      </div>
    </div>
  );
}
