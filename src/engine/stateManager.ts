import { GameState, CharacterAxes } from '../types';

const SAVE_KEY = 'bosphorus-ferry-save';

export function createInitialState(): GameState {
  return {
    currentEpisode: 1,
    currentScene: 'e1_opening',
    axes: {
      approach: 0,
      trust: 0,
      heart: 0,
      method: 0,
    },
    npcTrust: {
      selim: 0,
      melis: 0,
      oguz: 0,
      levent: 0,
      irfan: 0,
      ayse: 0,
      cem: 0,
      ruya: 0,
      naz: 0,
      bora: 0,
      sude: 0,
      hakan: 0,
      vedat: 0,
      filiz: 0,
      defne: 0,
      tayfun: 0,
    },
    flags: {},
    visitedScenes: [],
    choiceHistory: [],
  };
}

export function clampAxis(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

export function applyAxisShift(
  axes: CharacterAxes,
  shifts: Partial<CharacterAxes>
): CharacterAxes {
  return {
    approach: clampAxis(axes.approach + (shifts.approach || 0)),
    trust: clampAxis(axes.trust + (shifts.trust || 0)),
    heart: clampAxis(axes.heart + (shifts.heart || 0)),
    method: clampAxis(axes.method + (shifts.method || 0)),
  };
}

export function applyNpcTrust(
  current: Record<string, number>,
  changes: Record<string, number>
): Record<string, number> {
  const updated = { ...current };
  for (const [npc, delta] of Object.entries(changes)) {
    updated[npc] = Math.max(-2, Math.min(3, (updated[npc] || 0) + delta));
  }
  return updated;
}

export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // Silent fail if localStorage unavailable
  }
}

export function loadGame(): GameState | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        parsed &&
        typeof parsed.currentEpisode === 'number' &&
        typeof parsed.currentScene === 'string' &&
        parsed.axes &&
        parsed.npcTrust &&
        typeof parsed.flags === 'object' &&
        Array.isArray(parsed.visitedScenes) &&
        Array.isArray(parsed.choiceHistory)
      ) {
        return parsed as GameState;
      }
      localStorage.removeItem(SAVE_KEY);
    }
  } catch {
    try { localStorage.removeItem(SAVE_KEY); } catch { /* noop */ }
  }
  return null;
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // Silent fail
  }
}

export function hasSave(): boolean {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch {
    return false;
  }
}
