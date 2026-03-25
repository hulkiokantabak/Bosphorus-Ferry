// Lightweight analytics — fires beacon requests, never blocks gameplay
// Uses navigator.sendBeacon for reliability, falls back to fetch
// Endpoint is configurable; disabled if not set

const ANALYTICS_KEY = 'bosphorus-ferry-analytics';
const SESSION_KEY = 'bosphorus-ferry-session';

// Set this to your analytics endpoint URL (e.g., Cloudflare Worker, Plausible, etc.)
// Leave empty to disable analytics entirely
const ENDPOINT = '';

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `${Date.now()}`;
  }
}

function isEnabled(): boolean {
  if (!ENDPOINT) return false;
  try {
    return localStorage.getItem(ANALYTICS_KEY) !== 'off';
  } catch {
    return true;
  }
}

function send(event: string, data: Record<string, unknown>) {
  if (!isEnabled()) return;

  const payload = JSON.stringify({
    event,
    session: getSessionId(),
    timestamp: Date.now(),
    ...data,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, payload);
    } else {
      fetch(ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => { /* silent */ });
    }
  } catch {
    // Never let analytics break gameplay
  }
}

// ============================================================
// Public tracking functions
// ============================================================

export function trackSceneVisit(sceneId: string, episode: number, location: string) {
  send('scene_visit', { sceneId, episode, location });
}

export function trackChoice(sceneId: string, choiceText: string, nextScene: string) {
  send('choice', { sceneId, choiceText, nextScene });
}

export function trackEnding(ending: string, totalScenes: number, totalChoices: number) {
  send('ending', { ending, totalScenes, totalChoices });
}

export function trackGameStart(isNewGame: boolean, episode?: number) {
  send('game_start', { isNewGame, startEpisode: episode ?? 1 });
}

export function trackDropoff(lastScene: string, episode: number, minutesPlayed: number) {
  send('dropoff', { lastScene, episode, minutesPlayed });
}

// ============================================================
// Local stats (always works, no endpoint needed)
// ============================================================

const LOCAL_STATS_KEY = 'bosphorus-ferry-stats';

interface LocalStats {
  totalPlaythroughs: number;
  totalChoices: number;
  totalScenes: number;
  endingsReached: Record<string, number>;
  firstPlayed: number;
  lastPlayed: number;
}

export function getLocalStats(): LocalStats {
  try {
    const saved = localStorage.getItem(LOCAL_STATS_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* noop */ }
  return {
    totalPlaythroughs: 0,
    totalChoices: 0,
    totalScenes: 0,
    endingsReached: {},
    firstPlayed: Date.now(),
    lastPlayed: Date.now(),
  };
}

export function recordLocalPlaythrough(ending: string, scenes: number, choices: number) {
  try {
    const stats = getLocalStats();
    stats.totalPlaythroughs += 1;
    stats.totalChoices += choices;
    stats.totalScenes += scenes;
    stats.endingsReached[ending] = (stats.endingsReached[ending] || 0) + 1;
    stats.lastPlayed = Date.now();
    localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(stats));
  } catch { /* noop */ }
}

export function setAnalyticsEnabled(on: boolean) {
  try {
    localStorage.setItem(ANALYTICS_KEY, on ? 'on' : 'off');
  } catch { /* noop */ }
}
