import { useState } from 'react';
import { GameState } from '../types';
import { getScene, getSceneCount } from '../engine/gameEngine';
import { getAllNpcProfiles, getNpcKnownInfo } from '../data/npcProfiles';

interface JournalScreenProps {
  state: GameState;
  onBack: () => void;
}

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
  const [tab, setTab] = useState<'notebook' | 'places' | 'profile'>('notebook');

  // Gather data
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
        for (const npc of scene.npcPresent) npcsEncountered.add(npc);
      }
    }
  }
  for (const [npc, trust] of Object.entries(state.npcTrust)) {
    if (trust !== 0) npcsEncountered.add(npc);
  }

  const completion = Math.round((state.visitedScenes.length / Math.max(getSceneCount(), 1)) * 100);
  const allProfiles = getAllNpcProfiles();
  const encounteredProfiles = allProfiles.filter(p => npcsEncountered.has(p.id));

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
            Deniz's Notebook
          </h1>

          <div style={{ width: '52px' }} />
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setTab('notebook')}
            className="pb-3 text-xs uppercase tracking-widest border-0 cursor-pointer transition-colors duration-200"
            style={tabStyle(tab === 'notebook')}
          >
            People
          </button>
          <button
            onClick={() => setTab('places')}
            className="pb-3 text-xs uppercase tracking-widest border-0 cursor-pointer transition-colors duration-200"
            style={tabStyle(tab === 'places')}
          >
            Places
          </button>
          <button
            onClick={() => setTab('profile')}
            className="pb-3 text-xs uppercase tracking-widest border-0 cursor-pointer transition-colors duration-200"
            style={tabStyle(tab === 'profile')}
          >
            Profile
          </button>
        </div>

        {/* ============================================================
            PEOPLE TAB — Detective's Notebook
            ============================================================ */}
        {tab === 'notebook' && (
          <div className="fade-in space-y-4">
            {encounteredProfiles.length === 0 && (
              <p className="text-sm italic" style={{ color: 'var(--text-secondary)', fontFamily: "'Lora', Georgia, serif" }}>
                No one met yet. The notebook is empty.
              </p>
            )}

            {[1, 2, 3].map(ep => {
              const episodeNpcs = encounteredProfiles.filter(p => p.episode === ep);
              if (episodeNpcs.length === 0) return null;
              return (
                <div key={ep}>
                  <p
                    className="text-xs uppercase tracking-wider mb-3"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: 'var(--accent-gold-dim)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {EPISODE_NAMES[ep]}
                  </p>
                  <div className="space-y-3">
                    {episodeNpcs.map(profile => {
                      const trust = state.npcTrust[profile.id] ?? 0;
                      const knownInfo = getNpcKnownInfo(profile.id, state.flags);
                      return (
                        <div
                          key={profile.id}
                          className="p-4 rounded"
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          <div className="flex items-start gap-3">
                            {/* Monogram avatar */}
                            <div
                              className="npc-monogram"
                              style={{
                                backgroundColor: `${profile.color}22`,
                                color: profile.color,
                                border: `1px solid ${profile.color}44`,
                              }}
                            >
                              {profile.monogram}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div>
                                  <span
                                    className="text-sm font-medium"
                                    style={{
                                      fontFamily: "'Lora', Georgia, serif",
                                      color: 'var(--accent-gold)',
                                    }}
                                  >
                                    {profile.fullName}
                                  </span>
                                  <span
                                    className="text-xs ml-2"
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      color: 'var(--text-secondary)',
                                      opacity: 0.6,
                                    }}
                                  >
                                    {profile.role}
                                  </span>
                                </div>
                                <span
                                  className="text-xs flex-shrink-0"
                                  style={{
                                    fontFamily: "'Inter', sans-serif",
                                    color: getTrustColor(trust),
                                  }}
                                >
                                  {getTrustLabel(trust)}
                                </span>
                              </div>

                              {/* Known info */}
                              <div className="space-y-1 mt-2">
                                {knownInfo.map((info, i) => (
                                  <p
                                    key={i}
                                    className="text-xs leading-relaxed"
                                    style={{
                                      fontFamily: "'Lora', Georgia, serif",
                                      color: i === 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                      fontStyle: i === 0 ? 'italic' : 'normal',
                                    }}
                                  >
                                    {i > 0 && (
                                      <span style={{ color: 'var(--accent-gold-dim)', marginRight: '0.4rem' }}>
                                        &bull;
                                      </span>
                                    )}
                                    {info}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================
            PLACES TAB
            ============================================================ */}
        {tab === 'places' && (
          <div className="fade-in space-y-6">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
                >
                  World Explored
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Inter', sans-serif", color: 'var(--accent-gold-dim)' }}
                >
                  {completion}%
                </span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--border-subtle)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${completion}%`, backgroundColor: 'var(--accent-gold)' }}
                />
              </div>
            </div>

            {/* Locations by Episode */}
            {[1, 2, 3].map((ep) => {
              const locs = locationsByEpisode[ep];
              if (!locs || locs.size === 0) return null;
              return (
                <div key={ep}>
                  <p
                    className="text-xs uppercase tracking-wider mb-3"
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

            {/* Key Discoveries */}
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

        {/* ============================================================
            PROFILE TAB — Character axes and stats
            ============================================================ */}
        {tab === 'profile' && (
          <div className="fade-in space-y-8">
            {/* Character Axes */}
            <div>
              <h3
                className="text-xs uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}
              >
                Your Deniz
              </h3>
              <div className="space-y-5">
                {Object.entries(AXIS_LABELS).map(([key, [negLabel, posLabel]]) => {
                  const value = state.axes[key as keyof typeof state.axes];
                  const pct = ((value + 1) / 2) * 100;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: 'var(--text-secondary)',
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
                            color: 'var(--text-secondary)',
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
                        <div
                          className="absolute top-0 bottom-0 w-px"
                          style={{ left: '50%', backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}
                        />
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

            {/* Quick stats */}
            <div
              className="p-4 rounded"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-semibold" style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--accent-gold)' }}>
                    {state.visitedScenes.length}
                  </p>
                  <p className="text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}>
                    Scenes
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold" style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--accent-gold)' }}>
                    {state.choiceHistory.length}
                  </p>
                  <p className="text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}>
                    Choices
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold" style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--accent-gold)' }}>
                    {npcsEncountered.size}
                  </p>
                  <p className="text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}>
                    Characters
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="h-16" />
      </div>
    </div>
  );
}
