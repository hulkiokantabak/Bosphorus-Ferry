// Procedural ambient audio using Web Audio API
// No external files needed — generates atmosphere from oscillators and noise

type Ambience = 'water' | 'indoor' | 'crowd' | 'ferry' | 'night' | 'silence';

const LOCATION_AMBIENCE: Record<string, Ambience> = {
  // Ferry scenes
  'Bosphorus Ferry': 'ferry',
  'Bosphorus Ferry — Night': 'ferry',
  'Beşiktaş-Arnavutköy Ferry': 'ferry',
  'Ferry — Upper Deck': 'ferry',
  'Ferry — Tea Counter': 'ferry',
  'Ferry — Lower Cabin': 'ferry',
  "Ferry — Captain's Bridge": 'ferry',
  'Marmara Sea Ferry — Evening': 'ferry',
  'Marmara Sea Ferry — Deck': 'ferry',
  'Marmara Sea — Night': 'ferry',
  'Büyükada — Morning Ferry': 'ferry',
  'Büyükada — Dawn Ferry': 'ferry',

  // Water/outdoor
  'Kadıköy Pier': 'water',
  'Kadıköy Pier - Night': 'water',
  'Kadıköy Pier - Tea House': 'water',
  'Kadıköy Pier - Yildiz Cabin': 'water',
  'Moda Waterfront': 'water',
  'Arnavutköy Waterfront': 'water',
  'Arnavutköy Iskele': 'water',
  'Old Dock': 'water',
  'Büyükada İskelesi': 'water',
  'Kadıköy İskelesi': 'water',
  'Büyükada — Waterfront': 'water',
  'Büyükada — Back Pier': 'water',

  // Indoor
  'Baskı Evi': 'indoor',
  'Baskı Evi - Back Alley': 'indoor',
  'Liman Meyhane': 'indoor',
  'Melisin Yeri Cafe': 'indoor',
  'Köşk Antik': 'indoor',
  'Köşk Antik Rear': 'indoor',
  'Levent Gallery': 'indoor',
  'Defne Apartment': 'indoor',
  'Defne Apartment Exterior': 'indoor',
  'Kadıköy Kahvehane': 'indoor',
  'Büyükada — Mansion Gallery': 'indoor',
  "Büyükada — Vedat's Study": 'indoor',
  "Büyükada — Servants' Quarters": 'indoor',
  'Büyükada — Mansion Veranda': 'indoor',
  'Büyükada Bakkal': 'indoor',
  'Istanbul Airport': 'indoor',

  // Crowd/market
  'Kadıköy Çarşı': 'crowd',
  'Kadıköy Çarşı - Record Shop': 'crowd',
  'Kadıköy Çarşı - Spice Stall': 'crowd',
  'Bahariye Caddesi': 'crowd',
  'İskele Caddesi': 'crowd',
  'Kadıköy Side Street': 'crowd',
  'Kadıköy Side Streets': 'crowd',
  'Side Street off Kadıköy Çarşı': 'crowd',
  'Arnavutköy Side Street': 'crowd',

  // Night/quiet
  'Büyükada Tea Garden': 'night',
  'Büyükada — Tea Garden': 'night',
  'Büyükada — Hill Road': 'night',
  'Büyükada — Pine Forest': 'night',
  'Büyükada — Pine Forest Path': 'night',
  'Büyükada — Mansion Gate': 'night',
  'Büyükada — Mansion Garden': 'night',
  'Büyükada — Mansion Grounds': 'night',
  'Büyükada — Mansion Wall': 'night',
  'Büyükada — Mansion Service Entrance': 'night',
  'Büyükada — Kitchen Garden': 'night',
  'Büyükada — Shuttle Stand': 'night',
  'Kadıköy — Hidden Courtyard': 'night',
  'Kadıköy — Safe Distance': 'night',
  'Aegean Coast': 'water',
  'Istanbul': 'crowd',
};

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let currentNodes: AudioNode[] = [];
let currentAmbience: Ambience | null = null;
let enabled = false;

const FADE_TIME = 2.0; // seconds
const AMBIENCE_DURATION = 3.0; // seconds — short burst, not continuous
let ambienceTimeout: ReturnType<typeof setTimeout> | null = null;

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

// Queue the desired ambience so it can start on the next user gesture if needed
let pendingAmbience: string | null = null;

export function setAmbience(location: string) {
  if (!enabled) return;

  const ambience = resolveAmbience(location);
  if (ambience === currentAmbience) return; // no change needed

  const ctx = getContext();
  if (ctx.state === 'suspended') {
    // Browser blocks resume outside user gestures — queue it
    pendingAmbience = location;
    ctx.resume().then(() => {
      // Context resumed successfully, play the pending ambience
      if (pendingAmbience) {
        const loc = pendingAmbience;
        pendingAmbience = null;
        playAmbience(resolveAmbience(loc), ctx);
      }
    }).catch(() => {
      // Still suspended — will retry on next user gesture via resumeIfNeeded
      pendingAmbience = location;
    });
    return;
  }

  playAmbience(ambience, ctx);
}

function playAmbience(ambience: Ambience, ctx: AudioContext) {
  if (ambience === currentAmbience) return;

  // Clear any pending auto-stop
  if (ambienceTimeout) {
    clearTimeout(ambienceTimeout);
    ambienceTimeout = null;
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

  // Auto-stop after AMBIENCE_DURATION — short atmospheric burst
  if (ambience !== 'silence') {
    ambienceTimeout = setTimeout(() => {
      stopCurrent();
      currentAmbience = null;
      ambienceTimeout = null;
    }, AMBIENCE_DURATION * 1000);
  }
}

/**
 * Call this from any user gesture (click, tap) to unblock the AudioContext.
 * Browsers require a user interaction before audio can play.
 */
export function resumeIfNeeded() {
  if (!enabled || !audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      if (pendingAmbience) {
        const loc = pendingAmbience;
        pendingAmbience = null;
        playAmbience(resolveAmbience(loc), audioCtx!);
      }
    });
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
