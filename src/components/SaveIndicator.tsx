import { useState, useEffect } from 'react';

interface SaveIndicatorProps {
  trigger: number; // increment to show indicator
}

export default function SaveIndicator({ trigger }: SaveIndicatorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 text-xs px-3 py-1.5 rounded-sm transition-opacity duration-500"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-secondary)',
        opacity: visible ? 0.7 : 0,
        border: '1px solid var(--border-subtle)',
      }}
    >
      Saved
    </div>
  );
}
