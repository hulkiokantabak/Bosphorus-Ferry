export const NPC_NAMES: string[] = [
  // Full names first (longer matches take priority due to sorting)
  'Deniz Karadağ', 'Defne Karadağ', 'Selim Köşker', 'Naz Yılmaz',
  'Vedat Arslaner', 'Osman Hamdi Bey',
  'Hakan Reis', 'Kaptan İrfan', 'Mehmet Amca',
  // First names
  'Oğuz', 'Selim', 'Melis', 'Levent', 'İrfan', 'Ayşe', 'Cem',
  'Rüya', 'Naz', 'Bora', 'Sude', 'Hakan', 'Vedat', 'Filiz',
  'Defne', 'Tayfun', 'Deniz', 'Papağan', 'Mehmet',
  // Surnames alone (when used standalone)
  'Karadağ', 'Köşker', 'Yılmaz', 'Arslaner',
];

// Maps display name variants to NPC profile IDs for monogram lookup
export const NPC_NAME_TO_ID: Record<string, string> = {
  'Deniz Karadağ': 'deniz', 'Deniz': 'deniz', 'Karadağ': 'deniz',
  'Defne Karadağ': 'defne', 'Defne': 'defne',
  'Selim Köşker': 'selim', 'Selim': 'selim', 'Köşker': 'selim',
  'Naz Yılmaz': 'naz', 'Naz': 'naz', 'Yılmaz': 'naz',
  'Vedat Arslaner': 'vedat', 'Vedat': 'vedat', 'Arslaner': 'vedat',
  'Melis': 'melis',
  'Oğuz': 'oguz',
  'Levent': 'levent',
  'İrfan': 'irfan', 'Kaptan İrfan': 'irfan',
  'Ayşe': 'ayse',
  'Cem': 'cem',
  'Rüya': 'ruya',
  'Bora': 'bora',
  'Sude': 'sude',
  'Hakan': 'hakan', 'Hakan Reis': 'hakan',
  'Filiz': 'filiz',
  'Tayfun': 'tayfun',
  'Mehmet': 'irfan', // Mehmet Amca maps to irfan context
  'Papağan': 'cem', // the parrot at Cem's counter
};

export const LOCATION_NAMES: string[] = [
  // Multi-word locations first (longer matches take priority)
  'Büyükada İskelesi', 'Kadıköy İskelesi',
  'İskele Caddesi', 'Bahariye Caddesi',
  'Princes\' Islands', 'Köşk Antik', 'Başkı Evi', 'Baski Evi',
  // Single-word / short locations
  'Arnavutköy', 'Kadıköy', 'Büyükada', 'Beşiktaş', 'Bosphorus',
  'Moda', 'Istanbul', 'İstanbul', 'Bahariye', 'Marmara',
  'Karaköy', 'Galata', 'Eminönü', 'Üsküdar', 'Beyoğlu', 'Topkapı',
  'Dimitriades', 'Bebek', 'Etiler', 'Erdek', 'Bursa',
  'Nişantaşı', 'Kabataş', 'Kız Kulesi', 'Avşa',
  // ASCII variants used in some scene text
  'Buyukada', 'Kadikoy', 'Arnavutkoy', 'Besiktas',
  'Nisantasi', 'Kabatas', 'Kiz Kulesi', 'Avsa',
];
