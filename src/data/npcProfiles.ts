// NPC profiles for the detective's notebook journal view
// Contains display info, role descriptions, and monogram data

export interface NpcProfile {
  id: string;
  name: string;
  fullName: string;
  role: string;
  episode: number; // primary episode where they appear
  monogram: string; // 1-2 character monogram for avatar
  color: string; // unique hue for their monogram circle
  description: string; // what Deniz knows about them initially
  knownDetails: Record<string, string>; // flag → additional detail unlocked
}

const NPC_PROFILES: NpcProfile[] = [
  {
    id: 'selim',
    name: 'Selim',
    fullName: 'Selim Kösker',
    role: 'Art dealer',
    episode: 1,
    monogram: 'SK',
    color: '#4a6fa5',
    description: 'Runs the blue house gallery in Arnavutköy. Polished, evasive.',
    knownDetails: {
      talked_to_selim: 'Connected to Defne\'s art restoration work. Knows more than he lets on.',
      selim_confessed: 'Admitted to handling art for the network. Frightened of Vedat.',
    },
  },
  {
    id: 'melis',
    name: 'Melis',
    fullName: 'Melis',
    role: 'Cafe owner',
    episode: 1,
    monogram: 'Me',
    color: '#a0522d',
    description: 'Runs a waterfront cafe in Arnavutköy. Knew Defne personally.',
    knownDetails: {
      talked_to_melis: 'Was waiting for someone to come asking about Defne. Carries guilt.',
      melis_photo: 'Keeps a photo of Defne on the cafe wall.',
    },
  },
  {
    id: 'oguz',
    name: 'Oguz',
    fullName: 'Oguz',
    role: 'Fisherman',
    episode: 1,
    monogram: 'Og',
    color: '#5b8c5a',
    description: 'Old fisherman who works the Arnavutköy waterfront.',
    knownDetails: {
      talked_to_oguz: 'Remembers seeing Defne. Steady, reliable memory.',
    },
  },
  {
    id: 'levent',
    name: 'Levent',
    fullName: 'Levent',
    role: 'Neighbour',
    episode: 1,
    monogram: 'Le',
    color: '#7a6a8a',
    description: 'Lives near Defne\'s old apartment in Arnavutköy.',
    knownDetails: {
      heard_midnight_packages: 'Told you about midnight deliveries and strange packages.',
    },
  },
  {
    id: 'irfan',
    name: 'Irfan',
    fullName: 'Kaptan Irfan',
    role: 'Ferry captain',
    episode: 1,
    monogram: 'KI',
    color: '#4682b4',
    description: 'Captain of the Bosphorus ferry. Thirty years on the water.',
    knownDetails: {
      talked_to_irfan: 'Saw a boat at Büyükada\'s back pier the night Defne disappeared.',
    },
  },
  {
    id: 'ayse',
    name: 'Ayse',
    fullName: 'Ayse',
    role: 'Ferry passenger',
    episode: 1,
    monogram: 'Ay',
    color: '#c9785d',
    description: 'Quiet woman at the ferry tea counter. Watching something.',
    knownDetails: {},
  },
  {
    id: 'cem',
    name: 'Cem',
    fullName: 'Cem',
    role: 'Tea vendor',
    episode: 1,
    monogram: 'Ce',
    color: '#b8860b',
    description: 'Çaycı on the ferry. Hears everything, says just enough.',
    knownDetails: {
      cultivated_cem: 'Knows the ferry routes and the regulars. A useful ear.',
    },
  },
  {
    id: 'ruya',
    name: 'Rüya',
    fullName: 'Rüya Korkmaz',
    role: 'Private investigator',
    episode: 1,
    monogram: 'RK',
    color: '#708090',
    description: 'The quiet woman who reads on every ferry. Always the same seat.',
    knownDetails: {
      cultivated_ruya: 'Offered trust through silence. She\'ll talk when she\'s ready.',
      ruya_press_contact: 'Has contacts at Hürriyet. Insurance if things go wrong.',
      spotted_by_tayfun: 'Warned you about Tayfun\'s tail. Knows the network\'s security.',
    },
  },
  {
    id: 'naz',
    name: 'Naz',
    fullName: 'Naz Yilmaz',
    role: 'Bookbinder / forger',
    episode: 2,
    monogram: 'NY',
    color: '#2e8b57',
    description: 'Runs Baski Evi, a print shop in Kadıköy. Creates provenance documents.',
    knownDetails: {
      naz_confessed: 'Creates forged provenance documents for Ottoman art. Conflicted about it.',
      naz_mentioned_island: 'Pointed you toward Büyükada and the mansion.',
      naz_sent_to_hakan: 'Sent you to Hakan Reis for passage to the island.',
    },
  },
  {
    id: 'bora',
    name: 'Bora',
    fullName: 'Bora',
    role: 'Meyhane owner',
    episode: 2,
    monogram: 'Bo',
    color: '#cd853f',
    description: 'Runs Liman Meyhane on Bahariye Caddesi. Was close to Defne.',
    knownDetails: {
      met_bora: 'Kept an envelope from Defne — addressed to you. Broken by her disappearance.',
      bora_allied: 'Standing with you. Ready to help.',
    },
  },
  {
    id: 'sude',
    name: 'Sude',
    fullName: 'Sude',
    role: 'Apprentice at Baski Evi',
    episode: 2,
    monogram: 'Su',
    color: '#da70d6',
    description: 'Works at Naz\'s print shop. Young, brave, documenting things she shouldn\'t.',
    knownDetails: {
      has_sude_photos: 'Provided photos of midnight deliveries and Vedat\'s letterhead.',
      sude_appointment: 'Met you secretly while Naz was away.',
    },
  },
  {
    id: 'hakan',
    name: 'Hakan',
    fullName: 'Hakan Reis',
    role: 'Boat captain',
    episode: 2,
    monogram: 'HR',
    color: '#5f9ea0',
    description: 'Private boat captain at Kadıköy pier. Transports packages for the network.',
    knownDetails: {
      hakan_deal: 'Agreed to take you to Büyükada. Nervous, mercenary, but useful.',
    },
  },
  {
    id: 'vedat',
    name: 'Vedat',
    fullName: 'Vedat Arslaner',
    role: 'Collector',
    episode: 3,
    monogram: 'VA',
    color: '#8b0000',
    description: 'The man on the island. Collector of Ottoman art and controller of secrets.',
    knownDetails: {
      knows_vedat_name: 'Vedat Arslaner — patron of Anatolian heritage. The network\'s centre.',
      found_vedat_ledger: 'Keeps a personal ledger behind painting 19 in the gallery.',
    },
  },
  {
    id: 'filiz',
    name: 'Filiz',
    fullName: 'Filiz',
    role: 'Housekeeper',
    episode: 3,
    monogram: 'Fi',
    color: '#daa520',
    description: 'Housekeeper at the Arslaner mansion. Forty years of loyalty to the house.',
    knownDetails: {
      filiz_trusted: 'Loyal to the house, not to Vedat. A key ally inside.',
    },
  },
  {
    id: 'defne',
    name: 'Defne',
    fullName: 'Defne Karadag',
    role: 'Your sister',
    episode: 3,
    monogram: 'DK',
    color: '#c9a84c',
    description: 'Art restorer. Missing for two years. The reason you\'re here.',
    knownDetails: {
      found_defne: 'Alive. Hiding on Büyükada. She\'s been waiting.',
    },
  },
  {
    id: 'tayfun',
    name: 'Tayfun',
    fullName: 'Tayfun',
    role: 'Security',
    episode: 3,
    monogram: 'Ta',
    color: '#555555',
    description: 'Ex-Jandarma. Vedat\'s private security on Büyükada.',
    knownDetails: {
      spotted_by_tayfun: 'Followed you through Kadıköy. Knows your face.',
      compromised: 'The network knows you\'re coming. Tayfun will be ready.',
    },
  },
];

export function getNpcProfile(id: string): NpcProfile | undefined {
  return NPC_PROFILES.find(p => p.id === id);
}

export function getAllNpcProfiles(): NpcProfile[] {
  return NPC_PROFILES;
}

export function getNpcKnownInfo(id: string, flags: Record<string, boolean>): string[] {
  const profile = getNpcProfile(id);
  if (!profile) return [];
  const details: string[] = [profile.description];
  for (const [flag, detail] of Object.entries(profile.knownDetails)) {
    if (flags[flag]) {
      details.push(detail);
    }
  }
  return details;
}
