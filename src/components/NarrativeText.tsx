import { useEffect, useMemo } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { highlightText } from '../utils/textHighlighter';
import { getNpcProfile } from '../data/npcProfiles';

interface NarrativeTextProps {
  text: string;
  onComplete: () => void;
}

export default function NarrativeText({ text, onComplete }: NarrativeTextProps) {
  const { displayedText, isComplete, skip } = useTypewriter(text, 22);

  // Notify parent when typing completes (fires once)
  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  // Track which NPCs have had their monogram shown (per full text, not per displayed chunk)
  const seenNpcIds = useMemo(() => new Set<string>(), [text]);

  const paragraphs = displayedText.split('\n\n');

  return (
    <div
      className="cursor-pointer select-none narrative-mobile"
      onClick={() => {
        if (!isComplete) skip();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          if (!isComplete) skip();
        }
      }}
      aria-label={isComplete ? undefined : 'Click to skip text animation'}
    >
      {paragraphs.map((paragraph, i) => {
        const segments = highlightText(paragraph);
        return (
          <p
            key={i}
            className="mb-5 text-base sm:text-lg leading-relaxed tracking-wide break-words"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              color: 'var(--text-primary)',
            }}
          >
            {segments.map((seg, j) => {
              if (seg.type === 'npc') {
                const showMonogram = seg.npcId && !seenNpcIds.has(seg.npcId);
                if (seg.npcId) seenNpcIds.add(seg.npcId);
                const profile = showMonogram && seg.npcId ? getNpcProfile(seg.npcId) : null;
                return (
                  <span key={j}>
                    {profile && (
                      <span
                        className="npc-monogram-inline"
                        style={{
                          backgroundColor: `${profile.color}22`,
                          color: profile.color,
                          borderColor: `${profile.color}44`,
                        }}
                        aria-hidden="true"
                      >
                        {profile.monogram}
                      </span>
                    )}
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                      {seg.text}
                    </span>
                  </span>
                );
              }
              if (seg.type === 'location') {
                return (
                  <span key={j} style={{ color: 'var(--accent-gold-dim)', fontStyle: 'italic' }}>
                    {seg.text}
                  </span>
                );
              }
              return <span key={j}>{seg.text}</span>;
            })}
            {i === paragraphs.length - 1 && !isComplete && (
              <span
                className="cursor-blink inline-block ml-0.5"
                style={{ color: 'var(--accent-gold)' }}
              >
                |
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
}
