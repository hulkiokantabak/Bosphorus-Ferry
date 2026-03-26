import { useState } from 'react';
import { GameState, ChoiceHistoryEntry } from '../types';
import { getScene } from '../engine/gameEngine';

interface WhatIfViewerProps {
  state: GameState;
  onBack: () => void;
}

const EPISODE_NAMES: Record<number, string> = {
  1: 'Arnavutköy',
  2: 'Kadıköy',
  3: 'Büyükada',
};

export default function WhatIfViewer({ state, onBack }: WhatIfViewerProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Group choices by episode
  const byEpisode = new Map<number, { entry: ChoiceHistoryEntry; index: number }[]>();
  state.choiceHistory.forEach((entry, index) => {
    const list = byEpisode.get(entry.episode) || [];
    list.push({ entry, index });
    byEpisode.set(entry.episode, list);
  });

  const buttonStyle = {
    fontFamily: "'Inter', sans-serif" as const,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div
      className="min-h-screen overflow-y-auto"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        style={{
          maxWidth: '672px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          paddingTop: '2rem',
          paddingBottom: '3rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-xs uppercase tracking-widest transition-colors"
            style={{
              ...buttonStyle,
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            ← Back
          </button>
          <h2
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--accent-gold-dim)',
              letterSpacing: '0.25em',
            }}
          >
            What If?
          </h2>
          <div style={{ width: '48px' }} />
        </div>

        <p
          className="text-sm italic mb-8 text-center"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            color: 'var(--text-secondary)',
          }}
        >
          Every choice shaped Deniz's journey. Here's what might have been.
        </p>

        {/* Choice timeline by episode */}
        {Array.from(byEpisode.entries()).map(([episode, choices]) => (
          <div key={episode} className="mb-8">
            <h3
              className="text-xs uppercase tracking-widest mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--accent-gold-dim)',
                letterSpacing: '0.2em',
              }}
            >
              Episode {episode} — {EPISODE_NAMES[episode] || 'The Bosphorus'}
            </h3>

            <div className="space-y-2">
              {choices.map(({ entry, index }) => {
                const scene = getScene(entry.scene);
                const isExpanded = expandedIndex === index;
                const otherChoices = scene?.choices.filter(c => c.text !== entry.choice) || [];

                return (
                  <div
                    key={index}
                    className="rounded"
                    style={{
                      border: `1px solid ${isExpanded ? 'var(--accent-gold-dim)' : 'var(--border-subtle)'}`,
                      transition: 'border-color 0.3s ease',
                    }}
                  >
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="w-full text-left px-4 py-3 flex items-start gap-3"
                      style={buttonStyle}
                    >
                      {/* Timeline dot */}
                      <span
                        className="mt-1 flex-shrink-0 rounded-full"
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: 'var(--accent-gold)',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            fontFamily: "'Lora', Georgia, serif",
                            color: 'var(--accent-gold)',
                          }}
                        >
                          {entry.choice}
                        </p>
                        {scene && (
                          <p
                            className="text-xs mt-1"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: 'var(--text-secondary)',
                              opacity: 0.6,
                            }}
                          >
                            at {scene.location}
                          </p>
                        )}
                      </div>
                      {otherChoices.length > 0 && (
                        <span
                          className="text-xs flex-shrink-0 mt-1"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: 'var(--text-secondary)',
                            opacity: 0.5,
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          ▾
                        </span>
                      )}
                    </button>

                    {/* Expanded: show other choices */}
                    {isExpanded && otherChoices.length > 0 && (
                      <div
                        className="px-4 pb-3 fade-in"
                        style={{ marginLeft: '18px' }}
                      >
                        <p
                          className="text-xs uppercase tracking-wider mb-2"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: 'var(--text-secondary)',
                            opacity: 0.5,
                            letterSpacing: '0.1em',
                          }}
                        >
                          You could have…
                        </p>
                        {otherChoices.map((alt, ai) => {
                          const altScene = getScene(alt.next);
                          return (
                            <div
                              key={ai}
                              className="flex items-start gap-2 mb-2"
                            >
                              <span
                                className="mt-1.5 flex-shrink-0 rounded-full"
                                style={{
                                  width: '4px',
                                  height: '4px',
                                  backgroundColor: 'var(--border-subtle)',
                                }}
                              />
                              <div className="flex-1">
                                <p
                                  className="text-sm"
                                  style={{
                                    fontFamily: "'Lora', Georgia, serif",
                                    color: 'var(--text-secondary)',
                                    opacity: 0.6,
                                  }}
                                >
                                  {alt.text}
                                </p>
                                {altScene && (
                                  <p
                                    className="text-xs mt-0.5 italic"
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      color: 'var(--text-secondary)',
                                      opacity: 0.35,
                                    }}
                                  >
                                    → {altScene.location}
                                    {altScene.npcPresent && altScene.npcPresent.length > 0 && (
                                      <> · meets {altScene.npcPresent.slice(0, 2).join(', ')}</>
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Stats */}
        <div className="text-center mt-8">
          <p
            className="text-xs"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-secondary)',
              opacity: 0.5,
            }}
          >
            {state.choiceHistory.length} choices made across {byEpisode.size} episode{byEpisode.size > 1 ? 's' : ''}
          </p>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
