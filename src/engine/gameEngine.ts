import { Scene, Choice, GameState } from '../types';
import { checkCondition } from './conditionChecker';
import { applyAxisShift, applyNpcTrust, saveGame } from './stateManager';

// Scene registry
const sceneRegistry: Map<string, Scene> = new Map();

export function registerScenes(scenes: Scene[]): void {
  for (const scene of scenes) {
    sceneRegistry.set(scene.id, scene);
  }
}

export function getScene(id: string): Scene | undefined {
  return sceneRegistry.get(id);
}

export function getSceneCount(): number {
  return sceneRegistry.size;
}

export function getAvailableChoices(scene: Scene, state: GameState): Choice[] {
  return scene.choices.filter((choice) =>
    checkCondition(choice.condition, state)
  );
}

export function makeChoice(
  state: GameState,
  choice: Choice
): GameState {
  const newState: GameState = {
    ...state,
    currentScene: choice.next,
    visitedScenes: [...state.visitedScenes, state.currentScene],
    choiceHistory: [
      ...state.choiceHistory,
      {
        scene: state.currentScene,
        choice: choice.text,
        episode: state.currentEpisode,
      },
    ],
  };

  // Apply effects
  if (choice.effects) {
    if (choice.effects.setFlags) {
      const newFlags = { ...newState.flags };
      for (const flag of choice.effects.setFlags) {
        newFlags[flag] = true;
      }
      newState.flags = newFlags;
    }

    if (choice.effects.axisShift) {
      newState.axes = applyAxisShift(newState.axes, choice.effects.axisShift);
    }

    if (choice.effects.npcTrust) {
      newState.npcTrust = applyNpcTrust(
        newState.npcTrust,
        choice.effects.npcTrust
      );
    }
  }

  // Detect episode transitions
  const nextScene = getScene(choice.next);
  if (nextScene && nextScene.episode !== state.currentEpisode) {
    newState.currentEpisode = nextScene.episode as 1 | 2 | 3;
  }

  // Auto-save
  saveGame(newState);

  return newState;
}
