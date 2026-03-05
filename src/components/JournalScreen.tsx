import { useState } from 'react';
import { GameState } from '../types';
import { getScene, getSceneCount } from '../engine/gameEngine';

interface JournalScreenProps {
  state: GameState;
  onBack: () => void;
}

const NPC_DISPLAY: Record<string, string> = {
  selim: 'Selim', melis: 'Melis', oguz: 'Oğuz', levent: 'Levent',
  irfan: 'İrfan', ayse: 'Ayşe', cem: 'Cem', ruya: 'Rüya',
  naz: 'Naz', bora: 'Bora', sude: 'Sude', hakan: 'Hakan',
  vedat: 'Vedat', filiz: 'Filiz', defne: 'Defne', tayfun: 'Tayfun',
};

const AXIS_LABELS: Record<string, [string, string]> = {
  approach: ['Cautious', 'Bold'],
  trust: ['Guarded', 'Open'],
  heart: ['Detached', 'Empathetic'],
  method: ['Instinctive', 'Methodical'],
};

const EPISODE_NAMES: Record<number, string> = {
  1: 'Arnavutköy',
  2: 'Kadıköy',
  3: 'Büyükada',
};

function getTrustLabel(value: number): string {
  if (value <= -2) return 'Hostile';
  if (value === -1) return 'Wary';
  if (value === 0) return 'Neutral';
  if (value === 1) return 'Warm';
  if (value === 2) return 'Trusting';
  return 'Devoted';
}

function getTrustColor(value: number): string {
  if (value <= -1) return '#8b4513';
  if (value === 0) return 'var(--text-secondary)';
  if (value === 1) return 'var(--accent-gold-dim)';
  return 'var(--accent-gold)';
}

