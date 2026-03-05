import { Choice } from '../types';

interface ChoicePanelProps {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
  visible: boolean;
}

export default function ChoicePanel({ choices, onChoose, visible }: ChoicePanelProps) {
  if (!visible || choices.length === 0) return null;

  return (
    <div className="mt-8 space-y-3">
      {choices.map((choice, index) => (
        <button
          key={`${choice.next}-${index}`}
          onClick={() => onChoose(choice)}
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
    </div>
  );
}
