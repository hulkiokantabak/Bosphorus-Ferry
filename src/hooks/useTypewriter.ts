import { useState, useEffect, useCallback, useRef } from 'react';
import { prefersReducedMotion } from '../utils/motion';

const SPEED_KEY = 'bosphorus-ferry-text-speed';

export type TextSpeed = 'slow' | 'normal' | 'fast' | 'instant';

const SPEED_VALUES: Record<TextSpeed, number> = {
  slow: 30,
  normal: 22,
  fast: 10,
  instant: 0,
};

export function getTextSpeed(): TextSpeed {
  try {
    const stored = localStorage.getItem(SPEED_KEY);
    if (stored && stored in SPEED_VALUES) return stored as TextSpeed;
  } catch { /* noop */ }
  return 'normal';
}

export function setTextSpeed(speed: TextSpeed) {
  try {
    localStorage.setItem(SPEED_KEY, speed);
  } catch { /* noop */ }
}

export function getSpeedMs(): number {
  return SPEED_VALUES[getTextSpeed()];
}

export function useTypewriter(text: string, speed: number = 25) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    if (!text) {
      setIsComplete(true);
      return;
    }

    // Respect the user's motion preference (and the 'instant' text speed):
    // reveal the whole passage at once instead of animating it.
    if (speed <= 0 || prefersReducedMotion()) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    const tick = () => {
      indexRef.current++;
      setDisplayedText(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        setIsComplete(true);
      } else {
        const char = text[indexRef.current - 1];
        // Pause longer at punctuation
        let delay = speed;
        if (char === '.' || char === '!' || char === '?') delay = speed * 6;
        else if (char === ',' || char === ';' || char === ':') delay = speed * 3;
        else if (char === '—' || char === '–') delay = speed * 4;
        else if (char === '\n') delay = speed * 4;

        timerRef.current = setTimeout(tick, delay);
      }
    };

    timerRef.current = setTimeout(tick, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed]);

  const skip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayedText(text);
    setIsComplete(true);
  }, [text]);

  return { displayedText, isComplete, skip };
}
