// Procedural ambient audio using Web Audio API
// No external files — generates atmosphere from oscillators and noise
// 13 ambience types, randomized parameters, accent sounds, mood/episode tinting

type AmbienceBase =
  | 'water-calm'    // pier, waterfront, still water
  | 'water-open'    // open Bosphorus/Marmara, wind + waves
  | 'ferry-engine'  // ferry interior hum
  | 'ferry-deck'    // ferry deck: engine + wind + gulls
  | 'indoor-quiet'  // room tone: mansion, study, apartment
  | 'indoor-cafe'   // indoor with muffled activity
  | 'crowd-market'  // busy Kadikoy market
  | 'crowd-street'  // moderate street activity
  | 'night-wind'    // quiet wind, crickets (island)
  | 'night-urban'   // distant city hum
  | 'forest'        // pine forest: wind in trees
  | 'garden'        // sheltered garden, birdsong
  | 'silence';

type MoodModifier = 'neutral' | 'tense' | 'urgent' | 'melancholy';

interface AmbienceOpts {
  episode?: number;
  phase?: string;
}

// --- Location mapping (13 types) ---

const LOCATION_AMBIENCE: Record<string, AmbienceBase> = {
  // Ferry — deck
  'Bosphorus Ferry': 'ferry-deck',
  'Bosphorus Ferry — Night': 'ferry-deck',
  'Beşiktaş-Arnavutköy Ferry': 'ferry-deck',
  'Ferry — Upper Deck': 'ferry-deck',
  'Marmara Sea Ferry — Deck': 'ferry-deck',
  'Marmara Sea Ferry — Evening': 'ferry-deck',
  'Marmara Sea — Night': 'ferry-deck',
  'Büyükada — Morning Ferry': 'ferry-deck',
  'Büyükada — Dawn Ferry': 'ferry-deck',
  // Ferry — cabin/interior
  'Ferry — Tea Counter': 'ferry-engine',
  'Ferry — Lower Cabin': 'ferry-engine',
  "Ferry — Captain's Bridge": 'ferry-engine',
  // Water — calm
  'Kadıköy Pier': 'water-calm',
  'Kadıköy Pier - Night': 'water-calm',
  'Kadıköy Pier - Tea House': 'water-calm',
  'Kadıköy Pier - Yildiz Cabin': 'water-calm',
  'Arnavutköy Waterfront': 'water-calm',
  'Arnavutköy Iskele': 'water-calm',
  'Büyükada İskelesi': 'water-calm',
  'Kadıköy İskelesi': 'water-calm',
  'Büyükada — Waterfront': 'water-calm',
  'Büyükada — Back Pier': 'water-calm',
  'Old Dock': 'water-calm',
  // Water — open
  'Moda Waterfront': 'water-open',
  'Aegean Coast': 'water-open',
  // Indoor — quiet
  'Defne Apartment': 'indoor-quiet',
  'Defne Apartment Exterior': 'indoor-quiet',
  'Büyükada — Mansion Gallery': 'indoor-quiet',
  "Büyükada — Vedat's Study": 'indoor-quiet',
  "Büyükada — Servants' Quarters": 'indoor-quiet',
  'Büyükada — Mansion Veranda': 'indoor-quiet',
  'Köşk Antik': 'indoor-quiet',
  'Köşk Antik Rear': 'indoor-quiet',
  'Levent Gallery': 'indoor-quiet',
  'Istanbul Airport': 'indoor-quiet',
  // Indoor — cafe
  'Liman Meyhane': 'indoor-cafe',
  'Melis\'in Yeri Cafe': 'indoor-cafe',
  'Kadıköy Kahvehane': 'indoor-cafe',
  'Büyükada Bakkal': 'indoor-cafe',
  'Baskı Evi': 'indoor-cafe',
  'Baskı Evi - Back Alley': 'indoor-quiet',
  // Crowd — market
  'Kadıköy Çarşı': 'crowd-market',
  'Kadıköy Çarşı - Record Shop': 'crowd-market',
  'Kadıköy Çarşı - Spice Stall': 'crowd-market',
  'Side Street off Kadıköy Çarşı': 'crowd-street',
  // Crowd — street
  'Bahariye Caddesi': 'crowd-street',
  'İskele Caddesi': 'crowd-street',
  'Kadıköy Side Street': 'crowd-street',
  'Kadıköy Side Streets': 'crowd-street',
  'Arnavutköy Side Street': 'crowd-street',
  'Istanbul': 'crowd-street',
  // Night — wind (island)
  'Büyükada Tea Garden': 'night-wind',
  'Büyükada — Tea Garden': 'night-wind',
  'Büyükada — Hill Road': 'night-wind',
  'Büyükada — Mansion Gate': 'night-wind',
  'Büyükada — Mansion Garden': 'garden',
  'Büyükada — Mansion Grounds': 'night-wind',
  'Büyükada — Mansion Wall': 'night-wind',
  'Büyükada — Mansion Service Entrance': 'night-wind',
  'Büyükada — Kitchen Garden': 'garden',
  'Büyükada — Shuttle Stand': 'night-wind',
  // Forest
  'Büyükada — Pine Forest': 'forest',
  'Büyükada — Pine Forest Path': 'forest',
  // Night — urban
  'Kadıköy — Hidden Courtyard': 'night-urban',
  'Kadıköy — Safe Distance': 'night-urban',
};