export default function JournalScreen({ state, onBack }: JournalScreenProps) {
  const [tab, setTab] = useState<'journal' | 'stats'>('journal');

  // Gather visited locations grouped by episode
  const locationsByEpisode: Record<number, Set<string>> = {};
  const npcsEncountered = new Set<string>();

  for (const sceneId of state.visitedScenes) {
    const scene = getScene(sceneId);
    if (scene) {
      if (!locationsByEpisode[scene.episode]) {
        locationsByEpisode[scene.episode] = new Set();
      }
      locationsByEpisode[scene.episode].add(scene.location);
      if (scene.npcPresent) {
        for (const npc of scene.npcPresent) {
          npcsEncountered.add(npc);
        }
      }
    }
  }

  // Also add NPCs with non-zero trust
  for (const [npc, trust] of Object.entries(state.npcTrust)) {
    if (trust !== 0) npcsEncountered.add(npc);
  }

  const completion = Math.round((state.visitedScenes.length / Math.max(getSceneCount(), 1)) * 100);

  const tabStyle = (active: boolean) => ({
    fontFamily: "'Inter', sans-serif" as const,
    color: active ? 'var(--accent-gold)' : 'var(--text-secondary)',
    borderBottom: active ? '2px solid var(--accent-gold)' : '2px solid transparent',
    letterSpacing: '0.15em',
    backgroundColor: 'transparent',
  });

  return (
    <div
      className="min-h-screen overflow-x-hidden"
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
          paddingBottom: '2.5rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-sm transition-colors duration-200 flex items-center gap-1"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8L10 4" />
            </svg>
            Back
          </button>

          <h1
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--accent-gold-dim)',
              letterSpacing: '0.25em',
            }}
          >
            Story Journal
          </h1>

          <div style={{ width: '52px' }} />
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setTab('journal')}
            className="pb-3 text-xs uppercase tracking-widest border-0 cursor-pointer transition-colors duration-200"
            style={tabStyle(tab === 'journal')}
          >
            Journal
          </button>
          <button
            onClick={() => setTab('stats')}
            className="pb-3 text-xs uppercase tracking-widest border-0 cursor-pointer transition-colors duration-200"
            style={tabStyle(tab === 'stats')}
          >
            Stats
          </button>
        </div>

        {/* Journal Tab */}
        {tab === 'journal' && (
          <div className="fade-in space-y-8">
            {/* Completion */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
                >
                  Progress
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Inter', sans-serif", color: 'var(--accent-gold-dim)' }}
                >
                  {completion}% explored
                </span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--border-subtle)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${completion}%`,
                    backgroundColor: 'var(--accent-gold)',
                  }}
                />
              </div>
            </div>

            {/* Locations by Episode */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
              >
                Locations Visited
              </h3>
              {[1, 2, 3].map((ep) => {
                const locs = locationsByEpisode[ep];
                if (!locs || locs.size === 0) return null;
                return (
                  <div key={ep} className="mb-4">
                    <p
                      className="text-xs uppercase tracking-wider mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: 'var(--accent-gold-dim)',
                        letterSpacing: '0.15em',
                      }}
                    >
                      Episode {ep} — {EPISODE_NAMES[ep]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(locs).map((loc) => (
                        <span
                          key={loc}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: 'var(--text-primary)',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NPCs Encountered */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
              >
                Characters Met
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Array.from(npcsEncountered).map((npc) => {
                  const displayName = NPC_DISPLAY[npc] || npc;
                  const trust = state.npcTrust[npc] ?? 0;
                  return (
                    <div
                      key={npc}
                      className="flex items-center justify-between px-3 py-2 rounded"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "'Lora', Georgia, serif",
                          color: 'var(--accent-gold)',
                        }}
                      >
                        {displayName}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: getTrustColor(trust),
                        }}
                      >
                        {getTrustLabel(trust)}
                      </span>
                    </div>
                  );
                })}
              </div>
              {npcsEncountered.size === 0 && (
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                  No characters met yet.
                </p>
              )}
            </div>

            {/* Recent Choices */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
              >
                Recent Decisions
              </h3>
              <div className="space-y-2">
                {state.choiceHistory.slice(-10).reverse().map((entry, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 rounded"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span
                      className="text-xs block mb-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: 'var(--accent-gold-dim)',
                      }}
                    >
                      Episode {entry.episode}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "'Lora', Georgia, serif",
                        color: 'var(--text-primary)',
                      }}
                    >
                      {entry.choice}
                    </span>
                  </div>
                ))}
                {state.choiceHistory.length === 0 && (
                  <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                    No decisions made yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {tab === 'stats' && (
          <div className="fade-in space-y-8">
            {/* Character Axes */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
              >
                Character Profile
              </h3>
              <div className="space-y-5">
                {Object.entries(AXIS_LABELS).map(([key, [negLabel, posLabel]]) => {
                  const value = state.axes[key as keyof typeof state.axes];
                  const pct = ((value + 1) / 2) * 100; // -1..1 → 0..100
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: value < 0 ? 'var(--text-secondary)' : 'var(--text-secondary)',
                            opacity: value <= 0 ? 1 : 0.5,
                          }}
                        >
                          {negLabel}
                        </span>
                        <span
                          className="text-xs uppercase tracking-wider"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: 'var(--accent-gold-dim)',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {key}
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: value > 0 ? 'var(--text-secondary)' : 'var(--text-secondary)',
                            opacity: value >= 0 ? 1 : 0.5,
                          }}
                        >
                          {posLabel}
                        </span>
                      </div>
                      <div
                        className="relative h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--border-subtle)' }}
                      >
                        {/* Center marker */}
                        <div
                          className="absolute top-0 bottom-0 w-px"
                          style={{
                            left: '50%',
                            backgroundColor: 'var(--text-secondary)',
                            opacity: 0.3,
                          }}
                        />
                        {/* Fill from center */}
                        <div
                          className="absolute top-0 bottom-0 rounded-full transition-all duration-500"
                          style={{
                            left: value >= 0 ? '50%' : `${pct}%`,
                            width: `${Math.abs(value) * 50}%`,
                            backgroundColor: 'var(--accent-gold)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NPC Trust Levels */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
              >
                Relationships
              </h3>
              <div className="space-y-3">
                {Object.entries(state.npcTrust)
                  .filter(([npc]) => npcsEncountered.has(npc))
                  .sort((a, b) => b[1] - a[1])
                  .map(([npc, trust]) => {
                    const displayName = NPC_DISPLAY[npc] || npc;
                    // Map trust from -2..3 to 0..100%
                    const pct = ((trust + 2) / 5) * 100;
                    return (
                      <div key={npc}>
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="text-sm"
                            style={{
                              fontFamily: "'Lora', Georgia, serif",
                              color: 'var(--accent-gold)',
                            }}
                          >
                            {displayName}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: getTrustColor(trust),
                            }}
                          >
                            {getTrustLabel(trust)}
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: 'var(--border-subtle)' }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: getTrustColor(trust),
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Active Flags Summary */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
              >
                Key Discoveries
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(state.flags)
                  .filter((f) => state.flags[f])
                  .slice(0, 20)
                  .map((flag) => (
                    <span
                      key={flag}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: 'var(--accent-gold)',
                        backgroundColor: 'rgba(201, 168, 76, 0.1)',
                        border: '1px solid var(--accent-gold-dim)',
                      }}
                    >
                      {flag.replace(/_/g, ' ')}
                    </span>
                  ))}
                {Object.keys(state.flags).filter((f) => state.flags[f]).length === 0 && (
                  <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                    No discoveries yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="h-16" />
      </div>
    </div>
  );
}
