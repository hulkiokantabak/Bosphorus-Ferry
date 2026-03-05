import { useState, useCallback, useRef } from 'react';
import { GameState, Choice, GameScreen } from '../types';
import {
  createInitialState,
  loadGame,
  saveGame,
  clearSave,
} from '../engine/stateManager';
import {
  registerScenes,
  getScene,
  makeChoice,
} from '../engine/gameEngine';
import { calculateEnding, EndingType } from '../engine/endingCalculator';

// Import all scene data
import episode1Scenes from '../data/episode1';
import episode2Scenes from '../data/episode2';
import episode3Scenes from '../data/episode3';
import ferry1to2Scenes from '../data/ferry1to2';
import ferry2to3Scenes from '../data/ferry2to3';
import endingScenes from '../data/endings';

// Register all scenes on module load
const allScenes = [
  ...episode1Scenes,
  ...ferry1to2Scenes,
  ...episode2Scenes,
  ...ferry2to3Scenes,
  ...episode3Scenes,
  ...endingScenes,
];
registerScenes(allScenes);

export function useGame() {
  const [screen, setScreen] = useState<GameScreen>('intro');
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [transitionEpisode, setTransitionEpisode] = useState<number>(1);
  const [ending, setEnding] = useState<EndingType | null>(null);
  const [lastEpisode, setLastEpisode] = useState<number>(1);
  const previousScreenRef = useRef<GameScreen>('menu');

  // Get current scene
  const currentScene = getScene(gameState.currentScene);

  const handleIntroComplete = useCallback(() => {
    setScreen('menu');
  }, []);

  const startNewGame = useCallback(() => {
    clearSave();
    const initial = createInitialState();
    setGameState(initial);
    setEnding(null);
    setLastEpisode(1);
    setTransitionEpisode(1);
    setScreen('briefing');
  }, []);

  const handleBriefingComplete = useCallback(() => {
    setScreen('transition');
  }, []);

  const continueGame = useCallback(() => {
    const saved = loadGame();
    if (saved) {
      setGameState(saved);
      setLastEpisode(saved.currentEpisode);
      setScreen('playing');
    } else {
      startNewGame();
    }
  }, [startNewGame]);

  const handleChoice = useCallback(
    (choice: Choice) => {
      // Check if this leads to an ending
      if (choice.next === 'ending_calculate') {
        const endingType = calculateEnding(gameState);
        setEnding(endingType);
        // Navigate to the ending scene
        const endingSceneId = `ending_${endingType.toLowerCase()}`;
        const newState = {
          ...gameState,
          currentScene: endingSceneId,
          visitedScenes: [...gameState.visitedScenes, gameState.currentScene],
          choiceHistory: [
            ...gameState.choiceHistory,
            {
              scene: gameState.currentScene,
              choice: choice.text,
              episode: gameState.currentEpisode,
            },
          ],
        };
        setGameState(newState);
        saveGame(newState);
        setScreen('ending');
        return;
      }

      // Check if next scene is an ending scene directly
      if (choice.next.startsWith('ending_')) {
        const endingType = choice.next.replace('ending_', '').toUpperCase() as EndingType;
        setEnding(endingType);
        const newState = makeChoice(gameState, choice);
        setGameState(newState);
        setScreen('ending');
        return;
      }

      const newState = makeChoice(gameState, choice);

      // Check for episode transition
      const nextScene = getScene(choice.next);
      if (nextScene && nextScene.episode !== lastEpisode) {
        setTransitionEpisode(nextScene.episode);
        setLastEpisode(nextScene.episode);
        setGameState(newState);
        setScreen('transition');
        return;
      }

      setGameState(newState);
    },
    [gameState, lastEpisode]
  );

  const handleTransitionComplete = useCallback(() => {
    setScreen('playing');
  }, []);

  const handleMainMenu = useCallback(() => {
    setScreen('menu');
    setEnding(null);
  }, []);

  const saveCurrentGame = useCallback(() => {
    saveGame(gameState);
  }, [gameState]);

  const handleJournal = useCallback(() => {
    previousScreenRef.current = screen === 'playing' ? 'playing' : 'menu';
    setScreen('journal');
  }, [screen]);

  const handleJournalBack = useCallback(() => {
    setScreen(previousScreenRef.current);
  }, []);

  const handleSummary = useCallback(() => {
    setScreen('summary');
  }, []);

  return {
    screen,
    gameState,
    currentScene,
    transitionEpisode,
    ending,
    handleIntroComplete,
    handleBriefingComplete,
    startNewGame,
    continueGame,
    handleChoice,
    handleTransitionComplete,
    handleMainMenu,
    saveCurrentGame,
    handleJournal,
    handleJournalBack,
    handleSummary,
  };
}
