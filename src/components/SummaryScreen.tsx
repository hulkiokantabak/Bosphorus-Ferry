import { GameState } from '../types';
import { EndingType, getEndingTitle } from '../engine/endingCalculator';
import { getScene, getSceneCount } from '../engine/gameEngine';

interface SummaryScreenProps {
  state: GameState;
  ending: EndingType;
  onMainMenu: () => void;
  onPlayAgain: () => void;
}

const NPC_DISPLAY: Record<string, string> = {
  selim: 'Selim Köşker', melis: 'Melis', oguz: 'Oğuz', levent: 'Levent',
  irfan: 'Kaptan İrfan', ayse: 'Ayşe', cem: 'Cem', ruya: 'Rüya',
  naz: 'Naz Yılmaz', bora: 'Bora', sude: 'Sude', hakan: 'Hakan Reis',
  vedat: 'Vedat Arslaner', filiz: 'Filiz', defne: 'Defne', tayfun: 'Tayfun',
};

const AXIS_LABELS: Record<string, [string, string]> = {
  approach: ['Cautious', 'Bold'],
  trust: ['Guarded', 'Open'],
  heart: ['Detached', 'Empathetic'],
  method: ['Instinctive', 'Methodical'],
};

const ENDING_FAMILIES: Record<string, string> = {
  A: 'Justice',
  B: 'The Deal',
  C: 'Disappearance',
  D: 'The Chase',
};

function getAxisDominant(value: number, labels: [string, string]): string {
  if (Math.abs(value) < 0.15) return 'Balanced';
  return value < 0 ? labels[0] : labels[1];
}

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

