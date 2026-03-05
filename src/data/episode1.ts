import { Scene } from '../types';

const episode1: Scene[] = [
  // ============================================================
  // PHASE 1: ARRIVAL — Ferry & First Steps
  // ============================================================
  {
    id: 'e1_opening',
    episode: 1,
    phase: 'arrival',
    location: 'Besiktas-Arnavutkoy Ferry',
    text: `The vapur shudders as it pulls away from Beşiktaş iskele. Diesel fumes and salt air roll across the lower deck where you stand gripping the railing, phone in hand. The Bosphorus stretches ahead — dark water catching the last copper light of evening, tankers drifting south like slow grey ghosts.

You read the message again. Unknown number, received forty minutes ago while you sat at your desk pretending to write a column about municipal corruption.

"Your sister didn't drown. Arnavutköy. The blue house past the mosque. Ask for the painting."

Two years. Two years of police shrugs and closed files. Two years of your mother lighting candles at the church in Kurtuluş, whispering Defne's name like a prayer that might still be answered. And now six sentences from a stranger that have turned your blood to ice water.

The ferry horn sounds — low, mournful, shaking your ribs. Ahead, the wooden yalıs of Arnavutköy glow amber against the darkening hills. Ottoman facades, crumbling paint, fishing boats nudging the shore. Somewhere in that tangle of narrow streets and old money, someone knows what happened to your sister.

You pocket the phone. Your hands are trembling. Not from cold.`,
    choices: [
      {
        text: 'Head straight for the blue house the moment you dock. No detours.',
        next: 'e1_direct_to_shop',
        effects: {
          axisShift: { approach: 0.2 },
          setFlags: ['went_direct'],
        },
      },
      {
        text: 'Walk the waterfront first. Get a feel for the neighbourhood before showing your hand.',
        next: 'e1_waterfront_arrive',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Find a çay garden and watch the street for a while. See who comes and goes.',
        next: 'e1_observe_first',
        effects: {
          axisShift: { method: 0.3, approach: -0.1 },
        },
      },
    ],
  },

  // ============================================================
  // PHASE 2: WATERFRONT EXPLORATION
  // ============================================================
  {
    id: 'e1_waterfront_arrive',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    text: `You step off the ferry and the crowd swallows you — commuters heading home, a woman balancing a tray of simit on her head, two boys chasing a football across the cobbles. The iskele empties fast. Within minutes you're standing alone on the promenade, the Bosphorus lapping at stone steps black with algae.

The waterfront stretches in both directions. To your left, a row of fish restaurants hums with early dinner service — white tablecloths, candles in glass jars, waiters calling out to passersby. To your right, the promenade narrows past shuttered boathouses and a small park where plane trees drop their leaves into the wind.

An old man sits on a wooden crate near the water's edge, mending a net with slow, deliberate hands. A cigarette hangs from his lip, unlit. His face is walnut-dark, deeply lined. A transistor radio at his feet crackles with the evening news.

The mosque rises behind the row of shops — you can see a blue-painted facade just past it. The anonymous text burns in your pocket.

But the old man has looked up. He's watching you with eyes that miss nothing.`,
    npcPresent: ['oguz'],
    choices: [
      {
        text: 'Approach the old fisherman. He looks like he\'s been here forever — maybe he knows things.',
        next: 'e1_oguz_intro',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: 'Walk past him toward the blue house. You didn\'t come here to chat with strangers.',
        next: 'e1_walk_to_shop',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: 'Linger at the fish restaurants. Eavesdrop, pick up the rhythm of the neighbourhood.',
        next: 'e1_restaurants_listen',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e1_observe_first',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    text: `You find a plastic chair outside a cramped çay ocağı wedged between a barbershop and a hardware store. The owner — a heavyset man with a soup-strainer moustache — sets a tulip glass of dark çay in front of you without being asked. Two lira. You pay and settle in.

From here you can see the mosque, the line of shops beyond it, and the waterfront promenade. People move through the amber streetlight in familiar patterns — the after-work drift, bags of bread, phone calls, a dog trotting purposefully toward some private appointment.

You spot the blue house. Faded Ottoman facade, two storeys, a hand-lettered sign you can't quite read from here. The lights are on inside. Someone moves behind the glass.

Down by the water, an old fisherman sits mending nets, alone. A woman steps out of the cafe next to the blue house, shakes a tablecloth into the street, goes back inside.

You sip your çay. It's bitter and perfect. The anonymous text said nothing about urgency. But every hour that passes is an hour someone might learn you're here.`,
    choices: [
      {
        text: 'You\'ve watched long enough. Head for the blue house.',
        next: 'e1_walk_to_shop',
        effects: {
          axisShift: { approach: 0.1 },
          setFlags: ['observed_street'],
        },
      },
      {
        text: 'Walk down to the waterfront first. Talk to the old fisherman.',
        next: 'e1_oguz_intro',
        effects: {
          axisShift: { trust: 0.1 },
          setFlags: ['observed_street'],
        },
      },
      {
        text: 'Go to the cafe next to the blue house. The woman there might know something.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          axisShift: { heart: 0.1 },
          setFlags: ['observed_street'],
        },
      },
    ],
  },

  {
    id: 'e1_restaurants_listen',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    text: `You take a seat at the nearest fish restaurant and order an Efes. The waiter doesn't care that you're alone — half the tables are occupied by solitary men watching the water and thinking whatever men think when they watch the Bosphorus at dusk.

You listen. Most of the conversation is mundane — football, the price of levrek, someone's cousin's wedding in Bursa. But at the table behind you, two men are arguing in low voices about a shop. Something about rent increases, a landlord who "thinks he's a pasha." One of them mentions Köşk Antik.

"Selim Bey can afford it," the other says. "You've seen his clients. Germans. Japanese. Money falls out of their pockets."

"Selim Bey can afford anything. Question is where it all comes from."

They laugh and change the subject. You finish your beer slowly, letting the name settle. Selim. The blue house is an antique shop, then. And its owner has money that makes the neighbours curious.

The old fisherman is still down by the water. The blue house glows past the mosque.`,
    choices: [
      {
        text: 'Head to the blue house — Köşk Antik. You have a name now: Selim.',
        next: 'e1_walk_to_shop',
        effects: {
          setFlags: ['heard_selim_gossip'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Go talk to the old fisherman before the light dies completely.',
        next: 'e1_oguz_intro',
        effects: {
          axisShift: { trust: 0.1 },
        },
      },
    ],
  },

  // ============================================================
  // OGUZ SCENES
  // ============================================================
  {
    id: 'e1_oguz_intro',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `"Merhaba, amca."

The old man looks up from his net. His eyes are pale blue — startling in that dark face — and sharp as gutting knives. He takes you in with a single slow glance: your city shoes, your leather bag, the tension in your shoulders.

"Merhaba." His voice is gravel and smoke. He returns to his net. "You're not from here."

"Istanbul born. Beşiktaş."

"Beşiktaş." He says it like a diagnosis. "What brings a Beşiktaş person to Arnavutköy at this hour? Not the fish — the restaurants are behind you."

A cargo ship slides past on the strait, its lights reflecting in long wavering columns. The old man's hands never stop moving — threading, knotting, pulling tight.

"I'm looking for information about someone. A woman who disappeared here two years ago. Her name was Defne Karadağ."

The hands stop. Just for a moment. Then resume.

"Journalist," he says. It's not a question.

"Her brother."

He looks at you again. Something shifts in those pale eyes.`,
    choices: [
      {
        text: 'Wait. Let him decide whether to talk. Don\'t push.',
        next: 'e1_oguz_patience',
        effects: {
          axisShift: { trust: 0.2, method: 0.1 },
          npcTrust: { oguz: 1 },
        },
      },
      {
        text: '"The police said she drowned. I don\'t believe them. Help me."',
        next: 'e1_oguz_direct',
        effects: {
          axisShift: { approach: 0.2, heart: 0.1 },
          npcTrust: { oguz: -1 },
        },
      },
      {
        text: 'Show him the anonymous text on your phone.',
        next: 'e1_oguz_show_text',
        effects: {
          axisShift: { trust: 0.2 },
          setFlags: ['showed_oguz_text'],
        },
      },
    ],
  },

  {
    id: 'e1_oguz_patience',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `You wait. The Bosphorus murmurs against the stones. A gull cries somewhere above. The old man ties three more knots before he speaks.

"I told the police. Two years ago, I told them. They wrote it down and forgot."

He sets the net aside and reaches for a thermos. Pours dark çay into a glass, doesn't offer you one.

"The night that girl disappeared. I was here — I'm always here. After midnight. The moon was up, half-full, good light on the water. I saw a boat come in. Small, white, no running lights. It tied up at the old dock — the one past the boathouses, the one nobody uses."

He sips his çay.

"Twenty minutes later, a second boat came. Bigger. Also no lights. It pulled alongside the first. They transferred something. Couldn't see what — could have been boxes, could have been anything. Then both boats left. Headed south toward the islands."

His pale eyes fix on yours.

"Next morning they found the girl's shoes on the rocks. Everybody said she drowned. But I know currents, kardeşim. I've fished these waters for fifty years. A body that goes in here washes up at Kuruçeşme within two days. They never found her body."`,
    choices: [
      {
        text: '"Did you see anyone on the boats? Faces, details, anything?"',
        next: 'e1_oguz_details',
        effects: {
          axisShift: { method: 0.1 },
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_boat_story'],
        },
      },
      {
        text: '"The old dock — can you show me where it is?"',
        next: 'e1_oguz_dock',
        effects: {
          axisShift: { method: 0.2 },
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_boat_story'],
        },
      },
      {
        text: '"Who else knows about this? Did you tell anyone besides the police?"',
        next: 'e1_oguz_who_knows',
        effects: {
          axisShift: { trust: 0.1 },
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_boat_story'],
        },
      },
    ],
  },

  {
    id: 'e1_oguz_direct',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `The old man's face closes like a shutter. He sets his net down and picks up the thermos, pouring himself çay with the deliberate slowness of a man who has already decided the conversation is over.

"Everyone has a story about what the police did wrong," he says flatly. "Talk to the police."

"I'm talking to you."

"You're talking at me. Different thing." He sips. "I'm an old fisherman. I fix nets. I watch the water. I don't know anything about anybody's sister."

He turns his shoulder to you. The radio crackles — a melancholy folk song from somewhere east of here. The Bosphorus shivers under a passing wind.

You pushed too hard, too fast. He knows something — you can see it in the rigid set of his jaw — but you've given him a reason to keep it locked away. Old men in this city don't respond to demands. They respond to patience, to respect, to the slow building of trust over shared çay and shared silence.

You might get another chance. But not tonight. Not like this.`,
    choices: [
      {
        text: 'Apologise. Sit down nearby and just be quiet for a while.',
        next: 'e1_oguz_recover',
        effects: {
          axisShift: { trust: 0.2, approach: -0.1 },
          npcTrust: { oguz: 1 },
        },
      },
      {
        text: 'Leave him. Head for the blue house instead.',
        next: 'e1_walk_to_shop',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_oguz_show_text',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `You hold out your phone. The old man squints at the screen, lips moving slightly as he reads. Then he leans back on his crate and lets out a long breath through his nose.

"The blue house past the mosque," he repeats. "That's Köşk Antik. Selim Bey's place." He hands the phone back. "You should be careful with that man."

"You know him?"

"Everyone knows Selim Bey. Charming as a cat. Generous — buys tea for the whole street during Ramazan, sponsors the children's football team. But..." He pauses, threading a knot. "There was a night two years ago. The night before they found your sister's shoes. I was sitting right here and I saw boats. Two boats, no running lights, transferring cargo at the old dock past the boathouses."

He studies your face.

"I told the police. They weren't interested. An old man's eyes at midnight — who believes that?" A bitter smile. "But my eyes are good, kardeşim. Better than theirs."

"And Selim?"

"I'm saying nothing about Selim. I'm saying boats came to his dock. The dock behind his shop. You draw your own lines."`,
    choices: [
      {
        text: '"His dock? The old dock belongs to Selim?"',
        next: 'e1_oguz_dock',
        effects: {
          axisShift: { method: 0.1 },
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_boat_story', 'knows_selim_dock'],
        },
      },
      {
        text: '"Thank you, amca. I won\'t forget this." Head for Köşk Antik.',
        next: 'e1_walk_to_shop',
        effects: {
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_boat_story'],
        },
      },
    ],
  },

  {
    id: 'e1_oguz_recover',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `"Özür dilerim, amca. I'm sorry. I've been — it's been a long two years."

You sit down on the stone wall a few metres away. You don't say anything else. The Bosphorus fills the silence — water, wind, the distant thrum of a ferry engine. A cat appears from under the dock and winds itself around the old man's ankles. He reaches down absently and scratches its ears.

Five minutes pass. Maybe ten. The radio plays on. The old man finishes his çay, rinses the glass in the sea, pours another.

"The night she disappeared," he says, not looking at you, "I saw two boats. No running lights. They came to the old dock — the one behind Köşk Antik." He pauses. "I told the police. They didn't listen."

He offers you the thermos.

You take it. The çay is lukewarm and strong enough to strip paint. Perfect.

"Her name was Defne," you say quietly.

"I know. She used to buy fish from me on Saturdays. Always levrek. She had a nice smile." He's quiet for a moment. "She didn't drown. The currents are wrong for it. I've said this to everyone who'll listen, which is nobody."

Until now.`,
    choices: [
      {
        text: '"What else do you remember about those boats?"',
        next: 'e1_oguz_details',
        effects: {
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_boat_story'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: '"I\'m listening, amca. Tell me everything."',
        next: 'e1_oguz_details',
        effects: {
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_boat_story'],
          axisShift: { heart: 0.1, trust: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_oguz_details',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `The old man speaks slowly, choosing words like he's picking stones from a net.

"The first boat was small — a tender, maybe four metres. White hull, outboard motor. One man driving, one standing at the bow. The second was bigger, a cabin cruiser, maybe ten metres. Dark hull — blue or black, hard to tell. Also two men visible, though there could have been more inside."

"Faces?"

He shakes his head. "Too far. But the man on the small boat — he moved like a young man. Quick. The one on the cruiser moved differently. Older, heavier. He gave orders. I could tell by the way the others moved when he spoke."

"What were they transferring?"

"Flat things. Rectangular. Wrapped in something dark — cloth or plastic. Maybe this big." He holds his hands about a metre apart. "Four or five of them. They were careful. Passed them hand to hand like they were afraid of dropping them."

Paintings. The shape is right. The care is right.

"They headed south," he continues. "Past Bebek, toward the islands. The moon was behind clouds by then but I could see their wake. They were running fast."

He sets down his unlit cigarette and reaches for a fresh one.

"That's all I have, kardeşim. But it's more than the police wanted."`,
    choices: [
      {
        text: 'Thank him and head for Köşk Antik. Time to meet Selim.',
        next: 'e1_walk_to_shop',
        effects: {
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_full_account'],
        },
      },
      {
        text: 'Ask about the cafe next door — the woman who works there.',
        next: 'e1_oguz_about_melis',
        effects: {
          npcTrust: { oguz: 1 },
          setFlags: ['oguz_full_account'],
          axisShift: { trust: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_oguz_dock',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `He gestures with his chin — south along the waterfront, past where the streetlights end.

"You can't see much now. They patched the dock up last year, put a padlock on the gate. But it's there — behind the last boathouse, where the wall turns. It goes right up to the back of Selim Bey's property. There used to be a door from his garden down to the water. Probably still is."

You look down the dark waterfront. The boathouses are shuttered, their wooden doors swollen with damp. Beyond them, you can just make out a chain-link fence and the glint of water.

"A private dock with access to a shop full of antiques," you say.

"A shop full of antiques," the old man agrees. "And boats that come in the middle of the night with no lights." He coughs — a deep, rattling sound. "I'm seventy years old. I've seen a lot of things on this water. Smugglers, lovers, men who don't want to be seen. But that night — the care they took with those packages. Those weren't fish."

He picks up his net again.

"Be careful, kardeşim. Whatever you find, be careful. The Bosphorus keeps its secrets, and the people who put them there don't appreciate divers."`,
    choices: [
      {
        text: 'Head for Köşk Antik now. You know enough to walk in with your eyes open.',
        next: 'e1_walk_to_shop',
        effects: {
          setFlags: ['oguz_full_account', 'knows_selim_dock'],
          npcTrust: { oguz: 1 },
        },
      },
      {
        text: 'Try to see the dock up close before going to the shop.',
        next: 'e1_check_dock',
        effects: {
          setFlags: ['oguz_full_account', 'knows_selim_dock'],
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e1_oguz_who_knows',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `He laughs — a dry, papery sound. "Who have I told? Everyone. Nobody. I told the police. I told the muhtar. I told the women at the bakkal. They all nod and smile and say 'Oğuz amca, you were probably dreaming.' Seventy years old, you see. I must be senile."

He spits into the water with precise disgust.

"The girl at the cafe — Melis Hanım, next to Selim's place — she's the only one who listened. Really listened. She knew your sister. They were friends. She cried when I told her." He pauses. "She's frightened now. Won't say of what, but you can see it. She used to stay open until midnight. Now she closes at eight and walks home fast."

This is useful. Melis could be an ally — or at least a source.

"There's also the young one," the old man adds. "Levent. Has a gallery one block inland. He knew your sister professionally — art world, that sort of thing. A decent boy. Follows Melis around like a puppy but she won't give him the time of day." He almost smiles.

"Anyone else?"

"Nobody who matters. Nobody who'd help." He meets your eyes. "Be careful who you trust in this neighbourhood. The walls are thin and people talk."`,
    choices: [
      {
        text: 'Go talk to Melis at the cafe. She knew Defne — she might know what Defne found.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['oguz_full_account', 'knows_about_melis', 'knows_about_levent'],
          npcTrust: { oguz: 1 },
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: 'Head to Köşk Antik. Meet Selim face to face.',
        next: 'e1_walk_to_shop',
        effects: {
          setFlags: ['oguz_full_account', 'knows_about_melis', 'knows_about_levent'],
          npcTrust: { oguz: 1 },
        },
      },
      {
        text: 'Find Levent\'s gallery. An art world perspective could be valuable.',
        next: 'e1_levent_gallery',
        effects: {
          setFlags: ['oguz_full_account', 'knows_about_melis', 'knows_about_levent'],
          npcTrust: { oguz: 1 },
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_oguz_about_melis',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Waterfront',
    npcPresent: ['oguz'],
    text: `"Melis Hanım." The old man's expression softens. "Good woman. Makes the best menemen in Arnavutköy — don't tell her I said that, she'll raise the price." He almost smiles, then it fades. "She was close with your sister. They'd sit in the cafe after hours, drinking wine and talking. When Defne disappeared, Melis took it hard. Shut the cafe for a week."

He lowers his voice, though there's no one within fifty metres.

"She's scared of something. I see it in the way she watches the street. The way she locks up early. She lives alone — no husband, no family here. And she's right next door to Selim Bey." He threads a final knot and bites the line. "If your sister found something she shouldn't have, Melis might know what it was. But she won't talk easily. She's been burned."

He stands, slowly, joints cracking like a ship's timbers.

"I'm going home, kardeşim. I've said too much for one evening." He folds his net with practiced care. "Come back tomorrow morning if you want. I'll be here. I'm always here."`,
    choices: [
      {
        text: 'Go to Melis\'s cafe now, before it closes.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['knows_about_melis'],
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: 'Head to Köşk Antik while you still have the nerve.',
        next: 'e1_walk_to_shop',
        effects: {
          setFlags: ['knows_about_melis'],
        },
      },
    ],
  },

  {
    id: 'e1_check_dock',
    episode: 1,
    phase: 'exploration',
    location: 'Old Dock',
    text: `You walk south along the waterfront, past the restaurants and their warm light, into the darker stretch where the boathouses stand in a sagging row. The cobbles turn to packed earth. The air smells of tar and old rope.

The last boathouse has a chain-link gate, padlocked as Oğuz described. Beyond it, a narrow wooden dock extends over black water. You can see the back wall of a property — stone, old, with a wooden door set into it at water level. A garden wall runs above it. That must be the back of Köşk Antik.

You press your face to the chain-link. The dock is in decent repair — someone is maintaining it. Fresh boards among the old. The gate has a heavy lock but the fence itself is low enough to climb.

There's nothing to see tonight. No boats, no cargo, no activity. But the infrastructure is here: a private dock, a back entrance, a dark stretch of waterfront with no cameras and no witnesses except one old fisherman nobody believes.

You take two photos on your phone. The flash lights up the dock for a split second. Somewhere nearby, a dog barks.

Time to go.`,
    choices: [
      {
        text: 'Approach Köşk Antik from the front, like a normal customer.',
        next: 'e1_walk_to_shop',
        effects: {
          setFlags: ['photographed_dock'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Go to the cafe next door first. A softer approach.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['photographed_dock'],
          axisShift: { method: 0.1, heart: 0.1 },
        },
      },
    ],
  },

  // ============================================================
  // TRANSITION TO SHOP
  // ============================================================
  {
    id: 'e1_walk_to_shop',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Side Street',
    text: `You walk past the mosque — its minaret a pale finger against the darkening sky — and there it is. The blue house.

Faded cerulean paint over Ottoman timber, two storeys, bay windows with iron lattice. A brass sign reads KÖŞK ANTİK in elegant serif letters. Through the ground-floor windows you can see a warm interior: antique furniture, brass lamps, the glint of framed artwork on the walls.

Next door, a smaller cafe — Melis'in Yeri, handwritten on a chalkboard by the door — is still open. A single customer nurses coffee at a window table. The woman inside is wiping down the counter, her back to you.

The antique shop's door is heavy oak with a brass bell. Through the glass, you can see a man at a desk in the back — silver-haired, reading glasses, bent over paperwork. He looks up as a shadow crosses his window. Yours.

Your heart hammers. Somewhere behind this blue facade, your sister found something. Something that might have killed her.

Or might have kept her alive.`,
    choices: [
      {
        text: 'Push open the door and enter Köşk Antik.',
        next: 'e1_selim_enter',
      },
      {
        text: 'Go to Melis\'s cafe first. You want more information before you face Selim.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_direct_to_shop',
    episode: 1,
    phase: 'arrival',
    location: 'Arnavutkoy Side Street',
    text: `You don't wait. The moment the ferry bumps the iskele, you're off, shouldering through the commuters, ignoring the fish restaurants and the beckoning waiters, walking fast up the waterfront toward the mosque. The anonymous text said Arnavutköy, the blue house past the mosque. You're here. You're done waiting.

The mosque appears — white stone, slim minaret, a courtyard where pigeons scatter at your approach. Past it, the shops begin: a carpet dealer, a dusty kitchenware store, and then — blue.

Faded Ottoman facade, two storeys, bay windows with iron lattice. KÖŞK ANTİK in brass letters. The lights are on. Through the glass you see antique furniture, oil paintings, a man at a desk in the back.

You don't hesitate. You push open the heavy oak door. A brass bell chimes overhead.

The shop smells of lemon oil and old wood. Silk carpets on the floor, ikons on the walls, a grandfather clock ticking in the corner. And at the desk, looking up with an expression of mild, professional welcome, is a silver-haired man with reading glasses and a smile that doesn't quite reach his eyes.

"Hoş geldiniz," he says. "Welcome to Köşk Antik."`,
    choices: [
      {
        text: '"I\'m here about a painting. Someone told me to ask for it."',
        next: 'e1_selim_ask_painting',
        effects: {
          axisShift: { approach: 0.3 },
        },
      },
      {
        text: '"Beautiful shop. I\'m just browsing, if that\'s all right."',
        next: 'e1_selim_browse',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: '"My name is Deniz Karadağ. I think you knew my sister."',
        next: 'e1_selim_reveal_identity',
        effects: {
          axisShift: { approach: 0.2, trust: -0.1 },
          setFlags: ['revealed_identity_to_selim'],
        },
      },
    ],
  },

  // ============================================================
  // PHASE 3: THE ANTIQUE SHOP — SELIM SCENES
  // ============================================================
  {
    id: 'e1_selim_enter',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `The brass bell chimes as you push through the door. The smell hits you first — lemon polish, old leather, a trace of sandalwood incense. The shop is a cabinet of wonders: Ottoman calligraphy in gilded frames, Iznik tiles under glass, a rosewood writing desk that probably cost more than your apartment.

The silver-haired man rises from his desk. He's tall, well-dressed — linen shirt, cashmere vest, the kind of man who looks like he was born in a library. His smile is warm, practised, and immediate.

"Hoş geldiniz. Welcome to Köşk Antik." His Turkish is Istanbul-educated, with a trace of something else — French schooling, maybe. "I'm Selim. Please, look around. If anything catches your eye, I'm happy to tell you its story."

He gestures at the room with an easy grace. Behind him, you notice a door — half-open, leading to a back room. You catch a glimpse of wrapped packages leaning against a wall before he shifts position and the view is blocked.

"We have some exceptional pieces at the moment. A pair of Hatt-ı Hümayun from the Topkapı collection, authenticated of course. And a rather lovely Osman Hamdi Bey oil study, if you have a taste for the Tanzimat period."

His eyes are on you. Reading you.`,
    choices: [
      {
        text: '"Actually, someone told me to come here and ask about a painting."',
        next: 'e1_selim_ask_painting',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
      {
        text: 'Browse the shop. Take your time. Look at everything, especially near that back room.',
        next: 'e1_selim_browse',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: '"The Osman Hamdi Bey study — I\'d love to see it." Play the collector.',
        next: 'e1_selim_collector',
        effects: {
          axisShift: { method: 0.1, approach: -0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_ask_painting',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `Something flickers across Selim's face — a micro-expression, gone in a heartbeat. Surprise? Fear? Calculation? His smile doesn't waver but his posture shifts, weight moving to the balls of his feet. A man preparing for something.

"A painting," he repeats, as if tasting the word. "I sell many paintings. Could you be more specific? Who sent you?"

"An anonymous message."

Now the smile does change — it becomes something harder, more fixed.

"How mysterious. I'm afraid anonymous recommendations aren't terribly helpful. I have several paintings available — landscapes, portraits, a few Ottoman miniatures." He moves to a display wall. "Perhaps if you described what you're looking for?"

He's smooth. Genuinely smooth. You've interviewed politicians who couldn't deflect this well.

"I was told to ask about a specific painting. Connected to a woman named Defne Karadağ."

The name lands like a stone in still water. Selim's hand pauses on a frame. One second. Two. Then he turns back to you with an expression of polite puzzlement that is absolutely, unmistakably rehearsed.

"I'm sorry, I don't recognise the name. Is she a collector?"

He's lying. You're certain of it.`,
    choices: [
      {
        text: '"She was my sister. She disappeared two years ago. The police said she drowned."',
        next: 'e1_selim_reveal_identity',
        effects: {
          axisShift: { approach: 0.2, heart: 0.1 },
          setFlags: ['revealed_identity_to_selim'],
        },
      },
      {
        text: 'Let it go for now. Pretend to accept his answer and browse the shop.',
        next: 'e1_selim_tactical_retreat',
        effects: {
          axisShift: { method: 0.2, approach: -0.1 },
          setFlags: ['asked_about_painting'],
        },
      },
      {
        text: '"Never mind. Maybe I have the wrong shop. Nice place, though — mind if I look around?"',
        next: 'e1_selim_browse',
        effects: {
          axisShift: { method: 0.1 },
          setFlags: ['asked_about_painting'],
        },
      },
    ],
  },

  {
    id: 'e1_selim_browse',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `You move through the shop slowly, taking inventory. Selim watches from his desk, making a show of returning to his paperwork while tracking your reflection in a glass-fronted cabinet.

The paintings on display are beautiful — and legitimate, as far as you can tell. Landscapes, portraits, a few abstracts. Price tags in the thousands of euros. The clientele here is serious money.

Near the back of the shop, you pass close to the half-open door. The back room is visible for a moment: a workbench with restoration tools, magnifying lamps, chemical bottles. And leaning against the far wall, four or five flat rectangular objects wrapped in dark cloth.

The shape is right. Flat, rectangular, roughly the size of framed paintings. Exactly the kind of cargo that arrives by boat at night.

Selim appears at your elbow, smooth as a cat.

"That's my restoration workshop. Rather messy, I'm afraid — I prefer clients don't see the behind-the-scenes." He closes the door with a casual click. "Can I offer you some çay? I always keep a pot going."

His smile is perfect. Impenetrable. But he closed that door very quickly.`,
    choices: [
      {
        text: 'Accept the çay and keep him talking. Ask about his business, his clients.',
        next: 'e1_selim_cay_talk',
        effects: {
          axisShift: { trust: 0.1, method: 0.1 },
          npcTrust: { selim: 1 },
          setFlags: ['saw_back_room'],
        },
      },
      {
        text: '"What are those wrapped pieces in the back? Something interesting?"',
        next: 'e1_selim_confront_pieces',
        effects: {
          axisShift: { approach: 0.2 },
          npcTrust: { selim: -1 },
          setFlags: ['saw_back_room'],
        },
      },
      {
        text: 'Thank him and leave. You\'ve seen enough — time to talk to the neighbour.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['saw_back_room', 'visited_selim'],
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_collector',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `Selim's eyes brighten — the gleam of a dealer scenting money. He leads you to a small oil study in a wooden frame: a woman reading by a window, light falling across her face in warm amber tones.

"Osman Hamdi Bey, circa 1895. A preparatory study for 'The Tortoise Trainer' — you know the painting, of course. This piece was in a private collection in Beyoğlu for sixty years before coming to me." He speaks with the reverence of a priest before an altar. "The brushwork in the hands is extraordinary. You can see him working out the composition."

You lean in, playing your part. "The provenance is documented?"

"Completely. I have papers from the estate, authentication from the Istanbul Modern curatorial team, and an independent assessment by a conservator in Vienna." He pauses. "I don't deal in uncertain pieces. In this business, reputation is everything."

There it is — the tiny crack. He said it a beat too emphatically, like someone who's said it many times before. A man who truly never deals in uncertain pieces wouldn't need to stress the point.

"What's the asking price?"

"For this piece, ninety thousand euros. Which is, frankly, a gift."`,
    choices: [
      {
        text: '"I know someone who was interested in a piece here. Defne Karadağ. Did she ever come in?"',
        next: 'e1_selim_ask_painting',
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
      {
        text: '"I\'ll think about it. Mind if I look around a bit more?" Drift toward the back room.',
        next: 'e1_selim_browse',
        effects: {
          axisShift: { method: 0.2 },
          npcTrust: { selim: 1 },
        },
      },
      {
        text: 'Ask about provenance in general — how he verifies pieces, where they come from.',
        next: 'e1_selim_cay_talk',
        effects: {
          axisShift: { method: 0.2 },
          npcTrust: { selim: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_reveal_identity',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `"My name is Deniz Karadağ. Defne was my sister."

The shop goes very quiet. The grandfather clock ticks. Somewhere outside, a seagull screams.

Selim removes his reading glasses and polishes them with a cloth from his breast pocket. The gesture is slow, deliberate — buying time.

"Karadağ," he says softly. "I remember now. The young woman who drowned. Two years ago, wasn't it? A terrible tragedy." He replaces his glasses. "I'm very sorry for your loss."

"Did you know her?"

"She came in once or twice. Browsed, asked about Ottoman-era pieces. A lovely young woman — I remember she was quite knowledgeable about art history." He pauses. "But I wouldn't say I knew her. We were acquaintances at most."

Every word is calibrated. He's not denying contact — that would be checkable — but he's minimising it, flattening it, draining it of significance.

"She was a journalist," you say. "She was investigating something. Something connected to this shop."

Now his expression hardens. Just slightly. The warmth drains from his eyes like water from a sink.

"I'm afraid I can't help you with whatever you're imagining. Your sister browsed my shop. That's all I can tell you."`,
    choices: [
      {
        text: '"Then why did someone send me an anonymous message telling me to come here and ask about a painting?"',
        next: 'e1_selim_press_harder',
        effects: {
          axisShift: { approach: 0.2 },
          npcTrust: { selim: -1 },
        },
      },
      {
        text: 'Back off. You\'ve shown your hand — pushing harder will only make him defensive.',
        next: 'e1_selim_tactical_retreat',
        effects: {
          axisShift: { method: 0.1, approach: -0.1 },
          setFlags: ['revealed_identity_to_selim'],
        },
      },
      {
        text: '"I understand. I\'m sorry to bother you. It\'s just — you never stop looking, you know?"',
        next: 'e1_selim_emotional_appeal',
        effects: {
          axisShift: { heart: 0.2 },
          setFlags: ['revealed_identity_to_selim'],
        },
      },
    ],
  },

  {
    id: 'e1_selim_cay_talk',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `The çay is excellent — loose-leaf, properly brewed, served in crystal tulip glasses with silver holders. Selim pours with the precision of a tea master. You sit in a pair of leather armchairs near the front window.

He talks about the business with obvious pleasure. Thirty years in antiques. Trained in Paris, worked at Christie's in London before returning to Istanbul. His specialty is Ottoman-era paintings and calligraphy, but he deals in everything — furniture, ceramics, textiles.

"Provenance is the heart of this work," he says, warming to his subject. "Any piece I sell, I can trace back three generations minimum. The art world is full of — shall we say — shortcuts. Forgeries, laundered pieces, stolen work with fabricated histories. I've spent my career building a reputation that stands apart from all that."

You file this away. A man who talks this much about his integrity is often shoring up a wall with cracks.

"You must get some interesting characters coming through here."

"You'd be amazed. Collectors from all over the world. Though lately the best clients are from the Gulf states and China. The Europeans have lost their appetite for Ottoman art, which is their loss." He sips. "And occasionally, journalists." A flicker of something in his eyes. "Looking for a story."`,
    choices: [
      {
        text: '"Journalists? Anyone I might know?"',
        next: 'e1_selim_press_journalist',
        effects: {
          axisShift: { method: 0.1 },
          setFlags: ['visited_selim'],
        },
      },
      {
        text: 'Thank him for the çay and leave. You\'ve gathered enough for now.',
        next: 'e1_leave_selim_shop',
        effects: {
          setFlags: ['visited_selim', 'selim_friendly'],
          npcTrust: { selim: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_press_journalist',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `"Oh, the occasional culture reporter, that sort of thing." He waves a hand. "Istanbul's art scene makes good copy. I've been quoted in Hürriyet, The Art Newspaper, even the Financial Times once." He smiles. "But I suspect you're asking about someone specific."

The man is sharp. Uncomfortably sharp.

"I'm curious, that's all. I have friends in journalism."

"Of course." He sets down his çay glass. "Well, I should be closing up soon. The evenings are getting shorter and I have paperwork to attend to." He rises, extending a hand. "It was a pleasure. Do come back if you'd like to discuss the Osman Hamdi Bey study. I suspect you're someone who appreciates quality."

The handshake is firm and dry. His eyes hold yours a moment too long.

At the door, he adds: "Arnavutköy is a wonderful neighbourhood. Very safe. But the streets get dark at night. Do take care."

It might be courtesy. It might be a warning.

The brass bell chimes as the door closes behind you. Through the glass, you see him pick up his phone.`,
    choices: [
      {
        text: 'Go next door to Melis\'s cafe immediately.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['visited_selim', 'selim_made_call'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Wait outside in the shadows and watch who Selim calls.',
        next: 'e1_watch_selim_call',
        effects: {
          setFlags: ['visited_selim', 'selim_made_call'],
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_confront_pieces',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `Selim's smile freezes. For the first time you see something raw behind it — not quite fear, but alertness. The alertness of a man who knows he's been seen.

"Client pieces," he says smoothly. "Awaiting restoration. I'm afraid they're confidential — I can't show works that belong to other people. Professional ethics."

"They looked like they just arrived. Still wrapped."

"Yes, well. Art doesn't transport itself." A short laugh. "Can I offer you that çay?"

He's redirecting. Efficiently, pleasantly, but firmly. The wrapped pieces are off-limits and pressing further will get you nothing except a closed door and an enemy who knows your face.

You've learned something, though. Those pieces are fresh — recently delivered. And Selim's reaction tells you they're not ordinary restoration jobs.

"Thank you, but I should get going." You move toward the door.

"Of course. Hoşça kalın." His voice follows you out, perfectly cordial, perfectly controlled. The brass bell chimes.

Through the window, as you step into the street, you see him reach for his phone.`,
    choices: [
      {
        text: 'Duck into the cafe next door before Selim finishes his call.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['visited_selim', 'confronted_selim', 'selim_made_call'],
          npcTrust: { selim: -1 },
        },
      },
      {
        text: 'Linger in the shadows outside. Try to hear who he\'s calling.',
        next: 'e1_watch_selim_call',
        effects: {
          setFlags: ['visited_selim', 'confronted_selim', 'selim_made_call'],
          axisShift: { method: 0.2 },
          npcTrust: { selim: -1 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_press_harder',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `Selim sets down his glasses. The warmth is gone completely now. What's left is something cold and hard and very, very controlled.

"Anonymous messages," he says. "I see. And you've come here, to my shop, to accuse me of — what, exactly?"

"I'm not accusing you of anything. I'm asking questions."

"You're making insinuations in my place of business based on a text message from an unknown source. That's not asking questions. That's harassment." He stands. "I've been very patient, Mr. Karadağ, but I think this conversation is over."

He moves to the door and opens it. The brass bell chimes — a mocking little sound.

"I'm sorry about your sister. Truly. But whatever story you're constructing, I'm not a character in it. Good evening."

You're on the street. The door closes. The lock turns.

Through the glass, Selim picks up his phone and makes a call. His face is tight, focused. He speaks rapidly — you can't hear the words, but his body language is urgent. You've rattled him. Whether that's an advantage or a danger, you can't yet tell.`,
    choices: [
      {
        text: 'Go to the cafe next door. You need an ally, not another enemy.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['visited_selim', 'confronted_selim', 'selim_made_call', 'selim_hostile'],
          npcTrust: { selim: -1 },
        },
      },
      {
        text: 'Circle around the building. See the back — the dock, the garden door.',
        next: 'e1_check_dock',
        effects: {
          setFlags: ['visited_selim', 'confronted_selim', 'selim_made_call', 'selim_hostile'],
          axisShift: { method: 0.2 },
          npcTrust: { selim: -1 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_emotional_appeal',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `Something shifts in Selim's face. For a moment — just a moment — the mask slips and you see something that might be genuine discomfort. Maybe even guilt.

"No," he says quietly. "I suppose you don't stop looking."

He polishes his glasses again. Puts them back on. Takes them off.

"Your sister was — she came in a few times. More than I said. She was interested in a particular piece I had, an Ottoman miniature. We talked about art. She was very bright." He pauses. "The last time she came, she was different. Agitated. She asked questions I couldn't answer — about where certain pieces came from, about my suppliers. I told her it was confidential. Client privilege."

"And then?"

"And then I didn't see her again. And then I heard what happened." He looks at you directly. "I'm sorry, Mr. Karadağ. I truly am. But I don't know what happened to your sister. I wish I did."

It's the most honest he's been. But it's still not the truth — not the whole truth. You can feel it in the gaps, in the things he's choosing not to say.

He offers his hand. "Please. If there's anything I can do — legitimately — don't hesitate."`,
    choices: [
      {
        text: 'Take his hand. Leave on good terms. You might need to come back.',
        next: 'e1_leave_selim_shop',
        effects: {
          setFlags: ['visited_selim', 'selim_partial_truth'],
          npcTrust: { selim: 1 },
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: '"The piece she was interested in — do you still have it?"',
        next: 'e1_selim_tactical_retreat',
        effects: {
          setFlags: ['visited_selim', 'selim_partial_truth'],
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_selim_tactical_retreat',
    episode: 1,
    phase: 'complication',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `You pull back. Let the tension drain from the conversation. Selim visibly relaxes — the rigid line of his shoulders softens, his breathing slows. He thinks you've accepted his deflection.

"Of course," he says, recovering his charm. "If you're interested in Ottoman art, I have some lovely pieces. And the neighbourhood itself is worth exploring — the waterfront restaurants, the old yalıs." He's steering you toward the door with the practiced grace of a man who has ended a thousand conversations on his own terms.

At the door, you pause. "One more thing — the cafe next door. Is it any good?"

"Melis'in Yeri? Wonderful. Best menemen in Arnavutköy. Melis Hanım is a dear friend." His smile is back to full warmth. "Tell her Selim sent you."

You file this away: Selim and Melis are neighbours. He calls her a friend. But does she feel the same way?

The evening air is cool after the shop's warmth. The blue facade glows under a streetlight. You've been inside the wolf's den and come out with a few threads of his coat between your fingers.

Not enough. But a start.`,
    choices: [
      {
        text: 'Go to Melis\'s cafe. She might be the key to all of this.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['visited_selim'],
        },
      },
      {
        text: 'Find Levent\'s gallery. You need the art world angle.',
        next: 'e1_levent_gallery',
        effects: {
          setFlags: ['visited_selim'],
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_leave_selim_shop',
    episode: 1,
    phase: 'complication',
    location: 'Arnavutkoy Side Street',
    text: `The night air cools your face as you step out. The brass bell gives its little farewell chime. Behind you, the blue house glows. Ahead, the street narrows between old Ottoman facades, their paint peeling in the salt air.

You've met Selim Köşker. You've seen his shop, his wrapped paintings, his practised smile. He's hiding something — you're certain of it. But he's good. Very good. Breaking through that polish will take more than one visit.

The cafe next door is still lit. Through the window, Melis moves behind the counter — a woman in her forties, dark hair pulled back, strong hands. The last customer has left. She'll close soon.

One block inland, you can see a gallery sign lit by a single spotlight. Levent's place. Another thread you could pull.

And somewhere, three streets back, Defne's old apartment waits in the dark.`,
    choices: [
      {
        text: 'Go to the cafe before Melis closes for the night.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: 'Find Levent\'s gallery. Fresh perspective.',
        next: 'e1_levent_gallery',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Go to Defne\'s apartment. You still have her address.',
        next: 'e1_apartment_exterior',
        effects: {
          axisShift: { heart: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e1_watch_selim_call',
    episode: 1,
    phase: 'complication',
    location: 'Arnavutkoy Side Street',
    text: `You step into the shadow of a doorway across the narrow street. Through the shop window, Selim paces behind his desk, phone pressed to his ear. His face is illuminated by the desk lamp — tight, tense, nothing like the smiling host of five minutes ago.

You can't hear words. But you can read body language. He's reporting to someone. The gestures are deferential — one hand raised, palm up, explaining. Then he stops pacing and listens. Nods twice. Says something short. Hangs up.

He stands still for a moment, staring at nothing. Then he goes to the back room and closes the door behind him. The shop lights stay on but the front is empty now.

A car passes, headlights sweeping the street. You press deeper into the doorway. The car slows near the blue house — a dark Mercedes, Istanbul plates — then accelerates away.

Could be nothing. Could be everything.

The cafe next door is still open. A thin line of light under the door. Melis is still there.`,
    choices: [
      {
        text: 'Go to the cafe. Melis might have seen the car, or know who Selim calls.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['watched_selim_call', 'saw_mercedes'],
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Follow the dark Mercedes on foot. See where it goes.',
        next: 'e1_follow_car_fail',
        effects: {
          setFlags: ['watched_selim_call', 'saw_mercedes'],
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e1_follow_car_fail',
    episode: 1,
    phase: 'complication',
    location: 'Arnavutkoy Side Street',
    text: `You step out of the doorway and walk quickly in the direction the Mercedes went. But the street curves and climbs — this is Arnavutköy, where every lane twists like a fishing line — and by the time you reach the corner, the taillights are gone. Swallowed by the hill.

You stand in the dark street, breathing hard. Above you, old wooden houses lean together like conspirators. A cat watches from a windowsill, its eyes catching the distant streetlight.

You memorise what you can: dark Mercedes, Istanbul plates starting with 34, sedan, recent model. Not much.

But the fact that a car came by Selim's shop within minutes of his phone call — that's something. Someone is close. Someone is responsive.

A woman's voice carries from the lit cafe back down the hill. Melis, calling something to a departing customer. The sound is warm and ordinary and grounding. You need to talk to a human being who isn't lying to you.`,
    choices: [
      {
        text: 'Go back to Melis\'s cafe.',
        next: 'e1_melis_cafe_arrive',
        effects: {
          setFlags: ['lost_mercedes'],
        },
      },
    ],
  },

  // ============================================================
  // PHASE 4: MELIS'S CAFE
  // ============================================================
  {
    id: 'e1_melis_cafe_arrive',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `The cafe is small and warm — six tables, mismatched chairs, walls covered in framed photographs and hand-drawn menus. It smells of fresh bread, basil, and strong coffee. A radio plays low — some Turkish jazz station, piano and saxophone drifting like smoke.

Melis stands behind the counter, drying glasses. She's forty or so — dark hair streaked with early grey, pulled back in a loose knot. Her face is handsome rather than pretty, with deep brown eyes that carry the particular alertness of someone who has learned to watch for trouble. She wears a flour-dusted apron over a dark sweater.

"We're closing soon," she says, not unkindly. "But I can do you a coffee if you're quick."

The cafe is empty. Through the shared wall, you can almost feel the presence of Köşk Antik next door.

A framed photo behind the counter catches your eye. Two women at a table, laughing over wine glasses. One of them is Melis. The other — younger, dark-haired, with a wide smile you know like your own face — is Defne.`,
    choices: [
      {
        text: 'Point to the photo. "That woman in the picture with you — that\'s my sister."',
        next: 'e1_melis_reveal',
        effects: {
          axisShift: { heart: 0.2 },
          setFlags: ['told_melis_identity'],
        },
      },
      {
        text: '"Just a coffee, thank you. Nice place you have here." Start slow.',
        next: 'e1_melis_slow_approach',
        effects: {
          axisShift: { method: 0.1, trust: 0.1 },
        },
      },
      {
        text: '"A friend recommended your menemen. And told me you might know about art in the neighbourhood."',
        next: 'e1_melis_indirect',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e1_melis_reveal',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `The glass she's holding slips. She catches it — barely — and sets it down with trembling hands. Her eyes go to the photo, then to you, then back to the photo.

"Defne," she whispers. Then, looking at you properly for the first time: "You have her eyes. You're her — you're Deniz."

"She talked about me?"

"All the time." Her voice cracks. She presses both hands flat on the counter, steadying herself. "She said if anything ever happened to her, her brother would come looking. She said you were stubborn like a Karadeniz mule and twice as smart."

That sounds like Defne. Your throat tightens.

Melis comes around the counter. She locks the front door, pulls the blinds down, turns the sign to KAPALI. Then she sits at the nearest table and looks at you with eyes that are already bright with tears.

"I've been waiting for you," she says. "For two years I've been waiting for someone to come and ask the right questions. The police didn't. The newspapers didn't. I was beginning to think nobody would."

She takes a shaking breath.

"Your sister didn't drown, Deniz. I don't know what happened to her, but she didn't drown. And I think Selim — " She glances at the shared wall. Lowers her voice. "I think Selim knows."`,
    choices: [
      {
        text: '"Tell me everything. From the beginning. What was Defne doing here?"',
        next: 'e1_melis_full_story',
        effects: {
          npcTrust: { melis: 1 },
          axisShift: { heart: 0.1, trust: 0.1 },
        },
      },
      {
        text: '"What do you mean, Selim knows? What has he done?"',
        next: 'e1_melis_about_selim',
        effects: {
          npcTrust: { melis: 1 },
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_melis_slow_approach',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `She makes you a Turkish coffee — proper, in a copper cezve, with a dusting of cardamom. Her movements are practised and precise. She sets the cup before you with a small glass of water on the side.

"You're not from the neighbourhood," she says. Not hostile — just observant.

"Beşiktaş. I'm exploring. Someone told me Arnavutköy was worth seeing."

"It is." She leans against the counter. "The waterfront, the old houses. Very romantic. Not much nightlife, though. We're a quiet place." A pause. "Mostly quiet."

You sip the coffee. It's exceptional — thick, aromatic, the cardamom a whisper underneath the bitterness.

"The shop next door — Köşk Antik — is impressive. I was just in there."

A change comes over her face. Subtle but unmistakable. The easy hospitality tightens. Her eyes flick to the shared wall and back.

"Selim Bey has nice things," she says carefully. "He's been here for years."

She's picking her words like someone walking through a minefield.`,
    choices: [
      {
        text: '"You seem careful when you talk about him. Is everything okay?"',
        next: 'e1_melis_careful',
        effects: {
          axisShift: { heart: 0.1, trust: 0.1 },
          npcTrust: { melis: 1 },
        },
      },
      {
        text: 'Point to the photo of Defne on the wall. "Is that a friend of yours?"',
        next: 'e1_melis_reveal',
        effects: {
          axisShift: { heart: 0.2 },
          setFlags: ['told_melis_identity'],
        },
      },
    ],
  },

  {
    id: 'e1_melis_indirect',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `"Art in the neighbourhood." She gives you a look — shrewd, appraising. "My menemen is famous but my art expertise is limited. You should talk to Selim next door, or Levent at the gallery up the hill."

"I was in Selim's shop just now. Interesting man."

"Very interesting." Her tone is flat. She pours you a coffee without being asked and sets it down hard enough to rattle the saucer. "What kind of art are you looking for?"

"I'm more interested in art that's gone missing. Pieces with unclear provenance. That sort of thing."

The coffee cup stops halfway to her mouth. She looks at you — really looks at you — and something clicks behind her eyes. Recognition. Not of your face, but of your purpose.

"You're a journalist," she says. It's not a question. Then, quieter: "Or you're family."

The photo of Defne is right there, behind her shoulder. You and Defne have the same eyes, the same jawline.

"She told me about you," Melis whispers. "The brother. The stubborn one."`,
    choices: [
      {
        text: '"I\'m Deniz. Defne was my sister. Please — help me understand what happened to her."',
        next: 'e1_melis_full_story',
        effects: {
          npcTrust: { melis: 1 },
          axisShift: { heart: 0.2 },
          setFlags: ['told_melis_identity'],
        },
      },
    ],
  },

  {
    id: 'e1_melis_careful',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `She opens her mouth. Closes it. Glances at the door, the windows, the shared wall. Then she reaches up and turns the radio louder — the saxophone swells, covering your words.

"I run a cafe next to a man who makes me nervous," she says quietly. "That's all."

"Nervous how?"

"The cars that come at night. The people who visit after hours — not customers, not art lovers. Men in expensive suits who never smile." She's gripping the counter now. "And two years ago, a friend of mine — a woman who came here every week, who sat at that table right there — disappeared. And nobody did anything."

She points to the table by the window. A small table for two.

"Her name was Defne."

Your breath catches. She sees it. Her eyes widen.

"You know her," Melis says. Then, looking at your face in the light: "Oh God. You're him. You're the brother."

She comes around the counter, locks the door, pulls the blinds.

"Sit down," she says. "I'll tell you what I know."`,
    choices: [
      {
        text: 'Sit down and listen.',
        next: 'e1_melis_full_story',
        effects: {
          npcTrust: { melis: 1 },
          axisShift: { heart: 0.1, trust: 0.1 },
          setFlags: ['told_melis_identity'],
        },
      },
    ],
  },

  {
    id: 'e1_melis_full_story',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `Melis speaks in a low, steady voice, her hands wrapped around a coffee cup gone cold.

"Defne started coming here about three years ago. She was researching art fraud — not publishing yet, just gathering. She'd sit at that table with her laptop and her notebooks, drinking coffee for hours. We became friends."

She pauses. Wipes her eyes with the back of her hand.

"About six months before she disappeared, she changed. She was excited — she'd found something, some kind of lead about stolen paintings being laundered through legitimate dealers. She wouldn't tell me the details. 'It's bigger than I thought,' she said. 'It goes through Istanbul like a river.'"

Melis glances at the wall separating her cafe from Köşk Antik.

"Then she got scared. The last few weeks, she was looking over her shoulder constantly. She told me she'd found a specific painting — something important, something that could prove everything. She said it was in Selim's shop."

"Did she say what it was?"

"A painting that was supposed to be in a museum. Stolen years ago and everyone thought it was gone. She said Selim was the handler — the middleman who moved stolen art between buyers." Melis's voice drops to nearly nothing. "The last time I saw her, she said she had proof. She was going to photograph it. That was the night she disappeared."`,
    choices: [
      {
        text: '"Did she leave anything with you? Notes, copies, anything?"',
        next: 'e1_melis_key',
        effects: {
          axisShift: { method: 0.1 },
          npcTrust: { melis: 1 },
        },
      },
      {
        text: '"You said you overheard things through the wall. What else have you heard from Selim\'s shop?"',
        next: 'e1_melis_overheard',
        effects: {
          axisShift: { method: 0.1 },
          npcTrust: { melis: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_melis_about_selim',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `Melis looks at the shared wall like she can see through it.

"I don't have proof. I want to be clear about that. I don't have proof of anything." She takes a breath. "But I have ears. These walls are old — wood and plaster, nothing more. I hear things. Late at night, after the shop is closed, people come. I hear voices, doors, sometimes the sound of things being moved."

"What kind of things?"

"Heavy things. Careful sounds — not dropping, not banging. Placing. Unwrapping." She meets your eyes. "Your sister thought Selim was moving stolen paintings. She told me that the last time I saw her. She said she'd found proof — a specific painting in his shop that was supposed to be in a museum somewhere."

"Where?"

"She didn't say. She was protecting me, I think. Keeping me out of it." Melis's jaw tightens. "A lot of good that did."

She reaches under the counter and pulls out a small envelope. Inside is a single key on a leather fob.

"Defne gave me a spare key to her apartment. Three streets back, second floor. She said if anything happened, I should give it to someone she trusted." Her eyes fill. "I've been carrying it for two years, Deniz. Waiting."`,
    choices: [
      {
        text: 'Take the key. "I\'m going to her apartment tonight."',
        next: 'e1_apartment_exterior',
        effects: {
          setFlags: ['has_apartment_key', 'melis_story_complete'],
          npcTrust: { melis: 1 },
          axisShift: { heart: 0.1 },
        },
      },
      {
        text: '"What else have you heard through that wall? Anything specific — names, places?"',
        next: 'e1_melis_overheard',
        effects: {
          setFlags: ['has_apartment_key'],
          npcTrust: { melis: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_melis_key',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `"She didn't leave notes with me. She was careful — paranoid, even, toward the end. But..." Melis reaches under the counter and produces a small envelope. Inside is a brass key on a worn leather fob. "She gave me this. The spare key to her apartment. Three streets back, number 14, second floor."

She sets it on the table between you like an offering.

"She said, 'If anything happens to me, give this to my brother.' I said, 'What could happen to you?' And she smiled — you know that smile she had, where she looked like she knew more than she was telling — and she said, 'Probably nothing. But just in case.'"

Melis pushes the key toward you.

"The apartment is still there. Her landlord is an old man who lives in Etiler — he hasn't rented it out. I think he feels guilty. Or maybe he just forgot. Either way, everything is still inside. I checked once, a few months after. I couldn't stay long. It felt like walking into a ghost."

She wipes her eyes again. Steadies herself.

"If Defne left proof anywhere, it's in that apartment. She was always hiding things — in books, behind pictures, inside coat pockets. She was like a squirrel with secrets."`,
    choices: [
      {
        text: 'Take the key. "I\'ll go tonight. But first — have you overheard anything else?"',
        next: 'e1_melis_overheard',
        effects: {
          setFlags: ['has_apartment_key'],
          npcTrust: { melis: 1 },
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Take the key. "Thank you, Melis. I\'m going now — every minute counts."',
        next: 'e1_apartment_exterior',
        effects: {
          setFlags: ['has_apartment_key', 'melis_story_complete'],
          npcTrust: { melis: 1 },
          axisShift: { heart: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_melis_overheard',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `Melis leans close. The radio plays on — covering you both, she hopes.

"Two weeks ago. Late, maybe eleven o'clock. I was upstairs — I live above the cafe. The walls are thin up there too. Selim was on the phone. He was speaking louder than usual, like he was arguing."

She closes her eyes, remembering.

"He said 'the island' — I heard that clearly. 'It's ready for the island.' And then a name — a woman's name. Naz. 'Naz has the buyer lined up.' And then something about 'the collection' — 'the collection has to move before spring.'"

"The island. Which island?"

"I don't know. There are dozens in the Marmara. The Princes' Islands, the ones near Erdek, Avşa..." She shakes her head. "But wherever it is, that's where they're taking the paintings. And this Naz person is the connection to the buyers."

She grips your wrist.

"Be careful, Deniz. Selim is charming but he's not soft. The people he works with — they're not soft either. Your sister found out and look what happened."

She presses the key into your hand if she hasn't already.

"Go to the apartment. Find what Defne left. And then get out of Arnavutköy. Come back when you have a plan."`,
    choices: [
      {
        text: 'Go to Defne\'s apartment now.',
        next: 'e1_apartment_exterior',
        effects: {
          setFlags: ['has_apartment_key', 'melis_story_complete', 'knows_about_island', 'knows_about_naz'],
          npcTrust: { melis: 1 },
        },
      },
      {
        text: '"One more thing — do you know a gallery owner named Levent?"',
        next: 'e1_melis_about_levent',
        effects: {
          setFlags: ['has_apartment_key', 'melis_story_complete', 'knows_about_island', 'knows_about_naz'],
          npcTrust: { melis: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_melis_about_levent',
    episode: 1,
    phase: 'complication',
    location: 'Melisin Yeri Cafe',
    npcPresent: ['melis'],
    text: `"Levent." Something complicated crosses her face — affection and exasperation tangled together. "Yes, I know him. He has a gallery one block up the hill. He's a good person. Honest. He knew Defne — they worked in the same circles. I think he was a little in love with her, honestly."

"Can he be trusted?"

"With your life? Yes. With a secret?" She tilts her hand side to side. "He means well but he talks. Art world gossip — who's buying what, who's selling what. He can't help himself. If you tell him something, assume it will circulate."

"That could be useful. Or dangerous."

"Both." She manages a tired smile. "His gallery is open until nine most evenings. He'd be happy to talk — he loves talking. Just... be careful what you tell him about Selim. Levent is honest, which means he's naive. He might confront Selim directly, and that would be bad for everyone."

She stands and begins to clear the table.

"Go, Deniz. Find what your sister left. I'll be here tomorrow if you need me."`,
    choices: [
      {
        text: 'Go to Defne\'s apartment.',
        next: 'e1_apartment_exterior',
        effects: {
          setFlags: ['melis_warned_about_levent'],
        },
      },
      {
        text: 'Visit Levent\'s gallery on the way.',
        next: 'e1_levent_gallery',
        effects: {
          setFlags: ['melis_warned_about_levent'],
        },
      },
    ],
  },

  // ============================================================
  // LEVENT'S GALLERY (OPTIONAL)
  // ============================================================
  {
    id: 'e1_levent_gallery',
    episode: 1,
    phase: 'exploration',
    location: 'Levent Gallery',
    npcPresent: ['levent'],
    text: `One block inland, up a cobbled hill that makes your calves burn, a converted warehouse bears a discreet sign: SAHİN GALERI. Through the plate-glass window, white walls display large contemporary canvases — bold colours, abstract forms. A different world from Selim's Ottoman antiques.

Inside, a young man in a black turtleneck and paint-splattered jeans is rearranging a spotlight. He's thirty-five or so, lean, with an expressive face currently crumpled in concentration. When you enter, he lights up like a bulb.

"Merhaba! Welcome, welcome. Are you here for the exhibition? We're showing Elif Yağcı's new series — incredible work, very raw, very Bosphorus." He gestures at the canvases. "I'm Levent."

His energy is a sharp contrast to Selim's calculated calm. This man talks with his whole body, smiles without calculation, and is already pouring you a glass of wine from an open bottle without asking.

"Are you a collector? Art journalist? Please say you're not a real estate developer — we've had three this month wanting to turn the place into apartments."`,
    choices: [
      {
        text: '"I\'m researching provenance issues in Istanbul\'s art market. Off the record."',
        next: 'e1_levent_provenance',
        effects: {
          axisShift: { method: 0.1 },
          npcTrust: { levent: 1 },
        },
      },
      {
        text: '"I\'m looking into what happened to Defne Karadağ. Did you know her?"',
        next: 'e1_levent_defne',
        effects: {
          axisShift: { approach: 0.1, heart: 0.1 },
          npcTrust: { levent: 1 },
        },
      },
      {
        text: '"Just browsing. Tell me about the local art scene."',
        next: 'e1_levent_scene',
        effects: {
          axisShift: { method: 0.1 },
          npcTrust: { levent: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_levent_provenance',
    episode: 1,
    phase: 'exploration',
    location: 'Levent Gallery',
    npcPresent: ['levent'],
    text: `Levent's expression shifts — the enthusiasm dims, replaced by something more guarded. He takes a long sip of wine.

"Provenance issues. Yes. Well." He lowers his voice, though you're the only two people in the gallery. "This is Istanbul. The crossroads of everything. Art flows through this city like water — and not all of it flows cleanly."

He leads you to a bench in front of a large blue canvas.

"There are dealers in this city who are impeccable. And there are dealers who... aren't. Pieces show up with paperwork that's technically correct but practically fiction. A painting 'from a private collection' — but which collection? 'Provenance available on request' — but the provenance is a trail of shell companies and dead men's names."

"Anyone specific?"

He hesitates. "I don't like to name names. But if you look at who's selling Ottoman-era pieces to Gulf buyers at prices that don't make sense... the circle is small. And some of those dealers are right here in Arnavutköy."

He's looking at the wall. The direction of Köşk Antik.

"There's a woman you should talk to, if you're serious about this. Naz Yılmaz. She runs a gallery in Kadıköy — specialises in authentication. If anyone knows where the bodies are buried, metaphorically speaking, it's Naz."`,
    choices: [
      {
        text: '"Naz Yılmaz in Kadıköy. Thank you — I\'ll remember that." Take your leave.',
        next: 'e1_levent_depart',
        effects: {
          setFlags: ['levent_mentioned_naz', 'visited_levent'],
          npcTrust: { levent: 1 },
        },
      },
      {
        text: '"Did you know Defne Karadağ? She was investigating similar things."',
        next: 'e1_levent_defne',
        effects: {
          setFlags: ['levent_mentioned_naz'],
          npcTrust: { levent: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_levent_defne',
    episode: 1,
    phase: 'exploration',
    location: 'Levent Gallery',
    npcPresent: ['levent'],
    text: `The wine glass stops halfway to his mouth. He sets it down carefully on the bench.

"Defne." His voice changes — softer, wounded. "Yes. I knew her. She came to the gallery several times. She was — God, she was brilliant. Sharp like a blade. She understood art the way some people understand music, instinctively."

He runs a hand through his hair.

"She was investigating something. She wouldn't tell me exactly what, but she asked a lot of questions about provenance chains, about how stolen art gets laundered back into legitimate markets. I told her what I knew, which wasn't much." He pauses. "I should have told her more. I should have paid more attention."

"More attention to what?"

"To who she was asking about. I think — I think she was looking at Selim Köşker. She asked me about his buyers, his sources, whether I'd ever seen pieces in his shop that didn't feel right." He looks at you. "I said no, because I hadn't. But I wasn't looking. I wasn't paying attention. And then she was gone."

His voice breaks slightly.

"If you're trying to find out what happened to her — I want to help. Whatever you need."`,
    choices: [
      {
        text: '"Be careful about Selim. Don\'t let him know we\'ve talked." Leave it there.',
        next: 'e1_levent_depart',
        effects: {
          setFlags: ['visited_levent', 'levent_ally'],
          npcTrust: { levent: 1 },
          axisShift: { trust: 0.1 },
        },
      },
      {
        text: '"Did she ever mention a specific painting? Something in Selim\'s shop?"',
        next: 'e1_levent_painting',
        effects: {
          setFlags: ['visited_levent', 'levent_ally'],
          npcTrust: { levent: 1 },
        },
      },
    ],
  },

  {
    id: 'e1_levent_scene',
    episode: 1,
    phase: 'exploration',
    location: 'Levent Gallery',
    npcPresent: ['levent'],
    text: `Levent needs no encouragement. He launches into a spirited tour of Istanbul's art landscape — the contemporary scene in Beyoğlu, the old-money collectors in Nişantaşı, the emerging gallery district in Kadıköy.

"And then there's Arnavutköy. We're small but we're interesting. There's me — contemporary work, emerging artists. And there's Selim next door — well, down the hill — who does the Ottoman thing. Very different worlds."

"Do you get along?"

"Selim and I?" He laughs. "We're cordial. He thinks contemporary art is meaningless splatter. I think half his inventory should be in a museum. We agree on wine." He pauses. "He's a strange man, Selim. Very charming. Very private. The shop does well — impossibly well, for this neighbourhood. His clients are international. Private jets and armoured cars."

He refills your wine.

"There was a journalist who was looking into the art market here. A woman, Defne Karadağ. About two years ago. She disappeared — drowned, they said. But..." He trails off. "She'd been asking questions about provenance. About where certain pieces came from. And then she was gone."

His eyes meet yours with sudden, unguarded sincerity. "That always bothered me."`,
    choices: [
      {
        text: '"She was my sister." Watch his reaction.',
        next: 'e1_levent_defne',
        effects: {
          axisShift: { heart: 0.1, approach: 0.1 },
          setFlags: ['told_levent'],
        },
      },
      {
        text: '"That does sound troubling. Is there anyone in the art world here who might know more?"',
        next: 'e1_levent_provenance',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_levent_painting',
    episode: 1,
    phase: 'exploration',
    location: 'Levent Gallery',
    npcPresent: ['levent'],
    text: `Levent frowns, thinking hard.

"Not specifically. But she did ask me once about Ottoman miniatures — whether there were any famous ones that had been stolen from museums and never recovered. I told her about the İstanbul Şehir Müzesi theft in 2003 — fourteen miniatures vanished during a renovation. Never found."

He snaps his fingers.

"Actually — she mentioned a name once. Naz Yılmaz. A gallery owner and authenticator in Kadıköy. She said Naz knew things about the underground market that nobody else did. I got the impression she was going to meet with Naz."

He finishes his wine.

"If Defne found a stolen museum piece in Selim's shop, that's not art fraud. That's international crime. INTERPOL level. The kind of thing people..." He trails off. Looks away. "The kind of thing people disappear over."

His jaw sets with quiet determination.

"I meant what I said. I want to help. But I'm an art dealer, not a detective. Find Naz. She's the one who can tell you what these paintings are worth — and who would kill for them."`,
    choices: [
      {
        text: '"Thank you, Levent. Keep your ears open. And be careful." Leave.',
        next: 'e1_levent_depart',
        effects: {
          setFlags: ['visited_levent', 'levent_ally', 'levent_mentioned_naz'],
          npcTrust: { levent: 1 },
          axisShift: { trust: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_levent_depart',
    episode: 1,
    phase: 'exploration',
    location: 'Arnavutkoy Side Street',
    text: `You step back into the night. The hill drops away toward the water, the Bosphorus a black mirror flecked with running lights. Levent's gallery goes dark behind you as he closes up.

The night is getting late. Arnavutköy grows quieter — the restaurants are still serving but the streets are emptying, the neighbourhood retreating behind its shuttered windows and locked doors.

You have threads now. Selim, Melis, the boats Oğuz saw, the painting Defne found, a name — Naz Yılmaz — and a destination: Kadıköy. But the most immediate lead is the closest: Defne's apartment, three streets back, second floor.

The key — if you have it — is warm in your pocket. If you don't, there might be other ways in.`,
    choices: [
      {
        text: 'Go to Defne\'s apartment.',
        next: 'e1_apartment_exterior',
      },
      {
        text: 'Go back to Melis\'s cafe — you still need to talk to her.',
        next: 'e1_melis_cafe_arrive',
        condition: {
          flagFalse: 'melis_story_complete',
        },
      },
      {
        text: 'Go back to Köşk Antik. You have unfinished business with Selim.',
        next: 'e1_climax_choice',
        condition: {
          flag: 'visited_selim',
        },
        effects: {
          axisShift: { approach: 0.1 },
        },
      },
    ],
  },

  // ============================================================
  // PHASE 5: DEFNE'S APARTMENT
  // ============================================================
  {
    id: 'e1_apartment_exterior',
    episode: 1,
    phase: 'complication',
    location: 'Defne Apartment Exterior',
    text: `Three streets back from the waterfront, the tourist veneer falls away. These are residential lanes — laundry lines between balconies, motorcycles chained to drainpipes, the blue flicker of televisions behind curtains. Number 14 is a narrow stone building, three storeys, the ground floor occupied by a tailor's workshop long since closed.

The second-floor windows are dark. A balcony with a wrought-iron railing holds two dead plants in ceramic pots. The paint on the window frames is peeling.

Two years. Your sister lived behind those windows. Drank her morning coffee on that balcony, looked out at that same slice of sky. Wrote her stories, made her phone calls, pieced together the investigation that would erase her from the world.

The street door is unlocked — this is still a neighbourhood where people trust their neighbours. A dim stairwell, tiles cracked, a fuse box humming. The second-floor landing has two doors. The one on the left has a faded nameplate: KARADAĞ.`,
    choices: [
      {
        text: 'Use Melis\'s key to open the door.',
        next: 'e1_apartment_inside',
        condition: {
          flag: 'has_apartment_key',
        },
        effects: {
          setFlags: ['entered_apartment'],
        },
      },
      {
        text: 'Try the door handle — maybe it\'s unlocked.',
        next: 'e1_apartment_try_door',
        condition: {
          flagFalse: 'has_apartment_key',
        },
      },
      {
        text: 'You don\'t have a key. Come back after talking to Melis.',
        next: 'e1_melis_cafe_arrive',
        condition: {
          flagFalse: 'has_apartment_key',
        },
      },
    ],
  },

  {
    id: 'e1_apartment_try_door',
    episode: 1,
    phase: 'complication',
    location: 'Defne Apartment Exterior',
    text: `The door is locked. Solid wood, old but sturdy. The lock is a standard Yale — not pickable without tools and skills you don't have. You try your own apartment key out of desperation. It doesn't fit.

Through the gap at the bottom of the door, you can smell the apartment: dust, old paper, a trace of perfume that makes your chest ache. Defne's perfume. Still lingering after two years in a sealed room.

You could force the door, but the neighbour behind the other door would hear. You could try the balcony — but it's a straight climb up a stone facade with no handholds. You could come back with a key.

Melis has a key. You remember seeing a photo of Defne in her cafe.`,
    choices: [
      {
        text: 'Go to Melis\'s cafe. She knew Defne — she might have a spare key.',
        next: 'e1_melis_cafe_arrive',
      },
      {
        text: 'Try the balcony route. Climb up from the street.',
        next: 'e1_apartment_climb',
        effects: {
          axisShift: { approach: 0.2 },
        },
      },
    ],
  },

  {
    id: 'e1_apartment_climb',
    episode: 1,
    phase: 'complication',
    location: 'Defne Apartment Exterior',
    text: `Bad idea. You get one handhold on the drainpipe before it groans and shifts under your weight. The stone wall offers nothing — smooth, damp, unforgiving. You drop back to the pavement with scraped palms and a racing heart.

A light comes on in the ground-floor window. A face appears — an old woman, suspicious, reaching for a phone.

You walk away quickly, turning the corner before she gets a good look. Your palms sting. Your pride stings worse.

Melis has a key. That's the way in. There are no shortcuts tonight.`,
    choices: [
      {
        text: 'Go to Melis\'s cafe.',
        next: 'e1_melis_cafe_arrive',
      },
    ],
  },

  {
    id: 'e1_apartment_inside',
    episode: 1,
    phase: 'complication',
    location: 'Defne Apartment',
    text: `The key turns with a click. The door swings open and the smell hits you — dust, old books, and beneath it, faint but unmistakable, the jasmine perfume Defne wore. Your mother gave her a bottle every birthday. The scent is a fist around your heart.

The apartment is small — one bedroom, a living room with a kitchenette, a bathroom. Everything is exactly as she left it. A coffee cup on the counter, brown ring dried at the bottom. Books stacked by the sofa — Turkish literature, art history, investigative journalism manuals. A laptop cable coiled on the desk but no laptop. The police took that.

Her jacket hangs by the door. You touch the sleeve and your hand shakes.

The living room wall is covered in papers — printouts, photographs, handwritten notes. Defne's investigation board. String connecting items, question marks, arrows. Most of it is too faded or cryptic to read quickly. But it's here. Her work is here.

The room is dim — you find a lamp and switch it on. The investigation board floods with light.`,
    choices: [
      {
        text: 'Study the investigation board carefully. Read every note, follow every string.',
        next: 'e1_apartment_board',
        effects: {
          axisShift: { method: 0.3 },
          setFlags: ['studied_board'],
        },
      },
      {
        text: 'Search the apartment — drawers, books, hidden places. Defne was a hider.',
        next: 'e1_apartment_search',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
      {
        text: 'Just stand here for a moment. Breathe. Remember her.',
        next: 'e1_apartment_moment',
        effects: {
          axisShift: { heart: 0.3 },
        },
      },
    ],
  },

  {
    id: 'e1_apartment_board',
    episode: 1,
    phase: 'complication',
    location: 'Defne Apartment',
    text: `You work through the board systematically, photographing everything with your phone.

The centre is a photograph of a painting — a small Ottoman miniature, jewel-toned, depicting a sultan receiving foreign ambassadors. Defne has circled it in red and written: "İstanbul Şehir Müzesi - STOLEN 2003. Last seen: Selim K."

Radiating outward: names, dates, locations. Selim Köşker is mentioned repeatedly. Lines connect him to numbered items — other artworks, you think. Buyers are listed by code: "Gulf-1," "Asia-3," "EU-7." A logistics chain sketched in blue pen shows a route: Istanbul → "The Island" → various destinations.

One note catches your eye: "Naz Y. — Kadıköy Çarşı — authenticator or accomplice? Meeting Thursday." No date on which Thursday.

Another note, scrawled urgently in different ink: "They know I'm looking. S. asked about my 'article.' Need to photograph the piece and get out. Print copies at Kadıköy print shop — BACKUP EVERYTHING."

The board is a map of your sister's mind in its last weeks. Brilliant, obsessive, increasingly frightened.`,
    choices: [
      {
        text: 'Search the rest of the apartment for the backup copies she mentioned.',
        next: 'e1_apartment_search',
        effects: {
          setFlags: ['read_board_notes'],
        },
      },
      {
        text: 'You have enough. Photograph the board and go — time to decide your next move.',
        next: 'e1_climax_choice',
        effects: {
          setFlags: ['read_board_notes', 'photographed_board'],
        },
      },
    ],
  },

  {
    id: 'e1_apartment_search',
    episode: 1,
    phase: 'complication',
    location: 'Defne Apartment',
    text: `You search the way Defne would have hidden things — systematically, cleverly, in places only someone who knew her would think to look.

Inside the spine of a hollowed-out copy of Orhan Pamuk's "Kara Kitap," you find a folded receipt from a print shop in Kadıköy Çarşı — Güneş Fotokopi. Dated two days before Defne disappeared. The receipt lists: "4x A3 colour prints, 1x USB copy." She made copies of something. Photographs of the painting, probably. And those copies might still be at the print shop — or wherever she sent them.

In the pocket of her winter coat, a pencil sketch on tracing paper: a painting — the miniature from the board — with small markings at the edges. Numbers. They look like coordinates, but not quite — more like catalogue references. Museum inventory numbers, maybe.

Under the mattress (the oldest hiding place in the world, but Defne was sometimes endearingly old-fashioned): nothing. But taped to the underside of the bedside table drawer, a business card: NAZ YILMAZ — YILMAZ GALERİ — Kadıköy. A phone number on the back, handwritten.

Your sister left a trail. Fragmented, hidden, but real.`,
    choices: [
      {
        text: 'Take everything you\'ve found. It\'s time to act on what you know.',
        next: 'e1_climax_choice',
        effects: {
          setFlags: ['found_receipt', 'found_sketch', 'found_naz_card'],
          axisShift: { method: 0.1 },
        },
      },
    ],
  },

  {
    id: 'e1_apartment_moment',
    episode: 1,
    phase: 'complication',
    location: 'Defne Apartment',
    text: `You sit on her sofa. The cushion gives in a familiar way — she always complained about this sofa, said it was eating her alive. You press your face into the fabric and breathe in two-year-old dust and a ghost of jasmine.

Defne at sixteen, arguing politics at the dinner table until your father threw his hands up. Defne at twenty-two, graduating top of her journalism class, grinning so wide her face couldn't contain it. Defne at thirty, calling you from some godforsaken eastern province where she was chasing a story about land grabs, her voice alive with the thrill of the hunt.

Defne at thirty-two, vanishing.

You let yourself feel it — the grief, the rage, the terrible hope that the anonymous text kindled. You let it burn through you like a fever. And then you stand up. Wipe your eyes. Get to work.

The apartment has secrets. Defne was meticulous. If she found proof, she would have left copies, notes, evidence stashed in her particular hiding places.

Time to search.`,
    choices: [
      {
        text: 'Search the apartment thoroughly — every drawer, every book, every pocket.',
        next: 'e1_apartment_search',
        effects: {
          axisShift: { method: 0.1 },
        },
      },
      {
        text: 'Study the investigation board on the wall first.',
        next: 'e1_apartment_board',
        effects: {
          axisShift: { method: 0.2 },
        },
      },
    ],
  },

  // ============================================================
  // PHASE 6: CLIMAX — THREE PATHS
  // ============================================================
  {
    id: 'e1_climax_choice',
    episode: 1,
    phase: 'climax',
    location: 'Arnavutkoy Side Street',
    text: `You stand in the dark street outside Defne's apartment building, phone heavy with photographs, pockets full of evidence. The night is deep now — past ten, the neighbourhood settling into silence. The Bosphorus mutters at the end of the street, black and restless.

You know enough to be dangerous. Selim is the handler. Stolen art moves through Köşk Antik, out via the dock to "the island," and into the hands of international buyers. Naz Yılmaz is a connection in Kadıköy. Your sister found proof and paid for it.

The question is: what do you do with what you know?

The blue house is still lit. Through the street, you can see its glow. Selim is still there, still working. Next door, Melis's cafe is dark — she's closed for the night.

Three paths. Each one trades something for something.`,
    choices: [
      {
        text: 'Confront Selim directly. Go back to the shop and tell him you know what he is.',
        next: 'e1_climax_confront',
        effects: {
          axisShift: { approach: 0.3 },
        },
      },
      {
        text: 'Circle to the back of the shop. The window to the back room — photograph the painting yourself.',
        next: 'e1_climax_stealth',
        effects: {
          axisShift: { method: 0.3 },
        },
      },
      {
        text: 'Call Melis. Share what you\'ve found. Ask for her help.',
        next: 'e1_climax_alliance',
        condition: {
          flag: 'melis_story_complete',
        },
        effects: {
          axisShift: { trust: 0.2, heart: 0.2 },
        },
      },
    ],
  },

  // --- CONFRONTATION PATH ---
  {
    id: 'e1_climax_confront',
    episode: 1,
    phase: 'climax',
    location: 'Kosk Antik',
    npcPresent: ['selim'],
    text: `You push open the door. The brass bell chimes. Selim looks up from his desk, and for one unguarded second you see something in his face that might be fear.

"Mr. Karadağ. I thought we'd finished our conversation."

"We hadn't started it." You walk to his desk and place your phone on it, screen up, showing a photograph of Defne's investigation board. "My sister knew about the paintings. The stolen pieces from the Şehir Müzesi. She knew you were the handler. She was going to prove it."

The colour drains from his face. He stands slowly.

"And now you've come here to — what? Accuse me? Threaten me?" His voice is controlled but his hands grip the edge of the desk. "You have a dead woman's conspiracy board. That's not evidence. That's grief."

"It's a start."

"It's nothing." But his eyes dart to the back room. To his phone. "I think you should leave."

"Did you kill her, Selim? Or did you just make the call?"

Something breaks in his expression — a flash of something raw and complicated. Then the mask slams back down.

"Get out." His voice is ice. "Now."

You leave. You have no choice. But as you step into the street, you hear him pick up the phone again, speaking fast and urgent. And this time, the words that carry through the closing door are: "We have a problem."

You're on their radar now. For better or worse.`,
    choices: [
      {
        text: 'Head for the ferry. You need distance and time to plan your next move.',
        next: 'e1_ferry_transition',
        effects: {
          setFlags: ['confronted_selim_climax', 'selim_knows_everything', 'deniz_tracked'],
        },
      },
    ],
  },

  // --- STEALTH PATH ---
  {
    id: 'e1_climax_stealth',
    episode: 1,
    phase: 'climax',
    location: 'Kosk Antik Rear',
    text: `You circle the block, moving through dark residential lanes until you reach the back of Köşk Antik. The garden wall is high but there's a dumpster you can stand on. From there, you can see over the wall into a small courtyard — and, critically, the back room window.

The window is lit. Through it, you can see the workbench, the restoration tools, and — propped against the wall — the wrapped paintings. One of them has been partially unwrapped.

You balance on the dumpster and raise your phone. The zoom catches it: a small painting, jewel-bright colours, a sultan receiving ambassadors. The same image from Defne's sketch. The stolen miniature from the Şehir Müzesi.

You take twelve photographs. Different angles, different zooms. The painting. The wrapping. The room. A clear shot of the workbench with restoration chemicals and Selim's monogrammed tools.

Your hands shake but the photos are sharp. This is proof. Not courtroom proof — but journalist proof. Enough to start a story, to attract attention, to make powerful people very uncomfortable.

Inside, a shadow crosses the window. Selim. Moving toward the back room.

You drop from the dumpster and slip into the dark street. Silent. Unseen.

The evidence is in your phone. And Selim doesn't know.`,
    choices: [
      {
        text: 'Walk to the ferry. Get out of Arnavutköy with the photos intact.',
        next: 'e1_ferry_transition',
        effects: {
          setFlags: ['photographed_painting', 'has_evidence', 'selim_unaware'],
        },
      },
    ],
  },

  // --- ALLIANCE PATH ---
  {
    id: 'e1_climax_alliance',
    episode: 1,
    phase: 'climax',
    location: 'Arnavutkoy Side Street',
    npcPresent: ['melis'],
    text: `Melis answers on the second ring, her voice thick with sleep.

"Deniz? What's wrong?"

"I found Defne's investigation board. She mapped the whole operation — Selim, the stolen paintings, the dock, everything. I have photos, a receipt from a print shop in Kadıköy, a sketch with what looks like museum inventory numbers."

Silence. Then Melis's voice, sharper now, fully awake.

"Come to the cafe. The back door — not the front. I'll be down in two minutes."

You meet in the dark kitchen behind the cafe. Melis in a coat over pyjamas, her hair loose, her face tight with fear and determination. You show her everything. She studies the photos, the receipt, the sketch.

"Deniz, listen to me. I've heard something else. Something I didn't tell you before because I wasn't sure." She grips the counter. "Last week, through the wall, I heard Selim say 'the collection has to move before spring.' And he mentioned an island — Büyükada, I think. The big one, the Princes' Island. That's where they're storing the paintings."

She looks at you with fierce eyes.

"Your sister didn't die for nothing. Take this to Kadıköy — find Naz Yılmaz, find the print shop copies. Build the story. And when you're ready, burn them all down."`,
    choices: [
      {
        text: '"Thank you, Melis. Lock your door. Be careful." Head for the ferry.',
        next: 'e1_ferry_transition',
        effects: {
          setFlags: ['melis_alliance', 'knows_buyukada', 'melis_informant'],
          npcTrust: { melis: 1 },
        },
      },
    ],
  },

  // ============================================================
  // PHASE 7: FERRY TRANSITION
  // ============================================================
  {
    id: 'e1_ferry_transition',
    episode: 1,
    phase: 'ferry',
    location: 'Arnavutkoy Iskele',
    text: `The last ferry is in ten minutes. You walk to the iskele through empty streets, your footsteps loud on the cobbles. The Bosphorus stretches ahead, black silk under a half-moon. On the Asian shore, Kadıköy glitters — your next destination.

You stand at the water's edge and take stock.

Your sister found stolen paintings being laundered through an antique shop in Arnavutköy. The handler is Selim Köşker — cultured, connected, and dangerous. The operation involves a dock, nighttime boat transfers, and a destination called "the island." A woman named Naz Yılmaz is connected to the network. Defne made backup copies at a print shop in Kadıköy before she disappeared.

You may have allies in Arnavutköy — people who cared about Defne, people whose fear is tempered by loyalty, whose sharp eyes and local knowledge could prove essential.

And you have enemies — or at least, people who will become enemies when they learn how much you know.

The ferry horn sounds. Low, mournful, carrying across the water like the call of something ancient and patient.

Arnavutköy recedes behind you — its blue houses, its narrow streets, its secrets. But you'll be back. Or you'll follow the trail forward, to Kadıköy, to the print shop, to Naz.

Defne's voice in your memory: "Every story is a door. You just have to find the key."

You found one tonight. Now you need to find the rest.`,
    choices: [
      {
        text: 'Board the ferry. Kadıköy awaits.',
        next: 'ferry1_opening',
        effects: {
          setFlags: ['e1_complete'],
        },
      },
    ],
  },
];

export default episode1;
