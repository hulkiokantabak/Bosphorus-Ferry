import { ChoiceCondition, GameState } from '../types';

export function checkCondition(
  condition: ChoiceCondition | undefined,
  state: GameState
): boolean {
  if (!condition) return true;

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