// --- Globals ---

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let currentNodes: AudioNode[] = [];
let currentAmbience: AmbienceBase | null = null;
let enabled = false;
let pendingAmbience: string | null = null;
let pendingOpts: AmbienceOpts = {};
let ambienceTimeout: ReturnType<typeof setTimeout> | null = null;

const FADE_TIME = 2.0;
const AMBIENCE_DURATION = 3.0;

// Ring buffer to avoid repetition
const recentSeeds: number[] = [];

// --- Helpers ---

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getContext(): AudioContext | null {
  if (!audioCtx) {
    // Feature-detect (older Safari/WebViews expose webkitAudioContext) and never
    // let an unavailable or throwing constructor crash the caller — audio is a
    // non-essential enhancement and should degrade to silence.
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.15;
      masterGain.connect(audioCtx.destination);
    } catch {
      audioCtx = null;
      return null;
    }
  }
  return audioCtx;
}

function createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function stopCurrent() {
  if (!audioCtx || !masterGain) return;
  const now = audioCtx.currentTime;
  for (const node of currentNodes) {
    try {
      if (node instanceof GainNode) {
        node.gain.setTargetAtTime(0, now, FADE_TIME / 4);
      }
    } catch { /* noop */ }
  }
  const old = [...currentNodes];
  setTimeout(() => {
    for (const n of old) { try { n.disconnect(); } catch { /* noop */ } }
  }, FADE_TIME * 1000);
  currentNodes = [];
}

// --- Episode tinting ---

interface EpisodeTint {
  filterOffset: number;   // Hz added to base filter cutoffs
  lfoScale: number;       // multiplier on LFO rates
  gainScale: number;      // multiplier on overall level
  accentProb: number;     // 0-1 probability of accent sounds
}

const EPISODE_TINT: Record<number, EpisodeTint> = {
  1: { filterOffset: 50, lfoScale: 0.85, gainScale: 1.0, accentProb: 0.6 },
  2: { filterOffset: 100, lfoScale: 1.15, gainScale: 1.05, accentProb: 0.8 },
  3: { filterOffset: -30, lfoScale: 0.7, gainScale: 0.8, accentProb: 0.4 },
};

function getTint(episode?: number): EpisodeTint {
  return EPISODE_TINT[episode ?? 1] ?? EPISODE_TINT[1];
}

// --- Mood from phase ---

function getMood(phase?: string): MoodModifier {
  if (phase === 'complication') return 'tense';
  if (phase === 'climax') return 'urgent';
  if (phase === 'ferry') return 'melancholy';
  return 'neutral';
}

// --- Accent sounds (short procedural one-shots) ---

function accentGullCry(ctx: AudioContext, master: GainNode, t: number) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(rand(2200, 2800), t);
  osc.frequency.exponentialRampToValueAtTime(rand(1400, 1800), t + 0.3);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(rand(0.03, 0.06), t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  osc.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + 0.4);
  currentNodes.push(osc, g);
}

