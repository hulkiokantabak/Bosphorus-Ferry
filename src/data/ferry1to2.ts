import { Scene } from '../types';

const ferry1to2Scenes: Scene[] = [
  {
    id: 'ferry1_opening',
    episode: 1,
    text: `The night ferry pulls away from Arnavutköy. You find a seat on the upper deck, the cold wind off the Bosphorus cutting through your jacket. The waterfront recedes — those golden-lit Ottoman houses shrinking into a string of amber beads along the dark shore.

Your phone feels heavy in your pocket. Everything you learned tonight sits in your chest like a stone. Defne was here. She was working on something. And then she was gone.

The ferry's engine hums beneath you. The deck is mostly empty at this hour — a few commuters, heads bowed to their phones. The smell of diesel mixes with salt air.

A figure moves near the bow. Another sits alone by the tea counter. And in the cabin below, through the scratched window, you see a woman reading in the same seat she always seems to occupy.

The Bosphorus stretches dark and wide around you. The Asian shore glitters in the distance. Kadıköy is ahead — but right now, you're between worlds, suspended on black water.`,
    location: 'Bosphorus Ferry — Night',
    phase: 'ferry',
    npcPresent: ['irfan', 'ayse', 'cem', 'ruya'],
    choices: [
      {
        text: 'Go to the bridge. The captain might know these waters — and the people on them.',
        next: 'ferry1_irfan',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: 'The woman by the tea counter is watching you. Approach her.',
        next: 'ferry1_ayse',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: 'Get some çay from the vendor. He looks like someone who hears things.',
        next: 'ferry1_cem',
        effects: {
          axisShift: { method: -0.1 },
        },
      },
      {
        text: 'Go below deck. The quiet woman with the book — she\'s been on every ferry you\'ve taken.',
        next: 'ferry1_ruya',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Stay alone. Watch the water. Process what happened tonight.',
        next: 'ferry1_alone',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_irfan',
    episode: 1,
    text: `You climb the narrow stairs to the bridge. The captain stands at the wheel, a silhouette against the instrument glow. He's older — sixties, maybe — with a face carved by three decades of wind and salt.

"Hoş geldiniz," he says without turning. "Most passengers don't come up here."

His name is İrfan. Kaptan İrfan, as the crew calls him. He speaks slowly, deliberately, the way people do when they've learned that words, like currents, can pull you places you didn't intend to go.

"Thirty years on this water," he says. "You learn to read it. The currents, the tides, the way the light hits Kız Kulesi at dawn." He pauses. "You learn to read the passengers too."

He glances at you. "You have the look of someone searching. Not for a place — you know where you're going. For something else."

You could tell him about Defne. About the blue house, the painting, the text message that brought you here. Or you could keep it vague — just a journalist working a story.`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: '"My sister disappeared two years ago. I think she was in Arnavutköy before it happened."',
        next: 'ferry1_irfan_honest',
        effects: {
          setFlags: ['talked_to_irfan'],
          axisShift: { trust: 0.2 },
          npcTrust: { irfan: 1 },
        },
      },
      {
        text: '"I\'m working on a story about the art trade along the Bosphorus. Do you ever see unusual cargo?"',
        next: 'ferry1_irfan_careful',
        effects: {
          setFlags: ['talked_to_irfan'],
          axisShift: { approach: -0.1, method: 0.1 },
          npcTrust: { irfan: 1 },
        },
      },
      {
        text: '"Just enjoying the view, Kaptan." Keep your cards close.',
        next: 'ferry1_irfan_closed',
        effects: {
          axisShift: { trust: -0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_irfan_honest',
    episode: 1,
    text: `İrfan is quiet for a long time. The ferry rocks gently. When he speaks, his voice is lower.

"Two years ago. The drowning." It's not a question. "I remember the coast guard boats. I was on the water that night." He adjusts a dial on the console. "There are things that happen on this strait that don't match the reports. Boats that run without lights. Packages loaded at hours when the docks should be empty."

He looks at you directly now. "I don't know what happened to your sister. But I know that the Bosphorus keeps secrets the way the old houses keep their foundations — buried deep, but holding everything up."

He turns back to the water. "Be careful in Kadıköy. The Asian side has a different rhythm. Things move faster there. People too."

It's not much. But it's the first time someone has acknowledged that the official story might not be the whole truth — without you having to convince them.`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: 'Thank him. Head back to the deck to think.',
        next: 'ferry1_final',
      },
      {
        text: 'Press him — what exactly did he see that night?',
        next: 'ferry1_irfan_press',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_irfan_press',
    episode: 1,
    text: `İrfan's jaw tightens. "I saw what I saw. A boat without lights, moving fast toward the islands. And I heard the coast guard radio — they were told to focus their search south, toward Marmara. Away from the islands."

He grips the wheel. "I filed a report. Nobody read it. Or if they did, they decided it wasn't worth pursuing."

He looks at you one final time. "Kadıköy. There's a print shop near the çarşı. Your sister used to get off at that stop. I remember because she always carried a portfolio — leather, brown. She was on this ferry for months."

The detail hits you like a physical thing. Defne on this ferry. Sitting where you're sitting. The same salt air, the same engine hum.

"That's all I have," İrfan says. "The water remembers, even when the people forget."`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: 'Thank him and head to the deck. You have a lead.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_irfan_careful',
    episode: 1,
    text: `İrfan studies you with eyes accustomed to reading fog and darkness. "The art trade." He says it flatly. "Journalist."

A long pause. The ferry's engine thrums.

"I've been on this water thirty years. I've seen things loaded onto private boats at Arnavutköy dock that weren't fish. Wrapped in blankets. Carried carefully." He shrugs. "Not my business what people transport. But when the same packages go out at two in the morning, to boats heading toward the islands..." He trails off.

"The islands," he repeats. "Specifically the big one. Büyükada. There's a house up on the hill — you can see it from the water. Old money. Very old money." He pauses. "I've taken this ferry past that pier a thousand times. Some nights, there's a boat tied there that shouldn't be."

He turns back to his instruments. "Write your story, journalist. Just be careful who reads it before it's finished."`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: 'That\'s valuable. Head back to the deck.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_irfan_closed',
    episode: 1,
    text: `İrfan nods slowly. "The view. Yes." There's no judgment in his voice, but something closes behind his eyes. A door you could have opened, gently shut.

"The Bosphorus is beautiful at night," he says. "And deceptive. The current looks calm on the surface, but underneath it runs fast enough to pull a swimmer under in seconds. Things aren't always what they seem on this water."

He says it like a man delivering a weather report. Neutral. Final.

You stand there a moment longer, but the conversation is over. Whatever Kaptan İrfan knows about the Bosphorus and its secrets, he's decided you're not the one to hear it. Not tonight, anyway.`,
    location: 'Ferry — Captain\'s Bridge',
    phase: 'ferry',
    npcPresent: ['irfan'],
    choices: [
      {
        text: 'Head back to the deck.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_ayse',
    episode: 1,
    text: `The woman is in her mid-forties, wrapped in a thick cardigan, a thermos of çay beside her. She smiles as you approach — warm, immediate, the way Turkish women of a certain generation smile at strangers, as if loneliness is a shared condition.

"Hoş geldiniz," she says. "Sit, sit. The night boats are always so empty. I'm Ayşe. I teach at the primary school in Üsküdar — I take this ferry every day, morning and evening. Twenty years." She laughs. "I know the seagulls by name."

She's chatty, open, slightly nosy in the way of someone who's spent decades watching people come and go. She asks where you're headed, what you do. Her questions are gentle but persistent.

Then, between sips of çay, she says something that makes your heart stop: "You remind me of someone. A woman who used to ride this ferry — always the evening boat. She had your eyes. Same way of sitting — like she was carrying something heavy."`,
    location: 'Ferry — Upper Deck',
    phase: 'ferry',
    npcPresent: ['ayse'],
    choices: [
      {
        text: '"What was her name? Please — it\'s important."',
        next: 'ferry1_ayse_ask',
        effects: {
          axisShift: { heart: 0.2 },
          npcTrust: { ayse: 1 },
        },
      },
      {
        text: 'Stay casual. "Oh? A regular commuter?" Don\'t show how much this matters.',
        next: 'ferry1_ayse_casual',
        effects: {
          axisShift: { approach: -0.1 },
          npcTrust: { ayse: 1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_ayse_ask',
    episode: 1,
    text: `Ayşe's expression shifts — from chatty warmth to something more careful. She recognizes the urgency in your voice.

"Defne. Her name was Defne." She watches your face. "You know her."

It's not a question. Ayşe is a teacher — she reads faces for a living.

"She was kind," Ayşe continues softly. "We talked sometimes. About books, about the neighborhoods, about the old houses. She loved the old houses. She said every one of them held a secret — you just had to know where to look."

She pauses. "Then one day she stopped riding the ferry. I heard later about the drowning. But..." She lowers her voice. "I never quite believed it. A woman who loved the water that much — who understood it — drowning alone at night?" She shakes her head. "And there was that last conversation. She was nervous. She said she'd found something she shouldn't have. I told her to go to the police. She laughed — not a happy laugh."

Ayşe touches your hand. "She was your sister, wasn't she? I can see it."`,
    location: 'Ferry — Upper Deck',
    phase: 'ferry',
    npcPresent: ['ayse'],
    choices: [
      {
        text: '"Yes. And I don\'t think she drowned either."',
        next: 'ferry1_ayse_reveal',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: 'Nod. Let the tears come for a moment. Then ask what else she remembers.',
        next: 'ferry1_ayse_reveal',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_ayse_reveal',
    episode: 1,
    text: `Ayşe squeezes your hand. "I'm glad someone is looking. I'm glad someone didn't give up."

She thinks for a moment. "The last few weeks before she disappeared, she was getting off at Kadıköy instead of continuing to Üsküdar. Always with that leather portfolio. She mentioned a print shop — said she was doing research. And once, just once, she mentioned a name. An island. Büyükada." Ayşe frowns. "She said it like it frightened her."

The ferry horn sounds. Kadıköy pier is coming into view, lights reflecting off the water.

"If you need anything," Ayşe says, pressing a folded napkin into your hand — her phone number written in teacher's handwriting, neat and precise. "I ride this ferry every day. And I remember things. Teachers always do."`,
    location: 'Ferry — Upper Deck',
    phase: 'ferry',
    npcPresent: ['ayse'],
    choices: [
      {
        text: 'Thank her. Pocket the number. Head toward the bow as Kadıköy approaches.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_ayse_casual',
    episode: 1,
    text: `Ayşe tilts her head, reading you. She's spent twenty years reading children; an adult trying to seem casual is not much harder.

"A regular, yes. Defne was her name. Lovely woman. She rode the evening ferry for months, always with a leather portfolio." She sips her çay. "We talked about books mostly. She loved the old neighborhoods."

She pauses. "Then she stopped coming. I heard about the drowning." Another pause, longer. "I was sorry. She was the kind of person who makes a ferry ride feel shorter."

She doesn't press. She's given you what she has — the name, the portfolio, the routine. She wraps both hands around her thermos and looks out at the dark water. "The Bosphorus takes people," she says quietly. "But sometimes I wonder if it also hides them."

The Kadıköy lights are growing closer.`,
    location: 'Ferry — Upper Deck',
    phase: 'ferry',
    npcPresent: ['ayse'],
    choices: [
      {
        text: 'Thank her for the conversation. Head toward the bow.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_cem',
    episode: 1,
    text: `The çaycı is young — late twenties, sharp-eyed, moving with the efficient grace of someone who's balanced tea trays on a rocking ferry a thousand times. He's already pouring before you reach the counter.

"Çay?" He grins. "Of course çay. Nobody comes to the counter for conversation." He winks. "But they get it anyway. I'm Cem. Papağan, they call me." He taps his ear. "I hear everything. And like a good parrot, I repeat the interesting parts."

He slides you a tulip glass of dark tea, sugar cubes on the saucer. "You were in Arnavutköy tonight. I saw you get on." His eyes are quick, cataloguing. "Not a tourist — tourists don't ride the night ferry. And you were looking at the wooden houses like you were searching for something specific."

He leans on the counter. "What are you looking for, friend? Cem knows everyone and everything on this water. For the right price." He sees your expression. "Not money. I don't deal in money. Information. Favors. You tell me something interesting, I tell you something useful."`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: '"I\'m looking for someone who disappeared. She used to ride this ferry."',
        next: 'ferry1_cem_trade',
        effects: {
          setFlags: ['cultivated_cem'],
          axisShift: { trust: 0.1 },
          npcTrust: { cem: 1 },
        },
      },
      {
        text: '"What do you know about after-hours shipments from Arnavutköy dock?"',
        next: 'ferry1_cem_direct',
        effects: {
          setFlags: ['cultivated_cem'],
          axisShift: { approach: 0.2, method: 0.1 },
          npcTrust: { cem: 1 },
        },
      },
      {
        text: 'Just drink the çay. Smile. You don\'t trade with parrots.',
        next: 'ferry1_cem_refuse',
        effects: {
          axisShift: { trust: -0.2 },
        },
      },
    ],
  },
  {
    id: 'ferry1_cem_trade',
    episode: 1,
    text: `Cem's grin fades into something more serious. "The woman who drowned. Two years ago." He polishes a glass. "I remember her. Defne. She drank her çay without sugar — unusual. And she was always sketching in a notebook. Art stuff."

He glances around the near-empty deck. "She talked to me a few times. She was researching paintings — Ottoman era. She said she was an art restorer, but the way she talked, it was more than that. She was tracing something. Provenance, she called it. Where art comes from, who owned it, where it went."

He leans closer. "Last time I saw her, she was nervous. Jumpy. She asked me — and this was strange — she asked if I knew anyone who could get her off the mainland quietly. Not by ferry. A private boat. To the islands."

He straightens up. "I told her I might know someone. Hakan Reis, operates out of Kadıköy pier. Private tours, but also... private transport. She thanked me and got off at Kadıköy." He pauses. "Next thing I heard, she'd drowned. But people who ask about private boats to the islands don't usually drown accidentally."`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: '"Hakan Reis. Kadıköy pier. I\'ll find him. Thank you, Cem."',
        next: 'ferry1_final',
      },
      {
        text: '"What else do you hear on these ferries? About the islands, about art?"',
        next: 'ferry1_cem_more',
        effects: {
          npcTrust: { cem: 1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_cem_more',
    episode: 1,
    text: `Cem refills your çay without being asked. "I hear things. Fragments. You put them together over years." He lowers his voice. "There's a house on Büyükada — big place, up on the hill. Old money. The owner collects art. Paintings, mostly Ottoman miniatures. He's... connected. The kind of connected where coast guard reports get filed and forgotten."

He straightens as another passenger walks past, switches instantly to a broad vendor's smile. "Çay, efendim? Fresh brewed!" The passenger waves him off.

Cem turns back to you. "I've delivered tea to private boats at this pier at three in the morning. Boats loaded with long flat packages, wrapped in moving blankets. Going to the islands." He taps the counter. "I don't ask what's in the blankets. But I'm not stupid."

He holds out his phone. "Give me your number. If I hear anything useful, I'll text. And if you find out what happened to Defne—" His voice catches, just slightly. "She was kind. She always tipped. On a ferry çaycı's salary, that matters."`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: 'Exchange numbers. You might need a parrot on your side.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_cem_direct',
    episode: 1,
    text: `Cem's eyebrows shoot up. He glances left and right with theatrical caution, then grins. "Straight to business. I like it."

He pours you çay, taking his time. "Shipments. After hours. Yes, I've seen them. Wrapped packages — painting-sized, handled like they're made of glass. Two, three in the morning. A private boat pulls up, the packages go on, the boat heads toward the islands." He pauses. "Büyükada, specifically."

"The antique shop," he adds. "The blue one. Köşk Antik. That's where they come from. I've seen the owner — smooth man, expensive coat — supervise the loading himself."

He leans in. "Now. My turn. What's your interest? Police? Journalist? Personal?"

The way he asks suggests the answer matters to him. Cem is grey economy — he survives by knowing who to talk to and who to avoid.`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: '"Personal. The woman who drowned two years ago was my sister."',
        next: 'ferry1_cem_trade',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: '"Journalist. But this isn\'t a story yet. It\'s a question."',
        next: 'ferry1_cem_journalist',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_cem_journalist',
    episode: 1,
    text: `Cem considers this. "A journalist with questions. Better than a journalist with answers — those ones are dangerous." He grins. "But questions can be dangerous too, depending on who you're questioning."

He gives you a name: Hakan Reis, operates private boats from Kadıköy pier. "He's moved packages for the Arnavutköy shop. He'll talk if you have something he wants — he thinks someone in the network is skimming money. Give him that, and he'll give you the island connection."

Cem slides a card across the counter — his phone number, scrawled on a ferry napkin. "I'm on the water every night. You need ears, I'm your parrot."

The Kadıköy lights grow closer. You can hear the pier's bustle even from the water — music from a meyhane, a street vendor's call.`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: 'Pocket the number. Time to meet Kadıköy.',
        next: 'ferry1_final',
        effects: {
          setFlags: ['knows_skimming'],
        },
      },
    ],
  },
  {
    id: 'ferry1_cem_refuse',
    episode: 1,
    text: `Cem reads your refusal instantly. His grin doesn't waver — if anything, it sharpens. "Smart. Or paranoid. On this water, it's hard to tell the difference."

He slides the çay across anyway. "On the house. First one's always free — like information." He winks and moves to wipe down the counter, humming a türkü under his breath.

You drink the çay alone. It's strong, almost bitter, the way ferry çay always is. Through the scratched window you watch the dark water pass. The Kadıköy shore is growing, lights multiplying.

Whatever Cem knows, he's keeping it. And whatever you know, you're keeping that too. Two people on a ferry at night, each holding their cards against their chest. The Bosphorus understands — it's been keeping secrets longer than either of you.`,
    location: 'Ferry — Tea Counter',
    phase: 'ferry',
    npcPresent: ['cem'],
    choices: [
      {
        text: 'Finish the çay. Watch Kadıköy approach.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_ruya',
    episode: 1,
    text: `You descend to the lower cabin. She's there — the quiet woman. Same seat, always the same seat, near the window on the port side. A book open in her lap. Late thirties, dark hair pulled back, the kind of face that's attractive in a way that doesn't draw attention. Which, you suspect, is deliberate.

She's been on every ferry you've taken. The morning boat. The evening boat. Always reading. Never looking up. Except she looked up once — when you boarded at Arnavutköy tonight. Just a glance, quick and professional, before returning to her book.

You sit across from her. She doesn't acknowledge you. The cabin rocks gently. Pages turn.

"You're on every ferry I take," you say.

She turns a page. Doesn't look up. "It's a public ferry."

Her Turkish is clean, accentless — the kind of deliberate neutrality that comes from training, not nature. The book in her hands is a Yaşar Kemal novel. Her bag, beside her, is nondescript but sturdy. The kind of bag that carries equipment.`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: '"I think you\'re watching me. Or watching the same things I\'m watching."',
        next: 'ferry1_ruya_confront',
        effects: {
          axisShift: { approach: 0.2, method: 0.1 },
          npcTrust: { ruya: 1 },
        },
      },
      {
        text: 'Sit quietly. Match her patience. See if silence draws her out.',
        next: 'ferry1_ruya_wait',
        effects: {
          setFlags: ['cultivated_ruya'],
          axisShift: { method: 0.2 },
          npcTrust: { ruya: 1 },
        },
      },
      {
        text: 'Stand up. She\'s not ready to talk. But you\'ve marked her, and she knows it.',
        next: 'ferry1_ruya_leave',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_ruya_confront',
    episode: 1,
    text: `Her eyes lift from the book. Gray eyes, steady, evaluating. "That's a bold statement."

"I'm a journalist. Bold statements are occupational."

A flicker — not quite a smile. "I'm a reader. I ride ferries and read books. There's no conspiracy in that."

But she closes the book. And she doesn't look away. The cabin is empty except for the two of you and the hum of the engine.

"I'll tell you this," she says. "If — hypothetically — someone were watching the same things you're watching, that would mean those things are worth watching. It would mean you're not imagining things. And it would mean—" She pauses. "That you should be very careful about who you talk to in Kadıköy."

She opens her book again. "But that's hypothetical."

The ferry horn sounds. Kadıköy is close. She won't give you more tonight. But she didn't deny it, either. Rüya — you heard a crew member call her that — is watching something. Or someone. And so are you.`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: 'Nod. Head up to the deck. You\'ll find her again.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_ruya_wait',
    episode: 1,
    text: `You sit. You wait. The ferry rocks. Pages turn. Neither of you speaks.

Five minutes pass. The engine hums. The water slaps against the hull. You learn things about her from the silence: she's comfortable with it. Trained in it. This is someone whose job requires waiting.

After seven minutes — you count — she speaks without looking up.

"Yaşar Kemal understood something about this country. That the truth is always buried. Not lost — buried. By people who benefit from the burial." She turns a page. "If you're digging, you should know that the people who did the burying are still alive. And they notice when the earth starts to move."

She looks at you then. A long, measured look. "We'll talk again. Not tonight. Not until I know you won't do something reckless with what I have."

It's a promise and a test. She's offering information — later, if you earn it. The price is patience. The price is proving you can be trusted with something fragile.

"Rüya," she says. Just the name. Then she returns to her book.`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: '"Deniz." Give your name in return. Then head upstairs.',
        next: 'ferry1_final',
        effects: {
          npcTrust: { ruya: 1 },
        },
      },
    ],
  },
  {
    id: 'ferry1_ruya_leave',
    episode: 1,
    text: `You stand. She watches you go — you feel it, that professional gaze on your back. You've noticed her, and she knows you've noticed her. It's a move in a game neither of you has acknowledged playing yet.

The stairs creak as you climb back to the upper deck. The cold air hits your face. Kadıköy's lights are growing, and with them the sound of the city — the Asian side, alive even at this hour.

You file her away: Rüya. The quiet woman. Same ferry, same seat, same book. Not a coincidence. Nothing about tonight has been a coincidence.`,
    location: 'Ferry — Lower Cabin',
    phase: 'ferry',
    npcPresent: ['ruya'],
    choices: [
      {
        text: 'Lean on the railing. Watch Kadıköy approach.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_alone',
    episode: 1,
    text: `You stay where you are. The railing is cold under your hands. The Bosphorus stretches dark in every direction — Europe behind you, Asia ahead, and this ferry suspended between them like a held breath.

You think about Defne. Two years. You think about the apartment with the dried plant on the balcony, the closet full of clothes she never came back for. You think about the sketch — that Ottoman miniature with its strange markings. The receipt from Kadıköy.

The anonymous text glows in your memory: "Your sister didn't drown."

If that's true — if she's alive — then two years of grief have been a lie. Not your lie. Someone else's. And lies that big don't just happen. They're built, carefully, by people with something to protect.

The Kadıköy lights grow closer. The meyhane music drifts across the water. A new shore. A new set of questions.

Behind you, the ferry's wake is a white line dissolving into darkness. Arnavutköy is gone. Whatever you found there — the blue house, the painting, Selim's polished lies, Melis's frightened eyes, Oğuz's steady memory — it's all in your head now. Carried forward into whatever comes next.`,
    location: 'Ferry — Upper Deck',
    phase: 'ferry',
    choices: [
      {
        text: 'Kadıköy. Tomorrow. The print shop.',
        next: 'ferry1_final',
      },
    ],
  },
  {
    id: 'ferry1_final',
    episode: 1,
    text: `The ferry horn sounds — two long blasts, the approach signal. Kadıköy pier materializes from the darkness: lights, concrete, the bustle of even a late-night iskele.

You move to the exit ramp with the handful of other passengers. The city sounds grow louder — traffic, voices, a street musician playing saz somewhere in the market streets beyond the pier.

As you step off the gangway, your shoes hit solid ground. The Asian side. A different Istanbul. The same Bosphorus.

You glance back at the ferry. Through the lit windows of the lower cabin, you can just make out the outline of a woman reading. On the upper deck, the çaycı is cleaning his counter. And on the bridge, a silhouette stands at the wheel, watching the water.

The ferry will cross again. And again. The Bosphorus never stops moving. Neither can you.

You turn toward Kadıköy's lights. Tomorrow, the print shop. Tomorrow, the next piece of whatever puzzle Defne left behind. Tonight, a hotel. Sleep, if it comes.

The anonymous text glows in your pocket like an ember.`,
    location: 'Kadıköy İskelesi',
    phase: 'ferry',
    choices: [
      {
        text: 'Find a hotel near the pier. Tomorrow, Kadıköy reveals its secrets.',
        next: 'e2_opening',
      },
    ],
  },
];

export default ferry1to2Scenes;
