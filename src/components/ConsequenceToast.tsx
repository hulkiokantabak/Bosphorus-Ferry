import { useState, useEffect } from 'react';

export interface ConsequenceMessage {
  id: number;
  text: string;
  type: 'trust' | 'axis' | 'flag';
}

interface ConsequenceToastProps {
  messages: ConsequenceMessage[];
}

const NPC_NAMES: Record<string, string> = {
  selim: 'Selim', melis: 'Melis', oguz: 'Oğuz', levent: 'Levent',
  irfan: 'İrfan', ayse: 'Ayşe', cem: 'Cem', ruya: 'Rüya',
  naz: 'Naz', bora: 'Bora', sude: 'Sude', hakan: 'Hakan',
  vedat: 'Vedat', filiz: 'Filiz', defne: 'Defne', tayfun: 'Tayfun',
};

const AXIS_LABELS: Record<string, [string, string]> = {
  approach: ['cautious', 'bold'],
  trust: ['guarded', 'open'],
  heart: ['detached', 'empathetic'],
  method: ['instinctive', 'methodical'],
};

export function buildConsequenceMessages(
  effects: { axisShift?: Record<string, number>; npcTrust?: Record<string, number>; setFlags?: string[] } | undefined,
  counter: { current: number }
): ConsequenceMessage[] {
  if (!effects) return [];
  const msgs: ConsequenceMessage[] = [];

  if (effects.npcTrust) {
    for (const [npc, delta] of Object.entries(effects.npcTrust)) {
      if (delta === 0) continue;
      const name = NPC_NAMES[npc] || npc;
      const verb = delta > 0 ? 'warms to you' : 'grows wary';
      msgs.push({ id: counter.current++, text: `${name} ${verb}`, type: 'trust' });
    }
  }

  if (effects.axisShift) {
    for (const [axis, delta] of Object.entries(effects.axisShift)) {
      if (!delta || delta === 0) continue;
      const labels = AXIS_LABELS[axis];
      if (!labels) continue;
      const direction = delta > 0 ? labels[1] : labels[0];
      msgs.push({ id: counter.current++, text: `You feel more ${direction}`, type: 'axis' });
    }
  }

  return msgs;
}

export default function ConsequenceToast({ messages }: ConsequenceToastProps) {
  const [visible, setVisible] = useState<ConsequenceMessage[]>([]);

  useEffect(() => {
    if (messages.length === 0) return;

    // Show new messages with staggered timing
    const timers: ReturnType<typeof setTimeout>[] = [];
    messages.forEach((msg, i) => {
      timers.push(setTimeout(() => {
        setVisible(prev => [...prev, msg]);
      }, i * 400));
    });

    // Remove after display
    const removeTimer = setTimeout(() => {
      setVisible([]);
    }, messages.length * 400 + 2500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(removeTimer);
    };
  }, [messages]);

  if (visible.length === 0) return null;

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      style={{ pointerEvents: 'none' }}
    >
      {visible.map((msg) => (
        <div
          key={msg.id}
          className="consequence-toast px-4 py-2 rounded-sm flex items-center gap-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            backgroundColor: 'rgba(10, 14, 23, 0.85)',
            border: '1px solid var(--accent-gold-dim)',
            backdropFilter: 'blur(8px)',
            animation: 'consequenceFade 2.5s ease-out forwards',
          }}
        >
          {msg.type === 'trust' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
          {msg.type === 'axis' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          )}
          <span style={{ color: 'var(--accent-gold-dim)' }}>{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