function accentWaveSlap(ctx: AudioContext, master: GainNode, t: number) {
  const buf = createNoiseBuffer(ctx, 0.3);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = rand(200, 500); bp.Q.value = 0.8;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(rand(0.08, 0.15), t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  src.connect(bp); bp.connect(g); g.connect(master);
  src.start(t); src.stop(t + 0.3);
  currentNodes.push(src, bp, g);
}

function accentMetalClank(ctx: AudioContext, master: GainNode, t: number) {
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = rand(800, 1400);
  const g = ctx.createGain();
  g.gain.setValueAtTime(rand(0.03, 0.06), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  osc.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + 0.2);
  currentNodes.push(osc, g);
}

function accentCricket(ctx: AudioContext, master: GainNode, t: number) {
  // Rapid on/off high sine
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = rand(4000, 5500);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  const chirpLen = rand(0.3, 0.6);
  const pulseRate = 0.03;
  for (let i = 0; i < chirpLen / pulseRate; i += 2) {
    const on = t + i * pulseRate;
    g.gain.setValueAtTime(rand(0.01, 0.025), on);
    g.gain.setValueAtTime(0, on + pulseRate);
  }
  osc.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + chirpLen + 0.05);
  currentNodes.push(osc, g);
}

function accentBirdCall(ctx: AudioContext, master: GainNode, t: number) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  const f1 = rand(1800, 2600);
  const f2 = rand(2200, 3200);
  osc.frequency.setValueAtTime(f1, t);
  osc.frequency.linearRampToValueAtTime(f2, t + 0.12);
  osc.frequency.linearRampToValueAtTime(f1 * 0.9, t + 0.25);
  const vib = ctx.createOscillator();
  vib.frequency.value = rand(8, 15);
  const vibG = ctx.createGain();
  vibG.gain.value = rand(30, 80);
  vib.connect(vibG); vibG.connect(osc.frequency);
  vib.start(t); vib.stop(t + 0.3);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(rand(0.02, 0.04), t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  osc.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + 0.35);
  currentNodes.push(osc, g, vib, vibG);
}

function accentWindChime(ctx: AudioContext, master: GainNode, t: number) {
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  const note = pick(notes);
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = note * rand(0.98, 1.02); // slight detune
  const g = ctx.createGain();
  g.gain.setValueAtTime(rand(0.02, 0.04), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + rand(0.8, 1.5));
  osc.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + 1.5);
  currentNodes.push(osc, g);
}

function accentGlassClink(ctx: AudioContext, master: GainNode, t: number) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = rand(1800, 3000);
  const g = ctx.createGain();
  g.gain.setValueAtTime(rand(0.015, 0.03), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + 0.15);
  currentNodes.push(osc, g);
}

function accentCreak(ctx: AudioContext, master: GainNode, t: number) {
  const buf = createNoiseBuffer(ctx, 0.4);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.Q.value = 5;
  bp.frequency.setValueAtTime(800, t);
  bp.frequency.linearRampToValueAtTime(2000, t + 0.35);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(rand(0.02, 0.04), t + 0.1);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  src.connect(bp); bp.connect(g); g.connect(master);
  src.start(t); src.stop(t + 0.45);
  currentNodes.push(src, bp, g);
}

function accentDistantVoice(ctx: AudioContext, master: GainNode, t: number) {
  const buf = createNoiseBuffer(ctx, 0.6);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = rand(600, 1500); bp.Q.value = 1.5;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(rand(0.015, 0.03), t + 0.08);
  g.gain.exponentialRampToValueAtTime(0.001, t + rand(0.3, 0.5));
  src.connect(bp); bp.connect(g); g.connect(master);
  src.start(t); src.stop(t + 0.6);
  currentNodes.push(src, bp, g);
}

