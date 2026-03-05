export interface ChoiceCondition {
  flag?: string;
  flagFalse?: string;
  npcTrust?: { npc: string; min: number };
  axis?: { name: keyof CharacterAxes; min?: number; max?: number };
}

export interface ChoiceEffects {
  setFlags?: string[];
  axisShift?: Partial<CharacterAxes>;
  npcTrust?: Record<string, number>;
}

export interface Choice {
  text: string;
  next: string;
  condition?: ChoiceCondition;
  effects?: ChoiceEffects;
}

export interface Scene {
  id: string;
  episode: number;
  text: string;
  location: string;
  choices: Choice[];
  phase?: 'arrival' | 'exploration' | 'complication' | 'climax' | 'ferry' | 'ending';
  npcPresent?: string[];
}

export interface CharacterAxes {
  approach: number;
  trust: number;
  heart: number;
  method: number;
}

export interface ChoiceHistoryEntry {
  scene: string;
  choice: string;
  episode: number;
}

export interface GameState {
  currentEpisode: 1 | 2 | 3;
  currentScene: string;
  axes: CharacterAxes;
  npcTrust: Record<string, number>;
  flags: Record<string, boolean>;
  visitedScenes: string[];
  choiceHistory: ChoiceHistoryEntry[];
}

export type GameScreen = 'intro' | 'menu' | 'briefing' | 'playing' | 'transition' | 'ending' | 'journal' | 'summary';
