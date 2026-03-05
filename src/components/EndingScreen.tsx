import { EndingType, getEndingTitle } from '../engine/endingCalculator';

interface EndingScreenProps {
  ending: EndingType;
  epilogueText: string;
  onMainMenu: () => void;
  onSummary: () => void;
}

export default function EndingScreen({ ending, epilogueText, onMainMenu, onSummary }: EndingScreenProps) {
  const title = getEndingTitle(ending);
  const paragraphs = epilogueText.split('\n\n');

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-2xl w-full">
        {/* Ending header */}
        <div className="text-center mb-12 slow-fade">
          <p
            className="text-xs uppercase mb-4 tracking-widest"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--accent-gold-dim)',
              letterSpacing: '0.3em',
            }}
          >
            Ending
          </p>
          <h1
            className="text-3xl md:text-4xl font-semibold mb-6"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              color: 'var(--text-primary)',
            }}
          >
            {title}
          </h1>
          <div
            className="w-16 h-px mx-auto"
            style={{ backgroundColor: 'var(--accent-gold-dim)' }}
          />
        </div>

        {/* Epilogue text */}
        <div className="mb-16">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb-5 text-lg leading-relaxed fade-in"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                color: 'var(--text-primary)',
                animationDelay: `${1 + i * 0.3}s`,
                opacity: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center fade-in flex flex-col items-center gap-4" style={{ animationDelay: '3s', opacity: 0 }}>
          <button
            onClick={onSummary}
            className="px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'transparent',
              borderColor: 'var(--accent-gold-dim)',
              color: 'var(--accent-gold)',
              letterSpacing: '0.15em',
              borderRadius: '2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
              e.currentTarget.style.color = 'var(--accent-gold)';
            }}
          >
            View Your Journey
          </button>
          <button
            onClick={onMainMenu}
            className="px-8 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'transparent',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
              borderRadius: '2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold-dim)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
