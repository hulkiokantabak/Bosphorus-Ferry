// Human-readable descriptions of narratively significant flags
// Used in the Journal's Clues tab to show discovered evidence

export interface ClueDescription {
  flag: string;
  episode: number;
  label: string;
  description: string;
}

const CLUE_DESCRIPTIONS: ClueDescription[] = [
  // Episode 1 — Arnavutköy
  {
    flag: 'talked_to_selim',
    episode: 1,
    label: 'Selim knows about Defne',
    description: 'The art dealer at the blue house has information about your sister\'s work.',
  },
  {
    flag: 'selim_confessed',
    episode: 1,
    label: 'Selim\'s confession',
    description: 'Selim admitted to handling art for the network. He\'s frightened of Vedat.',
  },
  {
    flag: 'talked_to_melis',
    episode: 1,
    label: 'Melis was waiting',
    description: 'The cafe owner had been expecting someone to come asking about Defne.',
  },
  {
    flag: 'melis_photo',
    episode: 1,
    label: 'The photograph',
    description: 'Melis keeps a photo of Defne on her cafe wall. She carries guilt.',
  },
  {
    flag: 'talked_to_oguz',
    episode: 1,
    label: 'Oğuz remembers',
    description: 'The fisherman saw Defne the night she disappeared. Steady, reliable memory.',
  },
  {
    flag: 'talked_to_irfan',
    episode: 1,
    label: 'The back pier boat',
    description: 'Kaptan İrfan saw a boat at Büyükada\'s back pier the night Defne vanished.',
  },
  {
    flag: 'heard_midnight_packages',
    episode: 1,
    label: 'Midnight deliveries',
    description: 'Reports of suspicious packages delivered to Baskı Evi at night.',
  },
  {
    flag: 'cultivated_ruya',
    episode: 1,
    label: 'Rüya\'s trust',
    description: 'The quiet woman on the ferry accepted your silence as trust. She\'ll talk later.',
  },
  {
    flag: 'cultivated_cem',
    episode: 1,
    label: 'The ferry tea vendor',
    description: 'Cem hears everything from his counter. A useful ear on the Bosphorus.',
  },

  // Episode 2 — Kadıköy
  {
    flag: 'naz_confessed',
    episode: 2,
    label: 'Forged provenance',
    description: 'Naz creates fake provenance documents for Ottoman art. She\'s conflicted.',
  },
  {
    flag: 'naz_mentioned_island',
    episode: 2,
    label: 'The island',
    description: 'Naz pointed toward Büyükada and a mansion where a collector holds court.',
  },
  {
    flag: 'naz_sent_to_hakan',
    episode: 2,
    label: 'Passage arranged',
    description: 'Naz directed you to Hakan Reis for boat passage to the island.',
  },
  {
    flag: 'met_bora',
    episode: 2,
    label: 'Defne\'s envelope',
    description: 'Bora held an envelope from Defne addressed to you: "For Deniz. If."',
  },
  {
    flag: 'bora_allied',
    episode: 2,
    label: 'Bora is with you',
    description: 'The meyhane owner stands with you. Ready to help.',
  },
  {
    flag: 'has_sude_photos',
    episode: 2,
    label: 'Photographic evidence',
    description: 'Sude risked everything to photograph midnight deliveries at Baskı Evi.',
  },
  {
    flag: 'sude_appointment',
    episode: 2,
    label: 'Sude\'s secret meeting',
    description: 'Met Sude while Naz was away. She showed you things she shouldn\'t have.',
  },
  {
    flag: 'spotted_by_tayfun',
    episode: 2,
    label: 'You\'ve been followed',
    description: 'Tayfun tailed you through Kadıköy. The network knows your face.',
  },
  {
    flag: 'knows_vedat_name',
    episode: 2,
    label: 'The collector\'s name',
    description: 'Vedat Arslaner — patron of Anatolian heritage. The network\'s center.',
  },
  {
    flag: 'hakan_deal',
    episode: 2,
    label: 'Hakan\'s boat',
    description: 'Hakan Reis will take you to Büyükada by boat. After dark.',
  },
  {
    flag: 'ruya_press_contact',
    episode: 2,
    label: 'Press contacts',
    description: 'Rüya gave you contacts at Hürriyet. Insurance if you don\'t come back.',
  },
  {
    flag: 'compromised',
    episode: 2,
    label: 'Cover blown',
    description: 'The network knows you\'re investigating. Tayfun will be ready on the island.',
  },

  // Episode 3 — Büyükada
  {
    flag: 'filiz_trusted',
    episode: 3,
    label: 'Filiz is loyal to you',
    description: 'The housekeeper is loyal to the house, not to Vedat. A key ally inside.',
  },
  {
    flag: 'found_defne',
    episode: 3,
    label: 'Defne is alive',
    description: 'Your sister is alive. She\'s been hiding on Büyükada, waiting.',
  },
  {
    flag: 'found_vedat_ledger',
    episode: 3,
    label: 'Vedat\'s personal ledger',
    description: 'A hidden ledger behind painting 19 in the gallery. Every transaction recorded.',
  },
  {
    flag: 'has_vedat_letter',
    episode: 3,
    label: 'The 1981 letter',
    description: 'A young Vedat proposed museums and collectors as partners. Before the idealism curdled.',
  },
  {
    flag: 'saw_vedat_study',
    episode: 3,
    label: 'Vedat\'s private study',
    description: 'A room with Defne\'s marginalia in restoration books. The evidence of a fallen idealist.',
  },
];

export function getDiscoveredClues(flags: Record<string, boolean>): ClueDescription[] {
  return CLUE_DESCRIPTIONS.filter(c => flags[c.flag]);
}

export function getCluesByEpisode(flags: Record<string, boolean>): Record<number, ClueDescription[]> {
  const discovered = getDiscoveredClues(flags);
  const grouped: Record<number, ClueDescription[]> = {};
  for (const clue of discovered) {
    if (!grouped[clue.episode]) grouped[clue.episode] = [];
    grouped[clue.episode].push(clue);
  }
  return grouped;
}
