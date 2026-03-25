import { useState, useEffect } from 'react';

interface SaveIndicatorProps {
  trigger: number; // increment to show indicator
}

export default function SaveIndicator({ trigger }: SaveIndicatorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (!visible) return null;

  return (
    <div
      key={trigger}
      className="fixed bottom-4 right-4 z-30 save-toast flex items-center gap-2 px-3 py-2 rounded-sm"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--accent-gold-dim)',
        fontSize: '0.75rem',
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span style={{ color: 'var(--accent-gold-dim)' }}>Saved</span>
    </div>
  );
}
