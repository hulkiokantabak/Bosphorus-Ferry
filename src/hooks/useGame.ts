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
  applyChoiceEffects,
} from '../engine/gameEngine';
import { calculateEnding, EndingType } from '../engine/endingCalculator';
import { trackSceneVisit, trackChoice, trackEnding, trackGameStart, recordLocalPlaythrough } from '../engine/analytics';

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
    trackGameStart(true);
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
      // Track choice
      trackChoice(gameState.currentScene, choice.text, choice.next);

      // Check if this leads to an ending
      if (choice.next === 'ending_calculate') {
        // Apply the chosen choice's effects BEFORE scoring the ending, so flags
        // like has_evidence_package / found_defne and heart axisShifts the
        // calculator depends on are reflected in the final score.
        const postChoiceState = applyChoiceEffects(gameState, choice);
        const endingType = calculateEnding(postChoiceState);
        setEnding(endingType);
        // Navigate to the ending scene
        const endingSceneId = `ending_${endingType.toLowerCase()}`;
        const newState = {
          ...postChoiceState,
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
        // Game complete: clear the save so Continue does not dead-end on the
        // choice-less ending scene.
        clearSave();
        setScreen('ending');
        trackEnding(endingType, newState.visitedScenes.length, newState.choiceHistory.length);
        recordLocalPlaythrough(endingType, newState.visitedScenes.length, newState.choiceHistory.length);
        return;
      }

      // Check if next scene is an ending scene directly
      if (choice.next.startsWith('ending_')) {
        const endingType = choice.next.replace('ending_', '').toUpperCase() as EndingType;
        setEnding(endingType);
        const newState = makeChoice(gameState, choice);
        setGameState(newState);
        // Game complete: clear the save (makeChoice auto-saved the ending scene)
        // so Continue does not dead-end on the choice-less ending scene.
        clearSave();
        setScreen('ending');
        trackEnding(endingType, newState.visitedScenes.length, newState.choiceHistory.length);
        recordLocalPlaythrough(endingType, newState.visitedScenes.length, newState.choiceHistory.length);
        return;
      }

      const newState = makeChoice(gameState, choice);

      // Track scene visit
      const nextScene = getScene(choice.next);
      if (nextScene) {
        trackSceneVisit(nextScene.id, nextScene.episode, nextScene.location);
      }

      // Check for episode transition
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
    // When opening the journal from the menu on a fresh page load, hydrate from
    // the saved game first so the notebook reflects the player's actual progress
    // instead of the empty initial state.
    if (screen !== 'playing') {
      const saved = loadGame();
      if (saved) {
        setGameState(saved);
        setLastEpisode(saved.currentEpisode);
      }
    }
    setScreen('journal');
  }, [screen]);

  const handleJournalBack = useCallback(() => {
    setScreen(previousScreenRef.current);
  }, []);

  const handleSummary = useCallback(() => {
    setScreen('summary');
  }, []);

  const handleWhatIf = useCallback(() => {
    setScreen('whatif');
  }, []);

  const handleWhatIfBack = useCallback(() => {
    setScreen('summary');
  }, []);

  const startFromChapter = useCallback((episode: 1 | 2 | 3) => {
    clearSave();
    const initial = createInitialState();
    const sceneMap: Record<number, string> = {
      1: 'e1_opening',
      2: 'e2_opening',
      3: 'e3_opening',
    };

    // Canonical checkpoint states for Episode 2 and 3
    // Represent a "typical" playthrough up to that point
    const checkpoints: Record<number, Partial<GameState>> = {
      1: {},
      2: {
        flags: {
          talked_to_selim: true,
          talked_to_melis: true,
          talked_to_oguz: true,
          talked_to_irfan: true,
          heard_midnight_packages: true,
          cultivated_ruya: true,
          cultivated_cem: true,
          oguz_full_account: true,
        },
        npcTrust: {
          ...initial.npcTrust,
          selim: 1, melis: 1, oguz: 2, levent: 1,
          irfan: 1, ayse: 1, cem: 1, ruya: 1,
        },
        axes: { approach: 0.2, trust: 0.2, heart: 0.1, method: 0.1 },
      },
      3: {
        flags: {
          talked_to_selim: true,
          talked_to_melis: true,
          talked_to_oguz: true,
          talked_to_irfan: true,
          heard_midnight_packages: true,
          cultivated_ruya: true,
          cultivated_cem: true,
          oguz_full_account: true,
          met_naz: true,
          naz_confessed: true,
          naz_mentioned_island: true,
          met_bora: true,
          bora_allied: true,
          has_sude_photos: true,
          knows_vedat_name: true,
          hakan_deal: true,
          ruya_press_contact: true,
        },
        npcTrust: {
          ...initial.npcTrust,
          selim: 1, melis: 1, oguz: 2, levent: 1,
          irfan: 2, ayse: 1, cem: 2, ruya: 2,
          naz: 1, bora: 2, sude: 1, hakan: 1,
        },
        axes: { approach: 0.3, trust: 0.3, heart: 0.2, method: 0.2 },
      },
    };

    const checkpoint = checkpoints[episode] || {};
    const chapterState: GameState = {
      ...initial,
      ...checkpoint,
      currentEpisode: episode,
      currentScene: sceneMap[episode],
    };
    setGameState(chapterState);
    setEnding(null);
    setLastEpisode(episode);
    setTransitionEpisode(episode);
    setScreen('transition');
    trackGameStart(false, episode);
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
    handleWhatIf,
    handleWhatIfBack,
    startFromChapter,
  };
}
