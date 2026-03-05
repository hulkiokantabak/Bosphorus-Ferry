import { GameState } from '../types';

export type EndingType = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'D1' | 'D2';

export function calculateEnding(state: GameState): EndingType {
  const { axes, flags } = state;

  // Ending A: Justice (Bold + Methodical + Evidence-heavy)
  if (
    flags.has_evidence_package &&
    axes.method > 0.3 &&
    axes.approach > 0
  ) {
    // A1: Publish as journalism (more bold)
    // A2: Hand to police (more cautious)
    return axes.approach > 0.5 ? 'A1' : 'A2';
  }

  // Ending B: The Deal (Cautious + Open + Relationship-heavy)
  if (axes.trust > 0.3 && !flags.compromised) {
    // B1: Accept deal (more cautious)
    // B2: Refuse deal → escalates (more bold)
    return axes.approach < 0 ? 'B1' : 'B2';
  }

  // Ending C: Disappear Together (Empathetic + Instinct)
  if (axes.heart > 0.3 && flags.found_defne) {
    // C1: Leave Turkey entirely (more detached from Istanbul)
    // C2: Relocate and build a case (more methodical)
    return axes.method < 0 ? 'C1' : 'C2';
  }

  // Ending D: The Chase (Compromised + Bold, or fallback)
  if (flags.compromised || flags.tayfun_alert) {
    // D1: Make the last ferry (lucky/prepared)
    // D2: Missed ferry, hide until dawn (less prepared)
    return axes.method > 0 ? 'D1' : 'D2';
  }

  // Default fallback: Ending B1
  return 'B1';
}

export function getEndingTitle(ending: EndingType): string {
  const titles: Record<EndingType, string> = {
    A1: 'Justice — The Story',
    A2: 'Justice — The Anonymous Tip',
    B1: 'The Deal — Silence for Safety',
    B2: 'The Deal — Refused',
    C1: 'Disappear Together — A New Country',
    C2: 'Disappear Together — A New City',
    D1: 'The Chase — The Last Ferry',
    D2: 'The Chase — Until Dawn',
  };
  return titles[ending];
}
