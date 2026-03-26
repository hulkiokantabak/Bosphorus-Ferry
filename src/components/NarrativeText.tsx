import { useEffect, useMemo, useState, useCallback } from 'react';
import { useTypewriter, getSpeedMs } from '../hooks/useTypewriter';
import { highlightText } from '../utils/textHighlighter';
import { getNpcProfile } from '../data/npcProfiles';

interface NarrativeTextProps {
  text: string;
  onComplete: () => void;
}

const PAGE_CHAR_LIMIT = 450; // Split into pages when text exceeds this threshold

function splitIntoPages(text: string): string[] {
  const paragraphs = text.split('\n\n');
  if (paragraphs.length <= 2 || text.length <= PAGE_CHAR_LIMIT) {
    return [text];
  }

  const pages: string[] = [];
  let current: string[] = [];
  let currentLen = 0;

  for (const para of paragraphs) {
    if (currentLen > 0 && currentLen + para.length > PAGE_CHAR_LIMIT && current.length >= 1) {
      pages.push(current.join('\n\n'));
      current = [para];
      currentLen = para.length;
    } else {
      current.push(para);
      currentLen += para.length;
    }
  }
  if (current.length > 0) {
    pages.push(current.join('\n\n'));
  }

  return pages;
}

function ParagraphRenderer({ paragraph, seenNpcIds }: { paragraph: string; seenNpcIds: Set<string> }) {
  const segments = highlightText(paragraph);
  return (
    <>
      {segments.map((seg, j) => {
        if (seg.type === 'npc') {
          const showMonogram = seg.npcId && !seenNpcIds.has(seg.npcId);
          if (seg.npcId) seenNpcIds.add(seg.npcId);
          const profile = showMonogram && seg.npcId ? getNpcProfile(seg.npcId) : null;
          return (
            <span key={j}>
              {profile && (
                <span
                  className="npc-monogram-inline"
                  style={{
                    backgroundColor: `${profile.color}22`,
                    color: profile.color,
                    borderColor: `${profile.color}44`,
                  }}
                  aria-hidden="true"
                >
                  {profile.monogram}
                </span>
              )}
              <span style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                {seg.text}
              </span>
            </span>
          );
        }
        if (seg.type === 'location') {
          return (
            <span key={j} style={{ color: 'var(--accent-gold-dim)', fontStyle: 'italic' }}>
              {seg.text}
            </span>
          );
        }
        return <span key={j}>{seg.text}</span>;
      })}
    </>
  );
}

export default function NarrativeText({ text, onComplete }: NarrativeTextProps) {
  const pages = useMemo(() => splitIntoPages(text), [text]);
  const [currentPage, setCurrentPage] = useState(0);

  // Reset page when text changes
  useEffect(() => {
    setCurrentPage(0);
  }, [text]);

  const speed = getSpeedMs();
  const pageText = pages[currentPage] || '';
  const { displayedText, isComplete, skip } = useTypewriter(pageText, speed);
  const isLastPage = currentPage >= pages.length - 1;

  // Notify parent when all pages are complete
  useEffect(() => {
    if (isComplete && isLastPage) {
      onComplete();
    }
  }, [isComplete, isLastPage, onComplete]);

  // Track which NPCs have had their monogram shown (across all pages)
  const seenNpcIds = useMemo(() => new Set<string>(), [text]);

  const handleClick = useCallback(() => {
    if (!isComplete) {
      skip();
    } else if (!isLastPage) {
      setCurrentPage(p => p + 1);
    }
  }, [isComplete, isLastPage, skip]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      handleClick();
    }
  }, [handleClick]);

  // Collect displayed paragraphs from all completed pages + current
  const completedPages = pages.slice(0, currentPage);
  const currentParagraphs = displayedText.split('\n\n');

  return (
    <div
      className="cursor-pointer select-none narrative-mobile"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={!isComplete ? 'Click to skip text animation' : !isLastPage ? 'Click to continue' : undefined}
    >
      {/* Previously completed pages (shown in full) */}
      {completedPages.map((page, pi) => {
        const paras = page.split('\n\n');
        return paras.map((paragraph, i) => (
          <p
            key={`prev-${pi}-${i}`}
            className="mb-5 text-base sm:text-lg leading-relaxed tracking-wide break-words"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              color: 'var(--text-primary)',
              opacity: 0.7,
            }}
          >
            <ParagraphRenderer paragraph={paragraph} seenNpcIds={seenNpcIds} />
          </p>
        ));
      })}

      {/* Current page being typed */}
      {currentParagraphs.map((paragraph, i) => (
        <p
          key={`cur-${currentPage}-${i}`}
          className="mb-5 text-base sm:text-lg leading-relaxed tracking-wide break-words"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            color: 'var(--text-primary)',
          }}
        >
          <ParagraphRenderer paragraph={paragraph} seenNpcIds={seenNpcIds} />
          {i === currentParagraphs.length - 1 && !isComplete && (
            <span
              className="cursor-blink inline-block ml-0.5"
              style={{ color: 'var(--accent-gold)' }}
            >
              |
            </span>
          )}
        </p>
      ))}

      {/* Continue prompt between pages */}
      {isComplete && !isLastPage && (
        <div
          className="flex items-center justify-center gap-2 mt-4 mb-2 fade-in"
          style={{ cursor: 'pointer' }}
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--accent-gold-dim)',
              letterSpacing: '0.15em',
            }}
          >
            continue
          </span>
          <svg
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="var(--accent-gold-dim)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="scroll-hint-pulse"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}

      {/* Page indicator for multi-page text */}
      {pages.length > 1 && (
        <div className="flex justify-center gap-1 mt-2 mb-4">
          {pages.map((_, i) => (
            <span
              key={i}
              className="inline-block rounded-full"
              style={{
                width: i === currentPage ? '12px' : '4px',
                height: '4px',
                backgroundColor: i <= currentPage ? 'var(--accent-gold-dim)' : 'var(--border-subtle)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
