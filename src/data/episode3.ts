import { Scene } from '../types';

const episode3Scenes: Scene[] = [
  // === ARRIVAL ===
  {
    id: 'e3_opening',
    episode: 3,
    text: `Büyükada rises from the Marmara like a memory you can't quite place. Pine-covered hills, Victorian mansions perched along the ridgeline, a clock tower catching the last daylight. The ferry slows, and the silence hits you — no engines, no traffic, no city hum. Just the wind in the trees and the creak of the dock.

You step off the gangway onto solid ground. The pier is small, almost quaint compared to the industrial concrete of Kadıköy or Eminönü. A handful of passengers disperse — islanders, groceries in hand, moving with the unhurried purpose of people who live where time runs differently.

İskele Caddesi stretches ahead, the island's main street. Horse-drawn carriages wait in a row, the horses stamping impatiently. A few electric vehicles hum past. No cars. No exhaust. The air smells of pine resin, salt, and something floral — wisteria, maybe, climbing the facade of a shuttered hotel.

And there, above the town, visible from the pier: the hill. At its crown, lit by a single exterior lamp, a Victorian mansion sits against the darkening sky. Even from here, it looks like a place that holds things. Secrets. Art. People.

Vedat Arslaner's house. Where the network has its heart. Where the paintings hide their cargo. And somewhere nearby, in the servants' quarters of another mansion, your sister has been hiding for two years.

The last ferry back isn't until morning. Whatever happens on this island happens tonight.`,
    location: 'Büyükada İskelesi',
    phase: 'arrival',
    choices: [
      {
        text: 'Head into town first. Gather intelligence before approaching the hill.',
        next: 'e3_town_walk',
        effects: {
          axisShift: { method: 0.1, approach: -0.1 },
        },
      },
      {
        text: 'Go directly toward the mansion. You\'ve waited long enough.',
        next: 'e3_hill_direct',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: 'Find a tea garden. Watch the island settle into evening. See who moves where.',
        next: 'e3_tea_garden',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_town_walk',
    episode: 3,
    text: `İskele Caddesi is the island's spine — cafés, bakeries, small shops selling sunscreen and straw hats for tourists who aren't here. Off-season, the street has a melancholy beauty. Half the storefronts are shuttered, their painted signs fading.

A bakkal — one of those corner shops that sells everything from bread to batteries — sits at the first intersection, its fluorescent light spilling onto the cobblestones. An older man leans in the doorway, watching the street with the territorial patience of someone who's been watching it for decades.

Further along, a horse-carriage driver adjusts his horse's bridle, speaking softly in the animal's ear. The carriage is empty — waiting for a fare that probably won't come tonight.

Both look like people who know things. The bakkal owner sees everyone who passes. The carriage driver goes everywhere on the island. Between them, you might map the whole hilltop before setting foot on it.`,
    location: 'İskele Caddesi',
    phase: 'exploration',
    choices: [
      {
        text: 'Talk to the bakkal owner. Shopkeepers always know the neighborhood.',
        next: 'e3_bakkal',
      },
      {
        text: 'Approach the carriage driver. He knows the roads — and the hill.',
        next: 'e3_carriage',
      },
      {
        text: 'Walk past both. Head toward the hill road on your own.',
        next: 'e3_hill_road',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_tea_garden',
    episode: 3,
    text: `You find a tea garden set back from the main street, nestled between two old wooden houses. A few glass-topped tables, wrought-iron chairs, a samovar steaming in the corner. The owner — a woman in her sixties with sharp eyes and a cardigan — brings you çay without being asked.

From here, you can see the street, the pier road, and a slice of the hill above the rooftops. You watch.

People move differently on this island. Slower, but more purposeful. Everyone knows everyone. A woman with a shopping basket stops to talk to the horse-carriage driver. A boy on a bicycle delivers bread. Two men in dark coats walk up the hill road — not tourists, not locals. Something about their bearing says professional.

The tea garden owner watches you watching. After a few minutes, she speaks. "You're not a tourist," she says. Not unfriendly. Just observant. "Tourists look at the houses. You're looking at the people."`,
    location: 'Büyükada Tea Garden',
    phase: 'exploration',
    choices: [
      {
        text: '"I\'m a journalist. Writing about the island\'s old mansions."',
        next: 'e3_tea_journalist',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: '"I\'m looking for someone. A woman who might be living on the island quietly."',
        next: 'e3_tea_honest',
        effects: {
          axisShift: { trust: 0.2 },
        },
      },
      {
        text: 'Smile. Drink your çay. Say nothing revealing.',
        next: 'e3_tea_quiet',
        effects: {
          axisShift: { method: 0.1, trust: -0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_tea_journalist',
    episode: 3,
    text: `The owner nods slowly. "The mansions. Everyone wants to write about the mansions." She refills your glass. "The big one on the hill — Arslaner's place — that's the one they all want to see. But Vedat Bey is private. Very private. Doesn't receive visitors."

She leans against the table edge. "Though lately, he's had more visitors than usual. Cars — well, electric cars — going up the hill road at odd hours. Men who don't look like art collectors. My husband says they look like lawyers. I say they look like trouble."

She gives you directions to the hill road and mentions that Filiz Hanım — "the housekeeper, been there forever" — sometimes comes to the bakkal in the morning. "If you want to see the mansion, Filiz is the one to ask. She's the gate. Nothing gets in or out without her knowing."`,
    location: 'Büyükada Tea Garden',
    phase: 'exploration',
    choices: [
      {
        text: 'Thank her. Head to the bakkal — maybe Filiz is there now.',
        next: 'e3_bakkal',
      },
      {
        text: 'Ask about the servants\' quarters of the neighboring mansions.',
        next: 'e3_tea_servants',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_tea_honest',
    episode: 3,
    text: `The owner studies you. The directness seems to earn something — respect, maybe, or at least interest.

"A woman living quietly." She turns a teaspoon between her fingers. "This island is full of people living quietly. Summer people who forgot to leave. Caretakers in empty mansions. And..." She pauses. "There are the houses on the back hill. Old servants' quarters. Most are empty, but some..." She shrugs. "Someone buys groceries. Someone hangs laundry. The island doesn't ask questions. We're good at not asking questions."

She fixes you with a look. "But if this woman doesn't want to be found, maybe there's a reason. And if you're the right person to find her, you won't need to force it. The island will show you."

She refills your çay. "Start with Filiz Hanım. The housekeeper at the big mansion. She knows everything that happens on this hill. Everything."`,
    location: 'Büyükada Tea Garden',
    phase: 'exploration',
    choices: [
      {
        text: 'Head toward the hill road to find Filiz.',
        next: 'e3_hill_road',
      },
      {
        text: 'Go to the bakkal first. More intelligence.',
        next: 'e3_bakkal',
      },
    ],
  },
  {
    id: 'e3_tea_quiet',
    episode: 3,
    text: `The owner respects the silence. She refills your çay, wipes down a neighboring table, and lets the evening settle around you both.

You watch the hill road. A horse-drawn carriage climbs slowly, its lantern swaying. Two figures walk down — a tall man in a dark jacket, moving with military precision, and a smaller figure behind him. The tall man scans the street with professional attention.

Vedat's security, you think. Even from here, the tall man has the bearing of someone trained to watch for threats.

The owner follows your gaze. "That one works for Arslaner," she says quietly. "Ex-army, they say. He patrols the hill road every evening. Regular as the tide." She pauses. "If you're going up there, go before he makes his rounds. Or after. He's usually inside by ten."

Useful. You finish your çay and leave money on the table.`,
    location: 'Büyükada Tea Garden',
    phase: 'exploration',
    choices: [
      {
        text: 'It\'s early evening. Go now, before Tayfun\'s patrol.',
        next: 'e3_hill_road',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: 'Visit the bakkal first. You need more information.',
        next: 'e3_bakkal',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_tea_servants',
    episode: 3,
    text: `The owner's expression shifts — something cautious entering her eyes. "The servants' quarters. Why do you ask about those?"

"Research," you say. "The social history of the mansions."

She doesn't fully buy it, but she answers. "Behind the big houses, there are smaller buildings. Service quarters, kitchens, laundry houses. Most are empty now — who has servants anymore? But one of them..." She hesitates. "The one behind the Dimitriades house — the Greek mansion next to Arslaner's — it should be empty. The Dimitriades family hasn't come to the island in years."

She lowers her voice. "But Filiz Hanım goes there sometimes. I've seen her walking that direction with a bag. Groceries, maybe. Or supplies." She catches herself. "It's probably nothing. She probably maintains the property for the family."

But the look in her eyes says she doesn't believe that. And neither do you.`,
    location: 'Büyükada Tea Garden',
    phase: 'exploration',
    choices: [
      {
        text: 'Go directly to the Dimitriades servants\' quarters. Defne might be there.',
        next: 'e3_servants_approach',
        effects: {
          axisShift: { approach: 0.2, heart: 0.1 },
        },
      },
      {
        text: 'Find Filiz first. She\'s the key to getting there safely.',
        next: 'e3_hill_road',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },
  // === BAKKAL & CARRIAGE ===
  {
    id: 'e3_bakkal',
    episode: 3,
    text: `The bakkal smells of bread, soap, and the particular mustiness of shops that sell everything. The owner, Mehmet Amca, is a compact man with thick glasses and the unhurried competence of a lifelong islander.

"Hoş geldiniz." He barely glances up from arranging canned goods. "What do you need?"

You buy a bottle of water and a simit, establishing yourself as a customer before anything else. Mehmet warms up — he's chatty once the transaction is made.

"The big house? Arslaner's?" He adjusts his glasses. "Strange times up there. More visitors than I've seen in years. Usually it's quiet — just Filiz Hanım coming for supplies and that security man of his. But last two weeks, cars going up, cars coming down. Lawyers, I think. Or buyers."

He leans on the counter. "Between you and me? I think he's selling. The mansion, the whole thing. Filiz Hanım was in here yesterday, and she looked..." He searches for the word. "Troubled. Forty years she's worked in that house. If it sells, where does she go?"

He shakes his head. "She'll be back tomorrow morning. Seven o'clock, regular as the müezzin."`,
    location: 'Büyükada Bakkal',
    phase: 'exploration',
    choices: [
      {
        text: '"Do you know anything about the servants\' quarters behind the neighboring mansion?"',
        next: 'e3_bakkal_servants',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Thank him and head toward the hill. You\'ll find Filiz yourself.',
        next: 'e3_hill_road',
      },
      {
        text: '"What\'s the security man like? The ex-military one."',
        next: 'e3_bakkal_tayfun',
      },
    ],
  },
  {
    id: 'e3_bakkal_servants',
    episode: 3,
    text: `Mehmet's hands pause on a can of tomatoes. "The Dimitriades place? It's been empty for years. The family is in Athens now." He sets the can down carefully. "Why do you ask?"

"I thought I saw a light there from the ferry," you lie. "Coming in tonight."

"A light." He polishes his glasses — a stalling gesture. "Could be. Filiz Hanım looks after the property sometimes. Checking for damage, making sure the pipes don't freeze in winter." He puts his glasses back on. "Though she does seem to go there more often than maintenance would require."

He fixes you with a look that's sharper than you expected from a neighborhood shopkeeper. "Listen. Whatever's happening in those houses is Filiz Hanım's business. She's been taking care of this hill since before I opened this shop. If there's something to know, she'll tell you. If she doesn't tell you, it's because you don't need to know."

The message is clear: the island protects its own.`,
    location: 'Büyükada Bakkal',
    phase: 'exploration',
    choices: [
      {
        text: 'Respect that. Head up the hill road to find Filiz.',
        next: 'e3_hill_road',
      },
      {
        text: 'Go directly to the servants\' quarters. You can\'t wait.',
        next: 'e3_servants_approach',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_bakkal_tayfun',
    episode: 3,
    text: `"Tayfun?" Mehmet lowers his voice instinctively. "Professional. Polite, but the kind of polite that comes with a warning. He buys cigarettes here — Maltepe Reds — and pays exactly, never more, never less. He doesn't chat. He watches."

He leans closer. "He patrols the hill road every evening. Starts at sundown, finishes around ten. After that, he's inside the mansion gates. He has a dog — a big Kangal. The dog is actually friendlier than he is."

Mehmet pauses. "But I'll say this: he's not a bad man. My grandson's bicycle chain broke on the hill road once, and Tayfun stopped to fix it. Didn't say a word, just knelt down, fixed the chain, and walked on. A man who fixes a child's bicycle isn't all the way gone."

Something to remember. Even enforcers have their limits.`,
    location: 'Büyükada Bakkal',
    phase: 'exploration',
    choices: [
      {
        text: 'Head up the hill road. Time to find Filiz.',
        next: 'e3_hill_road',
      },
    ],
  },
  {
    id: 'e3_carriage',
    episode: 3,
    text: `The carriage driver is feeding his horse an apple, the animal's breath steaming in the cool air. He's in his fifties, weathered, with the thick hands of someone who's held reins for a living.

"Where to?" he asks, already reaching for the bridle.

"The hill," you say. "The Arslaner mansion."

His hand pauses. "Arslaner's place." He gives the horse another apple slice, deliberate and slow. "I can take you to the bottom of the hill road. I don't go up. The road is private after the stone wall, and Vedat Bey..." He trails off. "He doesn't welcome visitors."

He studies you. "You're not a buyer. Buyers come with briefcases and suits. You're not a lawyer. You look like someone looking for something." He pats the horse's neck. "This island is small. People come here to find things or to hide from them. Which is it for you?"`,
    location: 'Büyükada — Carriage Stand',
    phase: 'exploration',
    choices: [
      {
        text: '"Both. I\'m looking for someone who\'s hiding."',
        next: 'e3_carriage_honest',
        effects: {
          axisShift: { trust: 0.2 },
        },
      },
      {
        text: '"I\'m a journalist covering the island\'s architectural heritage."',
        next: 'e3_carriage_cover',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: '"Just take me to the bottom of the hill road. I\'ll walk from there."',
        next: 'e3_hill_road',
      },
    ],
  },
  {
    id: 'e3_carriage_honest',
    episode: 3,
    text: `The driver looks at you for a long time. The horse stamps impatiently.

"Someone hiding." He climbs onto the carriage seat and gestures for you to get in. "I've been driving this island for twenty-five years. I know who lives here, who visits, who comes and goes at odd hours."

The carriage jolts into motion. Hooves on cobblestone, the creak of old wood, the jingle of the bridle. He drives slowly, keeping his voice low.

"There's a woman. I've seen her a few times — always at dusk, always on the back paths. She wears a headscarf pulled low, walks fast, head down. Like someone who doesn't want to be recognized." He flicks the reins. "She comes from the direction of the old servants' quarters behind the Dimitriades house. Filiz Hanım — the housekeeper at Arslaner's — I've seen her going the same direction with bags."

He stops the carriage at the base of the hill road. "That's as far as I go. The stone wall is a hundred meters up. Beyond that, it's Arslaner's territory." He tips his hat. "Be careful. And be kind to Filiz if you meet her. She's a good woman carrying more than she should."`,
    location: 'Büyükada — Hill Road',
    phase: 'exploration',
    choices: [
      {
        text: 'Walk up the hill road. Find Filiz.',
        next: 'e3_hill_road',
      },
      {
        text: 'Go around the back way — to the servants\' quarters directly.',
        next: 'e3_servants_approach',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_carriage_cover',
    episode: 3,
    text: `"Architectural heritage." The driver doesn't quite smile. "Sure. The Arslaner mansion is the finest example of late Ottoman Victorian on the island. Four stories, wraparound veranda, original ironwork. Built in 1887 for an Armenian merchant."

He climbs onto the seat and takes you up the lower road, narrating like a tour guide. The act is transparent, but he plays it well.

"The house next door — the Dimitriades place — is Greek. Similar period, different style. It's been empty for years." He pauses. "Officially."

He drops you at the base of the hill road. "The housekeeper is Filiz Hanım. She's the one who can give you access to the mansion — if she decides to. She doesn't warm to everyone." He tips his hat. "Good luck with your article, journalist."`,
    location: 'Büyükada — Hill Road',
    phase: 'exploration',
    choices: [
      {
        text: 'Walk up the hill road.',
        next: 'e3_hill_road',
      },
    ],
  },
  // === HILL ROAD & FILIZ ===
  {
    id: 'e3_hill_road',
    episode: 3,
    text: `The hill road climbs steeply through pine trees. The air thickens with resin scent. Your footsteps are loud on the gravel — too loud. The silence here is total: no traffic, no music, no city hum. Just the wind in the pines and the distant cry of a gull.

A stone wall appears — waist-high, old, covered in lichen. Beyond it, the road narrows and the trees thin. Through the branches, you glimpse the mansion: dark stone, tall windows, a veranda wrapping the upper floors. Lights glow in two windows on the ground floor.

A figure moves on the veranda. Not Vedat — a woman, older, bending to water a plant. She wears an apron and moves with the deliberate care of someone who has tended this house for decades.

Filiz Hanım.

She hasn't seen you yet. The gate in the stone wall is open — just barely, as if someone passed through recently and didn't fully close it.`,
    location: 'Büyükada — Hill Road',
    phase: 'complication',
    choices: [
      {
        text: 'Approach the gate openly. Call out a greeting. No sneaking.',
        next: 'e3_filiz_open',
        effects: {
          axisShift: { trust: 0.1, approach: 0.1 },
        },
      },
      {
        text: 'Wait by the wall. Let her come to you — she\'ll notice eventually.',
        next: 'e3_filiz_wait',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Slip through the gate quietly. Get closer before revealing yourself.',
        next: 'e3_filiz_sneak',
        effects: {
          axisShift: { approach: 0.2, trust: -0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_hill_direct',
    episode: 3,
    text: `You bypass the town entirely, following the hill road signs. The climb is steep. Pine trees close in around you, their branches forming a canopy that blocks the last daylight. Your breath comes harder. The road is gravel, then cobblestone, then gravel again.

You reach the stone wall quickly. The mansion looms beyond it — larger than you expected, its Victorian silhouette dramatic against the sky. Two windows glow on the ground floor.

A sound: boots on gravel. Steady, purposeful. Coming down the hill road toward you.

A man appears around the bend — tall, thick-shouldered, dark jacket. He walks with military precision. Tayfun. He sees you immediately.

"This is private property." His voice is flat, professional. "The mansion doesn't receive visitors."

He stands between you and the gate, arms at his sides but posture tense. Not threatening — not yet — but making it clear that proceeding requires going through him.`,
    location: 'Büyükada — Hill Road',
    phase: 'complication',
    choices: [
      {
        text: '"I\'m a journalist covering the island\'s architecture. I was hoping to see the Arslaner mansion."',
        next: 'e3_tayfun_journalist',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: '"I\'m looking for Filiz Hanım. I have a personal matter to discuss with her."',
        next: 'e3_tayfun_filiz',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: 'Back off. Return to town and find another approach.',
        next: 'e3_town_walk',
        effects: {
          axisShift: { method: 0.1, approach: -0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_tayfun_journalist',
    episode: 3,
    text: `Tayfun's expression doesn't change. "A journalist." He says it the way he'd say "a mosquito." "Vedat Bey doesn't give interviews. The property is private. Please turn around."

But something flickers in his eyes — not suspicion exactly. Weariness. He's had this conversation before.

"If you want photographs of the exterior, you can take them from the public road below." He pauses. "I'd recommend the morning light. The ironwork looks best from the southeast."

It's a dismissal, but a surprisingly helpful one. A man who notices how ironwork looks in morning light is paying attention to more than security.

He stands his ground, waiting for you to leave. Behind him, you catch a glimpse of the veranda — and a figure in an apron, watching from the doorway.`,
    location: 'Büyükada — Mansion Gate',
    phase: 'complication',
    choices: [
      {
        text: 'Leave as asked. Circle around to find the back paths.',
        next: 'e3_back_path',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Call out to the woman on the veranda. "Filiz Hanım! A moment, please!"',
        next: 'e3_filiz_call_out',
        effects: {
          axisShift: { approach: 0.2 },
          setFlags: ['tayfun_alert'],
        },
      },
    ],
  },
  {
    id: 'e3_tayfun_filiz',
    episode: 3,
    text: `Tayfun considers this. "Filiz Hanım." Something in his expression shifts — the faintest softening. "What personal matter?"

He's not asking out of authority. He's asking because, you realize, he cares about Filiz. She's been here forty years; he's been here five. But in that time, something resembling respect — maybe even affection — has formed.

"It's about a family member," you say. "Someone she may have known."

Tayfun is quiet for a long moment. Then he steps aside — not fully, but enough to indicate passage. "Five minutes. She's on the veranda. If Vedat Bey asks, you were asking about the garden tour that doesn't exist."

He watches you walk through the gate. A man following orders, but not blindly. Not tonight.`,
    location: 'Büyükada — Mansion Gate',
    phase: 'complication',
    npcPresent: ['tayfun'],
    choices: [
      {
        text: 'Walk to the veranda. Approach Filiz respectfully.',
        next: 'e3_filiz_open',
        effects: {
          npcTrust: { tayfun: 1 },
        },
      },
    ],
  },
  {
    id: 'e3_filiz_call_out',
    episode: 3,
    text: `Your voice carries in the island quiet. Tayfun stiffens. On the veranda, Filiz freezes — the watering can suspended mid-pour.

"Please," Tayfun says, his voice dropping to something cold. "Do not shout on this property."

But Filiz has already set down the watering can. She comes to the veranda railing and peers down at you. "Who is calling?"

"My name is Deniz Karadağ. I need to speak with you. It's about my sister."

The name hits like a stone dropped in still water. Filiz's hand grips the railing. Even from this distance, you see her knuckles whiten. She knows that name. She's been waiting for that name.

"Tayfun," she says quietly. "Let them in."

Tayfun looks like he wants to argue, but forty years of authority outweigh five years of employment. He steps aside. You walk through the gate, aware that you've just announced yourself to the entire property.`,
    location: 'Büyükada — Mansion Gate',
    phase: 'complication',
    npcPresent: ['filiz', 'tayfun'],
    choices: [
      {
        text: 'Go to Filiz on the veranda.',
        next: 'e3_filiz_veranda',
        effects: {
          setFlags: ['found_filiz'],
        },
      },
    ],
  },
  {
    id: 'e3_filiz_open',
    episode: 3,
    text: `You approach the veranda steps openly, hands visible. "Filiz Hanım? Merhaba. Rahatsız ettiğim için özür dilerim."

She looks up from her watering can. Her face is creased with seventy years of island wind and household worry, but her eyes are sharp. She takes in everything — your clothes, your posture, the bag on your shoulder.

"Who are you?" Not unfriendly. Careful.

"My name is Deniz Karadağ."

The name changes everything. Her hand tightens on the watering can. She sets it down slowly, precisely, the way she probably does everything. Then she looks at you again — really looks — and her eyes fill with something you can't quite name. Recognition. Relief. Fear.

"Karadağ," she repeats softly. "You look like her. Around the eyes."

She glances toward the mansion's lit windows, then back at you. A decision being made in real time. Forty years of loyalty, weighed against something older: conscience.`,
    location: 'Büyükada — Mansion Veranda',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: '"You know my sister. Please — is she alive?"',
        next: 'e3_filiz_plea',
        effects: {
          setFlags: ['found_filiz'],
          axisShift: { heart: 0.2 },
          npcTrust: { filiz: 1 },
        },
      },
      {
        text: 'Wait. Let her process. She\'ll speak when she\'s ready.',
        next: 'e3_filiz_patience',
        effects: {
          setFlags: ['found_filiz'],
          axisShift: { method: 0.1, heart: 0.1 },
          npcTrust: { filiz: 2 },
        },
      },
    ],
  },
  {
    id: 'e3_filiz_wait',
    episode: 3,
    text: `You lean against the stone wall and wait. The pine trees sway. The mansion's lights glow. On the veranda, Filiz finishes watering her plants, disappears inside, then re-emerges with a shawl around her shoulders.

She walks to the gate. She's seen you — you're certain of it. She walks slowly, with the deliberation of someone approaching something they've been expecting and dreading.

She stops at the gate and looks at you through the ironwork. "You've been standing there for twenty minutes." Her voice is steady. "People who stand and wait are either very patient or very lost. Which are you?"

"Patient," you say. "My name is Deniz Karadağ."

Her face changes. She grips the gate's iron bars. "Karadağ." Almost a whisper. Then she opens the gate — just enough for you to pass through. "Come. Not through the front. Around the side. He mustn't see you."`,
    location: 'Büyükada — Mansion Wall',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: 'Follow her around the side of the mansion.',
        next: 'e3_filiz_patience',
        effects: {
          setFlags: ['found_filiz'],
          axisShift: { method: 0.1 },
          npcTrust: { filiz: 2 },
        },
      },
    ],
  },
  {
    id: 'e3_filiz_sneak',
    episode: 3,
    text: `You slip through the gate and move along the garden wall, staying in the shadows of the pine trees. The garden is immaculate — rose bushes pruned, gravel paths raked. Even the shadows seem organized here.

You're ten meters from the veranda when a voice speaks from directly behind you.

"What are you doing in this garden?"

Filiz. She's appeared from a side door, holding a broom like a weapon. Her eyes are hard, her posture rigid. You've been caught sneaking onto the property of someone she's protected for forty years.

"I—"

"Get out." Her voice is flat. Absolute. "This is private property. You have no business here."

The trust you might have built is gone. Whatever Filiz knows, whatever she might have shared, has been locked behind the steel door of her loyalty to the house. You snuck in. In her world, that makes you a threat.`,
    location: 'Büyükada — Mansion Garden',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: '"Filiz Hanım, please. My name is Deniz Karadağ. I\'m looking for my sister Defne."',
        next: 'e3_filiz_recover',
        effects: {
          npcTrust: { filiz: -1 },
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: 'Leave. You\'ve blown this approach. Find another way.',
        next: 'e3_back_path',
        effects: {
          npcTrust: { filiz: -1 },
        },
      },
    ],
  },
  {
    id: 'e3_filiz_recover',
    episode: 3,
    text: `The name stops her. The broom lowers an inch. "Karadağ."

"Defne Karadağ. She was an art restorer. She disappeared two years ago. The police said she drowned. But I don't think she did." Your voice shakes. "I think she's here. On this island. And I think you know where."

Filiz stares at you. The broom lowers all the way. Something wars across her face — duty against compassion, fear against hope.

"You came sneaking through the gate like a thief," she says finally. "That's not how you find family. That's how you find trouble." She pauses. "But those are her eyes. You have her eyes."

She's not open — not the way she might have been if you'd approached honestly. But the name carries weight. The family resemblance carries more.

"I will tell you nothing here," she says. "The walls have ears. Come to the bakkal tomorrow morning. Seven o'clock. And come alone." She picks up the broom again. "Now leave. Before he notices."`,
    location: 'Büyükada — Mansion Garden',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: 'Leave. Come back tomorrow morning. She\'ll talk then.',
        next: 'e3_night_wait',
      },
    ],
  },
  {
    id: 'e3_filiz_veranda',
    episode: 3,
    text: `Filiz leads you to a corner of the veranda hidden from the mansion's windows. She sits on the railing, pulling her shawl tight.

"I knew someone would come eventually," she says. Her voice is low, steady, but her hands tremble. "Two years. I've been waiting two years for someone to say that name."

She looks at you. "Your sister is alive, Deniz. She's been alive this whole time."

The words hit you like something physical. You grip the veranda railing. The wood is old, smooth, worn by decades of hands.

"She's here," Filiz continues. "On the island. In the servants' quarters behind the Dimitriades house." She pauses. "I've been feeding her. Bringing her clothes, blankets, supplies. For two years."

The magnitude of that settles over you. This seventy-year-old woman, the housekeeper of a man who drove your sister into hiding, has been secretly sustaining her for two years. Groceries. Blankets. Kindness, smuggled past the very man who caused the need for it.`,
    location: 'Büyükada — Mansion Veranda',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: '"Take me to her. Now. Please."',
        next: 'e3_to_defne',
        effects: {
          axisShift: { heart: 0.2 },
          npcTrust: { filiz: 1 },
        },
      },
      {
        text: '"Why? Why did you protect her?"',
        next: 'e3_filiz_why',
        effects: {
          axisShift: { heart: 0.1, method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_filiz_plea',
    episode: 3,
    text: `Filiz's composure cracks — just for a moment. She presses her hand to her mouth, then recovers. "Come," she says. "Not here."

She leads you around the side of the mansion to a garden bench screened by hydrangeas. She sits heavily, as if the weight she's been carrying has suddenly become too much.

"She's alive." The words come out in a rush, as if she's been holding them for two years. "Defne is alive. She's on this island. I've been... I've been taking care of her."

She tells you: the servants' quarters behind the Dimitriades mansion. Two years of secret supply runs. Groceries, medicine, blankets in winter. All while working in Vedat's house, serving his dinner, keeping his mansion spotless.

"Why?" you ask.

"Because I am not a monster," she says simply. "And because what was done to that girl was wrong. Even if my employer doesn't see it that way."`,
    location: 'Büyükada — Mansion Garden',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: '"Take me to her."',
        next: 'e3_to_defne',
        effects: {
          npcTrust: { filiz: 1 },
        },
      },
      {
        text: '"Tell me about Vedat first. What exactly is he doing in that house?"',
        next: 'e3_filiz_vedat',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_filiz_patience',
    episode: 3,
    text: `Filiz leads you to the kitchen garden — a small patch behind the mansion, screened by a high wall. The smell of herbs: rosemary, mint, thyme. She gestures to a wooden bench and sits beside you.

"You waited," she says. "Most people don't wait anymore. They demand." She studies your face. "You have patience. Like your sister."

The comparison stings and soothes in equal measure.

"She's alive, Deniz." Filiz's voice is barely above a whisper. "She's been alive this whole time. In the servants' quarters behind the house next door. I've been caring for her — food, supplies, company when I can manage it."

She tells you everything: how Defne arrived on the island two years ago, terrified and exhausted. How Filiz found her hiding in the garden shed and made a decision in thirty seconds that would define the next two years of her life. How she's maintained the secret while cooking Vedat's meals, cleaning his house, displaying his art.

"He doesn't know," Filiz says. "Or if he suspects, he doesn't say. Vedat sees what he chooses to see. It's how he's lived his entire life."`,
    location: 'Büyükada — Kitchen Garden',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: '"Take me to her. I need to see my sister."',
        next: 'e3_to_defne',
        effects: {
          npcTrust: { filiz: 1 },
        },
      },
      {
        text: '"I also need to get into the mansion. The paintings — there are documents hidden in them."',
        next: 'e3_filiz_mansion_help',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_filiz_why',
    episode: 3,
    text: `Filiz is quiet for a moment. The wind moves through the pines. A cat crosses the veranda rail, indifferent to the gravity of the conversation.

"I've worked in this house for forty years," she says. "I was twenty when I started. Vedat was young then too — ambitious, passionate about art. He wasn't always... what he became." She pulls her shawl tighter. "The house was beautiful. The paintings, the gardens, the view of the sea. I loved this house."

She looks at you. "But a house is not its owner. When I found your sister hiding in the garden shed, shaking, terrified — I had a choice. Loyalty to Vedat, or..." She pauses. "Or being a decent human being. It wasn't a difficult choice. It was just a dangerous one."

She stands. "Come. I'll take you to her. She's been waiting — not for me. For you. She always said you'd come. Even when I thought nobody was coming, she said: 'Deniz will find me. Deniz doesn't give up.'"`,
    location: 'Büyükada — Mansion Veranda',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: 'Follow Filiz. It\'s time.',
        next: 'e3_to_defne',
      },
    ],
  },
  {
    id: 'e3_filiz_vedat',
    episode: 3,
    text: `Filiz's expression hardens. "Vedat collects Ottoman miniature paintings. Twenty-three of them, officially. But behind at least seven — maybe more — there are documents. Hidden beneath the canvas, between layers of paint. Financial records. Land deeds. Letters that would ruin very powerful people."

She shakes her head. "Your sister discovered this while restoring the paintings. She found a document behind a Bosphorus scene — a land deed that proved a construction company had stolen public land. She was going to the police. Vedat found out."

"He didn't threaten her directly — he's too refined for that. He told her that accidents happen on the Bosphorus. That boats sink. That people disappear." Filiz's voice is bitter. "She staged her own drowning and came here. The one place nobody would look — hiding next door to the man who drove her into hiding."

She stands. "I'll take you to her. Then we can decide what to do about Vedat. But Defne first. She's waited long enough."`,
    location: 'Büyükada — Mansion Garden',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: 'Follow Filiz to Defne.',
        next: 'e3_to_defne',
      },
    ],
  },
  {
    id: 'e3_filiz_mansion_help',
    episode: 3,
    text: `Filiz nods slowly. "The paintings. Yes. I know about the documents — I've known for years. I clean those frames. I dust those walls." She looks toward the mansion. "Vedat is in his study most evenings. Tayfun patrols outside until ten, then comes in. Between ten and midnight, the gallery room is empty."

She reaches into her apron pocket and pulls out a key — old, heavy, brass. "The service entrance. Through the kitchen, down the hall, second door on the right. The gallery."

She holds the key out, then pulls it back. "But first — your sister. See her first. Then decide how you want to do this. She's been thinking about it for two years. She has plans. Listen to her before you act."

The key disappears back into her apron.

"Come. The path to the servants' quarters is through the back garden. Stay close to the wall."`,
    location: 'Büyükada — Kitchen Garden',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: 'Follow her to Defne first. The mansion can wait.',
        next: 'e3_to_defne',
        effects: {
          npcTrust: { filiz: 1 },
        },
      },
    ],
  },
  // === BACK PATH & SERVANTS' QUARTERS ===
  {
    id: 'e3_back_path',
    episode: 3,
    text: `You circle around the hill, following a narrow path through the pine forest. The trees are dense here, the ground carpeted with needles that muffle your footsteps. Through the branches, you catch glimpses of the mansion above and, beside it, a smaller structure — stone walls, shuttered windows, a sagging tile roof.

The servants' quarters. The path emerges at a low wooden fence, half-rotted. Beyond it, a small courtyard with a well and a clothesline. The clothesline has laundry on it — a towel, a shirt, a pair of socks. Recently hung.

Someone is living here.

A light flickers in one of the ground-floor windows. Not electric — a candle, or an oil lamp. Someone who doesn't want to draw attention.

Your heart is hammering. Two years. Two years of grief, of unanswered questions, of a death certificate that might be a lie. And behind that flickering window, maybe — maybe — the truth.`,
    location: 'Büyükada — Pine Forest Path',
    phase: 'complication',
    choices: [
      {
        text: 'Knock on the door. No more skulking.',
        next: 'e3_servants_approach',
        effects: {
          axisShift: { approach: 0.1, heart: 0.1 },
        },
      },
      {
        text: 'Look through the window first. You need to see before you believe.',
        next: 'e3_servants_window',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_servants_approach',
    episode: 3,
    text: `You cross the courtyard. The door is old wood, swollen in its frame. You raise your hand. Hesitate. Behind this door, your world either shatters or rebuilds.

You knock. Three times. The sound is absurdly loud in the island silence.

Nothing. Then — a rustle. Footsteps, quick and light. The scrape of something being moved. A bolt being drawn. Another bolt.

The door opens a crack. One eye, dark, wary, peering through the gap. The light behind is dim — a single lamp.

"Who sent you?" A woman's voice. Rough from disuse, but you'd know it anywhere. In any darkness, in any lifetime. You'd know that voice.

"Nobody sent me," you say. Your own voice breaks. "Nobody had to. Defne — it's me."

The door opens wider. And there she is.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'complication',
    choices: [
      {
        text: 'Step inside. Close the door behind you.',
        next: 'e3_reunion',
        effects: {
          setFlags: ['found_defne'],
          axisShift: { heart: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_servants_window',
    episode: 3,
    text: `You creep to the window and peer through a gap in the shutters. Inside: a small room, barely furnished. A narrow cot, a table with books stacked on it, a camping stove, cans of food on a shelf. And sitting at the table, reading by the light of an oil lamp —

A woman. Thinner than you remember. Her hair is shorter, streaked with gray at the temples. Her hands — those careful, precise restorer's hands — hold the book with a grip that's tighter than reading requires.

It's Defne.

The grief and relief hit simultaneously, a wave that nearly buckles your knees. She's alive. She's been alive this whole time, sitting in this cramped room, reading by lamplight, hiding from the world that buried her.

Your hand moves to the window. You tap on the glass.

She looks up. Freezes. Then she's on her feet, moving to the door, and you hear the bolts slide.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'complication',
    choices: [
      {
        text: 'Go to the door.',
        next: 'e3_reunion',
        effects: {
          setFlags: ['found_defne'],
          axisShift: { heart: 0.2, method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_to_defne',
    episode: 3,
    text: `Filiz leads you through the back garden, along a path screened by oleander bushes. The neighboring mansion — the Dimitriades house — looms dark and shuttered. Behind it, the servants' quarters: a small stone building, nearly invisible in the shadow of the larger house.

Filiz knocks on the door — a pattern, three short, two long. Footsteps inside. Bolts sliding.

The door opens. And there, in the dim light of an oil lamp, stands your sister.

Two years. Two years of grief, of an empty apartment in Arnavutköy with a dried plant on the balcony, of a death certificate signed by a coast guard officer who never found a body. Two years of learning to live without someone. And she's been here. Thirty meters from the man who drove her into hiding, sustained by the quiet heroism of a seventy-year-old housekeeper.

Defne stares at you. Her face cycles through emotions like weather — shock, joy, fear, anger, relief — each one visible, none dominant.

"Deniz." Your name in her mouth. Like a prayer. Like an accusation.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'complication',
    npcPresent: ['defne', 'filiz'],
    choices: [
      {
        text: 'Pull her into an embrace. Words can come later.',
        next: 'e3_reunion',
        effects: {
          setFlags: ['found_defne'],
          axisShift: { heart: 0.3 },
          npcTrust: { defne: 1 },
        },
      },
      {
        text: '"You\'re alive." Just the fact. Let it land between you.',
        next: 'e3_reunion',
        effects: {
          setFlags: ['found_defne'],
          axisShift: { method: 0.1 },
          npcTrust: { defne: 1 },
        },
      },
    ],
  },
  // === THE REUNION ===
  {
    id: 'e3_reunion',
    episode: 3,
    text: `The door closes behind you. The room is small — a cot, a table, books, canned food. The ceiling is low. This is where your sister has lived for two years: a space smaller than your bathroom in Beşiktaş.

Defne stands across from you. She's thinner — her collarbones sharp under a faded sweater. Her hair is shorter, streaked with gray she's too young for. Her hands — those restorer's hands, steady enough to work on centuries-old paint — are trembling.

"I didn't know if you'd come," she says. "I didn't know if you'd figure it out."

"I figured it out."

"I know." A breath that might be a laugh. "I know you did." Then, quieter: "I wanted to call you. Every day for two years, I wanted to pick up a phone and hear your voice. But if they traced the call..." She stops. "I couldn't risk you."

The silence fills with two years of absence. The anger comes — you feel it rise in your chest like something swallowed wrong.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: '"Why didn\'t you tell me? Two years, Defne. I thought you were dead."',
        next: 'e3_reunion_anger',
        effects: {
          axisShift: { heart: -0.1, approach: 0.1 },
          npcTrust: { defne: -1 },
        },
      },
      {
        text: '"You\'re here. You\'re alive. That\'s all that matters right now."',
        next: 'e3_reunion_forgive',
        effects: {
          axisShift: { heart: 0.2, trust: 0.1 },
          npcTrust: { defne: 1 },
        },
      },
      {
        text: '"Tell me everything. From the beginning. I need to understand."',
        next: 'e3_reunion_understand',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_reunion_anger',
    episode: 3,
    text: `Defne absorbs the anger. She doesn't flinch — she expected it. "I know," she says. "I know what I did to you. To Mom. To everyone." Her voice is raw. "Do you think I didn't grieve my own funeral? Do you think I didn't sit in this room and imagine you at the memorial, and—"

She breaks off. Sits on the cot. "I was scared, Deniz. Not of dying — of what would happen to you if they knew I'd talked. These people don't make threats. They make arrangements. A car accident. A mugging gone wrong. Something that looks like bad luck."

She looks up at you. "So I died instead. I died so you could live."

The words land like stones. You sit beside her. The cot creaks under your combined weight. For a long moment, you sit in silence — the particular silence of two people who love each other and have hurt each other and don't know how to bridge the gap.

"What do we do now?" she asks. "Because I sent that text for a reason. Vedat is selling the mansion. When it sells, I have nowhere to go — and the documents in those paintings disappear with the collection."`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: '"We expose him. I have evidence — photos, names, witnesses."',
        next: 'e3_plan_expose',
        effects: {
          axisShift: { approach: 0.1, method: 0.1 },
        },
      },
      {
        text: '"We leave. Together. Tonight. Forget the network — I just want you safe."',
        next: 'e3_plan_escape',
        effects: {
          axisShift: { heart: 0.2 },
        },
      },
      {
        text: '"We confront Vedat. Face to face. With everything we have."',
        next: 'e3_plan_confront',
        effects: {
          axisShift: { approach: 0.3 },
        },
      },
    ],
  },
  {
    id: 'e3_reunion_forgive',
    episode: 3,
    text: `Defne's composure breaks. She pulls you into a hug — fierce, trembling, the kind of embrace that tries to make up for two years of absence in a single grip. You hold each other in the dim lamplight, and the years of silence contract into this single point.

"I'm sorry," she whispers. "I'm so sorry."

"I know."

You hold her until the trembling stops. Then you sit together on the narrow cot, shoulder to shoulder, the way you used to sit on the Beşiktaş waterfront watching the ferries.

"Vedat is selling the mansion," Defne says, pulling herself back to the present. "When it sells, the collection goes with it. Everything — the paintings, the documents hidden inside them, the evidence of what he's done. It all disappears into a private collection, and nobody ever sees it again."

She looks at you. "I sent the text because I'm out of options. I can't hide anymore. But I also can't let those documents vanish. People's lives are in those paintings — stolen land, financial fraud, years of blackmail."`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: '"Then we get the evidence. The paintings. Tonight."',
        next: 'e3_plan_expose',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: '"Let\'s just go. Leave Turkey. Start over."',
        next: 'e3_plan_escape',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: '"We face Vedat together. He needs to know it\'s over."',
        next: 'e3_plan_confront',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_reunion_understand',
    episode: 3,
    text: `Defne tells you everything. The restoration job for Selim. The Ottoman miniature — a Bosphorus scene, eighteenth century — and the document she found hidden beneath the canvas when she was cleaning the underlayers. A land deed, proving a construction company had acquired public land through forged documents.

She told Selim. Mistake. He went white. Then he went to Vedat.

"Vedat invited me to the mansion," Defne says. "Polite. Charming. Tea in his study, surrounded by paintings. He explained, very calmly, that I had discovered something that many powerful people had invested significant effort in hiding. He said the documents in the paintings were insurance — not for the public, but for the network. Leverage. Control."

She pulls her knees to her chest. "He didn't threaten me directly. He didn't have to. He just said: 'The Bosphorus is treacherous at night. People disappear.' Then he poured more çay."

She staged the drowning a week later. Faked a solo sailing trip. Left the boat adrift. Made it to the island on Hakan Reis's boat.

"He's selling the mansion now," she says. "When it goes, the paintings go. The evidence disappears. And I have nowhere to hide."`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: '"We get the evidence from the paintings before the sale goes through."',
        next: 'e3_plan_expose',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: '"Forget the evidence. We leave. Both of us. Tonight."',
        next: 'e3_plan_escape',
        effects: {
          axisShift: { heart: 0.2 },
        },
      },
      {
        text: '"We go to Vedat. Directly. Tell him it\'s over."',
        next: 'e3_plan_confront',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_night_wait',
    episode: 3,
    text: `You find a small hotel near the pier — more of a pension, really, with creaking floors and a radiator that hisses. You lie on the bed and watch the ceiling, unable to sleep.

At dawn, you're at the bakkal. Mehmet Amca is just opening the shutters. And at seven o'clock, exactly, Filiz appears — shopping basket over her arm, apron traded for a wool coat.

She sees you and nods. No surprise. She expected you.

"Walk with me," she says, and leads you to a bench overlooking the sea. The morning is silver — fog on the water, the sun a pale disk behind clouds.

"Your sister is alive," she says quietly. "I've been taking care of her for two years. In the servants' quarters behind the Dimitriades house."

She tells you everything. And then she takes you there.`,
    location: 'Büyükada — Waterfront',
    phase: 'complication',
    npcPresent: ['filiz'],
    choices: [
      {
        text: 'Follow Filiz to the servants\' quarters.',
        next: 'e3_to_defne',
        effects: {
          setFlags: ['found_filiz'],
          npcTrust: { filiz: 1 },
        },
      },
    ],
  },
  // === PLANS / PATHS ===
  {
    id: 'e3_plan_expose',
    episode: 3,
    text: `"The gallery room," Defne says, and something in her sharpens — the restorer's precision returning after two years. "Twenty-three paintings. At least seven have documents behind them. If we can photograph the documents in situ — prove they were hidden inside the paintings — that's evidence of concealment. Fraud. Conspiracy."

She pulls a hand-drawn map from under the cot. The mansion's floor plan, sketched from memory. "Ground floor. The gallery is here — second door on the right from the service entrance. Vedat's study is here — far end of the hall. Tayfun patrols the grounds until ten, then goes to the gatehouse."

She looks at you. "Filiz has a key to the service entrance. If she'll help us — and I think she will — we can get in after ten, photograph everything, and be out before midnight."

The plan is clean. Simple. The kind of plan that works until it doesn't.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Go to the mansion tonight. Use Filiz\'s key. Get the evidence.',
        next: 'e3_stealth_begin',
        condition: { flag: 'found_filiz' },
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'You have allies — Rüya, Bora, Cem. Coordinate with them first.',
        next: 'e3_alliance_plan',
        condition: { flag: 'cultivated_ruya' },
        effects: {
          axisShift: { trust: 0.2 },
        },
      },
      {
        text: 'You have allies — coordinate with Bora and Cem.',
        next: 'e3_alliance_plan',
        condition: { flag: 'cultivated_cem' },
        effects: {
          axisShift: { trust: 0.2 },
        },
      },
      {
        text: 'Confront Vedat directly with what you already have.',
        next: 'e3_confront_vedat',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_plan_escape',
    episode: 3,
    text: `Defne looks at you. In her eyes, a war: the restorer who wants the truth exposed, and the sister who just wants to be safe.

"Leave," she says. "Just leave. Leave the paintings, leave Vedat, leave all of it." She grips your hand. "I've spent two years in this room thinking about evidence and justice and exposing the truth, and all it got me was a cot in a servants' quarters. Maybe the truth isn't worth the cost."

The room is quiet. The lamp flame flickers. Outside, the pines whisper.

You think about everything you've gathered — the photos, the testimonies, the names. You think about Naz, who believes she's preserving heritage. About Selim, who lies with practiced grace. About the network that will continue if nobody stops it.

And then you think about Defne. Alive. Here. Ready to leave.

Some choices aren't about right and wrong. They're about what you can carry.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: '"Let\'s go. Leave everything. Leave Turkey. Start new."',
        next: 'e3_escape_leave',
        effects: {
          axisShift: { heart: 0.2, method: -0.2 },
        },
      },
      {
        text: '"We leave, but we take what we know. Build the case from somewhere safe."',
        next: 'e3_escape_smart',
        effects: {
          axisShift: { heart: 0.1, method: 0.2 },
        },
      },
      {
        text: 'No. You can\'t walk away. "I need to see this through, Defne."',
        next: 'e3_plan_expose',
        effects: {
          axisShift: { approach: 0.1, heart: -0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_plan_confront',
    episode: 3,
    text: `"Confront him." Defne stares at you. "You want to walk into that mansion and tell Vedat Arslaner that you know what he's done. The man who threatened to kill me."

"He needs to know it's over."

Defne is quiet for a long moment. Then she nods — slowly, as if convincing herself. "Maybe you're right. Maybe the only way this ends is face to face. No skulking. No hiding." She looks around the cramped room. "I'm tired of hiding."

She stands. Straightens her shoulders. Something of the old Defne returns — the restorer who handled priceless art with confident hands. "Then we go together. Both of us. He threatened a ghost. Let him see I'm not dead."

The idea is terrifying and electric. Two sisters walking into a villain's study. No weapons. No backup. Just the truth and the nerve to speak it.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Go now. Together. Face Vedat in his study.',
        next: 'e3_confront_vedat',
        effects: {
          axisShift: { approach: 0.2 },
          npcTrust: { defne: 1 },
        },
      },
      {
        text: 'Get the evidence first. Then confront him with proof.',
        next: 'e3_stealth_begin',
        condition: { flag: 'found_filiz' },
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },
  // === STEALTH PATH ===
  {
    id: 'e3_stealth_begin',
    episode: 3,
    text: `Ten-fifteen PM. The mansion is quiet. Through the windows, you can see the study light — Vedat is reading. Tayfun's patrol ended at ten; his flashlight disappeared into the gatehouse fifteen minutes ago.

Filiz meets you at the service entrance, key in hand. She's changed out of her apron into dark clothes. Her face is set — the face of a woman who's made her decision and won't be moved.

"The gallery is dark," she whispers. "I left the curtains drawn this afternoon. You'll have maybe thirty minutes before he finishes his brandy and comes to do his evening walk through the gallery."

She unlocks the door. The hinges are silent — she's oiled them. Of course she has. This isn't a woman who leaves things to chance.

Inside: a service corridor, dim, smelling of wood polish and old plaster. Filiz points: "Second door. Right side. Go."`,
    location: 'Büyükada — Mansion Service Entrance',
    phase: 'climax',
    npcPresent: ['filiz'],
    choices: [
      {
        text: 'Move quickly and quietly to the gallery.',
        next: 'e3_gallery',
        effects: {
          setFlags: ['entered_mansion'],
        },
      },
    ],
  },
  {
    id: 'e3_gallery',
    episode: 3,
    text: `The gallery takes your breath away despite everything. Twenty-three Ottoman miniatures line the walls, each in a heavy gilt frame, each lit by a small brass fixture now dark. In the thin light from your phone, the paintings glow — Bosphorus scenes, court life, gardens, battles. Centuries of beauty, weaponized.

You begin with the painting Defne described — a Bosphorus scene, the one that started everything. Your hands shake as you carefully lift the frame from the wall. It's heavy. Behind it, mounted to the wall with museum-grade brackets, the back of the canvas is exposed.

And there — visible in your phone's light — the edge of a document, sealed between the canvas and a false backing. You photograph it. Then carefully peel back the backing to reveal the full document: a land deed, dates, signatures, official stamps.

You photograph everything. Then move to the next painting. And the next. Seven paintings. Seven documents. Financial records. Property transfers. Letters bearing signatures that would destroy careers and end fortunes.

Your phone fills with evidence. The clock in the hallway chimes half-past ten.`,
    location: 'Büyükada — Mansion Gallery',
    phase: 'climax',
    choices: [
      {
        text: 'You have enough. Get out. Now.',
        next: 'e3_stealth_exit',
        effects: {
          setFlags: ['has_evidence_package'],
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Check the remaining paintings. Be thorough.',
        next: 'e3_stealth_thorough',
        effects: {
          setFlags: ['has_evidence_package'],
          axisShift: { method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_stealth_exit',
    episode: 3,
    text: `You replace the last painting and move to the door. The corridor is empty. Filiz is waiting at the service entrance, her face pale but steady.

"Done?" she whispers.

You nod. Show her the phone. Forty-three photographs. Seven documents. Enough to bring down the network.

She locks the service door behind you. The night air hits you — cold, pine-scented, tasting of salt and relief. You're out. The evidence is on your phone, and Vedat doesn't know.

Filiz grips your arm. "Send those photographs somewhere safe. Now. Before anything else. If they take your phone, the evidence dies with it."

She's right. You send the photos — to your email, to a cloud backup, to Rüya if you have her contact.

The mansion sits behind you, dark and unsuspecting. Inside, Vedat is finishing his brandy. He doesn't know that thirty minutes ago, someone pulled back the curtains on his secrets.

Now the question: what do you do with them?`,
    location: 'Büyükada — Mansion Grounds',
    phase: 'climax',
    choices: [
      {
        text: 'Write the story yourself. Publish it. Let the world see what Vedat built.',
        next: 'ending_a1',
        condition: { axis: { name: 'approach', min: 0.3 } },
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: 'Send everything to the police anonymously. Let justice work.',
        next: 'ending_a2',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_stealth_thorough',
    episode: 3,
    text: `You check painting fifteen. Nothing. Sixteen. Nothing. Seventeen — another document. You photograph it.

The hallway clock chimes eleven. Footsteps. Coming down the corridor.

You freeze. The gallery door is ajar. The footsteps are unhurried — leather shoes on hardwood. Vedat, making his evening walk.

You have seconds. The gallery has no other exit. The windows are shuttered. Under the display table is the only hiding spot.

You slide under the table as the door opens. Vedat enters — you can see his polished shoes, hear him humming softly. He walks the perimeter of the gallery, pausing at each painting. His hand reaches out to straighten a frame — the frame you replaced thirty seconds ago.

He pauses. His humming stops.

"Filiz?" he calls. "Was someone in the gallery today?"

From somewhere in the house: "Just me, Vedat Bey. I was dusting."

A long pause. Then the humming resumes. He completes his circuit and leaves. The door closes. His footsteps recede.

You exhale. Your hands are shaking. But the evidence is on your phone.`,
    location: 'Büyükada — Mansion Gallery',
    phase: 'climax',
    choices: [
      {
        text: 'Get out. Now. Through the service entrance.',
        next: 'e3_stealth_exit',
      },
    ],
  },
  // === ALLIANCE PATH ===
  {
    id: 'e3_alliance_plan',
    episode: 3,
    text: `You step outside the servants' quarters and make calls. Rüya answers on the first ring — she can catch the morning ferry with a journalist and a photographer. Cem is reachable by text. Bora picks up with a gruff "Tell me what you need."

Within an hour, the plan takes shape:

Rüya has contacts at the national newspaper. She'll bring them with her on the first ferry, along with her own insurance company evidence — enough for a civil case on its own.

Cem knows a coast guard officer — one who wasn't compromised — who can be contacted if things go wrong.

Bora is already on the last ferry. He'll be on the island by midnight. "Nobody threatens my friends and gets away with it," he says. "Nobody."

The alliance isn't professional. It's a bartender, a ferry tea vendor, a private investigator, and two sisters. But it's enough. More than enough. Because Vedat Arslaner's power comes from secrecy, and secrets don't survive when this many people know them.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Get the evidence from the mansion tonight. With Filiz\'s help.',
        next: 'e3_stealth_begin',
        condition: { flag: 'found_filiz' },
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Wait for morning. Confront Vedat with the full alliance behind you.',
        next: 'e3_alliance_morning',
        effects: {
          axisShift: { method: 0.1, trust: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_alliance_morning',
    episode: 3,
    text: `Dawn on Büyükada. The morning ferry arrives, and with it: Bora, looking like he hasn't slept and doesn't care. A journalist from the national daily, notebook and camera. Rüya, with her insurance folder and the calm focus of someone who's been building to this for months.

You assemble at the tea garden. The owner, who sees everything and says nothing, provides çay without being asked.

"Here's how this works," Rüya says, spreading papers on the table. "I have the insurance fraud evidence. Deniz has photographs from the mansion. Sude's photos connect the network across three neighborhoods. Bora can testify to what Defne told him. And Defne herself can tell her story."

She looks at each of you. "We don't need to confront Vedat. We don't need to break into anything. We walk to the police station on the island, file a report, and let the evidence speak. Simultaneously, the journalist files the story. By evening, it's public."

Bora cracks his knuckles. "And if Vedat tries to run?"

"He won't," Rüya says. "Men like Vedat don't run. They hire lawyers. But by then, it won't matter."

She's right. This isn't a confrontation. It's a reckoning.`,
    location: 'Büyükada — Tea Garden',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Publish the story. Let the world know what happened here.',
        next: 'ending_a1',
        effects: {
          setFlags: ['has_evidence_package'],
        },
      },
      {
        text: 'Go through the police. Keep it official. Let the law do its work.',
        next: 'ending_a2',
        effects: {
          setFlags: ['has_evidence_package'],
        },
      },
    ],
  },
  // === CONFRONTATION PATH ===
  {
    id: 'e3_confront_vedat',
    episode: 3,
    text: `You walk up the hill road in the dark. Defne beside you. The mansion's lights glow through the pines. Your footsteps crunch on gravel — loud, deliberate. No sneaking this time.

At the gate, Tayfun appears. He sees Defne and goes very still.

"She's dead," he says. Flat. Confused.

"Clearly not," Defne says. "We're here to see Vedat."

Tayfun's hand moves to his radio. Then stops. He looks at Defne — at the woman he was told drowned two years ago, standing alive in the lamplight — and something fractures behind his professional mask.

"He's in his study," Tayfun says. And steps aside.

The mansion swallows you. A hallway of polished wood, paintings on every wall, the smell of old money and beeswax. Defne walks it like she knows it — because she does. She restored these halls. She knows every painting, every frame, every hidden thing.

The study door is open. Inside, Vedat Arslaner sits in a leather chair, a book in his lap, a glass of brandy on the side table. He looks up as you enter.

His expression when he sees Defne is the most controlled terror you've ever witnessed. A flicker — barely a second — before the mask returns.

"Ah," he says. "So you've come home."`,
    location: 'Büyükada — Vedat\'s Study',
    phase: 'climax',
    npcPresent: ['vedat', 'defne'],
    choices: [
      {
        text: '"It\'s over, Vedat. I know everything. The paintings, the documents, the network."',
        next: 'e3_vedat_confront',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: 'Let Defne speak. This is her fight as much as yours.',
        next: 'e3_vedat_defne_speaks',
        effects: {
          axisShift: { heart: 0.1, trust: 0.1 },
          npcTrust: { defne: 1 },
        },
      },
    ],
  },
  {
    id: 'e3_vedat_confront',
    episode: 3,
    text: `Vedat sets down his book. He doesn't stand. He doesn't raise his voice. He lifts his brandy, takes a sip, and regards you with the steady patience of a man who has been powerful for so long that he's forgotten what threat looks like.

"You know," he says. "And what do you know, specifically?"

"The documents behind the paintings. The forged provenance. Naz in Kadıköy. Selim in Arnavutköy. The network you built to hide power inside art."

Vedat nods slowly. "And you have evidence?"

"Enough."

Another sip of brandy. "Evidence can be contested. Witnesses can be discredited. And paintings..." He gestures at the walls. "Paintings are very easy to move."

He sets down the glass. "Let me offer you an alternative. Your sister comes home. Alive, free, her death certificate quietly corrected. No police. No scandal. The network ceases its... extracurricular activities. In exchange—" he fixes you with those cold, controlled eyes — "silence. Complete and permanent."`,
    location: 'Büyükada — Vedat\'s Study',
    phase: 'climax',
    npcPresent: ['vedat', 'defne'],
    choices: [
      {
        text: 'Accept the deal. Defne comes home. The network survives.',
        next: 'ending_b1',
        effects: {
          axisShift: { approach: -0.2 },
        },
      },
      {
        text: '"No deal. This ends with the truth, not with silence."',
        next: 'e3_vedat_refuse',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_vedat_defne_speaks',
    episode: 3,
    text: `Defne steps forward. She's trembling, but her voice is steady — the voice of a woman who's spent two years rehearsing this conversation in a cramped room.

"Two years, Vedat." She stands before his chair, and the power balance in the room shifts. "Two years in a hole because you couldn't let someone know the truth about your precious paintings."

Vedat's expression is unreadable. "Defne. You look... well."

"I look like someone who's been hiding for two years. Because of you." She leans forward. "It's over. I'm not hiding anymore. My sister knows. Other people know. The silence you bought — it's expired."

Vedat is quiet for a long moment. The clock ticks. His brandy catches the lamplight.

"What do you want?" he asks finally. And for the first time, you hear it: the faintest crack in his control. He's calculating, but the variables have changed. The ghost has returned.`,
    location: 'Büyükada — Vedat\'s Study',
    phase: 'climax',
    npcPresent: ['vedat', 'defne'],
    choices: [
      {
        text: '"We want the truth exposed. The paintings. The documents. Everything."',
        next: 'e3_vedat_refuse',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: '"We want to go home. Free. Without looking over our shoulders."',
        next: 'e3_vedat_deal',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
    ],
  },
  {
    id: 'e3_vedat_deal',
    episode: 3,
    text: `Vedat considers this. The brandy swirls in his glass. "Freedom. That's reasonable." He looks between you and Defne. "Defne comes home. The death certificate is corrected. You both resume your lives. And the paintings..."

He pauses. "The paintings stay with me. The collection is my life's work. Forty years of preservation. You may not believe me, but these paintings would be in foreign museums or rotting in government warehouses if not for me."

He sets down the glass. "This is my offer. Take it, and by tomorrow you're on the ferry home. Refuse it, and..." He doesn't finish. He doesn't have to.

The study is silent. The paintings watch from the walls. Defne looks at you, and in her eyes you see exhaustion — two years of hiding, and the bone-deep weariness of someone who just wants it to be over.`,
    location: 'Büyükada — Vedat\'s Study',
    phase: 'climax',
    npcPresent: ['vedat', 'defne'],
    choices: [
      {
        text: 'Accept. Take Defne home. Let the paintings keep their secrets.',
        next: 'ending_b1',
      },
      {
        text: 'Refuse. "We can\'t let you keep hiding the truth."',
        next: 'e3_vedat_refuse',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_vedat_refuse',
    episode: 3,
    text: `"No." You say it clearly. Defne straightens beside you.

Vedat's expression doesn't change. But his hand moves to the side table. Not to the brandy. To a small bell. He rings it once. A clear, silver sound.

Footsteps in the hallway. Tayfun appears in the doorway.

"Our guests are leaving," Vedat says. His voice is ice wrapped in silk. "Please ensure they reach the pier safely." He pauses. "And ensure they don't visit any other parts of the property on their way out."

Tayfun looks at you. At Defne. At Vedat. Something passes across his face — the calculation of a man weighing his employer's orders against his own conscience.

The mansion suddenly feels very large and very isolated. The last ferry is long gone. The next one isn't until six AM.`,
    location: 'Büyükada — Vedat\'s Study',
    phase: 'climax',
    npcPresent: ['vedat', 'defne', 'tayfun'],
    choices: [
      {
        text: 'Go quietly. Get to the pier. Wait for the morning ferry.',
        next: 'ending_b2',
        condition: { flagFalse: 'compromised' },
      },
      {
        text: 'Run. Now. Through the garden, down the back path.',
        next: 'e3_chase',
        effects: {
          setFlags: ['tayfun_alert'],
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },
  // === ESCAPE PATHS ===
  {
    id: 'e3_escape_leave',
    episode: 3,
    text: `You don't look back. You and Defne slip out of the servants' quarters, down the back path, through the pine forest. The trees are dark sentinels, the ground soft with needles. Defne moves with practiced silence — two years of hiding have taught her every path, every shadow.

The pier is empty at this hour. The last ferry is gone. But Defne knows another way — a fisherman on the east shore who owes Filiz a favor. A small boat. A quiet crossing to the mainland.

By dawn, you're in Pendik. By noon, you're at Istanbul Airport. Two one-way tickets. No baggage except what you carry — which is everything and nothing.

Defne stands at the gate, boarding pass in hand, looking out the window at the Bosphorus one last time.

"No regrets?" you ask.

She's quiet for a long time. "Many," she says. "But not this one."`,
    location: 'Büyükada — Pine Forest',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Board the plane. Leave Turkey. Leave everything.',
        next: 'ending_c1',
      },
    ],
  },
  {
    id: 'e3_escape_smart',
    episode: 3,
    text: `"We leave," you tell Defne. "But we take everything we know. Every photo, every name, every connection. We go somewhere safe, and we build the case from there."

Defne nods. This is the compromise — the middle path between justice and survival. Not the righteous blaze of exposure, not the quiet surrender of walking away. Something more patient. Something that takes time but might actually work.

You spend an hour in the servants' quarters, organizing. Everything you've gathered — the photographs, the testimonies, the connections between Selim, Naz, and Vedat — goes into a digital archive, encrypted and uploaded to multiple cloud services.

"We'll need a base," Defne says. "Somewhere in Turkey, but far from Istanbul. Somewhere with an internet connection and no connection to the network."

You think of the Aegean coast. Small towns, olive groves, the sea. Far from the Bosphorus but still Turkish. Still home, in a way.

The fisherman's boat takes you to the mainland at dawn. Behind you, Büyükada shrinks to a silhouette. The mansion on the hill catches the first sunlight.

You'll be back. Not in person — in print. But it will take time.`,
    location: 'Büyükada — Servants\' Quarters',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Go. Build the case from safety. This isn\'t over — it\'s just beginning.',
        next: 'ending_c2',
      },
    ],
  },
  // === CHASE PATH ===
  {
    id: 'e3_chase',
    episode: 3,
    text: `You grab Defne's hand and run. Through the study door, down the hallway, past the paintings that watch with painted eyes. The service entrance — Filiz left it unlocked. You burst into the garden.

Behind you, Tayfun's boots on hardwood. His radio crackles. "Moving," he says. One word. Professional.

The garden is silver in the moonlight. You vault the low wall, hit the path, and plunge into the pine forest. Branches whip your face. The ground slopes steeply downward. Defne runs beside you — she knows these paths. Two years of memorizing escape routes.

"The back pier," she gasps. "East side. Filiz—"

"Filiz arranged a boat?"

"A fisherman. He owes her."

Behind you, a flashlight beam sweeps through the trees. Tayfun is fast. But the forest is dark and you have a head start.

The smell of the sea grows stronger. Pine gives way to scrub. And then — the water, dark and infinite, and a stone jetty with a small wooden boat tied to it.`,
    location: 'Büyükada — Pine Forest',
    phase: 'climax',
    npcPresent: ['defne', 'tayfun'],
    choices: [
      {
        text: 'Get to the boat. Start the engine. Go.',
        next: 'e3_chase_boat',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: 'Wait. Hide behind the jetty wall. Let Tayfun pass.',
        next: 'e3_chase_hide',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },
  {
    id: 'e3_chase_boat',
    episode: 3,
    text: `You scramble into the boat. Defne unties the line. The outboard motor is old — it coughs once, twice, then catches with a roar that shatters the silence.

Tayfun appears at the top of the path. His flashlight finds you — two figures in a small boat, pulling away from the jetty. He stands there, breathing hard, the light steady on you.

He could radio for a coast guard intercept. He could follow on foot to the main pier and cut you off. He could do many things.

He lowers the flashlight. Turns it off. And stands in the darkness, watching you go.

The boat clears the jetty. Open water. The island recedes — dark pines, dark mansions, a single light going out on the hilltop.

Ahead, across the black water, the distant lights of the city shimmer on the horizon. No ferries at this hour. Just you, the sea, and the dark.`,
    location: 'Büyükada — Back Pier',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Chase the ferry. Flag it down. Make the last crossing.',
        next: 'ending_d1',
      },
    ],
  },
  {
    id: 'e3_chase_hide',
    episode: 3,
    text: `You press against the cold stone of the jetty wall, pulling Defne down beside you. Her breathing is ragged. You clamp a hand over your own mouth.

Tayfun's footsteps on the path. Slow now — he's being careful. His flashlight sweeps the jetty, the water, the rocks. The beam passes over your heads — inches above. You press flatter against the stone.

He stands at the top of the jetty stairs for a full minute. Then his radio crackles. "Clear," he says. "They went into the forest. I'll check the main pier." His footsteps recede back up the path.

He lied. He saw the boat. He knew you were here. And he chose to let you go.

You wait five minutes. Then ten. Then you untie the boat, push off, and drift into the dark water. The motor starts on the third try. The island shrinks behind you.

But the last ferry is gone. Its lights are distant, already nearing the city. You're on the water in a small boat with no destination.

"There's a cove," Defne says. "On the back of the island. We can wait until dawn. First ferry at six."`,
    location: 'Büyükada — Back Pier',
    phase: 'climax',
    npcPresent: ['defne'],
    choices: [
      {
        text: 'Hide in the cove until dawn. Take the first ferry home.',
        next: 'ending_d2',
      },
    ],
  },
];

export default episode3Scenes;
