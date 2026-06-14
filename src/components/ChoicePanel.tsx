import { Choice } from '../types';
import { LockedChoice } from '../engine/gameEngine';

interface ChoicePanelProps {
  choices: Choice[];
  lockedChoices?: LockedChoice[];
  onChoose: (choice: Choice) => void;
  visible: boolean;
}

export default function ChoicePanel({ choices, lockedChoices, onChoose, visible }: ChoicePanelProps) {
  if (!visible || choices.length === 0) return null;

  return (
    <div className="mt-8 space-y-3">
      {choices.map((choice, index) => (
        <button
          key={`${choice.next}-${index}`}
          onClick={() => {
            try { navigator.vibrate?.(10); } catch { /* noop */ }
            onChoose(choice);
          }}
          className="choice-enter block w-full text-left px-6 py-4 rounded-sm border transition-all duration-300 focus:outline-none focus:ring-1"
          style={{
            animationDelay: `${index * 120}ms`,
            backgroundColor: 'transparent',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.95rem',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.backgroundColor = 'rgba(201, 168, 76, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onFocus={(e) => {
            e.currentTarget.style.outlineColor = 'var(--accent-gold-dim)';
          }}
        >
          {choice.text}
        </button>
      ))}

      {/* Locked choices shown as grayed-out with hints */}
      {lockedChoices && lockedChoices.length > 0 && lockedChoices.map((locked, index) => (
        <div
          key={`locked-${index}`}
          className="choice-enter block w-full text-left px-6 py-4 rounded-sm border"
          style={{
            animationDelay: `${(choices.length + index) * 120}ms`,
            backgroundColor: 'transparent',
            borderColor: 'var(--border-subtle)',
            opacity: 0.35,
            cursor: 'not-allowed',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              color: 'var(--text-secondary)',
            }}
          >
            {locked.text}
          </p>
          <p
            className="mt-1 flex items-center gap-1"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold-dim)',
              textTransform: 'uppercase',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {locked.hint}
          </p>
        </div>
      ))}
    </div>
  );
}
