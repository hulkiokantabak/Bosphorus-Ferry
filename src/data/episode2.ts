import { Scene } from '../types';

const episode2: Scene[] = [
  // ============================================================
  // ARRIVAL PHASE
  // ============================================================
  {
    id: 'e2_opening',
    episode: 2,
    phase: 'arrival',
    location: 'Kadıköy Pier',
    text: `The ferry groans against the Kadıköy dock and you step into a different Istanbul. The Asian side hits you like a wall of sound — fishmongers shouting prices over each other, the metallic clang of ice bins, a busker\'s saz weaving through the diesel rumble of minibuses.

The morning light is sharper here, less filtered. It catches the gold lettering on old pharmacy signs, the wet sheen of mackerel laid out in silver rows, the steam rising from a simit cart. A gull screams overhead and dives for scraps.

You clutch the receipt you found in Defne\'s apartment. "Baskı Evi" — a print shop somewhere in the market tangle. The address is smudged but readable. The sketch with its coordinates sits folded in your jacket pocket, a riddle you haven\'t solved yet.

Kadıköy\'s çarşı sprawls ahead, a labyrinth of covered passages and open-air stalls. The print shop is in there somewhere, down a side street. But you could also work the market first — talk to vendors, listen for gossip. Defne spent time here. Someone might remember her face.

The air smells of roasting corn and fish guts and something sweet — chestnut maybe. A calico cat threads between your ankles and vanishes into the crowd.`,
    choices: [
      {
        text: 'Head straight to Baskı Evi. The receipt is your best lead.',
        next: 'e2_baskievi_approach',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Explore the market first. Listen before you ask.',
        next: 'e2_market_entrance',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: 'Find a tea house and get your bearings. Watch the crowd.',
        next: 'e2_pier_tea',
        effects: {
          axisShift: { approach: -0.2, method: -0.1 },
        },
      },
    ],
  },

  // ============================================================
  // PIER TEA HOUSE
  // ============================================================
  {
    id: 'e2_pier_tea',
    episode: 2,
    phase: 'arrival',
    location: 'Kadıköy Pier - Tea House',
    text: `You settle into a plastic chair at a çay house overlooking the pier. The Marmara stretches behind you, tankers crawling south. The tea comes in a tulip glass, dark as amber, with two sugar cubes on the saucer.

You sip and watch. Kadıköy moves at a different rhythm than the European side — faster, less performative. Students with backpacks jostle past retirees playing tavla. A woman in paint-stained overalls loads canvases into a van. A man in a leather jacket talks urgently into his phone, one hand gripping the railing.

The leather-jacket man catches your eye. Weathered face, gray stubble, captain\'s cap pushed back. He ends his call and stares out at the water with the focused blankness of someone who makes his living on it.

You notice a small boat moored at the far end of the pier — not a ferry, something private. "Hakan Reis" is painted on the stern in blue letters.`,
    npcPresent: ['hakan'],
    choices: [
      {
        text: 'Approach the boat captain. He might know the waterways.',
        next: 'e2_hakan_intro',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: 'Finish your tea and head into the market.',
        next: 'e2_market_entrance',
      },
      {
        text: 'Go directly to Baskı Evi. You\'ve watched long enough.',
        next: 'e2_baskievi_approach',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  // ============================================================
  // MARKET SCENES
  // ============================================================
  {
    id: 'e2_market_entrance',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    text: `The market swallows you. Overhead tarps filter the sun into a yellow haze, and you press past crates of tomatoes stacked head-high, buckets of olives glistening in brine.

A spice vendor\'s stall explodes with color — pyramids of sumac, turmeric, pul biber. The vendor catches you staring. "Buyurun, buyurun!" He gestures you closer, already scooping samples.

Deeper in, the stalls shift from food to curiosity. A vinyl record shop spills Turkish psych-rock into the passage. Next door, a man repairs antique clocks behind a window thick with dust.

Through the crowd, you spot a young woman with short dark hair tacking a flyer to a notice board. She wears a canvas apron with ink stains — she looks like she works with her hands.`,
    choices: [
      {
        text: 'Ask around for the print shop. Someone here must know it.',
        next: 'e2_baskievi_approach',
      },
      {
        text: 'Talk to the young woman with the ink-stained apron.',
        next: 'e2_sude_market',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: 'Browse the record shop. Sometimes people talk to strangers over music.',
        next: 'e2_record_shop',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: 'Ask the spice vendor if he knows Defne.',
        next: 'e2_spice_vendor',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_record_shop',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı - Record Shop',
    text: `The shop is barely wider than your arm span. Crates of vinyl line both walls, and a reel-to-reel tape deck purrs on the counter. The owner — a thin man with round glasses and a Barış Manço t-shirt — nods without looking up from the album he\'s sleeving.

You flip through Turkish jazz, Anatolian folk, bootleg Bosphorus Blues sessions. Your fingers stop on a record sleeve — bold geometric patterns framing a photograph of the Bosphorus at night. Defne\'s style, unmistakable.

"That\'s a local pressing," the owner says, noticing your pause. "Woman who designed the cover was one of my regulars. Bright — really bright. She\'d come in, flip through the psych-rock section, talk about album art for hours. She could name every designer who worked on the Decca label." He adjusts his glasses. "Haven\'t seen her in a while though. Shame."

"You knew her?" you ask, keeping your voice casual.

"She lit up a room, you know? Passionate. She was working with some master printer — a woman named Naz who has a reputation on this side of the water. Serious craftsperson." He shrugs. "Then one day she just stopped coming. People drift, I guess."`,
    choices: [
      {
        text: 'Press him for details. When exactly did she stop coming?',
        next: 'e2_record_owner_press',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: 'Ask casually about Naz and what kind of work she does.',
        next: 'e2_record_owner_baskievi',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: 'Thank him and head to Baskı Evi.',
        next: 'e2_baskievi_approach',
      },
    ],
  },

  {
    id: 'e2_record_owner_press',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı - Record Shop',
    text: `The owner takes off his glasses and cleans them on his shirt. "Maybe... two years ago? She was here all the time, always working on some project with Naz Hanım. Then one day she just stopped." He puts his glasses back on and studies you more carefully.

"She was different the last few times. Not her usual self — that spark was gone. Kept checking her phone. Once she asked me if I knew anyone with a boat — said she needed to get to the islands without going through the regular ferry." He laughs nervously. "I thought she was being dramatic. Artists, you know?"

He pauses. "Are you police?"

You shake your head.

"Good. Because I don\'t think the police would care." He leans closer. "Last time she came in, she bought a record — Erkin Koray, the original pressing. She said it was a gift for a friend at a meyhane on Bahariye Caddesi. That\'s all I know."`,
    choices: [
      {
        text: 'Ask about the meyhane on Bahariye Caddesi.',
        next: 'e2_record_owner_meyhane',
        effects: {
          setFlags: ['heard_about_meyhane'],
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: 'Head to Baskı Evi. Naz is connected to all of this.',
        next: 'e2_baskievi_approach',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_record_owner_baskievi',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı - Record Shop',
    text: `"Naz Hanım?" He tilts his head. "She\'s an institution. Twenty years in the neighborhood, maybe more. Letterpress, bookbinding, art prints — proper craft work. She trained half the printmakers on the Asian side."

He slots a record back into its crate. "Protective of her people, though. She took your friend under her wing — treated her like a daughter, from what I could tell. When your friend stopped coming around, Naz went quiet too. Closed the shutters more often. Something changed between them, or something happened. I never found out which."

He looks at you with mild curiosity. "You an artist? Looking for printing work?"

The question hangs. How you introduce yourself in this neighborhood will travel. Kadıköy is tighter than it looks.`,
    choices: [
      {
        text: '"Something like that. Thanks for the tip."',
        next: 'e2_baskievi_approach',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: '"I\'m a journalist. Researching a story about art restoration."',
        next: 'e2_baskievi_approach',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_record_owner_meyhane',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı - Record Shop',
    text: `"The meyhane? It\'s called Liman. On Bahariye Caddesi, halfway down, look for the blue door. Good meze, decent rakı. The bartender\'s a big guy — Bora, I think. Friendly. Knows everyone." The owner pauses. "If your friend went there a lot, Bora would know about it."

He hands you the Erkin Koray record. "Take it. If you find her, tell her she still owes me for the Selda Bağcan box set."

You step back into the market\'s current. Two threads now: the print shop where Defne worked, and the meyhane where she had a friend.`,
    choices: [
      {
        text: 'Go to Baskı Evi. Start with where Defne worked.',
        next: 'e2_baskievi_approach',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Find the meyhane. A friend might tell you more than a colleague.',
        next: 'e2_meyhane_approach',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_spice_vendor',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı - Spice Stall',
    text: `The spice vendor is delighted to have your attention. He pushes a paper cone of pul biber into your hands before you can refuse. "Taste, taste! Best in Kadıköy."

You mention Defne\'s name. His face shifts from sales-mode to something more guarded.

"I don\'t know names, kardeşim. But I know what moves through this market." He leans in, lowering his voice. "I see many things from this stall. People who come and go at strange hours. Packages carried through the alley at midnight — flat, wrapped in acid-free paper. Things that don\'t smell like spice." He taps his nose.

"There\'s a print shop — Baskı Evi. Take the side street past the clock-repair window, twenty meters on your left. I\'ve seen men carry those packages out of there after the shutters close. Regular as a tide. Every week or two, a van pulls up. They load, they leave. No receipts, no conversation."

He straightens up and smiles broadly as a tourist approaches. "Saffron, madam? Best price!"`,
    choices: [
      {
        text: 'Head to Baskı Evi with this new information.',
        next: 'e2_baskievi_approach',
        effects: {
          setFlags: ['heard_midnight_packages'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Ask about the men he saw. What did they look like?',
        next: 'e2_spice_vendor_details',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_spice_vendor_details',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı - Spice Stall',
    text: `The vendor glances around, then speaks quickly. "Two types. Young guys, hired muscle — they carry, they don\'t think. And one older man, silver hair, nice coat. He comes in a black car, always after dark. Never carries anything himself." He makes a gesture like washing his hands. "Clean hands, dirty business."

He won\'t say more. A neighboring vendor is watching. "That\'s all I know, friend. Buy some baharat and go." He presses a paper cone into your hands — baharat, the warm spice mix filling your nose with cinnamon and clove.

The silver-haired man doesn\'t match anyone you\'ve encountered yet. You file the description away.`,
    choices: [
      {
        text: 'Thank him and head to Baskı Evi.',
        next: 'e2_baskievi_approach',
        effects: {
          setFlags: ['heard_silver_hair_man', 'heard_midnight_packages'],
        },
      },
    ],
  },

  {
    id: 'e2_sude_market',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    npcPresent: ['sude'],
    text: `The young woman is tacking up a flyer for a lecture series — "Ottoman Typography and the Modern Press" at Marmara University. Sharp, restless eyes. Short-cropped hair dyed at the tips with indigo ink. Her fingers are mapped with tiny cuts from a paper knife.

"Merhaba," you say.

She sizes you up in a heartbeat. "If you\'re looking for the fish market, it\'s two passages back."

"I\'m looking for Baskı Evi, actually."

Something flickers across her face. Caution, maybe. Or hope. "I work there. Well — I intern. Sude." She doesn\'t offer a handshake but she doesn\'t walk away either. "What do you need printed?"

Her eyes linger on the receipt in your hand — Defne\'s receipt. She recognizes it. You can see her deciding whether to say so.`,
    choices: [
      {
        text: 'Show her the receipt openly. "My sister got this. Defne."',
        next: 'e2_sude_honest',
        effects: {
          setFlags: ['met_sude_market'],
          axisShift: { trust: 0.2 },
          npcTrust: { sude: 1 },
        },
      },
      {
        text: '"I need some bookbinding work done. Can you take me there?"',
        next: 'e2_sude_cover',
        effects: {
          setFlags: ['met_sude_market'],
          axisShift: { approach: -0.2 },
        },
      },
      {
        text: '"You look like you\'ve seen this receipt before."',
        next: 'e2_sude_perceptive',
        effects: {
          setFlags: ['met_sude_market'],
          axisShift: { approach: 0.1, trust: 0.1 },
          npcTrust: { sude: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_honest',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    npcPresent: ['sude'],
    text: `Sude\'s jaw tightens. She grabs your wrist and pulls you into the gap between two stalls, behind a curtain of hanging dried peppers.

"Don\'t say that name out loud in the market," she hisses. Her eyes are scanning the passage behind you. "Defne — I only met her a few times at the shop. She was working with Naz Hanım on something. Restoration documents, provenance papers for Ottoman art."

She releases your wrist. "But some of those documents... I don\'t think they were real. I\'ve been watching. Packages come in after hours, wrapped in acid-free paper. Things I\'m not supposed to see." She chews her lip. "I thought it was just tax fraud or something boring. Then Defne disappeared and Naz acted like she\'d never existed."

She studies your face. "You really are her sister. You have the same jaw." A long pause. "I\'ve been taking photos. On my phone. Deliveries, package labels. I have a picture — blurry, but it shows a letterhead. Some collector\'s name." Her hand moves to her pocket but stops. "Not here. Not yet. I need to know you\'re not going to get me killed."`,
    choices: [
      {
        text: '"I understand. What would it take for you to trust me?"',
        next: 'e2_sude_trust_build',
        effects: {
          axisShift: { trust: 0.2 },
          npcTrust: { sude: 1 },
        },
      },
      {
        text: '"Please — she\'s my sister. I need whatever you have."',
        next: 'e2_sude_plead',
        effects: {
          axisShift: { heart: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_perceptive',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    npcPresent: ['sude'],
    text: `She blinks. Then she almost smiles. "You\'re quick. Yeah, I\'ve seen that receipt style before. Baskı Evi uses a specific numbering system. Naz Hanım is very particular."

She leads you to a quiet spot by the clock-repair shop. The ticking from inside fills the silence between you. "I\'m guessing you\'re not here for bookbinding. And I\'m guessing whoever had that receipt matters to you."

She crosses her arms. "I work at Baskı Evi three days a week. I see things. Some of those things don\'t add up. I\'ve been keeping notes — call it a student journalist\'s instinct." She pauses. "If you tell me who you\'re looking for, I might be able to tell you if you\'re in the right place."

There\'s an earnestness in her that reminds you of Defne at that age. Bright, stubborn, maybe a little reckless.`,
    choices: [
      {
        text: 'Tell her the truth. "My sister, Defne. She disappeared."',
        next: 'e2_sude_honest',
        effects: {
          axisShift: { trust: 0.2 },
          npcTrust: { sude: 1 },
        },
      },
      {
        text: '"I\'m investigating something at Baskı Evi. That\'s all I can say."',
        next: 'e2_sude_guarded',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_cover',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    npcPresent: ['sude'],
    text: `"Bookbinding. Sure." She doesn\'t believe you for a second but she doesn\'t push. "Follow me."

She leads you through the market with the ease of someone who\'s navigated it a thousand times, ducking under awnings and stepping over sleeping cats. "Naz Hanım runs the shop. She\'s the best in Istanbul — maybe in Turkey. If you actually need binding done, you\'re in the right place."

She glances back at you. "If you need something else, I\'d think carefully about how you ask for it."

She stops at a narrow side street. The print shop is twenty meters ahead. "I\'ll let Naz know you\'re here." She disappears inside, leaving you on the cobblestones with the scent of ink and old paper drifting from the open door.`,
    choices: [
      {
        text: 'Enter Baskı Evi.',
        next: 'e2_baskievi_enter',
      },
    ],
  },

  {
    id: 'e2_sude_trust_build',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    npcPresent: ['sude'],
    text: `Sude studies you for a long moment. The market noise swells and recedes like a tide. A vendor two stalls down drops a crate of lemons and curses magnificently.

"Come to the shop later today. After three. Naz goes to the university for her Ottoman typography seminar on Wednesdays. I\'ll be alone." She writes a number on the back of one of her lecture flyers. "Text me first. If I don\'t answer, don\'t come."

She straightens her apron. "Go see Naz now if you want. She\'ll be polite, she\'ll be helpful, she\'ll give you çay and talk about bookbinding until your eyes glaze over. And she won\'t tell you a single true thing about your sister."

She starts walking toward Baskı Evi, then turns. "There\'s a meyhane on Bahariye Caddesi. Blue door. Bora — the bartender — he was close with Defne. If you want someone who actually cared about her, start there."

Then she\'s gone, absorbed into the market crowd like ink into water.`,
    choices: [
      {
        text: 'Go to Baskı Evi. Face Naz directly.',
        next: 'e2_baskievi_approach',
        effects: {
          setFlags: ['sude_appointment'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Find the meyhane. Talk to Bora first.',
        next: 'e2_meyhane_approach',
        effects: {
          setFlags: ['sude_appointment', 'heard_about_meyhane'],
          axisShift: { heart: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_plead',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    npcPresent: ['sude'],
    text: `Your voice cracks and you hate it. But Sude\'s expression softens. She looks away, blinking.

"I get it. I do." She exhales. "But if I show you what I have and Naz finds out, I lose my internship. Maybe worse. The people she works with — they\'re not the kind who file complaints."

She pulls out her phone, scrolls, then puts it away. Not yet. But closer. "Go see Naz. Play it cool — you\'re a customer, you want bookbinding, whatever. Don\'t mention Defne until you see how she reacts. Feel her out."

She bites her thumbnail. "Then come back to me. I\'ll be at the shop until five, but Naz leaves at three for her seminar. We can talk then." She gives you a look that\'s equal parts scared and determined. "I want to help. I just need to be smart about it."`,
    choices: [
      {
        text: 'Go to Baskı Evi. Be careful with Naz.',
        next: 'e2_baskievi_approach',
        effects: {
          setFlags: ['sude_appointment'],
          npcTrust: { sude: 1 },
        },
      },
      {
        text: 'Find Bora at the meyhane first. Build your picture before facing Naz.',
        next: 'e2_meyhane_approach',
        effects: {
          setFlags: ['sude_appointment', 'heard_about_meyhane'],
          axisShift: { heart: 0.1 },
          npcTrust: { sude: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_guarded',
    episode: 2,
    phase: 'exploration',
    location: 'Kadıköy Çarşı',
    npcPresent: ['sude'],
    text: `She uncrosses her arms and takes a step back. The openness in her face shutters closed. "Right. Investigating. Very mysterious." Her tone goes flat. "I work in a print shop, not a spy movie. If you want to meet Naz Hanım, the shop is down that alley on the left."

She turns to leave, then hesitates. "Look — whatever you\'re doing, be careful with Naz. She\'s smarter than she lets on." It\'s not much, but it\'s more than she owes you.

She walks away. You\'ve lost ground with her, but the warning about Naz is worth something.`,
    choices: [
      {
        text: 'Head to Baskı Evi.',
        next: 'e2_baskievi_approach',
      },
      {
        text: 'Find the meyhane on Bahariye Caddesi.',
        next: 'e2_meyhane_approach',
        effects: {
          setFlags: ['heard_about_meyhane'],
        },
      },
    ],
  },

  // ============================================================
  // BASKI EVI SCENES
  // ============================================================
  {
    id: 'e2_baskievi_approach',
    episode: 2,
    phase: 'exploration',
    location: 'Side Street off Kadıköy Çarşı',
    text: `The side street is quieter than the market — cobblestones worn smooth by a century of footsteps, a single plane tree casting dappled shade. Baskı Evi sits behind a wooden door painted deep green. The sign is hand-carved, gilded: "Baskı Evi — Matbaa ve Ciltçi" with a small Ottoman tughra device beneath.

Through the window you see shelves of leather-bound books, stacks of marbled paper, the iron bulk of a letterpress. A woman moves behind the counter, precise and unhurried. She\'s arranging sheets of paper with the focus of a surgeon laying out instruments.

The door is open. The smell rolls out — linseed oil, old paper, a hint of turpentine. There\'s something underneath those smells, harder to name. The scent of secrets kept in ink.

You could walk in as a customer. Or you could announce yourself and your purpose.`,
    choices: [
      {
        text: 'Enter as a potential customer. "Merhaba, I need some bookbinding work."',
        next: 'e2_baskievi_enter',
        effects: {
          axisShift: { approach: -0.2 },
        },
      },
      {
        text: 'Enter and show the receipt. "My sister left this behind."',
        next: 'e2_baskievi_direct',
        effects: {
          axisShift: { approach: 0.3 },
        },
      },
      {
        text: 'Enter and introduce yourself as a journalist researching Ottoman art.',
        next: 'e2_baskievi_journalist',
        effects: {
          axisShift: { approach: 0.1, method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_baskievi_enter',
    episode: 2,
    phase: 'exploration',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `The shop is a museum of craft. An original Heidelberg letterpress dominates one wall, its iron frame gleaming with maintenance oil. Specimen drawers line the opposite side — you catch glimpses of Ottoman typefaces, borders, decorative motifs in lead and wood block. The workbench holds a half-bound codex, its spine exposed like ribs.

The woman looks up. Naz Yılmaz is forty-eight but could pass for older or younger depending on the light. Her hair is pulled back in a severe bun, gray threads woven through black. Her hands are her most striking feature — long, precise, with the calluses of someone who\'s spent decades working paper and leather.

"Hoş geldiniz." Her voice is warm but measured. "What can I do for you?"

She pours çay without asking — from a double-stacked çaydanlık on a hotplate behind the counter. The glass appears before you, perfectly steeped.

"Bookbinding?" she asks, already appraising you. Her eyes miss nothing. She\'s noted your jacket, your shoes, the way you looked at the letterpress. She\'s reading you the way she reads a manuscript — for what\'s written and what\'s been erased.`,
    choices: [
      {
        text: '"Yes, I have an old journal that needs rebinding. Family heirloom."',
        next: 'e2_naz_cover_story',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: -0.2 },
          npcTrust: { naz: 1 },
        },
      },
      {
        text: 'Take the tea, look around more. Let silence do the work.',
        next: 'e2_naz_observe',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: '"An old fisherman in Arnavutköy mentioned this shop. Said my sister used to come here."',
        next: 'e2_naz_oguz_callback',
        condition: { flag: 'oguz_full_account' },
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: 0.1, trust: 0.1 },
          npcTrust: { naz: 1 },
        },
      },
      {
        text: 'Drop the pretence. "I\'m looking for my sister. Defne."',
        next: 'e2_naz_defne_direct',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: 0.3 },
        },
      },
    ],
  },

  {
    id: 'e2_baskievi_direct',
    episode: 2,
    phase: 'exploration',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz Yılmaz looks at the receipt in your hand. Her expression doesn\'t change — not a twitch, not a blink. She takes it between two fingers and examines it the way a jeweler examines a stone.

"Please, sit." She gestures to a stool by the workbench. Çay appears. The ritual is automatic. "Your sister. You said Defne?"

She places the receipt on the counter, perfectly aligned with the wood grain. "She came here for document research. Ottoman-era provenance papers — how they were constructed, what inks were used, the binding techniques." Naz\'s tone is clinical, professorial. "She was very talented. Very serious."

"Was?" you say.

The tiniest pause. "Is, I assume. I haven\'t seen her in some time." Her fingers brush the receipt. "This is from October. A restoration consultation. Perfectly routine."

Her eyes find yours and hold. There\'s intelligence there, and something else — an assessment. She\'s deciding how much you know and how dangerous that makes you.`,
    choices: [
      {
        text: '"Routine. Right. Then why did she disappear after coming here?"',
        next: 'e2_naz_defne_direct',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: 'Accept her story for now. Ask about her work, build rapport.',
        next: 'e2_naz_cover_story',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: -0.2 },
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_baskievi_journalist',
    episode: 2,
    phase: 'exploration',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `You introduce yourself as a journalist, and something subtle shifts behind Naz\'s eyes. Not fear exactly. Calculation.

"A journalist interested in Ottoman art preservation." She says it like she\'s tasting the words. "How refreshing. Most journalists only care about politics and scandal." She pours çay with deliberate grace. "Please, sit. What would you like to know?"

The shop hums with quiet industry. A dehumidifier clicks in the corner. Somewhere in the back, you hear the creak of a press.

Naz launches into a fluent lecture on Ottoman calligraphy and book arts, the loss of heritage under modernization, the role of private collectors in preservation. She\'s brilliant and she knows it. Her passion is genuine — you can hear it in the way her voice warms when she describes a particular fifteenth-century binding technique.

But she\'s also steering you. Every answer is a door that opens onto a prepared room. She\'s showing you exactly what she wants you to see.`,
    choices: [
      {
        text: '"Fascinating. Do you work with any specific artists or restorers?"',
        next: 'e2_naz_cover_story',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: 0.1 },
          npcTrust: { naz: 1 },
        },
      },
      {
        text: '"I\'m actually looking into a specific case. A woman named Defne."',
        next: 'e2_naz_defne_direct',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: 0.3 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_cover_story',
    episode: 2,
    phase: 'exploration',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz relaxes fractionally. You talk about paper grain and binding thread, about acid-free storage and gold-leaf tooling. She shows you the Heidelberg press in action — feeds in a sheet of handmade cotton paper, pulls the lever with practiced strength. The impression comes out crisp: an Ottoman border design, intricate as lacework.

"This is what I do," she says, holding up the print. "I keep old things alive. In a country that would rather forget its Ottoman past, someone must remember."

You notice details as she talks. A locked cabinet in the back room, visible through a half-open door. A stack of acid-free tissue wrapping on a shelf — the kind used for fine art transport. And on the wall, a photograph: Naz with a group of people at what looks like an art exhibition. One face in the back row makes your pulse skip — it might be Defne.

Naz follows your gaze to the photograph and smoothly redirects. "Now, about your binding project. Do you have the journal with you?"`,
    choices: [
      {
        text: '"Is that Defne in that photograph?"',
        next: 'e2_naz_defne_direct',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: '"I don\'t have it with me today. I\'ll bring it next time."',
        next: 'e2_naz_leave_friendly',
        effects: {
          npcTrust: { naz: 1 },
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: 'Ask about the locked cabinet. "What do you keep in the back?"',
        next: 'e2_naz_push_cabinet',
        effects: {
          axisShift: { approach: 0.2, method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_observe',
    episode: 2,
    phase: 'exploration',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `You sip the çay and let your eyes wander. Naz watches you watching and says nothing. The silence between you is a negotiation.

The shop reveals itself in layers. The front is showroom: beautiful prints, hand-bound journals, marbled paper in frames. Tourist-friendly. But the workbench tells a different story — specialized tools for document aging, a UV lamp for examining paper, a collection of historical ink samples in labelled vials. This isn\'t just a print shop. This is a laboratory.

On a shelf behind the press, you spot a row of leather-bound ledgers. One lies open, showing columns of numbers and dates in precise handwriting. Client records, maybe. Or something else.

Naz finishes her çay and sets the glass down. "You\'re very observant for a customer," she says. It\'s not quite a compliment.`,
    choices: [
      {
        text: '"I appreciate craftsmanship. You clearly take your work seriously."',
        next: 'e2_naz_cover_story',
        effects: {
          npcTrust: { naz: 1 },
          axisShift: { approach: -0.1 },
        },
      },
      {
        text: '"And you\'re very guarded for a shopkeeper. I\'m looking for Defne."',
        next: 'e2_naz_defne_direct',
        effects: {
          axisShift: { approach: 0.3 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_defne_direct',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `The name lands like a stone in still water. Naz\'s composure holds but you catch the ripple — a tightening at the corners of her mouth, a fractional shift in posture.

"Defne," she repeats. She picks up a bone folder from the workbench and turns it in her fingers. "She was a gifted artist. She came here to study provenance documentation — how Ottoman-era art ownership was recorded. Paper, ink, binding." A pause. "Academic interest."

"She\'s my sister," you say. "And she\'s missing."

Naz sets down the bone folder. "Missing. I see." Her voice carries something that might be sympathy or might be carefully performed concern. "I\'m sorry to hear that. But I\'m a bookbinder, not a detective. She came, she studied, she left. That\'s all I can tell you."

She holds your gaze steadily. She\'s lying and she knows you know she\'s lying. The question is what happens next.`,
    choices: [
      {
        text: '"She was scared of something. Of someone. Who was she afraid of?"',
        next: 'e2_naz_push_fear',
        effects: {
          axisShift: { approach: 0.2, heart: 0.1 },
        },
      },
      {
        text: '"I know about the packages. The after-hours work. The forgeries."',
        next: 'e2_naz_confront',
        condition: { flag: 'heard_midnight_packages' },
        effects: {
          axisShift: { approach: 0.3 },
          npcTrust: { naz: -1 },
        },
      },
      {
        text: 'Say nothing. Let the silence press on her.',
        next: 'e2_naz_silence',
        effects: {
          axisShift: { approach: -0.1, method: 0.1 },
        },
      },
      {
        text: 'You\'ve learned to read people on this journey. Meet her silence with steady calm. "Naz — I\'m not here to judge you. I think you\'ve been carrying this alone long enough."',
        next: 'e2_naz_help_plea',
        condition: { axis: { name: 'trust', min: 0.3 } },
        effects: {
          axisShift: { trust: 0.2 },
          npcTrust: { naz: 1 },
        },
      },
      {
        text: '"All right. I understand. Thank you for the çay." Leave gracefully.',
        next: 'e2_naz_leave_friendly',
        effects: {
          npcTrust: { naz: 1 },
          axisShift: { trust: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_push_fear',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Something breaks behind Naz\'s eyes. Just for a moment. Then the wall rebuilds.

"Scared." She says the word like she\'s testing its weight. "Your sister was... intense. Passionate. She cared deeply about what happened to Ottoman art — the looting, the negligence, the pieces rotting in basements while bureaucrats argue about budgets." Naz\'s voice gains heat. "We shared that passion."

She moves to the window and looks out at the empty side street. "If she was afraid, she didn\'t tell me of what. But I can tell you this — the world of art restoration and collection is not as gentle as it appears. There are people who see heritage as currency. Who wrap greed in the language of preservation."

She turns back. "I am not one of those people. But I know they exist."

It\'s the most honest thing she\'s said. But it\'s also a deflection — pointing outward, away from herself.`,
    choices: [
      {
        text: '"Give me a name. Just one. Who should I be looking at?"',
        next: 'e2_naz_push_name',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: '"You say you\'re not one of them. Prove it. Help me find her."',
        next: 'e2_naz_help_plea',
        effects: {
          axisShift: { heart: 0.2, trust: 0.1 },
        },
      },
      {
        text: 'Back off. You\'ve pushed enough for now. "I\'ll come back."',
        next: 'e2_after_naz',
        effects: {
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_push_cabinet',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz\'s expression hardens. "The back room is my workshop. Climate-controlled storage for delicate materials. Clients\' projects in progress." She steps between you and the doorway with a casual motion that is not casual at all. "I\'m sure you understand — privacy is essential in restoration work."

She smiles, but the warmth has left it. "Now. You said you needed bookbinding? Because if you\'re here for something else, I think we should be direct with each other."

The air in the shop has changed. The friendly artisan is gone. This is a woman who protects her secrets with precision.`,
    choices: [
      {
        text: '"Fine. I\'m looking for my sister, Defne. She came here and then she vanished."',
        next: 'e2_naz_defne_direct',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: '"You\'re right, let\'s be direct. What exactly goes on here after hours?"',
        next: 'e2_naz_confront',
        effects: {
          axisShift: { approach: 0.3 },
          npcTrust: { naz: -1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_silence',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `The silence stretches. The letterpress ticks as it cools. A cat outside the window meows once and falls quiet. Naz holds your gaze for ten seconds. Twenty. The çay goes cold between you.

Then she exhales. "You\'re like her, you know. She could do this too — sit in silence until the room confessed." The ghost of a smile. "I can\'t tell you where she is. I genuinely don\'t know. But I can tell you she was doing important work. Work that powerful people wanted controlled."

She picks up her bone folder again. "There is an island. In the Marmara. Old mansion, private collection. She went there." The words come out like stones dropped one by one into water. "That\'s where the trail goes. That\'s all I\'ll say."

She stands and moves to the door. The conversation is over.`,
    choices: [
      {
        text: '"Which island? Büyükada?"',
        next: 'e2_naz_island',
        effects: {
          setFlags: ['naz_mentioned_island'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Thank her and leave. She\'s given you enough.',
        next: 'e2_after_naz',
        effects: {
          setFlags: ['naz_mentioned_island'],
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_push_name',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz shakes her head slowly. "I won\'t give you a name. Not because I don\'t want to help — because names have weight. If I say a name and you go asking questions, that name comes back to me. And I have people who depend on this shop."

She pauses, choosing her words. "But I\'ll tell you this. The collectors who operate at the highest level don\'t work from offices. They work from estates. Old money. Old houses." She meets your eyes. "On the islands."

It\'s not a name but it\'s a direction. Büyükada. The Princes\' Islands. Where Istanbul\'s old elite keep their summer mansions and their secrets.`,
    choices: [
      {
        text: '"The islands. Büyükada?"',
        next: 'e2_naz_island',
        effects: {
          setFlags: ['naz_mentioned_island'],
        },
      },
      {
        text: '"I\'ll find the name myself. But thank you."',
        next: 'e2_after_naz',
        effects: {
          setFlags: ['naz_mentioned_island'],
          axisShift: { method: 0.2 },
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_help_plea',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz\'s hands still on the workbench. For a moment she looks tired — not the performative fatigue of someone deflecting, but genuine exhaustion. The weight of something carried too long.

"I cared about your sister. Believe that or don\'t." Her voice drops. "She came to me wanting to learn how provenance documents work. I taught her. Perhaps I should have asked why she wanted to know. Perhaps I didn\'t want to know the answer."

She opens a drawer and takes out a card. Plain white, heavy stock, with a single address printed in letterpress: a location on Büyükada. "She had this. She left it here the last time she came. I\'ve been holding it, not knowing what to do."

She places it on the counter between you. "Take it. And be more careful than she was."`,
    choices: [
      {
        text: 'Take the card. "Thank you, Naz."',
        next: 'e2_after_naz',
        effects: {
          setFlags: ['naz_mentioned_island', 'has_buyukada_address'],
          npcTrust: { naz: 1 },
          axisShift: { heart: 0.1, trust: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_confront',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `The words hit hard. Naz goes still — completely, unnaturally still, like a cat that\'s heard a sound in the dark.

"That\'s a serious accusation." Her voice is ice. "This is a print shop. I bind books. I print art. I preserve heritage that the state has abandoned." She steps closer. "Forgeries. You come into my shop, drink my çay, and accuse me of forgery."

But something is cracking behind the ice. You\'ve struck a nerve.

"Do you have any idea," she says, and now her voice shakes, "what happens to Ottoman manuscripts in this country? They rot in warehouses. They get sold by ignorant heirs for nothing. They leave the country in diplomatic pouches and end up in European collections where they\'re \'discovered\' fifty years later."

She paces behind the counter, her hands moving as if shaping the argument from air. "If I create a document that says this calligraphy was always in Turkey, and it WAS always in Turkey until some dealer tried to ship it to Geneva — is that forgery? Or is it correction?"

She stops. Looks at you. "The museums are underfunded. The dealers are Swiss. The collectors are Russian. Someone has to keep these things HERE. The state won\'t do it. The academics write papers about it and then watch the trucks drive to the airport." Her voice drops. "So yes. I make paper look old. I replicate seals. I build histories for objects that already have histories — I just write the version where they stay home."

She\'s confessed. She knows it. The air between you crackles.`,
    choices: [
      {
        text: '"Tell me about the island. About who you work for."',
        next: 'e2_naz_confession',
        condition: { npcTrust: { npc: 'naz', min: 1 } },
        effects: {
          setFlags: ['naz_confessed'],
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: '"You\'re not wrong about the museums. But forgery is still forgery, Naz."',
        next: 'e2_naz_moral_challenge',
        effects: {
          setFlags: ['naz_confessed', 'challenged_naz_morals'],
          axisShift: { method: 0.1, trust: 0.1 },
          npcTrust: { naz: 1 },
        },
      },
      {
        text: '"I don\'t care about your morals. I care about my sister."',
        next: 'e2_naz_confession',
        effects: {
          setFlags: ['naz_confessed'],
          axisShift: { heart: 0.2 },
        },
      },
      {
        text: 'Say nothing. Let the silence do the work. She needs to talk more than you need to ask.',
        next: 'e2_naz_moral_silence',
        effects: {
          setFlags: ['naz_confessed'],
          axisShift: { method: 0.2 },
          npcTrust: { naz: 1 },
        },
      },
      {
        text: '"You\'ve told me enough. Thank you." Leave before she can warn anyone.',
        next: 'e2_after_naz_compromised',
        effects: {
          setFlags: ['naz_confessed'],
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_moral_challenge',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz stares at you. For a moment you think she'll throw you out. Instead, she laughs — a single, harsh note.

"Forgery." She picks up a sheet of Ottoman marbled paper from the workbench, holds it to the light. "You know what the difference is between a genuine provenance and one of mine? Mine is more accurate. I research for months. I use period-appropriate materials. I cite real exhibitions, real collectors, real histories. The 'genuine' documents from the ministry are stamped by clerks who can't tell a Nakkaşhane miniature from a hotel painting."

She sets the paper down. "But you're right. It's still a lie. And lies compound." She's quiet for a moment. "Defne said the same thing. Almost the same words. 'Forgery is still forgery, Naz.' She was the only person who could say it and make me feel it."

The mention of your sister's name shifts the air between you.`,
    choices: [
      {
        text: '"What happened after Defne said that to you?"',
        next: 'e2_naz_confession',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: '"Then help me find her. Help me make this right."',
        next: 'e2_naz_confession',
        effects: {
          axisShift: { trust: 0.1 },
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_moral_silence',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `You say nothing. The silence stretches. Naz fills it — people always do.

"The first one was easy," she says, quieter now. "A calligraphy piece that was already Turkish, already documented, just missing one link in the chain. I made that link. It took an afternoon. And the piece stayed in Istanbul instead of going to an auction in London." She straightens a stack of paper that doesn't need straightening. "The second one was harder. The third was complicated. By the tenth, I'd stopped counting and started calling it a career."

She meets your eyes. "I'm not asking for forgiveness. I'm asking you to understand that the line between preservation and crime is drawn by people who've never had to choose between them."

The confession hangs in the air. She's given you more than she intended.`,
    choices: [
      {
        text: '"Tell me about the island. About who you work for."',
        next: 'e2_naz_confession',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: '"My sister went looking for the truth. Now I need to know where it took her."',
        next: 'e2_naz_confession',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_confession',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz sinks onto the stool behind the counter. She looks like a woman who has been holding a door shut for years and has finally let go.

"There\'s a collector. I won\'t say his name — not here, not aloud. He has a mansion on Büyükada. Old family, deep pockets, connections to the ministry." She picks up a sheet of marbled paper and folds it absently. "He acquires Ottoman art through... unofficial channels. My job is to create the paperwork that makes it legitimate. Provenance documents, restoration certificates, exhibition records."

She looks up. "Your sister found out. She was working on a painting — a genuine piece, beautiful, sixteenth-century — and she discovered the provenance I\'d created for it was false. She confronted me." A bitter smile. "I tried to explain. She didn\'t see it my way."

"And then?"

"She said she was going to the island. To see it for herself. To see the collection." Naz\'s hands tremble. "That was the last I heard from her. Almost two years ago."

She meets your eyes. "I don\'t know if she\'s alive. I pray she is. But the man who owns that island doesn\'t tolerate interference."`,
    choices: [
      {
        text: '"Give me his name."',
        next: 'e2_naz_vedat_name',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: '"How do I get to the island?"',
        next: 'e2_naz_island',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_vedat_name',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz closes her eyes. When she opens them, something has resolved. "Vedat Arslaner." She says it quietly, like a prayer or a curse. "He calls himself a patron of the arts. Philanthropist. But his collection is built on theft, and his philanthropy is a laundering operation."

The name lands in your chest. Vedat Arslaner. You commit it to memory.

"He has people everywhere. At the ministry, at the university, in the auction houses. If you go after him, you need more than my word. You need evidence." She stands. "Now go. If he learns I\'ve told you this, I\'m finished. Worse than finished."

She moves to the door and holds it open. The green paint gleams in the afternoon light. "Find your sister. And when you do, tell her I\'m sorry I wasn\'t braver."`,
    choices: [
      {
        text: 'Leave. You have the name. Now you need proof.',
        next: 'e2_after_naz',
        effects: {
          setFlags: ['knows_vedat_name', 'naz_mentioned_island'],
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_island',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `"Büyükada," Naz confirms. "The largest of the Princes\' Islands. The mansion is on the eastern shore, behind a wall of cypress trees. You can\'t miss it — or rather, it\'s designed so you don\'t look twice. That\'s the point."

She hesitates, then adds: "The regular ferry won\'t help you. You\'d arrive in daylight, a stranger on a small island. You need a private boat. There\'s a captain at the Kadıköy pier — Hakan Reis. He\'s transported packages for... for the network. He\'s not loyal to anyone but money. And he\'s nervous — I think he suspects someone is skimming from the shipments."

She writes nothing down. "Tell him Naz sent you. That should open the door. What you do after that is your own business."

The conversation is over. Naz turns back to her workbench, her shoulders set. She\'s already rebuilding the wall you broke through.`,
    choices: [
      {
        text: 'Leave and find Hakan Reis at the pier.',
        next: 'e2_after_naz',
        effects: {
          setFlags: ['naz_mentioned_island', 'naz_sent_to_hakan', 'knows_skimming'],
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_naz_leave_friendly',
    episode: 2,
    phase: 'exploration',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `You thank Naz for the çay and the conversation. She nods graciously and presses a business card into your hand — heavy stock, letterpress, elegant. "Come back anytime. Bring that journal."

As you step outside, you glance back through the window. Naz is already on her phone, speaking quickly with her back turned. She might be calling a client. She might be calling someone else entirely.

The side street is quiet. From the market, you hear the calls of vendors and the clatter of handcarts. You have leads to follow — the meyhane on Bahariye Caddesi, the pier, and if Sude keeps her appointment, the photos on her phone.`,
    choices: [
      {
        text: 'Find the meyhane. Talk to Bora.',
        next: 'e2_meyhane_approach',
        effects: {
          setFlags: ['heard_about_meyhane'],
        },
      },
      {
        text: 'Go to the pier. Find Hakan Reis.',
        next: 'e2_hakan_intro',
      },
      {
        text: 'Wait for Sude\'s appointment at three.',
        next: 'e2_sude_return',
        condition: { flag: 'sude_appointment' },
      },
    ],
  },

  {
    id: 'e2_after_naz',
    episode: 2,
    phase: 'complication',
    location: 'Side Street off Kadıköy Çarşı',
    text: `You stand in the side street, blinking in the light. The smell of ink and old paper clings to your jacket. Your mind is racing — islands, mansions, forged documents, a name or the shadow of one.

A seagull lands on the plane tree above you and screams. Somewhere in the market, glass breaks and someone laughs. Istanbul carries on, indifferent to your discoveries.

You check your phone. Early afternoon. Several threads dangle before you — the meyhane where Defne had a friend, the pier where a boat captain might provide passage, and Sude with her phone full of evidence. You can\'t pull them all at once.

Then, at the edge of your vision — a man in a black jacket. Lingering by a shopfront. He wasn\'t there a moment ago.`,
    choices: [
      {
        text: 'Find Bora at the meyhane on Bahariye Caddesi.',
        next: 'e2_followed',
      },
      {
        text: 'Go to the pier. Find a boat to Büyükada.',
        next: 'e2_followed',
      },
      {
        text: 'Go back to Baskı Evi when Naz is gone. Meet Sude.',
        next: 'e2_sude_return',
        condition: { flag: 'sude_appointment' },
      },
      {
        text: 'Walk the Moda waterfront. Clear your head.',
        next: 'e2_moda_waterfront',
        condition: { flag: 'cultivated_ruya' },
      },
    ],
  },

  {
    id: 'e2_after_naz_compromised',
    episode: 2,
    phase: 'complication',
    location: 'Side Street off Kadıköy Çarşı',
    text: `You leave quickly, before Naz can pick up her phone. But as you step into the market, you glance back. Through the shop window, you can see her already dialing. Her face is tight with urgency.

She\'s warning someone. You confronted her too hard, showed your hand, and now the network knows you\'re coming. Whoever Defne feared — they\'ll be expecting you.

The thought settles like cold water in your stomach. You haven\'t lost the trail, but the trail now knows your name.

You need allies. Fast.`,
    choices: [
      {
        text: 'Find Bora at the meyhane. You need friends.',
        next: 'e2_meyhane_approach',
        effects: {
          setFlags: ['compromised'],
        },
      },
      {
        text: 'Get to the pier before word spreads. Find a boat.',
        next: 'e2_hakan_intro',
        effects: {
          setFlags: ['compromised'],
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  // ============================================================
  // MEYHANE SCENES
  // ============================================================
  {
    id: 'e2_meyhane_approach',
    episode: 2,
    phase: 'exploration',
    location: 'Bahariye Caddesi',
    text: `Bahariye Caddesi stretches ahead, lined with cafes and clothing shops, students and tourists mixing in the afternoon crowd. You spot the blue door halfway down — Liman Meyhane, painted in white letters on weathered wood. A string of bare bulbs hangs across the entrance, unlit in the daylight.

Inside, the meyhane is dim and cool after the bright street. Wooden tables scarred with decades of rakı rings. Shelves of bottles catching what light filters through the frosted windows. The smell of grilled octopus and anise and lemon.

A man stands behind the bar, polishing glasses with the methodical attention of someone who finds peace in repetition. He\'s big — not fat, but solid, a former wrestler\'s build going comfortable. Dark beard, kind eyes that look like they haven\'t slept well in months.

He looks up as you enter. "Kitchen doesn\'t open until six, but I can do you meze and a beer if you\'re hungry."`,
    npcPresent: ['bora'],
    choices: [
      {
        text: '"Beer sounds good. And some conversation, if you have time."',
        next: 'e2_bora_casual',
        effects: {
          setFlags: ['met_bora'],
          axisShift: { approach: -0.1 },
          npcTrust: { bora: 1 },
        },
      },
      {
        text: '"Are you Bora? I need to talk to you about Defne."',
        next: 'e2_bora_direct',
        effects: {
          setFlags: ['met_bora'],
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: '"Word travels fast on the ferry. A man in Arnavutköy told me you were Defne\'s friend."',
        next: 'e2_bora_oguz_callback',
        condition: { flag: 'oguz_full_account' },
        effects: {
          setFlags: ['met_bora'],
          axisShift: { trust: 0.2 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_casual',
    episode: 2,
    phase: 'exploration',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora sets a cold Efes in front of you and a plate of meze — white cheese, olives, a smear of acılı ezme that glows orange. He leans on the bar and watches you eat with the satisfaction of someone who believes food fixes things.

"You\'re not from this neighborhood," he says. Not accusatory, just observant.

You make small talk. The meyhane, the neighborhood, how Kadıköy is changing. Bora talks easily — he\'s a natural bartender, generous with conversation, good at drawing people out while revealing little of himself.

But underneath the warmth there\'s something fragile. He glances at an empty stool at the end of the bar like someone should be sitting there. He loses the thread of a sentence and stares at the bottles. He picks up a glass to polish and puts it down three times without finishing.

A framed photograph behind the bar catches your eye. A group of people laughing over meze and rakı — and in the center, unmistakable, is Defne. Her head thrown back in laughter, a glass raised. Next to her, Bora, beaming.`,
    choices: [
      {
        text: 'Point to the photo. "Who\'s that? She looks happy."',
        next: 'e2_bora_photo',
        effects: {
          axisShift: { heart: 0.1 },
          npcTrust: { bora: 1 },
        },
      },
      {
        text: '"Bora — I\'m Defne\'s sister. Deniz."',
        next: 'e2_bora_reveal',
        effects: {
          axisShift: { trust: 0.2 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_direct',
    episode: 2,
    phase: 'exploration',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `The glass Bora is holding stops mid-polish. He sets it down carefully, like it might shatter. His big hands flatten on the bar.

"Who are you?" His voice is quiet but there\'s a tremor in it. Not fear. Something rawer.

"Her sister. Deniz."

He stares at you. Really stares — reading your face the way Naz read your clothes, but looking for something different. Looking for Defne.

"Yeah," he says finally. "I can see it." He reaches under the bar and produces a bottle of rakı, pouring two glasses without asking. The anise smell cuts through the air. He adds water and the liquid turns milky white — lion\'s milk, they call it.

"I\'ve been waiting for someone to come asking about her." He pushes a glass toward you. "I just hoped it would be her."`,
    choices: [
      {
        text: '"Tell me everything. When did you last see her?"',
        next: 'e2_bora_story',
        effects: {
          axisShift: { approach: 0.1 },
          npcTrust: { bora: 1 },
        },
      },
      {
        text: 'Take the rakı. Let him go at his own pace.',
        next: 'e2_bora_story',
        effects: {
          axisShift: { trust: 0.1, heart: 0.1 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_photo',
    episode: 2,
    phase: 'exploration',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora\'s eyes go to the photograph and something collapses behind them. He takes the photo off its hook and holds it. His thumb traces the edge of the frame.

"That\'s Defne." His voice is raw. "Best person I ever knew. She used to sit right there —" he nods at the empty stool "— every Friday. She\'d sketch on napkins and argue about music and eat her weight in meze." A wet laugh. "She could out-drink anyone in this place."

He sets the photo on the bar between you. "She\'s been gone two years. No call, no message, nothing. The police say she drowned — some accident by the water in Arnavutköy." He shakes his head. "Defne swam like a fish. She didn\'t drown."

He looks at you and the recognition hits. "You look like her. You\'re family?"`,
    choices: [
      {
        text: '"I\'m her sister, Deniz. And I don\'t believe she drowned either."',
        next: 'e2_bora_reveal',
        effects: {
          axisShift: { trust: 0.2, heart: 0.1 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_reveal',
    episode: 2,
    phase: 'exploration',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora\'s face cracks. Not a dramatic breakdown — he\'s too solid for that — but a slow crumbling, like a wall losing mortar. He pours rakı and pushes a glass to you. Drinks his own in one motion.

"Deniz. She talked about you. Said you were the smart one — the journalist." He refills his glass. "She said if anything happened, you\'d figure it out."

He grips the edge of the bar. "I should have helped her. She came in here, October, maybe November — she was scared. Not the normal scared, not money-scared or deadline-scared. Deep-scared. She said powerful people were using art to hide things. Documents inside paintings, provenance papers — I didn\'t understand half of it."

He meets your eyes. "She said she was going to an island. Büyükada. Some mansion. She said it was beautiful and terrifying." He swallows. "I told her to go to the police. She laughed. Said the police were already bought."

The rakı burns your throat. You wait.

"She asked me to hold something for her. A backup, she called it. An envelope." He reaches under the bar and produces a manila envelope, sealed with packing tape. Your sister\'s handwriting on the front: "For Deniz. If."`,
    choices: [
      {
        text: 'Open the envelope.',
        next: 'e2_bora_envelope',
        condition: { npcTrust: { npc: 'bora', min: 1 } },
        effects: {
          axisShift: { heart: 0.1, method: 0.1 },
        },
      },
      {
        text: 'Something in his grief mirrors your own. Reach across the bar and grip his hand. "You didn\'t fail her, Bora. You kept the envelope. You waited."',
        next: 'e2_bora_if',
        condition: { axis: { name: 'heart', min: 0.3 } },
        effects: {
          axisShift: { heart: 0.2, trust: 0.1 },
          npcTrust: { bora: 2 },
        },
      },
      {
        text: '"She said \'if.\' If what?"',
        next: 'e2_bora_if',
        effects: {
          axisShift: { heart: 0.2 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_story',
    episode: 2,
    phase: 'exploration',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora talks. Once he starts, it pours out of him like water from a cracked pipe.

Defne came to Kadıköy about three years ago, working on a painting restoration project connected to Baskı Evi. She was bright, electric, full of purpose. She\'d come to the meyhane after work and they became friends fast — the kind of friendship that forms over shared meze and long arguments about Turkish politics and music.

"But she changed. Around October. She started looking over her shoulder. She\'d check her phone and go pale. Once she came in with paint on her hands — not her usual colors. Gold. Like she\'d been handling something old and valuable."

He pours more rakı. "She said powerful people were using art to hide things. Documents inside paintings, fake provenance papers. A network. She\'d stumbled into it through her restoration work."

He leans forward. "She mentioned an island mansion. Büyükada. Said it was beautiful and terrifying."

His eyes are wet. "She asked me to hold something. An envelope. For her sister — for you." He reaches under the bar and places a manila envelope on the counter. Your name is written on it in Defne\'s hand: "For Deniz. If."`,
    choices: [
      {
        text: 'Open the envelope.',
        next: 'e2_bora_envelope',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: '"What else did she say about the island?"',
        next: 'e2_bora_island_details',
        effects: {
          axisShift: { approach: 0.1 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_if',
    episode: 2,
    phase: 'complication',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora\'s jaw works. "If she didn\'t come back." He says it like he\'s been rehearsing. "She told me — if she doesn\'t come for the envelope, give it to her sister. To you." His voice breaks. "I was supposed to find you. But I didn\'t know how. I didn\'t know where to start."

He wipes his eyes with the back of his hand. "I\'m a bartender, Deniz. I pour drinks and I listen to people\'s problems. She needed a hero and she got me. I\'m sorry."

The guilt is a living thing in the room. You can almost see it sitting on his shoulders.`,
    choices: [
      {
        text: '"You kept the envelope. That\'s what she needed. Open it with me."',
        next: 'e2_bora_envelope',
        effects: {
          axisShift: { heart: 0.2, trust: 0.1 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_island_details',
    episode: 2,
    phase: 'complication',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `"Not much. She was careful about details — protecting me, I think." Bora stares into his rakı. "She said the mansion was on the eastern side of Büyükada. Old, Ottoman-era. High walls, cypress trees. A private pier."

He pauses. "She said the man who owned it collected art the way dragons hoard gold — not to enjoy it, but to possess it. She said he had connections everywhere. Ministry of Culture, police, customs." Bora\'s fist tightens on the bar. "She said his name once but made me promise to forget it."

His eyes flicker. He didn\'t forget.

"She said if she could document what was inside that mansion, she could blow the whole thing open. Every forged provenance, every stolen painting, every bribed official."

He pushes the envelope toward you. "Whatever she found, it might be in here."`,
    choices: [
      {
        text: 'Open the envelope.',
        next: 'e2_bora_envelope',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: '"The name, Bora. I need the name."',
        next: 'e2_bora_name',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_name',
    episode: 2,
    phase: 'complication',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora squeezes his eyes shut. "Vedat. Vedat Arslaner." He says it like pulling a splinter. "She said he was the spider at the center. Everyone else — the forgers, the shippers, the auction houses — they all answer to him."

The name confirms what you may already know. Vedat Arslaner. Patron. Collector. Spider.

Bora opens his eyes. "Now open the damn envelope. If she left you answers, take them."`,
    choices: [
      {
        text: 'Open the envelope.',
        next: 'e2_bora_envelope',
        effects: {
          setFlags: ['knows_vedat_name'],
        },
      },
    ],
  },

  {
    id: 'e2_bora_envelope',
    episode: 2,
    phase: 'complication',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `You tear the packing tape. Inside: a single sheet of paper and a USB drive taped to a piece of cardboard.

The paper is a hand-drawn map of Büyükada\'s eastern shore. An X marks a building behind a cluster of cypress trees. Notes in Defne\'s cramped handwriting: "Private pier - E side. Guard rotation every 2 hrs. Collection in main house, basement level. Documents in wooden crates marked \'restoration materials.\'"

Below the map, a message: "Deniz — if you\'re reading this, I couldn\'t do it alone. The drive has copies of everything I found. Forged provenances, shipping manifests, photos. The name you need is Vedat Arslaner. The paintings are in his mansion. The truth is hidden inside them. I\'m going in one more time. I love you. Don\'t be as stupid as me."

Your hands are shaking. Bora is watching you, his big frame hunched with something between grief and hope.

"Is she alive?" he asks. "Does it say?"

It doesn\'t. But the map says she planned to survive.`,
    choices: [
      {
        text: '"She\'s alive. I\'m going to find her."',
        next: 'e2_bora_alliance',
        effects: {
          setFlags: ['has_defne_envelope', 'knows_vedat_name', 'has_buyukada_map'],
          axisShift: { heart: 0.2 },
          npcTrust: { bora: 1 },
        },
      },
      {
        text: '"I need to get to Büyükada. Do you know anyone with a boat?"',
        next: 'e2_bora_boat',
        effects: {
          setFlags: ['has_defne_envelope', 'knows_vedat_name', 'has_buyukada_map'],
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_alliance',
    episode: 2,
    phase: 'complication',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora straightens. The grief doesn\'t leave his face but something else joins it — resolve. He looks like a man being offered a second chance at something he failed the first time.

"I\'m coming with you." It\'s not a question. "I\'m done standing behind this bar pretending everything is fine while she\'s out there."

He pulls off his apron. "I know a boat captain at the pier. Hakan Reis — old guy, runs private tours. He\'s moved packages for these people. He\'s not clean, but he\'s not loyal to them either. He\'s scared and he\'s greedy and that makes him useful."

He locks the rakı bottle away. "Let me close up. We go to the pier, we find Hakan, we get to that island." He looks at you with fierce, wounded determination. "I won\'t fail her again."`,
    choices: [
      {
        text: '"Let\'s go. Together."',
        next: 'e2_after_meyhane',
        effects: {
          setFlags: ['bora_allied'],
          npcTrust: { bora: 1 },
          axisShift: { trust: 0.2 },
        },
      },
      {
        text: '"Wait. I have another lead first. Someone with evidence."',
        next: 'e2_after_meyhane',
        effects: {
          setFlags: ['bora_allied'],
          npcTrust: { bora: 1 },
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_boat',
    episode: 2,
    phase: 'complication',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora nods. "Hakan Reis. At the Kadıköy pier. He runs private tours, but he\'s moved things for the network — paintings, crates, I don\'t know what else. Defne mentioned him once."

He leans in. "Hakan\'s a mercenary. He doesn\'t care about art or justice or your sister. He cares about money and about not getting caught. If you want his help, you need leverage — something he wants." Bora thinks. "He\'s been complaining that someone\'s skimming from the shipments. If you can tell him who, he\'ll do anything for you."

He writes a rough description of Hakan\'s boat on a napkin. "I want to help. Tell me what to do and I\'ll do it."`,
    choices: [
      {
        text: '"Come with me. I could use a friend."',
        next: 'e2_after_meyhane',
        effects: {
          setFlags: ['bora_allied', 'knows_skimming'],
          npcTrust: { bora: 1 },
          axisShift: { trust: 0.2 },
        },
      },
      {
        text: '"Stay here. If I don\'t come back, take that envelope to the press."',
        next: 'e2_after_meyhane',
        effects: {
          setFlags: ['bora_backup_plan', 'knows_skimming'],
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_after_meyhane',
    episode: 2,
    phase: 'complication',
    location: 'Bahariye Caddesi',
    text: `You step out of the meyhane into the late afternoon light. Bahariye Caddesi is shifting into evening mode — the clothing shops closing, the restaurants opening, the street taking on the warm amber glow of string lights.

Your pocket holds a map, a USB drive, and a name. Vedat Arslaner. Büyükada. A mansion full of stolen art and forged documents. And somewhere in there, maybe, your sister.

But you\'re not ready to storm an island. Not yet. You need a way there, and you need insurance — evidence that exists outside your jacket pocket, in case things go wrong.`,
    choices: [
      {
        text: 'Go to the pier. Find Hakan Reis and secure a boat.',
        next: 'e2_hakan_intro',
      },
      {
        text: 'Go back to Baskı Evi. Sude should be alone by now.',
        next: 'e2_sude_return',
        condition: { flag: 'sude_appointment' },
      },
      {
        text: 'Walk to Moda waterfront. You need a quiet moment.',
        next: 'e2_moda_waterfront',
        condition: { flag: 'cultivated_ruya' },
      },
      {
        text: 'You have enough. Head to the pier and plan for Büyükada.',
        next: 'e2_climax_prep',
        condition: { flag: 'knows_vedat_name' },
      },
    ],
  },

  // ============================================================
  // SUDE'S EVIDENCE
  // ============================================================
  {
    id: 'e2_sude_return',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['sude'],
    text: `You approach Baskı Evi from the market side. The green door is ajar. Inside, the shop feels different without Naz — looser, less curated. Sude sits at the workbench, hunched over a phone, her face lit blue by the screen.

She looks up when you enter. Checks the street behind you. Locks the door.

"You came." She sets the phone on the workbench. "Naz left at three like clockwork. Seminar or whatever. We have maybe ninety minutes."

She chews her lip, studying you. The nervousness is real but so is something else — the excitement of someone who\'s been carrying a secret and finally has someone to share it with.

"Before I show you anything, I need to know — what are you going to do with it? Because if this gets traced back to me and I\'m wrong about you, my life gets very complicated."`,
    choices: [
      {
        text: '"I\'m building a case. Evidence to protect my sister and expose the network."',
        next: 'e2_sude_evidence',
        effects: {
          axisShift: { method: 0.2 },
          npcTrust: { sude: 1 },
        },
      },
      {
        text: '"I\'ll protect your identity. You have my word."',
        next: 'e2_sude_evidence',
        effects: {
          axisShift: { trust: 0.2 },
          npcTrust: { sude: 1 },
        },
      },
      {
        text: '"Honestly? I don\'t know yet. But I won\'t let you get hurt."',
        next: 'e2_sude_evidence',
        effects: {
          axisShift: { heart: 0.2 },
          npcTrust: { sude: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_evidence',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['sude'],
    text: `Sude unlocks her phone and starts swiping. "I\'ve been documenting for two months. At first I thought I was being paranoid. Then I thought I was being brave. Now I think I\'m being stupid." She half-smiles. "But here."

Photo after photo. A delivery van parked behind the shop at 11 PM, its license plate visible. Wrapped packages the size of paintings being carried through the back door. Naz signing a form under a bare bulb. A stack of documents on the workbench — you recognize the layout of provenance certificates.

Then the crucial shot. Blurry, taken through a half-open door, but readable: a letterhead. An ornate monogram at the top, and below it a name — "Vedat Arslaner, Patron of Anatolian Heritage." A shipping address on Büyükada.

"This was last month," Sude says. "I was supposed to be gone but I forgot my bag. Came back and saw Naz meeting with a man — silver hair, expensive coat. He left this on the counter and I got the shot before Naz filed it away."

She looks at you steadily. "Is this enough?"`,
    choices: [
      {
        text: '"This is gold. Can you send me copies?"',
        next: 'e2_sude_photos_share',
        condition: { npcTrust: { npc: 'sude', min: 1 } },
        effects: {
          setFlags: ['has_sude_photos', 'knows_vedat_name'],
          axisShift: { method: 0.2 },
          npcTrust: { sude: 1 },
        },
      },
      {
        text: '"The man with silver hair — did you hear his name?"',
        next: 'e2_sude_silver_man',
        effects: {
          setFlags: ['has_sude_photos', 'knows_vedat_name'],
          axisShift: { approach: 0.1 },
          npcTrust: { sude: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_photos_share',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['sude'],
    text: `Sude AirDrops the photos to your phone. Seventeen images in total. Delivery logs, package photos, the letterhead, and three shots of documents you\'ll need time to study — what appear to be forged restoration certificates with official ministry stamps.

"I have backups," she says. "Cloud storage, encrypted. If something happens to my phone, the photos survive." She\'s thought this through. This is a young woman who grew up in a country where journalists disappear and activists get arrested. She knows the playbook.

"What now?" she asks. "I can\'t keep working here pretending everything is normal. Not anymore."

There\'s a sound from outside. A key in the lock. Sude goes white.

"That\'s early. She never comes back early." Sude grabs her phone and shoves it in her pocket. You have seconds.`,
    choices: [
      {
        text: 'Duck out the back door. Avoid Naz entirely.',
        next: 'e2_sude_escape',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Stay. Pretend you\'re a customer Sude is helping.',
        next: 'e2_sude_bluff',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_silver_man',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['sude'],
    text: `"Naz called him \'Vedat Bey.\' Very respectful, very careful." Sude scrolls to another photo — the silver-haired man\'s profile, taken through the shop window. Sharp jaw, expensive watch, the bearing of someone accustomed to authority.

"He was angry that night. Something about a shipment that didn\'t arrive. He said —" She pauses, remembering. "He said \'the girl is becoming a problem.\' I think he meant Defne." She looks at you with dark, serious eyes. "Naz said she\'d handle it. That was two weeks before your sister disappeared."

The implications settle like stones in your gut. Naz said she\'d handle it.

Sude sends the photos to your phone. "Take them. Use them. Just keep my name out of —"

A key scrapes in the front door lock. Sude freezes. "She\'s back. She\'s never back this early."`,
    choices: [
      {
        text: 'Out the back. Now.',
        next: 'e2_sude_escape',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Stay calm. You\'re a customer browsing prints.',
        next: 'e2_sude_bluff',
        effects: {
          axisShift: { approach: -0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_sude_escape',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi - Back Alley',
    text: `Sude grabs your arm and steers you through the back room — past the locked cabinet, past stacks of acid-free paper, to a metal door that opens onto a narrow alley. Dumpsters, stray cats, the smell of drains.

"Go left, it connects to the main market." She\'s already composing herself — smoothing her apron, steadying her breath. "I\'ll tell Naz I was just closing up."

She meets your eyes one last time. "Be careful on that island. The people there — they don\'t play by rules." Then she closes the door and you hear the bolt slide.

You stand in the alley with seventeen photos on your phone and the taste of fear in your mouth. But the evidence is real. Names, dates, faces. The kind of thing that holds up.`,
    choices: [
      {
        text: 'Head to the pier. Find Hakan Reis.',
        next: 'e2_hakan_intro',
      },
      {
        text: 'Find Bora at the meyhane. Regroup.',
        next: 'e2_meyhane_approach',
        condition: { flagFalse: 'met_bora' },
      },
      {
        text: 'You have enough. Time to plan for Büyükada.',
        next: 'e2_climax_prep',
      },
    ],
  },

  {
    id: 'e2_sude_bluff',
    episode: 2,
    phase: 'complication',
    location: 'Baskı Evi',
    npcPresent: ['naz', 'sude'],
    text: `The door opens. Naz steps in carrying a leather portfolio, her eyes sweeping the shop with the precision of a hawk scanning a field. She sees you. She sees Sude. The calculation is instant.

"Merhaba," she says, her voice perfectly neutral. "A customer. How nice."

Sude is already performing — showing you a display of marbled paper prints, chattering about sizes and pricing. She\'s good. Her hands are steady and her voice doesn\'t waver.

Naz watches for a moment, then sets her portfolio on the workbench and disappears into the back room. You hear the click of the cabinet lock.

"Choose a print," Sude murmurs. "Buy something. Leave normally." She rolls a sheet of marbled paper — indigo and gold, beautiful despite the circumstances. You pay. Naz re-emerges as you\'re leaving, and her eyes follow you to the door.

"Do come again," she says. The warmth in her voice doesn\'t reach her eyes.`,
    choices: [
      {
        text: 'Leave and head to the pier.',
        next: 'e2_hakan_intro',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Leave and find Bora at the meyhane.',
        next: 'e2_meyhane_approach',
        condition: { flagFalse: 'met_bora' },
      },
      {
        text: 'Time to prepare for Büyükada.',
        next: 'e2_climax_prep',
      },
    ],
  },

  // ============================================================
  // HAKAN REIS
  // ============================================================
  {
    id: 'e2_hakan_intro',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier',
    npcPresent: ['hakan'],
    text: `You find Hakan Reis at the far end of the pier, coiling rope on the deck of a weathered wooden boat. The vessel is old but maintained with obsessive care — every brass fitting polished, every plank sealed. The name "Yildiz" is painted on the bow in fading blue script.

Hakan himself is a map of the Bosphorus — weathered skin, salt-stiffened hair under a captain\'s cap, hands like dock knots. He sees you coming and his eyes narrow. He\'s a man who reads the water and reads people the same way — looking for currents, undertows, hidden rocks.

"No tours today," he says, not looking up from his rope. "Engine needs work."

The engine sounds fine. You can hear it idling, a low healthy rumble. He\'s deciding whether to talk to you.`,
    choices: [
      {
        text: '"Naz sent me." Drop the name and see what happens.',
        next: 'e2_hakan_naz',
        condition: { flag: 'naz_sent_to_hakan' },
        effects: {
          npcTrust: { hakan: 1 },
        },
      },
      {
        text: '"I need passage to Büyükada. Private. I can pay."',
        next: 'e2_hakan_money',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: '"I know about the packages you transport. I need to talk."',
        next: 'e2_hakan_leverage',
        condition: { npcTrust: { npc: 'irfan', min: 1 } },
        effects: {
          axisShift: { approach: 0.3 },
        },
      },
      {
        text: '"Someone\'s been skimming from the shipments. I know who."',
        next: 'e2_hakan_skimming',
        condition: { flag: 'knows_skimming' },
        effects: {
          axisShift: { approach: 0.2, method: 0.2 },
          npcTrust: { hakan: 1 },
        },
      },
      {
        text: '"I watched the late-night loading at the Arnavutköy dock. I know what you carry and where it goes."',
        next: 'e2_hakan_selim_callback',
        condition: { flag: 'knows_selim_dock' },
        effects: {
          axisShift: { approach: 0.2, method: 0.1 },
          npcTrust: { hakan: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_hakan_naz',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier',
    npcPresent: ['hakan'],
    text: `Hakan\'s hands stop on the rope. He glances up, scans the pier behind you, then jerks his head toward the cabin.

Below deck, the cabin smells of diesel and fish and strong coffee. He pours you a fincan without asking — thick, sweet, the dregs swirling like dark weather.

"Naz sent you." He sits across from you, his big frame filling the narrow bench. "That means you know things. Things that should make you nervous." He drinks his coffee in one pull. "What do you want?"

His directness is refreshing after Naz\'s deflections. Hakan deals in transactions, not philosophy.`,
    choices: [
      {
        text: '"I need to get to Büyükada. To the mansion on the eastern shore."',
        next: 'e2_hakan_deal',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: '"I need information first. What do you transport and for whom?"',
        next: 'e2_hakan_intel',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_hakan_money',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier',
    npcPresent: ['hakan'],
    text: `Hakan coils the rest of his rope and finally looks at you properly. "Büyükada. Private. Lots of people want private passage to the islands." His eyes are calculating. "Costs more than the ferry."

"How much?"

He names a figure that\'s absurd for a thirty-minute boat ride. Then he watches your reaction. This is a test — not of your wallet, but of your urgency. Someone who pays that price without blinking has a reason they can\'t use the public ferry.

"That depends on where exactly on Büyükada you want to go," he adds. "The public pier, or somewhere... less official?"`,
    choices: [
      {
        text: '"The eastern shore. Private pier. I think you know the one."',
        next: 'e2_hakan_deal',
        effects: {
          axisShift: { approach: 0.2 },
          npcTrust: { hakan: 1 },
        },
      },
      {
        text: '"Let\'s negotiate. I have information that\'s worth more than money."',
        next: 'e2_hakan_skimming',
        condition: { flag: 'knows_skimming' },
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_hakan_leverage',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier',
    npcPresent: ['hakan'],
    text: `Hakan\'s face goes hard. He drops the rope and steps toward you, his bulk blocking the light. "That\'s a dangerous thing to say on a dock, friend. People drown from docks."

But he doesn\'t walk away. He\'s scared — you can see it under the aggression. A scared man who\'s been looking over his shoulder.

"I don\'t transport anything illegal," he says, too loudly for a man telling the truth. Then, quieter: "What do you know?"`,
    choices: [
      {
        text: '"I know about the paintings. The forged documents. The mansion on Büyükada."',
        next: 'e2_hakan_deal',
        effects: {
          axisShift: { approach: 0.2 },
          npcTrust: { hakan: 1 },
        },
      },
      {
        text: '"Someone\'s skimming from the shipments. I know who. Do you want to know?"',
        next: 'e2_hakan_skimming',
        condition: { flag: 'knows_skimming' },
        effects: {
          axisShift: { method: 0.2 },
          npcTrust: { hakan: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_hakan_skimming',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier',
    npcPresent: ['hakan'],
    text: `The word "skimming" hits Hakan like a physical blow. His eyes go wide, then narrow. He grabs your arm and pulls you down the pier to the boat, checking behind him twice.

Below deck, he rounds on you. "Who? Who\'s been skimming?" His face is flushed with anger and fear. "I\'ve been blamed for missing shipments twice already. Last time, the silver-haired bastard threatened to sink my boat with me in it."

He\'s talking about Vedat. The fear is real — this man is trapped in a machine he can\'t escape.

"Give me the name and I\'ll take you wherever you want to go. Büyükada, the Black Sea, the coast of hell — I don\'t care. Just give me the name so I can clear my own head."

You don\'t actually know who\'s skimming. But Hakan doesn\'t need to know that yet.`,
    choices: [
      {
        text: '"Take me to Büyükada tonight and I\'ll get you the proof."',
        next: 'e2_hakan_deal',
        effects: {
          axisShift: { method: 0.2, approach: -0.1 },
          npcTrust: { hakan: 1 },
        },
      },
      {
        text: '"Help me and I\'ll help you. We both want the same thing — out from under Vedat."',
        next: 'e2_hakan_deal',
        effects: {
          setFlags: ['knows_vedat_name'],
          axisShift: { trust: 0.2 },
          npcTrust: { hakan: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_hakan_intel',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier - Yildiz Cabin',
    npcPresent: ['hakan'],
    text: `Hakan grinds his jaw. "I move packages. Wrapped in brown paper, flat, heavy. I don\'t open them and I don\'t ask. Pick up from Kadıköy or Eminonu, deliver to the island. Sometimes the reverse."

He refills his coffee. "Started five years ago. Good money, easy work. Then the packages got more frequent. The people got more serious. One time a package fell and the corner tore — I saw gold. Actual gold leaf. An edge of a painting, old."

He stares at the wall. "I\'m in deep. I know that. But I\'m just the boatman. The real operation is on the island. The mansion, the vault, the whole setup." He looks at you. "If you\'re going there, you should know: there\'s a guard. Ex-military. And the housekeeper — Filiz — she sees everything. It\'s not just a house. It\'s a fortress that looks like a house."`,
    choices: [
      {
        text: '"Take me there. I need to see it myself."',
        next: 'e2_hakan_deal',
        effects: {
          axisShift: { method: 0.1 },
          npcTrust: { hakan: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_hakan_deal',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier - Yildiz Cabin',
    npcPresent: ['hakan'],
    text: `Hakan stares at the porthole for a long time. The harbor light plays across his weathered face. Finally, he nods.

"Tomorrow night. After dark. I\'ll take you to the island, put you in at the cove on the eastern side — there\'s a blind spot in the camera coverage, near the old boathouse." He draws a rough map on a napkin with a pencil stub. "I\'ll wait two hours. If you\'re not back at the cove by then, I leave. Nothing personal."

He extends a calloused hand. "We have a deal?"

The deal is struck over cold coffee and diesel fumes. Hakan Reis will take you to Büyükada. Tomorrow night, the island. Tomorrow night, the mansion. Tomorrow night, answers.

But first, you have the rest of today to prepare. To gather what you can. To decide who you trust.`,
    choices: [
      {
        text: 'Head back to the market. Tie up loose ends.',
        next: 'e2_climax_prep',
        effects: {
          setFlags: ['hakan_deal'],
          npcTrust: { hakan: 1 },
        },
      },
    ],
  },

  // ============================================================
  // BEING FOLLOWED — MID-E2 DRAMATIC TURNING POINT
  // ============================================================
  {
    id: 'e2_followed',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Side Streets',
    text: `You feel it before you see it. A prickling at the back of your neck, the animal awareness of being watched. You stop at a shop window — pretending to look at leather bags — and in the reflection you see him. Thirty meters back. Black jacket, close-cropped hair, mirrored sunglasses despite the overcast sky. He's been behind you since you left the market.

You walk. He walks. You stop. He stops — too cleanly, too practiced. This isn't a pickpocket or a curious stranger. This is someone who was told where to find you.

Your pulse climbs. The side street narrows, the apartment balconies closing in overhead. A scooter whines past and the man uses the noise to close the distance. Twenty meters now. Fifteen.

Then your phone buzzes. An unknown number. The text reads: "Turn left at the barber. Blue door. Now."`,
    choices: [
      {
        text: 'Turn left at the barber. Trust the message.',
        next: 'e2_followed_trust',
        effects: {
          axisShift: { trust: 0.2 },
        },
      },
      {
        text: 'Keep walking straight. Don\'t let a text message dictate your movements.',
        next: 'e2_followed_confront',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: 'Duck into the crowded kahvehane on the corner. Lose him in the crowd.',
        next: 'e2_followed_evade',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e2_followed_trust',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy — Hidden Courtyard',
    text: `You turn left at the barber — the red-and-white pole spinning in its glass tube — and there it is. A blue door, paint cracked, set into the wall between a tailor's shop and a storage unit. It's ajar. You push through.

A courtyard. Small, overgrown, a fig tree pressing against the walls. Drying laundry hangs from a wire overhead. And standing in the shadow of the stairwell, arms crossed, is Rüya.

"Took you long enough." She's not reading today. Her bag hangs across her body and there's something different in her posture — coiled, operational.

"The man following you is Tayfun. Ex-Jandarma, private security. He works for someone on the islands." She doesn't say Vedat's name aloud. "He picked you up at Baskı Evi. You've been watched since you walked in there."

She checks the courtyard entrance. "He won't follow you in here — this building belongs to a retired judge, and Tayfun's smart enough to avoid witnesses. But the moment you walk out, he's back on you."

Her gray eyes are steady. "You need to decide how you handle this. Because it means they know about you. And that changes everything."`,
    npcPresent: ['ruya'],
    choices: [
      {
        text: '"How do you know all this? Who are you really?"',
        next: 'e2_followed_ruya_reveal',
        effects: {
          npcTrust: { ruya: 1 },
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: '"Get me out of here. We can talk later."',
        next: 'e2_followed_escape',
        effects: {
          axisShift: { method: 0.1 },
          setFlags: ['spotted_by_tayfun'],
        },
      },
    ],
  },

  {
    id: 'e2_followed_ruya_reveal',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy — Hidden Courtyard',
    npcPresent: ['ruya'],
    text: `Rüya exhales through her nose — a sound you're learning to recognize as her version of a laugh. She leans against the courtyard wall, and for the first time, something unguarded crosses her face.

"I'm a private investigator. Licensed, if you care about that sort of thing." She pulls a card from her jacket — plain, heavy stock, just a name and a phone number. Rüya Korkmaz. "I was hired by an insurance firm to investigate fraudulent claims on an art collection. Eight months ago."

She tucks the card away before you can take it. "The investigation led me to the same places you've been walking today. Baskı Evi. The pier. The meyhane." A pause. "And to your sister's name, in a file that was supposed to be sealed."

She crosses her arms again. "I've been watching you because I needed to know if you'd be useful or if you'd blow the whole thing open like a grenade. The jury's still out." But there's a warmth under the severity — the faintest crack. "Now. Back door, through the tailor's shop. He owes me a favor. Move fast."`,
    choices: [
      {
        text: 'Follow her through the back. Process this later.',
        next: 'e2_followed_escape',
        effects: {
          setFlags: ['spotted_by_tayfun', 'cultivated_ruya'],
          npcTrust: { ruya: 1 },
          axisShift: { trust: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_followed_confront',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Side Street',
    text: `You stop walking. Turn around. The man in the black jacket stops too — ten meters between you, the narrow street suddenly very quiet. A shopkeeper ducks inside and pulls the curtain.

"You've been behind me for six blocks," you say. "If you have something to say, say it."

He tilts his head. Up close he's older than you thought — late forties, a scar across his left eyebrow, hands that hang at his sides with the practiced looseness of someone who knows how to use them. He doesn't speak. He just stares.

Then he takes a photo. Your face, straight on, with a phone he produced from nowhere. The shutter click is obscenely casual.

"Güzel," he says. Beautiful. A one-word message that's not a compliment but a filing — your face is now in someone's collection, the way a painting might be. He turns and walks away. Unhurried. Professional.

Your hands are shaking. The street noise floods back. A woman pushes past with a shopping trolley, oblivious. The man in the black jacket rounds a corner and is gone.

They know your face now. They know you're here. The clock just started ticking.`,
    choices: [
      {
        text: 'You need allies. Fast. Head to wherever you haven\'t been yet.',
        next: 'e2_followed_escape',
        effects: {
          setFlags: ['spotted_by_tayfun'],
          axisShift: { approach: 0.1, heart: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_followed_evade',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Kahvehane',
    text: `You push through the kahvehane door into a wall of noise and cigarette smoke and the clatter of backgammon dice. Old men hunched over tavla boards, tea glasses sweating, a television blaring a football match that nobody's watching. You weave between tables, muttering apologies, heading for the back.

The kitchen. Steam and the smell of grease. A cook looks up from a vat of lentil soup, startled. You flash a smile that's all teeth and no calm, push through the service door, and you're in an alley — dumpsters, a sleeping cat, the back of a pharmacy.

You lean against the wall and breathe. Your heart is hammering. Through the kahvehane's rear window you can see the front door — the man in the black jacket steps in, scans the room, and walks out again. He's lost you. For now.

But the message is clear. Someone sent a professional to follow you. Someone who knew exactly where you'd been and when. The ground under your feet has shifted — you're no longer just investigating. You're being investigated back.`,
    choices: [
      {
        text: 'Slip out the alley and keep moving. Stay alert.',
        next: 'e2_followed_escape',
        effects: {
          setFlags: ['spotted_by_tayfun'],
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_followed_escape',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy — Safe Distance',
    text: `You walk fast, head down, weaving through the late afternoon crowd. Every reflection in every shop window is a potential tail. Every man in a dark jacket gets a second look. Your phone feels radioactive in your pocket.

You duck into a passage between buildings and take stock. Your hands have stopped shaking but something fundamental has changed. This morning you were a journalist asking questions. Now you're someone who is being watched by people who make other people disappear.

Defne lived like this. For months. The looking over her shoulder, the checking her phone, the fear that calcified into routine. You understand her now in a way you couldn't before — not as a victim, but as someone who kept going despite the weight of being seen by the wrong eyes.

The afternoon is burning away. You still have threads to pull before tonight — but you pull them now with the knowledge that you're not invisible. Choose carefully.`,
    choices: [
      {
        text: 'Find Bora at the meyhane. You need a friend who can\'t be bought.',
        next: 'e2_meyhane_approach',
        condition: { flagFalse: 'met_bora' },
      },
      {
        text: 'Get to the pier. Secure passage before they can cut you off.',
        next: 'e2_hakan_intro',
        condition: { flagFalse: 'hakan_deal' },
      },
      {
        text: 'Walk to Moda waterfront. Rüya might be there.',
        next: 'e2_moda_waterfront',
        condition: { flag: 'cultivated_ruya' },
      },
      {
        text: 'You have enough. Head straight to the pier and prepare for Büyükada.',
        next: 'e2_climax_prep',
        condition: { flag: 'knows_vedat_name' },
      },
      {
        text: 'Duck into the nearest side street and circle back to the pier.',
        next: 'e2_pier_tea',
      },
    ],
  },

  // ============================================================
  // MODA WATERFRONT (OPTIONAL - RUYA)
  // ============================================================
  {
    id: 'e2_moda_waterfront',
    episode: 2,
    phase: 'exploration',
    location: 'Moda Waterfront',
    text: `The Moda waterfront is Kadıköy\'s quiet edge — a crescent of seaside promenade where the city\'s noise fades to a murmur. Old wooden houses line the shore, their paint peeling in the salt air. The Marmara stretches south, the Princes' Islands visible as dark shapes on the horizon.

You walk. The wind off the water is cool and smells of kelp and distance. Joggers pass, and couples share simit on benches, and an old man fishes from the rocks with the patience of someone who has nowhere else to be.

Then you see her. Rüya. Sitting on a bench near the tea garden, her book closed for once — a battered Orhan Pamuk face-down on her knee. She\'s watching a cormorant dry its wings on a piling, her chin in her hand, and there\'s something unguarded about the pose. For a moment she looks like a woman on a lunch break, not a professional surveilling a target.

She sees you and the mask reassembles — but not all the way. Her gray eyes carry something that wasn\'t there on the ferry. Concern, maybe. Recognition.

"Sit," she says. "You look like you\'ve had a day."

You notice things you missed before. A thin scar across her left thumb — a craft knife, maybe, or something sharper. The way she sits with her back to the wall and her bag between her feet, never on the bench. The reading glasses folded in her shirt pocket, a concession to age she probably resents.`,
    npcPresent: ['ruya'],
    choices: [
      {
        text: 'Tell her everything. The print shop, the forgeries, the island.',
        next: 'e2_ruya_everything',
        effects: {
          axisShift: { trust: 0.3 },
          npcTrust: { ruya: 1 },
        },
      },
      {
        text: 'Tell her the broad strokes. Keep the details close.',
        next: 'e2_ruya_careful',
        effects: {
          axisShift: { trust: 0.1, method: 0.1 },
          npcTrust: { ruya: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_ruya_everything',
    episode: 2,
    phase: 'exploration',
    location: 'Moda Waterfront',
    npcPresent: ['ruya'],
    text: `You tell her. All of it — Naz and the forgeries, Bora and the envelope, Sude\'s photos, Hakan\'s boat. Vedat Arslaner. Büyükada. The words pour out and Rüya listens with the stillness of deep water.

When you finish, she does something unexpected. She laughs — a short, dry sound, almost rueful. "You know, I spent four months building a case file that you've essentially reconstructed in a single day. My supervisor would have a stroke." She shakes her head. "Vedat Arslaner. I know that name. He funds a cultural foundation. Very respectable on the surface. He hosted a gala last year that half the ministry attended."

She looks out at the water, and something crosses her face — not professional detachment but something older, more personal. "I got into this work because of a case like this. Years ago. A family in Antakya had their grandfather\'s manuscript collection seized by a private buyer with forged paperwork. By the time I traced it, the manuscripts were in a vault in Zurich." She\'s quiet a moment. "I couldn\'t get them back. I\'ve been trying to get things back ever since."

She turns to you. "I can\'t go to the island with you — Arslaner knows my face. But I have contacts at Hürriyet. If you get evidence from that mansion, I can make sure it reaches people who\'ll publish it. Insurance."

She places a hand on yours, briefly. Her fingers are cold from the sea wind. "Be careful, Deniz. The Bosphorus is full of things that sank and were forgotten."`,
    choices: [
      {
        text: '"Thank you, Rüya. That\'s exactly what I need."',
        next: 'e2_climax_prep',
        effects: {
          setFlags: ['ruya_press_contact'],
          npcTrust: { ruya: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_ruya_careful',
    episode: 2,
    phase: 'exploration',
    location: 'Moda Waterfront',
    npcPresent: ['ruya'],
    text: `You sketch the outline — a network of art smuggling, forged documents, a powerful collector, your sister caught in the middle. You keep names out of it. Rüya listens, her gray eyes reading between your words. One hand absently turns the reading glasses in her shirt pocket — a tic you\'re beginning to recognize.

"You\'re being careful with me," she says. Not offended — observant. "Good. You should be." She tucks her book into her bag — you notice the spine is cracked in three places, a book read and reread. "But I\'ll tell you this: whatever you\'re walking into, have a way to get the story out if you can\'t get yourself out. Evidence in one person\'s hands disappears. Evidence in a journalist\'s hands is harder to bury."

She writes a phone number on the inside cover of a matchbook — her handwriting is small, precise, the letters barely touching. "If you need me. Don\'t call — text. And don\'t use names."

She stands, adjusts her scarf against the wind. The sun catches the scar on her thumb. "Good luck, Deniz. The Bosphorus carries things where they need to go. Trust the current."

She walks away along the waterfront, and you notice she doesn\'t look back. Professional discipline or something else — the habit of someone who\'s learned that looking back is how you trip.`,
    choices: [
      {
        text: 'Take the number and head back. Time to prepare.',
        next: 'e2_climax_prep',
        effects: {
          setFlags: ['ruya_press_contact'],
          npcTrust: { ruya: 1 },
        },
      },
    ],
  },

  // ============================================================
  // CLIMAX PREPARATION AND BRANCHING
  // ============================================================
  {
    id: 'e2_climax_prep',
    episode: 2,
    phase: 'climax',
    location: 'Kadıköy Pier',
    text: `Evening settles over Kadıköy like a blue-gray shawl. The pier empties of commuters and fills with couples and fishermen. Lights blink on across the water — the European side becoming a necklace of gold against the darkening hills.

You sit on a bollard and take stock. The day has given you pieces of a puzzle that\'s bigger and uglier than you imagined. Forged documents. Stolen art. A powerful man on an island. And your sister, who walked into the middle of it and vanished.

Tomorrow night, Hakan\'s boat. Büyükada. The mansion. Whatever waits inside.

You pull out your phone and review what you have. The question is: are you ready?`,
    choices: [
      {
        text: 'Review your evidence and allies.',
        next: 'e2_climax_evidence',
        condition: { flag: 'has_sude_photos' },
      },
      {
        text: 'Review your evidence and allies.',
        next: 'e2_climax_relationship',
        condition: { flagFalse: 'has_sude_photos' },
      },
      {
        text: 'Something feels wrong. Naz may have warned them.',
        next: 'e2_climax_compromised',
        condition: { flag: 'compromised' },
      },
    ],
  },

  {
    id: 'e2_climax_evidence',
    episode: 2,
    phase: 'climax',
    location: 'Kadıköy Pier',
    text: `You have Sude\'s photos — delivery logs, package shots, Vedat Arslaner\'s letterhead. You have Defne\'s envelope with the map and the USB drive. You know the name. You have a boat captain who\'ll take you to the island.

This is what preparation looks like. Not just instinct and relationships, but hard documentation. Photos, names, connections. The kind of evidence that survives even if you don\'t.

If Bora is with you, you have muscle and loyalty. If Rüya is your contact, the story gets told no matter what. You\'re as prepared as you\'re going to get.

The water darkens. Ferries cut white lines through the black water. Tomorrow, you cross to the island with proof in your pocket and a plan in your head.`,
    choices: [
      {
        text: 'Send copies of everything to a secure email. Insurance.',
        next: 'e2_ferry_departure_armed',
        effects: {
          setFlags: ['evidence_backed_up'],
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Keep everything on your person. No digital trail.',
        next: 'e2_ferry_departure_armed',
        effects: {
          axisShift: { method: -0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_climax_relationship',
    episode: 2,
    phase: 'climax',
    location: 'Kadıköy Pier',
    text: `You don\'t have the hard evidence you\'d like. No photos of deliveries, no documented proof of Vedat\'s involvement. But you have something else — people. Bora, who loved Defne and carries guilt like an anchor. Sude, who\'s brave and angry and watching. Hakan, who\'s scared enough to help. And your own instinct, sharpened by a day of lies and half-truths.

You\'re going to the island on trust and courage and the desperate hope that your sister is still alive. The evidence will come — it has to be there, inside the mansion, in the collection itself.

You\'re not as prepared as you\'d like. But Defne wasn\'t either, and she went anyway.

The Marmara hums with the engines of passing ships. Tomorrow, the island.`,
    choices: [
      {
        text: 'Call Bora. You\'re not going alone.',
        next: 'e2_ferry_departure',
        condition: { flag: 'bora_allied' },
        effects: {
          axisShift: { trust: 0.2, heart: 0.1 },
        },
      },
      {
        text: 'You go alone. Fewer people, fewer risks.',
        next: 'e2_ferry_departure',
        effects: {
          axisShift: { method: 0.1, approach: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e2_climax_compromised',
    episode: 2,
    phase: 'climax',
    location: 'Kadıköy Pier',
    text: `The unease that\'s been growing all afternoon crystallizes into certainty. Naz made that phone call. By now, Vedat Arslaner knows someone is asking questions. Knows a journalist — Defne\'s sister — has been walking through Kadıköy pulling threads.

The element of surprise is gone. When you arrive at that island, they\'ll be ready. The question is whether you go anyway.

You think of Defne\'s note: "Don\'t be as stupid as me." But here you are, about to board a boat to an island fortress where the man who may have disappeared your sister is waiting and knows you\'re coming.

The alternative is to walk away. Take what you know to the police, to the press, to anyone who\'ll listen. But Naz was right about one thing — the police are compromised. And the press moves slowly. Defne might not have that kind of time.

The water laps at the pier. A decision waits.`,
    choices: [
      {
        text: 'Go anyway. Surprise is lost but determination isn\'t.',
        next: 'e2_ferry_departure_desperate',
        effects: {
          axisShift: { heart: 0.3 },
        },
      },
      {
        text: 'Change the plan. Go public first — then go to the island with witnesses.',
        next: 'e2_ferry_departure_desperate',
        effects: {
          setFlags: ['going_public_first'],
          axisShift: { method: 0.3 },
        },
      },
    ],
  },

  // ============================================================
  // FERRY DEPARTURE (3 variants based on player state)
  // ============================================================

  // Default — relationship path (no strong evidence, not compromised)
  {
    id: 'e2_ferry_departure',
    episode: 2,
    phase: 'ferry',
    location: 'Kadıköy Pier — Night',
    text: `Evening settles over Kadıköy. The water turns from steel to ink, broken only by the running lights of tankers and the distant glow of the European shore. The pier thins out as the day crowd scatters — a few fishermen remain, a sleeping cat, the lap of waves against wooden pilings.

You stand at the end of the dock. The city blazes behind you — meyhane noise, motorcycle engines, the calls of late-night vendors — but here at the water\'s edge, all of it recedes. There\'s just you and the Marmara and whatever waits on the other side.

The last ferry to Büyükada leaves in forty minutes. After that, no more boats until morning.

You don\'t have the proof you\'d like. What you have are people — flawed, frightened, brave in ways they don\'t recognize — and the stubborn conviction that your sister is still alive. It will have to be enough.

Defne went to that island alone, armed with courage and not much else. She didn\'t come back. You\'re going next. You hope to do better.

The wind carries the salt smell of the Marmara. Somewhere a ferry horn sounds — low, mournful, final.

Büyükada waits.`,
    choices: [
      {
        text: 'Board the evening ferry to Büyükada. No more waiting.',
        next: 'ferry2_opening',
      },
    ],
  },

  // Armed variant — player has strong evidence (has_sude_photos)
  {
    id: 'e2_ferry_departure_armed',
    episode: 2,
    phase: 'ferry',
    location: 'Kadıköy Pier — Night',
    text: `Evening settles over Kadıköy. The water turns from steel to ink, broken only by the running lights of tankers and the distant glow of the European shore. The pier thins out as the day crowd scatters — a few fishermen remain, a sleeping cat, the lap of waves against wooden pilings.

You stand at the end of the dock. The city blazes behind you — meyhane noise, motorcycle engines, the calls of late-night vendors — but here at the water\'s edge, all of it recedes. There\'s just you and the Marmara and whatever waits on the other side.

The last ferry to Büyükada leaves in forty minutes. After that, no more boats until morning.

You have names, photos, connections. The island won\'t know what hit it. Sude\'s delivery shots, Defne\'s USB drive, the forged letterheads with Vedat Arslaner\'s name — each piece locks into the next like the teeth of a zipper. You came to Kadıköy with questions and you\'re leaving with ammunition.

You think about the people who helped you build this arsenal. A forger who loves what she destroys. A student braver than she knows. A captain trapped in a current he can\'t escape. They gave you the pieces. Now you have to use them.

Defne went to that island armed with knowledge and courage, and she didn\'t come back. You\'re going next — but you\'re going loaded for bear.

The wind carries the salt smell of the Marmara. Somewhere a ferry horn sounds — low, certain, like a starting gun.

Büyükada waits.`,
    choices: [
      {
        text: 'Board the evening ferry to Büyükada. No more waiting.',
        next: 'ferry2_opening',
      },
    ],
  },

  // Desperate variant — player is compromised
  {
    id: 'e2_ferry_departure_desperate',
    episode: 2,
    phase: 'ferry',
    location: 'Kadıköy Pier — Night',
    text: `Evening settles over Kadıköy. The water turns from steel to ink, broken only by the running lights of tankers and the distant glow of the European shore. The pier thins out as the day crowd scatters — a few fishermen remain, a sleeping cat, the lap of waves against wooden pilings.

You stand at the end of the dock. The city blazes behind you — meyhane noise, motorcycle engines, the calls of late-night vendors — but here at the water\'s edge, all of it recedes. There\'s just you and the Marmara and whatever waits on the other side.

The last ferry to Büyükada leaves in forty minutes. After that, no more boats until morning.

They know your face. Time is a luxury you\'ve already spent. Naz\'s phone call bought Vedat Arslaner hours to prepare, to move things, to arrange a welcome you won\'t enjoy. Every minute you stand here is a minute the island fortifies itself against you.

You catch yourself glancing over your shoulder at the crowd behind the pier gates. Is anyone watching? Has Vedat sent someone to Kadıköy already — someone to make sure Defne\'s sister follows the same path Defne did?

The smart move is to walk away. But the smart move would have been to stay in Beşiktaş, to let the police handle it, to trust the system. You stopped making smart moves the moment you read your sister\'s note.

Defne went to that island and didn\'t come back. You\'re going next — not because you\'re ready, but because you\'re out of time.

The wind carries the salt smell of the Marmara. Somewhere a ferry horn sounds — low, mournful, urgent.

Büyükada waits.`,
    choices: [
      {
        text: 'Board the evening ferry to Büyükada. No more waiting.',
        next: 'ferry2_opening',
      },
    ],
  },

  // === CROSS-EPISODE CALLBACK SCENES ===
  {
    id: 'e2_naz_oguz_callback',
    episode: 2,
    phase: 'exploration',
    location: 'Baskı Evi',
    npcPresent: ['naz'],
    text: `Naz's hands pause on the codex. "A fisherman." She says it carefully, like she's placing a card on a table. "In Arnavutköy."

"Oğuz. He sits by the water and watches everything. He saw things — boats at night, crates being loaded. He remembered Defne."

Something shifts in Naz's expression — not fear exactly, but the recognition that the world outside this shop has been paying attention. "The old man with the nets." She knows who you mean. "He came to the shop once, years ago. Wanted a label reprinted for his fishing line. He has good eyes, that one. Sees more than he says."

She sets down her tools. The pretence of a normal customer interaction is over. "If Oğuz sent you here, then you already know more than I'd like. So let's skip the pleasantries."

Her fingers drift to a stack of shipping manifests half-buried under ink samples. She pulls one free — a carbon copy, smudged at the edges — and traces a column of dates. "Those boats Oğuz watched. They ran on Tuesdays and Fridays. I know because I printed the waybills." She holds the page up to the light as though reading her own guilt through the tissue-thin paper. "I told myself it was just commercial work — customs forms, export labels, nothing that stains the hands. But Defne saw the destinations. She noticed they never matched the cargo descriptions. That girl read everything."

Naz folds the manifest and tucks it into her apron like a letter she can't bring herself to throw away. There is something almost maternal in the gesture, and you realize this woman hasn't just been hiding information — she's been curating it, keeping a quiet archive of every shipment that passed through her press, waiting for someone to ask the right questions. "Oğuz watches the water. I watch the paper trail. Between us, we've been circling the same secret from opposite shores."`,
    choices: [
      {
        text: '"He told me about the boats. About what happened to Defne. Now I need your side."',
        next: 'e2_naz_defne_direct',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { approach: 0.1 },
          npcTrust: { naz: 1 },
        },
      },
      {
        text: '"He told me to be patient. So I\'m asking politely: what was my sister doing here?"',
        next: 'e2_naz_cover_story',
        effects: {
          setFlags: ['met_naz'],
          axisShift: { method: 0.1, trust: 0.1 },
          npcTrust: { naz: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_bora_oguz_callback',
    episode: 2,
    phase: 'exploration',
    location: 'Liman Meyhane',
    npcPresent: ['bora'],
    text: `Bora stops polishing. The glass in his hand catches the dim light. "The ferry." He says it slowly. "You came from the European side. Arnavutköy?"

"An old fisherman named Oğuz. He told me Defne had friends here. That you were one of them."

Bora sets the glass down with exaggerated care. His eyes are wet but his jaw is set — the face of a man who's been carrying grief alone and has just been told someone else has been carrying it too.

"Oğuz." A short, broken laugh. "Defne used to buy fish from him. She'd bring it here and I'd grill it and she'd complain it was overcooked." He wipes the bar with a cloth that doesn't need wiping. "Word really does travel on those ferries."

He reaches under the bar and produces a bottle of rakı. "You came across the water looking for your sister. The least I can do is pour you a drink and tell you what I know."

He pours two glasses — generous, the way you pour when you're not expecting anyone to leave sober — and stares into his own like it holds answers. "Defne mentioned an old fisherman once. Said he was the only honest man left on the Bosphorus." Bora's voice catches on the word honest. "She told me he mended his nets the same time every morning and never asked her questions. I think that's why she trusted him. He didn't want anything from her." He takes a long sip and sets the glass down hard enough to ring. "I wanted everything from her. I wanted her to stay, to stop digging, to let sleeping dogs lie. That's not trust — that's cowardice dressed up as love."

The rakı burns a white line down the center of his glass where the water hasn't mixed. Bora watches it settle. "If that old man is still sitting by the water after everything that happened, then he's braver than I am. I closed the meyhane for two weeks after she disappeared. Told everyone it was a renovation." He gestures at the unchanged room — same cracked tiles, same yellowed photographs on the wall. "Nobody believed me. But nobody asked, either. That's how this neighborhood works. We all agree not to see what's right in front of us."`,
    choices: [
      {
        text: '"Tell me everything. When did you last see her?"',
        next: 'e2_bora_story',
        effects: {
          axisShift: { trust: 0.1, heart: 0.1 },
          npcTrust: { bora: 1 },
        },
      },
      {
        text: '"Oğuz said she was scared. Were you scared too?"',
        next: 'e2_bora_story',
        effects: {
          axisShift: { heart: 0.2 },
          npcTrust: { bora: 1 },
        },
      },
    ],
  },

  {
    id: 'e2_hakan_selim_callback',
    episode: 2,
    phase: 'complication',
    location: 'Kadıköy Pier',
    npcPresent: ['hakan'],
    text: `Hakan's hands freeze on the rope. He looks up — really looks — and what you see isn't anger. It's fear.

"The Arnavutköy dock." His voice drops to a murmur. "You saw the loading. Selim's place." He scans the pier behind you with the practiced alertness of a man who's spent years watching for trouble. "Get below. Now."

In the cabin, he pours two cups of thick coffee and sits across from you, his big frame hunched like a man trying to make himself small. "If you saw the dock, you know more than most people who work for the network. Selim handles the European side. I handle the water. We don't talk to each other — that's the rule. The fact that you've connected us means either you're very good or the operation is falling apart."

He drains his coffee. "Maybe both."

He turns his cup upside down on the saucer — an old habit, reading the grounds — and watches the dark sediment crawl down the porcelain. "I've carried packages from Arnavutköy. From Selim's dock specifically." The admission comes out flat, like a man reciting charges he's already accepted. "Twice a month for three years. I never opened them. Never asked. Selim would leave the crates on the pier with a chalk mark — one line for Kadıköy, two for the islands — and I'd load them before dawn." He traces the chalk-mark gesture on the table with his finger, and you notice his hands are scarred across the knuckles, not from fighting but from rope burn, years of it, layered like tree rings. "The night your sister disappeared, there were three lines on the crate. I'd never seen three lines before. I didn't take that shipment. Told Selim the engine was fouled. First time I ever refused."

Hakan rights the coffee cup and peers into the pattern of grounds as though the future might still be negotiable. "I'm not a good man. I want you to understand that before we go any further. But I'm a careful one, and three lines meant something had changed — the route, the cargo, the stakes. Selim didn't argue when I refused. That scared me more than anything. A man like Selim always argues. Unless he already has a replacement."`,
    choices: [
      {
        text: '"It\'s falling apart. And I need passage to Büyükada before it does."',
        next: 'e2_hakan_deal',
        effects: {
          axisShift: { approach: 0.1, method: 0.1 },
          npcTrust: { hakan: 1 },
        },
      },
      {
        text: '"Tell me about the island end. What happens when the crates arrive?"',
        next: 'e2_hakan_intel',
        effects: {
          axisShift: { method: 0.2 },
          npcTrust: { hakan: 1 },
        },
      },
    ],
  },
];

export default episode2;