function accentFerryHorn(ctx: AudioContext, master: GainNode, t: number) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = rand(105, 115);
  const vib = ctx.createOscillator();
  vib.frequency.value = rand(4, 6);
  const vibG = ctx.createGain();
  vibG.gain.value = 3;
  vib.connect(vibG); vibG.connect(osc.frequency);
  vib.start(t);
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = rand(100, 200); bp.Q.value = 0.5;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(rand(0.06, 0.1), t + 0.3);
  g.gain.setValueAtTime(rand(0.06, 0.1), t + 1.0);
  g.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
  osc.connect(bp); bp.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + 2.0); vib.stop(t + 2.0);
  currentNodes.push(osc, bp, g, vib, vibG);
}

// Accent pool per ambience type
type AccentFn = (ctx: AudioContext, master: GainNode, t: number) => void;

const ACCENT_POOL: Record<AmbienceBase, AccentFn[]> = {
  'water-calm': [accentGullCry, accentWaveSlap],
  'water-open': [accentGullCry, accentWaveSlap, accentGullCry],
  'ferry-engine': [accentMetalClank, accentCreak],
  'ferry-deck': [accentGullCry, accentMetalClank, accentFerryHorn],
  'indoor-quiet': [accentCreak],
  'indoor-cafe': [accentGlassClink, accentDistantVoice, accentGlassClink],
  'crowd-market': [accentDistantVoice, accentDistantVoice],
  'crowd-street': [accentDistantVoice],
  'night-wind': [accentCricket, accentCricket],
  'night-urban': [accentCricket],
  'forest': [accentBirdCall, accentCricket, accentBirdCall],
  'garden': [accentBirdCall, accentWindChime],
  'silence': [],
};

// --- Base ambience generators (all randomized) ---

function createWaterCalmAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = rand(300, 500) + tint.filterOffset;
  f.Q.value = rand(0.3, 0.7);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(0.8 * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(0.1, 0.25) * tint.lfoScale;
  const lg = ctx.createGain();
  lg.gain.value = rand(100, 200);
  lfo.connect(lg); lg.connect(f.frequency); lfo.start();
  noise.connect(f); f.connect(g); g.connect(master); noise.start();
  currentNodes.push(noise, f, g, lfo, lg);
}

function createWaterOpenAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  // Stronger waves + wind layer
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = rand(400, 700) + tint.filterOffset;
  f.Q.value = rand(0.4, 0.8);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(0.7 * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(0.15, 0.35) * tint.lfoScale;
  const lg = ctx.createGain();
  lg.gain.value = rand(150, 250);
  lfo.connect(lg); lg.connect(f.frequency); lfo.start();
  noise.connect(f); f.connect(g); g.connect(master); noise.start();
  // Wind layer
  const wind = ctx.createBufferSource();
  wind.buffer = createNoiseBuffer(ctx, 4); wind.loop = true;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = rand(1500, 2500);
  const wg = ctx.createGain();
  wg.gain.setValueAtTime(0, ctx.currentTime);
  wg.gain.setTargetAtTime(rand(0.05, 0.12) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  wind.connect(hp); hp.connect(wg); wg.connect(master); wind.start();
  currentNodes.push(noise, f, g, lfo, lg, wind, hp, wg);
}

function createFerryEngineAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = rand(50, 60);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass'; f.frequency.value = rand(100, 140) + tint.filterOffset; f.Q.value = rand(1.5, 2.5);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(0.6 * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  osc.connect(f); f.connect(g); g.connect(master); osc.start();
  // Subtle rumble underneath
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const nf = ctx.createBiquadFilter();
  nf.type = 'lowpass'; nf.frequency.value = rand(180, 280);
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0, ctx.currentTime);
  ng.gain.setTargetAtTime(rand(0.15, 0.3) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  noise.connect(nf); nf.connect(ng); ng.connect(master); noise.start();
  currentNodes.push(osc, f, g, noise, nf, ng);
}

function createFerryDeckAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  // Engine + wind + water
  createFerryEngineAmbience(ctx, master, tint);
  // Add wind
  const wind = ctx.createBufferSource();
  wind.buffer = createNoiseBuffer(ctx, 4); wind.loop = true;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = rand(1200, 2000);
  const wg = ctx.createGain();
  wg.gain.setValueAtTime(0, ctx.currentTime);
  wg.gain.setTargetAtTime(rand(0.08, 0.15) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  wind.connect(hp); hp.connect(wg); wg.connect(master); wind.start();
  currentNodes.push(wind, hp, wg);
}

function createIndoorQuietAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = rand(150, 250) + tint.filterOffset;
  f.Q.value = rand(0.2, 0.4);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(rand(0.3, 0.5) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  noise.connect(f); f.connect(g); g.connect(master); noise.start();
  currentNodes.push(noise, f, g);
}

function createIndoorCafeAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  // Room tone base
  createIndoorQuietAmbience(ctx, master, tint);
  // Muffled crowd layer
  const crowd = ctx.createBufferSource();
  crowd.buffer = createNoiseBuffer(ctx, 4); crowd.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = rand(600, 1200); bp.Q.value = rand(0.5, 1.0);
  const cg = ctx.createGain();
  cg.gain.setValueAtTime(0, ctx.currentTime);
  cg.gain.setTargetAtTime(rand(0.08, 0.15) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  // Slow ebb
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(0.05, 0.12) * tint.lfoScale;
  const lg = ctx.createGain();
  lg.gain.value = rand(0.03, 0.06);
  lfo.connect(lg); lg.connect(cg.gain); lfo.start();
  crowd.connect(bp); bp.connect(cg); cg.connect(master); crowd.start();
  currentNodes.push(crowd, bp, cg, lfo, lg);
}

function createCrowdMarketAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = rand(700, 1000) + tint.filterOffset;
  bp.Q.value = rand(0.3, 0.5);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(rand(0.4, 0.6) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(0.06, 0.12) * tint.lfoScale;
  const lg = ctx.createGain();
  lg.gain.value = rand(0.1, 0.2);
  lfo.connect(lg); lg.connect(g.gain); lfo.start();
  noise.connect(bp); bp.connect(g); g.connect(master); noise.start();
  // Higher shimmer layer for market energy
  const shimmer = ctx.createBufferSource();
  shimmer.buffer = createNoiseBuffer(ctx, 4); shimmer.loop = true;
  const hf = ctx.createBiquadFilter();
  hf.type = 'highpass'; hf.frequency.value = rand(2000, 3500);
  const sg = ctx.createGain();
  sg.gain.setValueAtTime(0, ctx.currentTime);
  sg.gain.setTargetAtTime(rand(0.02, 0.05) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  shimmer.connect(hf); hf.connect(sg); sg.connect(master); shimmer.start();
  currentNodes.push(noise, bp, g, lfo, lg, shimmer, hf, sg);
}

function createCrowdStreetAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = rand(500, 800) + tint.filterOffset;
  bp.Q.value = rand(0.2, 0.4);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(rand(0.25, 0.4) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(0.04, 0.08) * tint.lfoScale;
  const lg = ctx.createGain();
  lg.gain.value = rand(0.06, 0.12);
  lfo.connect(lg); lg.connect(g.gain); lfo.start();
  noise.connect(bp); bp.connect(g); g.connect(master); noise.start();
  currentNodes.push(noise, bp, g, lfo, lg);
}

function createNightWindAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = rand(200, 300) + tint.filterOffset;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(rand(0.2, 0.3) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(0.07, 0.15) * tint.lfoScale;
  const lg = ctx.createGain();
  lg.gain.value = rand(60, 120);
  lfo.connect(lg); lg.connect(f.frequency); lfo.start();
  noise.connect(f); f.connect(g); g.connect(master); noise.start();
  currentNodes.push(noise, f, g, lfo, lg);
}

function createNightUrbanAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  // Wind base
  createNightWindAmbience(ctx, master, tint);
  // Distant city hum
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = rand(55, 65); // mains hum
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(rand(0.01, 0.025) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  osc.connect(g); g.connect(master); osc.start();
  currentNodes.push(osc, g);
}

function createForestAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  // Leaf rustle (highpass noise)
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = rand(1500, 3000);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(rand(0.06, 0.12) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  // Wind gusts on filter
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(0.08, 0.18) * tint.lfoScale;
  const lg = ctx.createGain();
  lg.gain.value = rand(300, 600);
  lfo.connect(lg); lg.connect(hp.frequency); lfo.start();
  noise.connect(hp); hp.connect(g); g.connect(master); noise.start();
  // Low wind base
  const wind = ctx.createBufferSource();
  wind.buffer = createNoiseBuffer(ctx, 4); wind.loop = true;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = rand(200, 350) + tint.filterOffset;
  const wg = ctx.createGain();
  wg.gain.setValueAtTime(0, ctx.currentTime);
  wg.gain.setTargetAtTime(rand(0.15, 0.25) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  wind.connect(lp); lp.connect(wg); wg.connect(master); wind.start();
  currentNodes.push(noise, hp, g, lfo, lg, wind, lp, wg);
}

function createGardenAmbience(ctx: AudioContext, master: GainNode, tint: EpisodeTint) {
  // Gentle wind
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4); noise.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass'; f.frequency.value = rand(250, 400) + tint.filterOffset;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.setTargetAtTime(rand(0.15, 0.25) * tint.gainScale, ctx.currentTime, FADE_TIME / 3);
  noise.connect(f); f.connect(g); g.connect(master); noise.start();
  currentNodes.push(noise, f, g);
}

// --- Mood modifiers (applied on top of base) ---

function applyMoodModifier(ctx: AudioContext, master: GainNode, mood: MoodModifier) {
  if (mood === 'neutral' || mood === 'melancholy') return;

  if (mood === 'tense' || mood === 'urgent') {
    // Low-frequency amplitude pulse
    const pulse = ctx.createOscillator();
    pulse.frequency.value = mood === 'urgent' ? 0.7 : 0.4;
    const pg = ctx.createGain();
    pg.gain.value = mood === 'urgent' ? 0.06 : 0.03;
    pulse.connect(pg);
    pg.connect(master.gain);
    pulse.start();
    currentNodes.push(pulse, pg);
  }

  if (mood === 'urgent') {
    // Dissonant low drone (2Hz beat)
    const d1 = ctx.createOscillator();
    d1.type = 'sine'; d1.frequency.value = 48;
    const d2 = ctx.createOscillator();
    d2.type = 'sine'; d2.frequency.value = 50;
    const dg = ctx.createGain();
    dg.gain.setValueAtTime(0, ctx.currentTime);
    dg.gain.setTargetAtTime(0.04, ctx.currentTime, 0.5);
    d1.connect(dg); d2.connect(dg); dg.connect(master);
    d1.start(); d2.start();
    currentNodes.push(d1, d2, dg);
  }
}

// --- Resolver ---

function resolveAmbience(location: string): AmbienceBase {
  if (LOCATION_AMBIENCE[location]) return LOCATION_AMBIENCE[location];

  const l = location.toLowerCase();
  if (l.includes('ferry') || l.includes('marmara') || l.includes('bosphorus')) {
    return l.includes('cabin') || l.includes('counter') || l.includes('bridge') ? 'ferry-engine' : 'ferry-deck';
  }
  if (l.includes('pier') || l.includes('waterfront') || l.includes('shore') || l.includes('cove') || l.includes('iskele')) return 'water-calm';
  if (l.includes('market') || l.includes('carsi') || l.includes('çarşı') || l.includes('spice') || l.includes('record')) return 'crowd-market';
  if (l.includes('caddesi') || l.includes('street')) return 'crowd-street';
  if (l.includes('meyhane') || l.includes('cafe') || l.includes('kahve') || l.includes('bakkal')) return 'indoor-cafe';
  if (l.includes('mansion') || l.includes('gallery') || l.includes('shop') || l.includes('evi') || l.includes('apartment') || l.includes('cabin') || l.includes('airport')) return 'indoor-quiet';
  if (l.includes('forest') || l.includes('pine')) return 'forest';
  if (l.includes('garden')) return 'garden';
  if (l.includes('night') || l.includes('hill') || l.includes('courtyard')) {
    return l.includes('kadıköy') || l.includes('kadikoy') || l.includes('istanbul') ? 'night-urban' : 'night-wind';
  }

  return 'indoor-quiet';
}

// --- Main play function ---

function playAmbience(ambience: AmbienceBase, ctx: AudioContext, opts: AmbienceOpts) {
  if (ambience === currentAmbience) return;

  if (ambienceTimeout) { clearTimeout(ambienceTimeout); ambienceTimeout = null; }
  stopCurrent();
  currentAmbience = ambience;
  if (!masterGain || ambience === 'silence') return;

  const tint = getTint(opts.episode);
  const mood = getMood(opts.phase);

  // Play base ambience
  switch (ambience) {
    case 'water-calm': createWaterCalmAmbience(ctx, masterGain, tint); break;
    case 'water-open': createWaterOpenAmbience(ctx, masterGain, tint); break;
    case 'ferry-engine': createFerryEngineAmbience(ctx, masterGain, tint); break;
    case 'ferry-deck': createFerryDeckAmbience(ctx, masterGain, tint); break;
    case 'indoor-quiet': createIndoorQuietAmbience(ctx, masterGain, tint); break;
    case 'indoor-cafe': createIndoorCafeAmbience(ctx, masterGain, tint); break;
    case 'crowd-market': createCrowdMarketAmbience(ctx, masterGain, tint); break;
    case 'crowd-street': createCrowdStreetAmbience(ctx, masterGain, tint); break;
    case 'night-wind': createNightWindAmbience(ctx, masterGain, tint); break;
    case 'night-urban': createNightUrbanAmbience(ctx, masterGain, tint); break;
    case 'forest': createForestAmbience(ctx, masterGain, tint); break;
    case 'garden': createGardenAmbience(ctx, masterGain, tint); break;
  }

  // Apply mood modifier
  applyMoodModifier(ctx, masterGain, mood);

  // Play accent sounds (randomized)
  const pool = ACCENT_POOL[ambience] || [];
  if (pool.length > 0 && Math.random() < tint.accentProb) {
    const accent = pick(pool);
    const accentTime = ctx.currentTime + rand(0.5, 2.0);
    accent(ctx, masterGain, accentTime);
    // Maybe a second accent
    if (pool.length > 1 && Math.random() < 0.3) {
      const accent2 = pick(pool.filter(a => a !== accent));
      if (accent2) {
        accent2(ctx, masterGain, ctx.currentTime + rand(1.5, 2.5));
      }
    }
  }

  // Auto-stop after duration
  ambienceTimeout = setTimeout(() => {
    stopCurrent();
    currentAmbience = null;
    ambienceTimeout = null;
  }, AMBIENCE_DURATION * 1000);
}

// --- Public API ---

export function setAmbience(location: string, opts?: AmbienceOpts) {
  if (!enabled) return;

  const ambience = resolveAmbience(location);
  if (ambience === currentAmbience) return;

  const ctx = getContext();
  if (!ctx) return; // Web Audio unavailable — stay silent rather than throw
  if (ctx.state === 'suspended') {
    pendingAmbience = location;
    pendingOpts = opts || {};
    ctx.resume().then(() => {
      if (pendingAmbience) {
        const loc = pendingAmbience;
        const po = pendingOpts;
        pendingAmbience = null;
        pendingOpts = {};
        playAmbience(resolveAmbience(loc), audioCtx!, po);
      }
    }).catch(() => {
      pendingAmbience = location;
      pendingOpts = opts || {};
    });
    return;
  }

  playAmbience(ambience, ctx, opts || {});
}

export function resumeIfNeeded() {
  if (!enabled || !audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      if (pendingAmbience) {
        const loc = pendingAmbience;
        const po = pendingOpts;
        pendingAmbience = null;
        pendingOpts = {};
        playAmbience(resolveAmbience(loc), audioCtx!, po);
      }
    });
  }
}

export function setAudioEnabled(on: boolean) {
  enabled = on;
  if (!on) { stopCurrent(); currentAmbience = null; }
  try { localStorage.setItem('bosphorus-ferry-audio', on ? 'on' : 'off'); } catch { /* noop */ }
}

export function isAudioEnabled(): boolean {
  if (!enabled) {
    try {
      const stored = localStorage.getItem('bosphorus-ferry-audio');
      if (stored === 'on') enabled = true;
    } catch { /* noop */ }
  }
  return enabled;
}

export function setMasterVolume(vol: number) {
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(Math.max(0, Math.min(0.4, vol)), audioCtx.currentTime, 0.1);
  }
}
