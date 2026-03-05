import { useGame } from './hooks/useGame';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import EpisodeTransition from './components/EpisodeTransition';
import EndingScreen from './components/EndingScreen';
import IntroScreen from './components/IntroScreen';
import JournalScreen from './components/JournalScreen';
import BriefingScreen from './components/BriefingScreen';
import SummaryScreen from './components/SummaryScreen';

function App() {
  const {
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
  } = useGame();

  if (screen === 'intro') {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  if (screen === 'briefing') {
    return <BriefingScreen onContinue={handleBriefingComplete} />;
  }

  if (screen === 'menu') {
    return (
      <MainMenu
        onNewGame={startNewGame}
        onContinue={continueGame}
        onJournal={handleJournal}
      />
    );
  }

  if (screen === 'journal') {
    return <JournalScreen state={gameState} onBack={handleJournalBack} />;
  }

  if (screen === 'transition') {
    return (
      <EpisodeTransition
        episode={transitionEpisode}
        onComplete={handleTransitionComplete}
      />
    );
  }

  if (screen === 'ending' && ending && currentScene) {
    return (
      <EndingScreen
        ending={ending}
        epilogueText={currentScene.text}
        onMainMenu={handleMainMenu}
        onSummary={handleSummary}
      />
    );
  }

  if (screen === 'summary' && ending) {
    return (
      <SummaryScreen
        state={gameState}
        ending={ending}
        onMainMenu={handleMainMenu}
        onPlayAgain={startNewGame}
      />
    );
  }

  if (screen === 'playing' && currentScene) {
    return (
      <GameScreen
        scene={currentScene}
        state={gameState}
        onChoice={handleChoice}
        onSave={saveCurrentGame}
        onMainMenu={handleMainMenu}
        onJournal={handleJournal}
      />
    );
  }

  // Fallback
  return (
    <MainMenu
      onNewGame={startNewGame}
      onContinue={continueGame}
      onJournal={handleJournal}
    />
  );
}

export default App;
