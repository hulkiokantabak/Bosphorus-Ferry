import { useState, useCallback, useRef, useEffect } from 'react';
import NarrativeText from './NarrativeText';
import ChoicePanel from './ChoicePanel';
import LocationHeader from './LocationHeader';
import SaveIndicator from './SaveIndicator';
import PauseMenu from './PauseMenu';
import JournalScreen from './JournalScreen';
import { Scene, Choice, GameState } from '../types';
import { getAvailableChoices } from '../engine/gameEngine';

interface GameScreenProps {
  scene: Scene;
  state: GameState;
  onChoice: (choice: Choice) => void;
  onSave: () => void;
  onMainMenu: () => void;
  onJournal: () => void;
}

export default function GameScreen({ scene, state, onChoice, onSave, onMainMenu, onJournal }: GameScreenProps) {
  const [showChoices, setShowChoices] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const choicesRef = useRef<HTMLDivElement>(null);
  const prevSceneRef = useRef(scene.id);

  // Reset choices visibility when scene changes
  useEffect(() => {
    if (prevSceneRef.current !== scene.id) {
      setShowChoices(false);
      setShowScrollHint(false);
      prevSceneRef.current = scene.id;
      // Scroll to top on scene change
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [scene.id]);

  // Show scroll hint when choices appear below the fold
  useEffect(() => {
    if (!showChoices || !choicesRef.current || !scrollRef.current) return;

    const checkVisibility = () => {
      const container = scrollRef.current;
      const choices = choicesRef.current;
      if (!container || !choices) return;
      const containerRect = container.getBoundingClientRect();
      const choicesRect = choices.getBoundingClientRect();
      // Choices are below the visible area
      setShowScrollHint(choicesRect.top > containerRect.bottom - 40);
    };

    // Small delay to let choice animations start
    const timer = setTimeout(checkVisibility, 200);
    const container = scrollRef.current;
    container.addEventListener('scroll', checkVisibility, { passive: true });
    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', checkVisibility);
    };
  }, [showChoices]);

  // Escape key to toggle pause menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showJournal) {
          setShowJournal(false);
        } else {
          setIsPaused((p) => !p);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showJournal]);

  const handleTextComplete = useCallback(() => {
    setShowChoices(true);
  }, []);

  const handleChoice = useCallback(
    (choice: Choice) => {
      setShowChoices(false);
      setShowScrollHint(false);
      setSaveTrigger((n) => n + 1);
      onChoice(choice);
    },
    [onChoice]
  );

  const handleSave = useCallback(() => {
    onSave();
    setSaveTrigger((n) => n + 1);
  }, [onSave]);

  const scrollToChoices = useCallback(() => {
    if (choicesRef.current) {
      choicesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const availableChoices = getAvailableChoices(scene, state);

  return (
    <div
      ref={scrollRef}
      className="h-screen flex flex-col overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: '672px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          boxSizing: 'border-box',
        }}
      >
        <LocationHeader
          location={scene.location}
          episode={scene.episode}
          onMenuToggle={() => setIsPaused(true)}
        />

        <NarrativeText
          key={scene.id}
          text={scene.text}
          onComplete={handleTextComplete}
        />

        <div ref={choicesRef}>
          <ChoicePanel
            choices={availableChoices}
            onChoose={handleChoice}
            visible={showChoices}
          />
        </div>

        {/* Bottom padding for mobile */}
        <div className="h-24" />
      </div>

      <SaveIndicator trigger={saveTrigger} />

      {/* Scroll-down hint when choices are below the fold */}
      {showScrollHint && (
        <button
          onClick={scrollToChoices}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 scroll-hint-pulse"
          style={{
            background: 'rgba(10, 14, 23, 0.85)',
            border: '1px solid var(--accent-gold-dim)',
            borderRadius: '9999px',
            padding: '0.5rem 1.25rem',
            color: 'var(--accent-gold)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span>choices below</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}

      {isPaused && (
        <PauseMenu
          onResume={() => setIsPaused(false)}
          onSave={handleSave}
          onJournal={() => {
            setIsPaused(false);
            setShowJournal(true);
          }}
          onExit={onMainMenu}
        />
      )}

      {showJournal && (
        <div className="fixed inset-0 z-50" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <JournalScreen state={state} onBack={() => setShowJournal(false)} />
        </div>
      )}
    </div>
  );
}
