import { Scene } from '../types';

const ferry2to3Scenes: Scene[] = [
  {
    id: 'ferry2_opening',
    episode: 2,
    text: `The Büyükada ferry is different. Longer. Slower. The city doesn't just recede — it dissolves, layer by layer, until the European and Asian shores are twin lines of light on the horizon and you're surrounded by the dark open water of the Marmara.

You stand at the stern railing. The wind is stronger here, away from the strait's sheltered banks. Spray dots your jacket. The ferry is half-empty — off-season, the islands draw fewer visitors. The passengers who remain look like locals: groceries in bags, a tired purpose in their movements.

Kadıköy is behind you. Everything you learned there — Naz and her print shop, Bora's guilt-ravaged confession, the photographs, the name Vedat Arslaner — all of it points to the island ahead. The dark shape that will eventually rise from the water. Büyükada. The big island.

No cars on Büyükada. No quick exits. Once you're there, you're there until the ferry comes back.

The same ferry characters are here. Kaptan İrfan at the wheel. The çay counter glowing. And somewhere below deck, the quiet woman with her book.`,
    location: 'Marmara Sea Ferry — Evening',
    phase: 'ferry',
    npcPresent: ['irfan', 'cem', 'ruya'],
    choices: [
      {
        text: 'Find Kaptan İrfan. He mentioned boats going to Büyükada at odd hours.',
        next: 'ferry2_irfan',
        condition: { flag: 'talked_to_irfan' },
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'The çaycı, Cem. He knows the island pier. He might know the mansion too.',
        next: 'ferry2_cem',
        condition: { flag: 'cultivated_cem' },
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: 'Go below. Find Rüya. If she\'s ever going to talk, it should be now.',
        next: 'ferry2_ruya',
        condition: { flag: 'cultivated_ruya' },
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Stay at the railing. Review what you know. Plan your approach.',
        next: 'ferry2_alone',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Pace the deck. The waiting is unbearable. You need to move.',
        next: 'ferry2_restless',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_irfan',
    episode: 2,
    text: `İrfan is at the wheel. He nods when you enter — an acknowledgment, almost familiar now. The instruments cast green light on his weathered face.

"Büyükada," he says. "I wondered when you'd go there." He adjusts course slightly. The wheel moves under his hands like something alive. "The big house on the hill. Arslaner's place. I've been sailing past it for twenty years."

He's quieter tonight. More direct. Something about the open water strips away the metaphors.

"I'll tell you something I've never told anyone," he says. "Two years ago — the night your sister supposedly drowned — I was on this route. The late ferry. And I saw a boat at Büyükada's back pier. Not the main pier — the small one, on the east side. Private. No lights. Two people got off. One of them was carrying someone. The other was carrying a portfolio."

He looks at you. "I reported it. To the harbor authority. My report was acknowledged and filed. I never heard another word about it."`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: '"Someone was carried off that boat. You think it was Defne?"',
        next: 'ferry2_irfan_deep',
        effects: {
          axisShift: { heart: 0.1 },
          npcTrust: { irfan: 1 },
        },
      },
      {
        text: '"The back pier. The east side. I need to know exactly where."',
        next: 'ferry2_irfan_tactical',
        effects: {
          axisShift: { method: 0.2 },
          npcTrust: { irfan: 1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_irfan_deep',
    episode: 2,
    text: `İrfan is silent for a long time. The engine thrums.

"I don't know. It was dark. But the timing — the night she disappeared, a boat at the back pier, someone being carried..." He shakes his head. "I've played it over in my mind a thousand times. Was she being taken? Or was she being hidden?"

He turns the wheel slightly. "There's a difference, you understand. One is a crime. The other is a rescue."

The distinction lands like a depth charge. You hadn't considered it. That Defne might have been carried to Büyükada not against her will, but because she couldn't walk. Or because she needed to disappear — and someone helped her.

"The house on the hill has servants' quarters," İrfan adds. "But there are other mansions on the island. Empty ones, mostly. Summer houses locked up for winter. A person could hide in one of those for a long time. If someone was leaving food for them."

He grips the wheel. "That's all I know. But I know the water, and I know this: the Bosphorus doesn't take people who don't want to be taken. It took me thirty years to learn that."`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: 'Thank him. This changes everything. Head back to plan.',
        next: 'ferry2_final',
      },
    ],
  },
  {
    id: 'ferry2_irfan_tactical',
    episode: 2,
    text: `İrfan nods — he respects the directness. He pulls out a nautical chart, yellowed and worn, and traces a line with his finger.

"Here. The main pier — İskele Caddesi. This is where the ferry docks. Tourists, locals, everyone." He moves his finger east. "Here. The back pier. It's barely a pier — more of a stone jetty. Only small boats can dock there. It faces the open water, away from the main road. A path leads up from it through the pine trees to the back of the hill."

He taps the hilltop. "The mansion is here. But the path from the back pier comes up behind it. Through the forest. You wouldn't be seen from the main road."

He folds the chart and hands it to you. "Take it. I don't need it — I have the whole Bosphorus in my head." A rare smile. "Be careful on the island. It's quiet there. Quiet enough to hear someone coming from a long way off. Which means they'll hear you too."`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: 'Take the chart. This is invaluable.',
        next: 'ferry2_final',
      },
    ],
  },
  {
    id: 'ferry2_cem',
    episode: 2,
    text: `Cem is cleaning glasses, humming softly. His grin appears when he sees you. "The journalist returns. You look like you've been busy." He pours çay without asking. "Kadıköy treated you well?"

He leans on the counter. "You're going to the island. I can see it. Everyone who gets on this ferry with that look in their eyes is going to the island."

He drops his voice. "Listen. I've delivered tea to boats at Büyükada pier more times than I can count. The main pier, the public one — that's normal. But twice, maybe three times, I've been asked to bring tea to the back pier. The east side. At night."

He polishes a glass slowly. "The men on those boats weren't fishermen. They were... organized. Professional. And they always went up the hill. To the big house. The Arslaner place."

He sets down the glass. "Here's what I want you to know: the island has eyes. The bakkal, the carriage drivers, the old women on their porches. Nothing happens there without someone seeing it. If you're going up that hill, you'll be noticed. So either go at night, or have a reason to be there that people will accept."`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: '"What reason would people accept?"',
        next: 'ferry2_cem_advice',
        effects: {
          npcTrust: { cem: 1 },
        },
      },
      {
        text: '"You mentioned Hakan Reis before. Is he still operating out of Kadıköy?"',
        next: 'ferry2_cem_hakan',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_cem_advice',
    episode: 2,
    text: `Cem thinks. "Tourist season, you could be anyone. But off-season? You need a story. Say you're a journalist writing about the island's architecture — the Victorian mansions. That's believable. The Arslaner house is the most impressive one on the hill. People would expect a journalist to want to see it."

He grins. "Or, if you're bolder, say you're from a real estate company. Rumor is, Arslaner is selling the mansion. That would get you through the front door."

He pauses. "But be careful with Arslaner himself. I've never met him, but I've heard stories from the boat captains. He's old money, old manners. Very polite. Very controlled. The kind of man who never raises his voice because he's never had to. The staff are scared of him — not because he's cruel, but because he's... exact. Everything in its place. Everything accounted for."

Cem slides you a fresh glass of çay. "Including, I imagine, anyone who shows up uninvited."`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: '"Architecture journalist. That could work. Thanks, Cem."',
        next: 'ferry2_final',
      },
    ],
  },
  {
    id: 'ferry2_cem_hakan',
    episode: 2,
    text: `Cem nods. "Hakan Reis. He's still at Kadıköy pier. You talked to him?" He reads your expression. "Good. Then you know he's moved packages for the network. What you might not know is that he's also moved people. Your sister — I told you she asked about a private boat. Hakan was the one who could have taken her."

He lowers his voice further. "But here's the thing about Hakan. He's not loyal. He's transactional. He moves things for money. If someone offered him more money to talk about what he's moved, he'd talk. And if someone offered him money to make sure a certain journalist doesn't reach Büyükada..." He lets it hang.

"Watch your back on the island. And watch who's watching you. The network knows people are asking questions — your friend at the print shop would have made sure of that."

The ferry horn sounds. The first lights of Büyükada are visible on the horizon — a dim cluster, barely distinguishable from stars.`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: 'Note the warning. Head to the railing to watch the island approach.',
        next: 'ferry2_final',
      },
    ],
  },
  {
    id: 'ferry2_ruya',
    episode: 2,
    text: `She's in the same seat. Same book — no, a different one. She looks up when you sit down, and this time there's no pretense. She closes the book.

"You've been busy," she says. Not a question. "Kadıköy. The print shop. The meyhane." She watches your reaction. "I told you — we'll talk when I know you won't be reckless."

She pulls a slim folder from her bag. Plain manila. "My name is Rüya. I'm a private investigator. I was hired eight months ago by an insurance company — they underwrote a policy on a collection of Ottoman paintings. The collection belongs to Vedat Arslaner."

She opens the folder. Inside: photographs. The mansion on Büyükada. A bill of lading for art transport. A photocopy of a death certificate — Defne Karadağ.

"The insurance company became suspicious when Arslaner filed claims on three paintings that were supposedly destroyed in a water leak. But the restoration records didn't match. Someone had been working on those paintings — adding layers, not removing them. Hiding things inside them."

She meets your eyes. "Your sister was the restorer. And I don't think she's dead."`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: '"You\'ve known this for eight months and didn\'t tell me?"',
        next: 'ferry2_ruya_angry',
        effects: {
          axisShift: { approach: 0.1, heart: 0.1 },
        },
      },
      {
        text: '"Show me everything you have. We need to work together."',
        next: 'ferry2_ruya_ally',
        effects: {
          axisShift: { trust: 0.2, method: 0.1 },
          npcTrust: { ruya: 1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_ruya_angry',
    episode: 2,
    text: `Rüya takes the anger calmly. "I didn't know you existed until three weeks ago. I was investigating insurance fraud, not a disappearance. When I found the connection to your sister, I started watching the ferry — because ferry records showed she was a regular passenger. That's when I found you."

She pauses. "I could have approached you immediately. But you were unpredictable. You confronted people. You asked loud questions. If I'd shown you my cards too early, we'd both have been burned."

Her voice softens, just slightly. "I understand your anger. But I'm showing you now. Because you've proven something in Kadıköy — you can follow a thread without pulling it apart. And because we're running out of time."

She slides the folder to you. "Arslaner is selling the mansion. The entire collection goes with it. Once that sale closes, the evidence — and your sister, if she's hiding on the island — disappears permanently."

"I have a plan for the mansion. But I need someone Arslaner doesn't know about. He knows me — I've been surveilling him for months. He doesn't know you."`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: '"Tell me the plan."',
        next: 'ferry2_ruya_plan',
        effects: {
          npcTrust: { ruya: 1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_ruya_ally',
    episode: 2,
    text: `Rüya nods — a sharp, decisive movement. "Good. I was hoping you'd say that."

She spreads the contents of the folder between you. Photographs. Documents. A hand-drawn map of the Büyükada hilltop — the mansion, the grounds, the neighboring properties.

"Here's what I know. Arslaner's mansion has a gallery room — twenty-three Ottoman miniatures, officially. But behind at least seven of those paintings, there are documents. Financial records, land deeds, blackmail material. The paintings are the hiding places. Your sister discovered this when she was restoring them."

She taps the map. "Arslaner has security. One man — Tayfun. Ex-military. He patrols the grounds and the hill road. The housekeeper — Filiz — has been there forty years. She's loyal to the house, not to Arslaner. That's an important distinction."

She looks at you directly. "And here." She points to a small building behind a neighboring mansion. "Servants' quarters. Abandoned, officially. But someone's been living there. I've seen laundry on the line. Food deliveries. Someone is hiding in plain sight on that island."

The implication hangs between you.`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: '"Defne. She\'s there. She\'s been there the whole time."',
        next: 'ferry2_ruya_plan',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_ruya_plan',
    episode: 2,
    text: `"I believe so," Rüya says. "Which means the priority is twofold: get to her safely, and get the evidence from the mansion before the sale goes through."

She hands you a burner phone. "My number is the only one saved. Use this, not your regular phone. If Arslaner has contacts in the telecom industry — and old money usually does — your regular phone is compromised."

The ferry horn sounds. Büyükada is visible now, a dark mass against the slightly lighter sky, dotted with a few golden lights.

"When we dock, we separate. I'll approach from the east side — there's a back path through the pine forest. You take the main road. If anyone asks, you're a journalist covering the island's architecture."

She stands, tucking the folder back into her bag. "Find Filiz first. She's the key to everything — to the mansion and to your sister. But be gentle with her. She's been protecting secrets for forty years. She won't give them up to someone who demands."

She extends her hand. Professional. Steady. "We end this on the island, Deniz. One way or another."`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: 'Shake her hand. The island is close.',
        next: 'ferry2_final',
      },
    ],
  },
  {
    id: 'ferry2_alone',
    episode: 2,
    text: `You lean on the railing and take stock. The spray is cold. The sky is cloudless — stars visible now that you've left the city's light pollution behind.

What do you know? A network of art smugglers hiding documents inside Ottoman paintings. Three nodes: Selim in Arnavutköy (the art handler), Naz in Kadıköy (the forger), and Vedat Arslaner on Büyükada (the collector, the boss). Your sister discovered the network while restoring paintings. She tried to go to the police, was threatened, and chose to disappear. The drowning was staged.

And now, two years later, she sent you a text. Because Arslaner is selling the mansion and she's about to lose her hiding place. Because she needs help. Because after two years of silence, she reached out to the one person she trusted.

You.

The island grows on the horizon. No cars. Limited escape routes. An old mansion on a hill and a man who never raises his voice because he's never had to.

You're going in. The question is how.`,
    location: 'Marmara Sea Ferry — Deck',
    phase: 'ferry',
    choices: [
      {
        text: 'With evidence and a plan. Methodical. Careful.',
        next: 'ferry2_final',
        effects: {
          axisShift: { method: 0.2, approach: -0.1 },
        },
      },
      {
        text: 'With conviction. You didn\'t come this far to be cautious.',
        next: 'ferry2_final',
        effects: {
          axisShift: { approach: 0.2, method: -0.1 },
        },
      },
      {
        text: 'With the people you\'ve gathered. You\'re not alone in this anymore.',
        next: 'ferry2_final',
        effects: {
          axisShift: { trust: 0.2, heart: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_restless',
    episode: 2,
    text: `You can't sit still. The ferry feels like a cage — beautiful, rocking, surrounded by water, but a cage. You pace the deck, port to starboard and back, your footsteps ringing on the metal deck plates.

A crewman watches you with mild concern. The other passengers — a handful of islanders, a young couple — give you space. You must look like what you are: someone wound tight, heading toward something they can't turn back from.

The city is gone. Just water now. Dark water, darker sky. And ahead, slowly materializing like a photograph developing, the island. Büyükada. You can make out the shape of it — the pine-covered hills, the mansions on the ridge, the pier lights.

Your phone buzzes. A text from an unknown number: "Be careful on the island. Not everyone is who they seem. — A friend."

You stare at it. The anonymous texter. Defne? Or someone else? Someone who knows you're coming. Someone who wants you to come — or wants to warn you off.

The island grows. The ferry slows. The horn will sound soon.`,
    location: 'Marmara Sea Ferry — Deck',
    phase: 'ferry',
    choices: [
      {
        text: 'Delete the text. Trust nothing except what you can verify.',
        next: 'ferry2_final',
        effects: {
          axisShift: { trust: -0.2, method: 0.1 },
        },
      },
      {
        text: 'Reply: "Who are you?" Send it before you can second-guess.',
        next: 'ferry2_final_text',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: 'Save the text. Another piece of the puzzle.',
        next: 'ferry2_final',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry2_final_text',
    episode: 2,
    text: `You send it. Three dots appear immediately — someone is typing. Then they disappear. No response comes.

But someone read it. Someone is awake, watching their phone, thinking about you. On the island, maybe. Or on this ferry. Or somewhere in the dark water between.

The horn sounds. Büyükada pier, dead ahead.`,
    location: 'Marmara Sea Ferry — Deck',
    phase: 'ferry',
    choices: [
      {
        text: 'Pocket the phone. Time to go.',
        next: 'ferry2_final',
      },
    ],
  },
  {
    id: 'ferry2_final',
    episode: 2,
    text: `The ferry horn sounds — three long blasts. The Büyükada pier emerges from the darkness: a handful of lights, a concrete jetty, the arched windows of the iskele building glowing amber.

The island is darker than the city. Quieter. The absence of car engines is immediate and unsettling — just the wind in the pine trees, the creak of the ferry against the dock, the distant clip of a horse's hooves on pavement.

You join the small stream of passengers moving toward the gangway. The air smells different here — pine resin, salt, something floral you can't name. The temperature has dropped.

As you step onto the pier, you look up. The hill rises above the town, dark against the stars. And there, at the top, lit by a single exterior light, a Victorian mansion sits like a crown on a sleeping head.

Vedat Arslaner's house. Where the paintings hide their secrets. Where the network has its heart.

And somewhere on this island, in a cramped room in an abandoned servants' quarters, a woman you haven't seen in two years is waiting. Your sister. Alive. Hiding. And finally, after two years of silence, asking for help.

The ferry pulls away behind you. The next one doesn't come until morning.

You're on the island now. No turning back.`,
    location: 'Büyükada İskelesi',
    phase: 'ferry',
    choices: [
      {
        text: 'Walk toward the lights of the town. Büyükada awaits.',
        next: 'e3_opening',
      },
    ],
  },
];

export default ferry2to3Scenes;