export default function SummaryScreen({ state, ending, onMainMenu, onPlayAgain }: SummaryScreenProps) {
  const endingTitle = getEndingTitle(ending);
  const endingFamily = ENDING_FAMILIES[ending[0]] || ending;
  const scenesExplored = state.visitedScenes.length;
  const totalScenes = getSceneCount();
  const completion = Math.round((scenesExplored / Math.max(totalScenes, 1)) * 100);
  const choicesMade = state.choiceHistory.length;

  // Gather locations and NPCs
  const allLocations = new Set<string>();
  const npcsEncountered = new Set<string>();
  for (const sceneId of state.visitedScenes) {
    const scene = getScene(sceneId);
    if (scene) {
      allLocations.add(scene.location);
      if (scene.npcPresent) {
        for (const npc of scene.npcPresent) npcsEncountered.add(npc);
      }
    }
  }
  for (const [npc, trust] of Object.entries(state.npcTrust)) {
    if (trust !== 0) npcsEncountered.add(npc);
  }

  // Key flags to display as narrative discoveries
  const activeFlags = Object.keys(state.flags).filter(f => state.flags[f]);

  // Determine character archetype from dominant axes
  const dominant = Object.entries(AXIS_LABELS).map(([key, labels]) => ({
    key,
    label: getAxisDominant(state.axes[key as keyof typeof state.axes], labels),
    value: state.axes[key as keyof typeof state.axes],
  }));

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
          paddingTop: '3rem',
          paddingBottom: '3rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div className="text-center mb-10 slow-fade">
          <p
            className="text-xs uppercase mb-2 tracking-widest"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-secondary)',
              letterSpacing: '0.3em',
            }}
          >
            Your Journey Ends
          </p>
          <h1
            className="text-3xl md:text-4xl font-semibold mb-3"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              color: 'var(--text-primary)',
            }}
          >
            {endingTitle}
          </h1>
          <p
            className="text-sm italic"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              color: 'var(--accent-gold-dim)',
            }}
          >
            Path of {endingFamily}
          </p>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{ backgroundColor: 'var(--accent-gold-dim)' }}
          />
        </div>

        {/* Journey Stats */}
        <div
          className="fade-in mb-8 p-5 rounded"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            animationDelay: '0.5s',
            opacity: 0,
          }}
        >
          <h3
            className="text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', letterSpacing: '0.2em' }}
          >
            Your Journey
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p
                className="text-2xl font-semibold"
                style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--accent-gold)' }}
              >
                {scenesExplored}
              </p>
              <p className="text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}>
                Scenes
              </p>
            </div>
            <div>
              <p
                className="text-2xl font-semibold"
                style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--accent-gold)' }}
              >
                {choicesMade}
              </p>
              <p className="text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}>
                Choices
              </p>
            </div>
            <div>
              <p
                className="text-2xl font-semibold"
                style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--accent-gold)' }}
              >
                {allLocations.size}
              </p>
              <p className="text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}>
                Locations
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)' }}>
                World explored
              </span>
              <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--accent-gold-dim)' }}>
                {completion}%
              </span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${completion}%`, backgroundColor: 'var(--accent-gold)' }}
              />
            </div>
          </div>
        </div>

        {/* Character Profile */}
        <div
          className="fade-in mb-8 p-5 rounded"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            animationDelay: '0.8s',
            opacity: 0,
          }}
        >
          <h3
            className="text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', letterSpacing: '0.2em' }}
          >
            Your Deniz
          </h3>
          <div className="space-y-4">
            {dominant.map(({ key, label, value }) => {
              const [negLabel, posLabel] = AXIS_LABELS[key];
              const pct = ((value + 1) / 2) * 100;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', opacity: value <= 0 ? 1 : 0.5 }}>
                      {negLabel}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ fontFamily: "'Inter', sans-serif", color: 'var(--accent-gold)' }}
                    >
                      {label}
                    </span>
                    <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', opacity: value >= 0 ? 1 : 0.5 }}>
                      {posLabel}
                    </span>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
                    <div className="absolute top-0 bottom-0 w-px" style={{ left: '50%', backgroundColor: 'var(--text-secondary)', opacity: 0.3 }} />
                    <div
                      className="absolute top-0 bottom-0 rounded-full"
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

        {/* Relationships */}
        {npcsEncountered.size > 0 && (
          <div
            className="fade-in mb-8 p-5 rounded"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              animationDelay: '1.1s',
              opacity: 0,
            }}
          >
            <h3
              className="text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', letterSpacing: '0.2em' }}
            >
              Relationships
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Array.from(npcsEncountered)
                .sort((a, b) => (state.npcTrust[b] ?? 0) - (state.npcTrust[a] ?? 0))
                .map(npc => {
                  const displayName = NPC_DISPLAY[npc] || npc;
                  const trust = state.npcTrust[npc] ?? 0;
                  return (
                    <div
                      key={npc}
                      className="flex items-center justify-between px-3 py-2 rounded"
                      style={{ border: '1px solid var(--border-subtle)' }}
                    >
                      <span
                        className="text-sm"
                        style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--accent-gold)' }}
                      >
                        {displayName}
                      </span>
                      <span
                        className="text-xs"
                        style={{ fontFamily: "'Inter', sans-serif", color: getTrustColor(trust) }}
                      >
                        {getTrustLabel(trust)}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Key Discoveries */}
        {activeFlags.length > 0 && (
          <div
            className="fade-in mb-8 p-5 rounded"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              animationDelay: '1.4s',
              opacity: 0,
            }}
          >
            <h3
              className="text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', letterSpacing: '0.2em' }}
            >
              Key Discoveries
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeFlags.slice(0, 20).map(flag => (
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
            </div>
          </div>
        )}

        {/* Other endings hint */}
        <div
          className="fade-in text-center mb-10 p-5 rounded"
          style={{
            border: '1px solid var(--border-subtle)',
            animationDelay: '1.7s',
            opacity: 0,
          }}
        >
          <p
            className="text-sm mb-2"
            style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--text-primary)' }}
          >
            You reached <span style={{ color: 'var(--accent-gold)' }}>1 of 8</span> endings.
          </p>
          <p
            className="text-xs italic"
            style={{ fontFamily: "'Lora', Georgia, serif", color: 'var(--text-secondary)' }}
          >
            Different choices lead to different fates. Would Deniz have chosen differently?
          </p>
        </div>

        {/* Actions */}
        <div
          className="fade-in flex flex-col items-center gap-4"
          style={{ animationDelay: '2s', opacity: 0 }}
        >
          <button
            onClick={onPlayAgain}
            className="px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'transparent',
              borderColor: 'var(--accent-gold-dim)',
              color: 'var(--accent-gold)',
              letterSpacing: '0.15em',
              borderRadius: '2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
              e.currentTarget.style.color = 'var(--accent-gold)';
            }}
          >
            Play Again
          </button>
          <button
            onClick={onMainMenu}
            className="px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'transparent',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
              borderRadius: '2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            Return to Menu
          </button>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
