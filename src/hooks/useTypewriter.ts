import { useState, useEffect, useCallback, useRef } from 'react';

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
