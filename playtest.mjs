/**
 * Automated Playtest Script
 *
 * Verifies the game's scene graph, condition system, and state management
 * by simulating play-throughs without the browser/React layer.
 *
 * Run: node playtest.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Minimal engine reimplementation ───────────────────────────────

function clampAxis(v) { return Math.max(-1, Math.min(1, v)); }
function clampTrust(v) { return Math.max(-2, Math.min(3, v)); }

function checkCondition(cond, state) {
  if (!cond) return true;
  if (cond.flag && !state.flags[cond.flag]) return false;
  if (cond.flagFalse && state.flags[cond.flagFalse]) return false;
  if (cond.npcTrust) {
    const trust = state.npcTrust[cond.npcTrust.npc] ?? 0;
    if (trust < cond.npcTrust.min) return false;
  }
  if (cond.axis) {
    const val = state.axes[cond.axis.name];
    if (cond.axis.min !== undefined && val < cond.axis.min) return false;
    if (cond.axis.max !== undefined && val > cond.axis.max) return false;
  }
  return true;
}

function getAvailableChoices(scene, state) {
  return scene.choices.filter(c => checkCondition(c.condition, state));
}

function applyChoice(state, choice) {
  const s = {
    ...state,
    currentScene: choice.next,
    visitedScenes: [...state.visitedScenes, state.currentScene],
    flags: { ...state.flags },
    axes: { ...state.axes },
    npcTrust: { ...state.npcTrust },
  };
  if (choice.effects) {
    if (choice.effects.setFlags) {
      for (const f of choice.effects.setFlags) s.flags[f] = true;
    }
    if (choice.effects.axisShift) {
      for (const [k, v] of Object.entries(choice.effects.axisShift)) {
        s.axes[k] = clampAxis((s.axes[k] || 0) + v);
      }
    }
    if (choice.effects.npcTrust) {
      for (const [npc, delta] of Object.entries(choice.effects.npcTrust)) {
        s.npcTrust[npc] = clampTrust((s.npcTrust[npc] || 0) + delta);
      }
    }
  }
  return s;
}

function createState() {
  return {
    currentEpisode: 1,
    currentScene: 'e1_opening',
    axes: { approach: 0, trust: 0, heart: 0, method: 0 },
    npcTrust: { selim:0, melis:0, oguz:0, levent:0, irfan:0, ayse:0,
                cem:0, ruya:0, naz:0, bora:0, sude:0, hakan:0,
                vedat:0, filiz:0, defne:0, tayfun:0 },
    flags: {},
    visitedScenes: [],
  };
}

// ─── Parse scene data from TypeScript source files ─────────────────

function extractScenes(filePath) {
  let src = readFileSync(resolve(__dirname, filePath), 'utf-8');

  // Remove TypeScript imports and type annotations
  src = src.replace(/^import\s.*$/gm, '');
  src = src.replace(/^export default .*$/gm, '');
  src = src.replace(/:\s*Scene\[\]\s*=/g, ' =');
  src = src.replace(/as\s+string\[\]/g, '');

  // Find the array literal
  const match = src.match(/(?:const|let|var)\s+\w+\s*=\s*(\[[\s\S]*\]);/);
  if (!match) {
    console.error(`Could not extract scenes from ${filePath}`);
    return [];
  }

  // Evaluate the array (it's pure data, no code)
  try {
    return eval(`(${match[1]})`);
  } catch (e) {
    console.error(`Failed to parse ${filePath}: ${e.message}`);
    return [];
  }
}

// ─── Load all scene data ───────────────────────────────────────────

console.log('═══════════════════════════════════════════════════════');
console.log('  BOSPHORUS FERRY — Automated Playtest');
console.log('═══════════════════════════════════════════════════════\n');

const ep1 = extractScenes('src/data/episode1.ts');
const ep2 = extractScenes('src/data/episode2.ts');
const ep3 = extractScenes('src/data/episode3.ts');
const f1 = extractScenes('src/data/ferry1to2.ts');
const f2 = extractScenes('src/data/ferry2to3.ts');
const endings = extractScenes('src/data/endings.ts');

const allScenes = [...ep1, ...ep2, ...ep3, ...f1, ...f2, ...endings];
const sceneMap = new Map();
for (const s of allScenes) sceneMap.set(s.id, s);

console.log(`Loaded ${allScenes.length} scenes across 6 data files`);
console.log(`  Episode 1: ${ep1.length} scenes`);
console.log(`  Episode 2: ${ep2.length} scenes`);
console.log(`  Episode 3: ${ep3.length} scenes`);
console.log(`  Ferry 1→2: ${f1.length} scenes`);
console.log(`  Ferry 2→3: ${f2.length} scenes`);
console.log(`  Endings:   ${endings.length} scenes\n`);

let errors = 0;
let warnings = 0;

// ─── TEST 1: All scene links are valid ─────────────────────────────

console.log('TEST 1: Scene link integrity');
const allTargets = new Set();
const allIds = new Set(allScenes.map(s => s.id));

for (const scene of allScenes) {
  for (const choice of scene.choices) {
    allTargets.add(choice.next);
    if (!sceneMap.has(choice.next)) {
      console.error(`  ✗ BROKEN LINK: ${scene.id} → ${choice.next}`);
      errors++;
    }
  }
}

// Check for orphaned scenes (unreachable except e1_opening)
const reachable = new Set(['e1_opening']);
const queue = ['e1_opening'];
while (queue.length > 0) {
  const id = queue.shift();
  const scene = sceneMap.get(id);
  if (!scene) continue;
  for (const c of scene.choices) {
    if (!reachable.has(c.next)) {
      reachable.add(c.next);
      queue.push(c.next);
    }
  }
}

const orphaned = allScenes.filter(s => !reachable.has(s.id));
if (orphaned.length > 0) {
  console.warn(`  ⚠ ${orphaned.length} orphaned scene(s): ${orphaned.map(s => s.id).join(', ')}`);
  warnings += orphaned.length;
}

if (errors === 0 && orphaned.length === 0) {
  console.log(`  ✓ All ${allTargets.size} scene links valid, 0 orphaned scenes`);
}

// ─── TEST 2: Every non-ending scene has at least one unconditional or reachable choice

console.log('\nTEST 2: Dead-end detection (scenes with no unconditional choice)');
let deadEndCount = 0;
for (const scene of allScenes) {
  if (scene.choices.length === 0) {
    // Ending scenes have no choices — that's expected
    if (scene.phase === 'ending') continue;
    console.error(`  ✗ DEAD END (no choices): ${scene.id}`);
    errors++;
    deadEndCount++;
    continue;
  }
  const unconditional = scene.choices.filter(c => !c.condition);
  if (unconditional.length === 0) {
    // All choices are conditional — check that at least some combination works
    // Just flag it as a warning
    console.warn(`  ⚠ All choices conditional: ${scene.id} (${scene.choices.length} choices, all gated)`);
    warnings++;
    deadEndCount++;
  }
}
if (deadEndCount === 0) {
  console.log('  ✓ No dead-end scenes detected');
}

// ─── TEST 3: Ending scenes are reachable ───────────────────────────

console.log('\nTEST 3: Ending scene reachability');
const endingIds = ['ending_a1', 'ending_a2', 'ending_b1', 'ending_b2',
                   'ending_c1', 'ending_c2', 'ending_d1', 'ending_d2'];
for (const eid of endingIds) {
  if (!sceneMap.has(eid)) {
    console.error(`  ✗ MISSING ending scene: ${eid}`);
    errors++;
  } else if (!reachable.has(eid)) {
    console.error(`  ✗ UNREACHABLE ending: ${eid}`);
    errors++;
  } else {
    console.log(`  ✓ ${eid} — exists and reachable`);
  }
}

// ─── TEST 4: Simulate a full playthrough (Evidence/Alliance → A1) ──

console.log('\nTEST 4: Full playthrough simulation (Evidence Path → Ending A1)');

function simulatePath(targetChoiceHints) {
  let state = createState();
  let steps = 0;
  const maxSteps = 200;
  const path = [];

  while (steps < maxSteps) {
    const scene = sceneMap.get(state.currentScene);
    if (!scene) {
      return { error: `Scene not found: ${state.currentScene}`, steps, path, state };
    }

    path.push(state.currentScene);

    // Ending scene — done
    if (scene.choices.length === 0) {
      return { ending: state.currentScene, steps, path, state };
    }

    const available = getAvailableChoices(scene, state);
    if (available.length === 0) {
      return { error: `No available choices at: ${state.currentScene}`, steps, path, state };
    }

    // Pick choice based on hints, or first available
    let chosen = available[0];
    for (const hint of targetChoiceHints) {
      const match = available.find(c => c.text.toLowerCase().includes(hint.toLowerCase()) || c.next.toLowerCase().includes(hint.toLowerCase()));
      if (match) {
        chosen = match;
        break;
      }
    }

    state = applyChoice(state, chosen);
    steps++;
  }

  return { error: 'Max steps exceeded', steps, path, state };
}

// Path A1: Bold journalist who gathers evidence, allies with Rüya, publishes
const pathA1 = simulatePath([
  'fisherman', 'oguz', 'blue house', 'selim', 'cay', 'melis',
  'levent', 'confront', 'ferry',
  // Ferry 1
  'cem', 'journalist', 'pocket',
  // Episode 2
  'naz', 'journal', 'island', 'hakan', 'bora', 'sude',
  'evidence', 'photos', 'publish', 'send copies',
  // Ferry 2
  'irfan', 'ruya',
  // Episode 3
  'explore', 'filiz', 'defne', 'alliance', 'allies', 'rüya',
  'morning', 'publish', 'story',
  // Target ending
  'ending_a1',
]);

if (pathA1.error) {
  console.error(`  ✗ FAILED: ${pathA1.error}`);
  console.error(`    Last scene: ${pathA1.path[pathA1.path.length - 1]}`);
  console.error(`    Steps taken: ${pathA1.steps}`);
  errors++;
} else {
  console.log(`  ✓ Reached ${pathA1.ending} in ${pathA1.steps} steps`);
  console.log(`    Path: ${pathA1.path.length} scenes visited`);
  console.log(`    Flags set: ${Object.keys(pathA1.state.flags).filter(f => pathA1.state.flags[f]).join(', ')}`);
}

// ─── TEST 5: Simulate second playthrough (Relationship Path → varied ending)

console.log('\nTEST 5: Full playthrough simulation (Relationship Path)');

const pathB = simulatePath([
  'walk past', 'blue house', 'cover', 'browse', 'cay', 'levent',
  'dinner', 'ferry',
  // Ferry 1
  'ayse', 'name', 'thank',
  // Episode 2
  'record shop', 'meyhane', 'bora', 'friend', 'pier', 'hakan',
  'passage', 'eastern',
  // Ferry 2
  'cem', 'ruya',
  // Episode 3 — more cautious/trusting
  'explore', 'servants', 'defne', 'confront',
  'morning', 'police',
  'ending_a2', 'ending_b1', 'ending_b2',
]);

if (pathB.error) {
  console.error(`  ✗ FAILED: ${pathB.error}`);
  console.error(`    Last scene: ${pathB.path[pathB.path.length - 1]}`);
  console.error(`    Steps taken: ${pathB.steps}`);
  errors++;
} else {
  console.log(`  ✓ Reached ${pathB.ending} in ${pathB.steps} steps`);
  console.log(`    Path: ${pathB.path.length} scenes visited`);
  console.log(`    Flags set: ${Object.keys(pathB.state.flags).filter(f => pathB.state.flags[f]).join(', ')}`);
}

// ─── TEST 6: Exhaustive random walk test ───────────────────────────

console.log('\nTEST 6: Random walk test (100 random playthroughs)');
const endingsReached = new Map();
let failedRuns = 0;

for (let run = 0; run < 100; run++) {
  let state = createState();
  let steps = 0;
  const maxSteps = 200;
  let failed = false;

  while (steps < maxSteps) {
    const scene = sceneMap.get(state.currentScene);
    if (!scene) { failed = true; break; }
    if (scene.choices.length === 0) {
      endingsReached.set(state.currentScene, (endingsReached.get(state.currentScene) || 0) + 1);
      break;
    }
    const available = getAvailableChoices(scene, state);
    if (available.length === 0) { failed = true; break; }
    const chosen = available[Math.floor(Math.random() * available.length)];
    state = applyChoice(state, chosen);
    steps++;
  }

  if (failed || steps >= maxSteps) failedRuns++;
}

console.log(`  Completed: ${100 - failedRuns}/100 runs`);
if (failedRuns > 0) {
  console.error(`  ✗ ${failedRuns} runs failed (dead end or missing scene)`);
  errors += failedRuns;
}
console.log('  Endings reached:');
for (const [ending, count] of [...endingsReached.entries()].sort()) {
  console.log(`    ${ending}: ${count} times`);
}

// Check which endings were never reached
const unreachedEndings = endingIds.filter(e => !endingsReached.has(e));
if (unreachedEndings.length > 0) {
  console.warn(`  ⚠ Endings never reached in 100 random runs: ${unreachedEndings.join(', ')}`);
  warnings += unreachedEndings.length;
} else {
  console.log('  ✓ All 8 endings reached at least once');
}

// ─── TEST 7: Condition flag coverage ───────────────────────────────

console.log('\nTEST 7: Flag condition coverage');
const flagsSet = new Set();
const flagsChecked = new Set();

for (const scene of allScenes) {
  for (const choice of scene.choices) {
    if (choice.effects?.setFlags) {
      for (const f of choice.effects.setFlags) flagsSet.add(f);
    }
    if (choice.condition?.flag) flagsChecked.add(choice.condition.flag);
    if (choice.condition?.flagFalse) flagsChecked.add(choice.condition.flagFalse);
  }
}

// Also check endingCalculator flags
const endingFlags = ['has_evidence_package', 'compromised', 'found_defne', 'tayfun_alert'];
for (const f of endingFlags) flagsChecked.add(f);

const setButNeverChecked = [...flagsSet].filter(f => !flagsChecked.has(f));
const checkedButNeverSet = [...flagsChecked].filter(f => !flagsSet.has(f));

if (setButNeverChecked.length > 0) {
  console.warn(`  ⚠ Flags SET but never checked: ${setButNeverChecked.join(', ')}`);
  warnings += setButNeverChecked.length;
} else {
  console.log('  ✓ All set flags are checked somewhere');
}

if (checkedButNeverSet.length > 0) {
  console.warn(`  ⚠ Flags CHECKED but never set: ${checkedButNeverSet.join(', ')}`);
  warnings += checkedButNeverSet.length;
} else {
  console.log('  ✓ All checked flags are set somewhere');
}

console.log(`  Total unique flags: ${new Set([...flagsSet, ...flagsChecked]).size}`);

// ─── Summary ───────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════════════');
if (errors === 0) {
  console.log(`  ✓ PLAYTEST PASSED — ${warnings} warning(s), 0 errors`);
} else {
  console.log(`  ✗ PLAYTEST FAILED — ${errors} error(s), ${warnings} warning(s)`);
}
console.log('═══════════════════════════════════════════════════════\n');

process.exit(errors > 0 ? 1 : 0);
