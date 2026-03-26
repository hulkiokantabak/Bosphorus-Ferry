import { ChoiceCondition, GameState } from '../types';

export function checkCondition(
  condition: ChoiceCondition | undefined,
  state: GameState
): boolean {
  if (!condition) return true;

  // OR conditions: if any member passes, the whole condition passes
  if (condition.or && condition.or.length > 0) {
    return condition.or.some(sub => checkCondition(sub, state));
  }

  if (condition.flag) {
    if (!state.flags[condition.flag]) return false;
  }

  if (condition.flagFalse) {
    if (state.flags[condition.flagFalse]) return false;
  }

  if (condition.npcTrust) {
    const { npc, min } = condition.npcTrust;
    const trust = state.npcTrust[npc] ?? 0;
    if (trust < min) return false;
  }

  if (condition.axis) {
    const { name, min, max } = condition.axis;
    const value = state.axes[name];
    if (min !== undefined && value < min) return false;
    if (max !== undefined && value > max) return false;
  }

  return true;
}

/**
 * Get a human-readable hint for why a condition fails.
 * Returns null if the condition passes or has no displayable hint.
 */
export function getConditionHint(
  condition: ChoiceCondition | undefined,
  state: GameState
): string | null {
  if (!condition) return null;
  if (checkCondition(condition, state)) return null;

  // For OR conditions, show the most "helpful" sub-hint
  if (condition.or && condition.or.length > 0) {
    const hints = condition.or
      .map(sub => getConditionHint(sub, state))
      .filter(Boolean);
    return hints[0] || null;
  }

  // NPC trust hints are the most informative
  if (condition.npcTrust) {
    const { npc, min } = condition.npcTrust;
    const trust = state.npcTrust[npc] ?? 0;
    if (trust < min) {
      const npcNames: Record<string, string> = {
        selim: 'Selim', melis: 'Melis', oguz: 'Oğuz', levent: 'Levent',
        irfan: 'İrfan', ayse: 'Ayşe', cem: 'Cem', ruya: 'Rüya',
        naz: 'Naz', bora: 'Bora', sude: 'Sude', hakan: 'Hakan',
        vedat: 'Vedat', filiz: 'Filiz', defne: 'Defne', tayfun: 'Tayfun',
      };
      return `Requires ${npcNames[npc] || npc}'s trust`;
    }
  }

  // Flag hints
  if (condition.flag && !state.flags[condition.flag]) {
    return 'Requires earlier discovery';
  }

  // Axis hints
  if (condition.axis) {
    const { name, min, max } = condition.axis;
    const value = state.axes[name];
    const axisLabels: Record<string, string> = {
      approach: 'boldness', trust: 'openness', heart: 'empathy', method: 'method',
    };
    if (min !== undefined && value < min) return `Requires more ${axisLabels[name] || name}`;
    if (max !== undefined && value > max) return `Too much ${axisLabels[name] || name}`;
  }

  return 'Locked';
}
