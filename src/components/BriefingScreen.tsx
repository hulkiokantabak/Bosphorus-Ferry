interface BriefingScreenProps {
  onContinue: () => void;
}

export default function BriefingScreen({ onContinue }: BriefingScreenProps) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        className="max-w-xl px-6"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-8 text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--accent-gold-dim)',
            letterSpacing: '0.25em',
          }}
        >
          Your Story
        </p>

        <h2
          className="text-2xl md:text-3xl font-semibold mb-6 text-center"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            color: 'var(--text-primary)',
          }}
        >
          {"You are Deniz Karada\u011f."}
        </h2>

        <div
          className="space-y-4 mb-10"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            color: 'var(--text-secondary)',
            lineHeight: '1.9',
          }}
        >
          <p className="text-base">
            {"A journalist from "}
            <span style={{ color: 'var(--accent-gold-dim)', fontStyle: 'italic' }}>{"Be\u015fikta\u015f"}</span>
            {". Stubborn, sharp-eyed, and haunted by a question that has followed you for two years."}
          </p>
          <p className="text-base">
            {"Your sister, "}
            <span style={{ color: 'var(--accent-gold)' }}>{"Defne Karada\u011f"}</span>
            {", was an art restorer. Two years ago, her shoes were found on the rocks near "}
            <span style={{ color: 'var(--accent-gold-dim)', fontStyle: 'italic' }}>{"Arnavutk\u00f6y"}</span>
            {". The police ruled it a drowning. Her body was never recovered."}
          </p>
          <p className="text-base">
            You never believed it.
          </p>
          <p className="text-base">
            Three days ago, an anonymous text arrived on your phone:
          </p>
          <p
            className="text-base pl-4"
            style={{
              borderLeft: '2px solid var(--accent-gold-dim)',
              color: 'var(--accent-gold)',
              fontStyle: 'italic',
            }}
          >
            {'"Your sister didn\'t drown. Arnavutk\u00f6y. The blue house past the mosque. Ask for the painting."'}
          </p>
          <p className="text-base">
            {"Tonight, you board a ferry across the "}
            <span style={{ color: 'var(--accent-gold-dim)', fontStyle: 'italic' }}>Bosphorus</span>
            {". You carry a leather bag, a phone, and two years of grief sharpened into purpose."}
          </p>
          <p className="text-base">
            {"Every choice you make will shape who you become. Trust no one completely. Question everything. Find the truth about "}
            <span style={{ color: 'var(--accent-gold)' }}>Defne</span>
            {"."}
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={onContinue}
            className="px-10 py-3 text-sm uppercase tracking-widest border transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'transparent',
              borderColor: 'var(--accent-gold-dim)',
              color: 'var(--accent-gold)',
              letterSpacing: '0.15em',
              borderRadius: '2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Board the Ferry
          </button>
        </div>
      </div>
    </div>
  );
}
