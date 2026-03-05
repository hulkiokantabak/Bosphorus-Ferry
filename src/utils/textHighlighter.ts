import { NPC_NAMES, LOCATION_NAMES } from '../data/highlightData';

export interface TextSegment {
  text: string;
  type: 'plain' | 'npc' | 'location';
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const npcSet = new Set(NPC_NAMES);
const locationSet = new Set(LOCATION_NAMES);

// Sort all names by length descending so longer matches take priority
const allNames = [...NPC_NAMES, ...LOCATION_NAMES].sort(
  (a, b) => b.length - a.length
);

// Match names optionally followed by:
// - Turkish honorific suffixes: Hanım, Hanim, Bey, Amca (with a space)
// - Possessive 's or '
const pattern = new RegExp(
  `(${allNames.map(escapeRegex).join('|')})(?:\\s+(?:Han[ıi]m|Bey|Amca))?(?:[''\u2019]s?)?`,
  'g'
);

export function highlightText(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const fullMatch = match[0]; // includes honorific + possessive if present
    const nameMatch = match[1]; // just the name
    const matchIndex = match.index!;

    // Add preceding plain text
    if (matchIndex > lastIndex) {
      segments.push({ text: text.slice(lastIndex, matchIndex), type: 'plain' });
    }

    // Determine type from the name part
    const type = npcSet.has(nameMatch) ? 'npc' : locationSet.has(nameMatch) ? 'location' : 'plain';
    segments.push({ text: fullMatch, type });

    lastIndex = matchIndex + fullMatch.length;
  }

  // Add remaining plain text
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), type: 'plain' });
  }

  return segments;
}
