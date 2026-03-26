import { useState, useEffect } from 'react';
import { GameState } from '../types';

interface EpisodeTransitionProps {
  episode: number;
  onComplete: () => void;
  state?: GameState; // optional — if provided, shows recap
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

function buildRecap(episode: number, state?: GameState): string | null {
  if (!state || episode <= 1) return null;

  const flags = state.flags;
  const lines: string[] = [];

  if (episode === 2) {
    // Recap of Episode 1
    lines.push('You came to Arnavutköy chasing an anonymous text: "Your sister didn\'t drown."');

    if (flags.talked_to_selim || flags.selim_confessed) {
      lines.push('Selim at the blue house knew more than he admitted.');
    }
    if (flags.talked_to_melis) {
      lines.push('Melis at the cafe was waiting for you — had been waiting for months.');
    }
    if (flags.talked_to_irfan) {
      lines.push('Kaptan Irfan saw a boat at Büyükada\'s back pier the night Defne vanished.');
    }
    if (flags.cultivated_ruya) {
      lines.push('A quiet woman on the ferry — Rüya — offered trust through silence.');
    }

    // Trust/axis flavor
    if (state.axes.approach > 0.3) {
      lines.push('You pushed hard for answers — and Arnavutköy pushed back.');
    } else if (state.axes.approach < -0.3) {
      lines.push('You moved carefully, listening more than asking.');
    }
    if (state.npcTrust.melis >= 2) {
      lines.push('Melis trusts you now. That matters.');
    }

    if (lines.length === 1) {
      lines.push('The European shore gave you fragments. Now the Asian side waits.');
    }
  }

  if (episode === 3) {
    // Recap of Episode 2
    lines.push('Kadıköy gave you names, evidence, and a growing sense of danger.');

    if (flags.naz_confessed) {
      lines.push('Naz confessed to forging provenance documents for a powerful collector.');
    } else if (flags.naz_mentioned_island) {
      lines.push('Naz pointed you toward an island — and a man who collects more than art.');
    }
    if (flags.met_bora) {
      lines.push('Bora held an envelope from Defne, addressed to you. "For Deniz. If."');
    }
    if (flags.has_sude_photos) {
      lines.push('Sude risked everything to photograph midnight deliveries at Baski Evi.');
    }
    if (flags.spotted_by_tayfun) {
      lines.push('You were followed. They know your face now.');
    }
    if (flags.knows_vedat_name) {
      lines.push('The name: Vedat Arslaner. The island: Büyükada. The mansion on the hill.');
    }
    if (flags.hakan_deal) {
      lines.push('Hakan Reis will take you there by boat. After dark.');
    }
    if (flags.ruya_press_contact) {
      lines.push('Rüya gave you a lifeline — contacts at the press, in case you don\'t come back.');
    }

    // Trust/axis flavor for E3
    if (state.axes.trust > 0.3) {
      lines.push('You\'ve opened yourself to others. That\'s either wisdom or a liability.');
    } else if (state.axes.trust < -0.3) {
      lines.push('You trust no one completely. On this island, that may keep you alive.');
    }
    if (state.axes.method > 0.5) {
      lines.push('Every scrap of evidence is catalogued. Methodical. Ready.');
    }
    if (state.npcTrust.bora >= 2) {
      lines.push('Bora is with you. His meyhane is your safe harbour.');
    }

    if (lines.length === 1) {
      lines.push('The pieces are assembled. Now you cross to the island.');
    }
  }

  return lines.join(' ');
}

export default function EpisodeTransition({ episode, onComplete, state }: EpisodeTransitionProps) {
  const [phase, setPhase] = useState<'dark' | 'recap' | 'title' | 'subtitle' | 'ready'>('dark');
  const data = transitionData[episode];
  const recap = buildRecap(episode, state);

  useEffect(() => {
    setPhase('dark');

    if (recap) {
      // Show recap first, then title
      const timers = [
        setTimeout(() => setPhase('recap'), 600),
        setTimeout(() => setPhase('title'), 600 + Math.min(recap.length * 20, 6000)),
        setTimeout(() => setPhase('subtitle'), 600 + Math.min(recap.length * 20, 6000) + 1400),
        setTimeout(() => setPhase('ready'), 600 + Math.min(recap.length * 20, 6000) + 3000),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      const timers = [
        setTimeout(() => setPhase('title'), 800),
        setTimeout(() => setPhase('subtitle'), 2200),
        setTimeout(() => setPhase('ready'), 3800),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [episode, recap]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={phase === 'ready' ? onComplete : undefined}
    >
      <div className="text-center max-w-lg px-8">
        {/* Recap phase */}
        {phase === 'recap' && recap && (
          <div className="slow-fade">
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--accent-gold-dim)',
                letterSpacing: '0.25em',
              }}
            >
              Previously
            </p>
            <p
              className="text-sm leading-relaxed italic"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                color: 'var(--text-secondary)',
                lineHeight: '1.9',
              }}
            >
              {recap}
            </p>
          </div>
        )}

        {/* Title phases */}
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
