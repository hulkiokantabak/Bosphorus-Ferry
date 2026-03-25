// Procedural ambient audio using Web Audio API
// No external files needed — generates atmosphere from oscillators and noise

type Ambience = 'water' | 'indoor' | 'crowd' | 'ferry' | 'night' | 'silence';

const LOCATION_AMBIENCE: Record<string, Ambience> = {
  // Ferry scenes
  'Bosphorus Ferry': 'ferry',
  'Ferry': 'ferry',
  'Marmara Sea Ferry': 'ferry',

  // Water/outdoor
  'Kadikoy Pier': 'water',
  'Moda Waterfront': 'water',
  'Arnavutkoy Waterfront': 'water',

  // Indoor
  'Baski Evi': 'indoor',
  'Liman Meyhane': 'indoor',
  'Melis Cafe': 'indoor',

  // Crowd/market
  'Kadikoy Carsi': 'crowd',
  'Bahariye Caddesi': 'crowd',

  // Night/quiet
  'Buyukada': 'night',
};

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let currentNodes: AudioNode[] = [];
let currentAmbience: Ambience | null = null;
let enabled = false;

const FADE_TIME = 2.0; // seconds

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.15; // subtle
    masterGain.connect(audioCtx.destination);
  }
  return audioCtx;
}

function createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * seconds;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function stopCurrent() {
  if (!audioCtx || !masterGain) return;
  const now = audioCtx.currentTime;
  // Fade out existing
  for (const node of currentNodes) {
    try {
      if (node instanceof GainNode) {
        node.gain.setTargetAtTime(0, now, FADE_TIME / 4);
      }
    } catch { /* noop */ }
  }
  // Disconnect after fade
  const toDisconnect = [...currentNodes];
  setTimeout(() => {
    for (const node of toDisconnect) {
      try { node.disconnect(); } catch { /* noop */ }
    }
  }, FADE_TIME * 1000);
  currentNodes = [];
}

function createWaterAmbience(ctx: AudioContext, master: GainNode) {
  // Pink noise through a low bandpass = ocean/waves
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4);
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 400;
  filter.Q.value = 0.5;

  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.gain.setTargetAtTime(0.8, ctx.currentTime, FADE_TIME / 3);

  // Subtle LFO on filter for wave motion
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.15;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 150;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start();

  currentNodes.push(noise, filter, gain, lfo, lfoGain);
}

function createFerryAmbience(ctx: AudioContext, master: GainNode) {
  // Low drone = engine hum
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 55;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 120;
  filter.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.gain.setTargetAtTime(0.6, ctx.currentTime, FADE_TIME / 3);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start();

  // Add subtle water underneath
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4);
  noise.loop = true;
  const nFilter = ctx.createBiquadFilter();
  nFilter.type = 'lowpass';
  nFilter.frequency.value = 300;
  const nGain = ctx.createGain();
  nGain.gain.value = 0;
  nGain.gain.setTargetAtTime(0.3, ctx.currentTime, FADE_TIME / 3);
  noise.connect(nFilter);
  nFilter.connect(nGain);
  nGain.connect(master);
  noise.start();

  currentNodes.push(osc, filter, gain, noise, nFilter, nGain);
}

function createIndoorAmbience(ctx: AudioContext, master: GainNode) {
  // Very quiet room tone — filtered brown noise
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4);
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 200;
  filter.Q.value = 0.3;

  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.gain.setTargetAtTime(0.4, ctx.currentTime, FADE_TIME / 3);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start();

  currentNodes.push(noise, filter, gain);
}

function createCrowdAmbience(ctx: AudioContext, master: GainNode) {
  // Noise with mid-frequency emphasis = crowd murmur
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4);
  noise.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 800;
  bp.Q.value = 0.4;

  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.gain.setTargetAtTime(0.5, ctx.currentTime, FADE_TIME / 3);

  // Slow amplitude modulation for crowd ebb/flow
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.08;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.15;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  lfo.start();

  noise.connect(bp);
  bp.connect(gain);
  gain.connect(master);
  noise.start();

  currentNodes.push(noise, bp, gain, lfo, lfoGain);
}

function createNightAmbience(ctx: AudioContext, master: GainNode) {
  // Very quiet — just a faint wind
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 4);
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 250;

  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.gain.setTargetAtTime(0.25, ctx.currentTime, FADE_TIME / 3);

  // Slow wind effect
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.1;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 80;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start();

  currentNodes.push(noise, filter, gain, lfo, lfoGain);
}

function resolveAmbience(location: string): Ambience {
  // Check exact match first
  if (LOCATION_AMBIENCE[location]) return LOCATION_AMBIENCE[location];

  // Check partial matches
  const lower = location.toLowerCase();
  if (lower.includes('ferry') || lower.includes('marmara') || lower.includes('bosphorus')) return 'ferry';
  if (lower.includes('pier') || lower.includes('waterfront') || lower.includes('shore') || lower.includes('cove')) return 'water';
  if (lower.includes('market') || lower.includes('carsi') || lower.includes('caddesi') || lower.includes('street')) return 'crowd';
  if (lower.includes('meyhane') || lower.includes('cafe') || lower.includes('cabin') || lower.includes('shop') || lower.includes('evi') || lower.includes('gallery') || lower.includes('mansion') || lower.includes('kitchen')) return 'indoor';
  if (lower.includes('night') || lower.includes('hill') || lower.includes('garden') || lower.includes('forest') || lower.includes('courtyard')) return 'night';

  return 'indoor'; // default
}

export function setAmbience(location: string) {
  if (!enabled) return;

  const ambience = resolveAmbience(location);
  if (ambience === currentAmbience) return; // no change needed

  const ctx = getContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  stopCurrent();
  currentAmbience = ambience;

  if (!masterGain) return;

  switch (ambience) {
    case 'water': createWaterAmbience(ctx, masterGain); break;
    case 'ferry': createFerryAmbience(ctx, masterGain); break;
    case 'indoor': createIndoorAmbience(ctx, masterGain); break;
    case 'crowd': createCrowdAmbience(ctx, masterGain); break;
    case 'night': createNightAmbience(ctx, masterGain); break;
    case 'silence': break;
  }
}

export function setAudioEnabled(on: boolean) {
  enabled = on;
  if (!on) {
    stopCurrent();
    currentAmbience = null;
  }
  try {
    localStorage.setItem('bosphorus-ferry-audio', on ? 'on' : 'off');
  } catch { /* noop */ }
}

export function isAudioEnabled(): boolean {
  if (!enabled) {
    try {
      const stored = localStorage.getItem('bosphorus-ferry-audio');
      if (stored === 'on') {
        enabled = true;
      }
    } catch { /* noop */ }
  }
  return enabled;
}

export function setMasterVolume(vol: number) {
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(Math.max(0, Math.min(0.4, vol)), audioCtx.currentTime, 0.1);
  }
}
