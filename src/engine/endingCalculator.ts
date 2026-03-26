import { GameState } from '../types';

export type EndingType = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'D1' | 'D2';

interface EndingScore {
  ending: EndingType;
  score: number;
}

/**
 * Calculates ending using weighted scoring across axes, flags, and key NPC trust values.
 * Each ending family is scored independently; the highest-scoring ending wins.
 */
export function calculateEnding(state: GameState): EndingType {
  const { axes, flags, npcTrust } = state;

  const scores: EndingScore[] = [];

  // --- ENDING A: Justice (evidence-driven, methodical, bold) ---
  const aBase =
    (flags.has_evidence_package ? 3 : 0) +
    (flags.found_vedat_ledger ? 2 : 0) +
    (flags.has_sude_photos ? 1.5 : 0) +
    (flags.has_vedat_letter ? 1 : 0) +
    axes.method * 2 +
    axes.approach * 1.5 +
    (npcTrust.naz ?? 0) * 0.5 +
    (npcTrust.sude ?? 0) * 0.5;

  // A1: Bold publish — more approach, plus press contacts
  const a1Score = aBase +
    (axes.approach > 0.3 ? 1 : 0) +
    (flags.ruya_press_contact ? 1.5 : 0) +
    (npcTrust.ruya ?? 0) * 0.5;

  // A2: Anonymous tip — more cautious/trusting
  const a2Score = aBase +
    (axes.approach <= 0.3 ? 1 : 0) +
    (axes.trust > 0 ? 1 : 0) +
    (npcTrust.bora ?? 0) * 0.5;

  scores.push({ ending: 'A1', score: a1Score });
  scores.push({ ending: 'A2', score: a2Score });

  // --- ENDING B: The Deal (trust-heavy, cautious, relationship-driven) ---
  const bBase =
    axes.trust * 2.5 +
    (!flags.compromised ? 2 : 0) +
    (npcTrust.vedat ?? 0) * 0.5 +
    (npcTrust.filiz ?? 0) * 0.5 +
    (npcTrust.bora ?? 0) * 0.3;

  // B1: Accept deal — cautious, protective
  const b1Score = bBase +
    (axes.approach < 0 ? 1.5 : 0) +
    (axes.heart > 0 ? 1 : 0) +
    (flags.found_defne ? 1 : 0);

  // B2: Broker compromise — balanced, methodical
  const b2Score = bBase +
    (Math.abs(axes.approach) < 0.3 ? 1 : 0) +
    (axes.method > 0 ? 1 : 0);

  scores.push({ ending: 'B1', score: b1Score });
  scores.push({ ending: 'B2', score: b2Score });

  // --- ENDING C: Disappear Together (heart-driven, found Defne) ---
  const cBase =
    (flags.found_defne ? 3 : 0) +
    axes.heart * 2.5 +
    (npcTrust.defne ?? 0) * 1 +
    (npcTrust.melis ?? 0) * 0.3 +
    (flags.hakan_deal ? 1 : 0);

  // C1: Leave Turkey — instinctive, detached from Istanbul
  const c1Score = cBase +
    (axes.method < 0 ? 1.5 : 0) +
    (axes.trust < 0 ? 0.5 : 0);

  // C2: Relocate within Turkey — methodical, build a case from hiding
  const c2Score = cBase +
    (axes.method > 0 ? 1.5 : 0) +
    (flags.has_evidence_package ? 1 : 0);

  scores.push({ ending: 'C1', score: c1Score });
  scores.push({ ending: 'C2', score: c2Score });

  // --- ENDING D: The Chase (compromised, bold, desperate) ---
  const dBase =
    (flags.compromised ? 3 : 0) +
    (flags.tayfun_alert ? 2 : 0) +
    (flags.spotted_by_tayfun ? 1.5 : 0) +
    axes.approach * 1.5;

  // D1: Make the last ferry — prepared, methodical
  const d1Score = dBase +
    (axes.method > 0 ? 1.5 : 0) +
    (npcTrust.hakan ?? 0) * 0.5 +
    (npcTrust.irfan ?? 0) * 0.3;

  // D2: Hide until dawn — instinctive, less prepared
  const d2Score = dBase +
    (axes.method <= 0 ? 1.5 : 0) +
    (axes.heart > 0 ? 0.5 : 0);

  scores.push({ ending: 'D1', score: d1Score });
  scores.push({ ending: 'D2', score: d2Score });

  // Pick highest-scoring ending
  scores.sort((a, b) => b.score - a.score);

  // Minimum threshold: at least 3 points to avoid very weak matches
  if (scores[0].score >= 3) {
    return scores[0].ending;
  }

  // Fallback: B1 (the deal — the safe middle ground)
  return 'B1';
}

export function getEndingTitle(ending: EndingType): string {
  const titles: Record<EndingType, string> = {
    A1: 'Justice — The Story',
    A2: 'Justice — The Anonymous Tip',
    B1: 'The Deal — Silence for Safety',
    B2: 'The Deal — The Broker\'s Silence',
    C1: 'Disappear Together — A New Country',
    C2: 'Disappear Together — A New City',
    D1: 'The Chase — The Last Ferry',
    D2: 'The Chase — Until Dawn',
  };
  return titles[ending];
}
