# Bosphorus Ferry

Choice-driven text adventure game set in Istanbul. 3 episodes, 16 NPCs, 8 endings.

## Stack
- React 19, TypeScript, Vite 8, Tailwind CSS 4
- No backend — fully static SPA with localStorage saves

## Commands
- `npm run dev` — start dev server
- `npm run build` — typecheck + production build
- `npm run preview` — preview production build locally
- `node playtest.mjs` — automated playtest script (simulates play-throughs without the browser)
- `start-game.bat` — Windows launcher (starts dev server and opens the game in a browser)

## Deployment
- GitHub repo: https://github.com/hulkiokantabak/Bosphorus-Ferry
- Live site: https://hulkiokantabak.github.io/Bosphorus-Ferry/
- Auto-deploys via GitHub Actions on push to `main`
- Vite `base` is set to `/Bosphorus-Ferry/` for GitHub Pages

## Architecture
- `src/engine/` — game engine (scene registry, state manager, condition checker, ending calculator)
- `src/data/` — narrative content (episode1-3, ferry transitions, endings)
- `src/components/` — React UI (15 components)
- `src/hooks/` — useGame (main game logic), useTypewriter (text animation)
- `src/utils/` — textHighlighter (NPC/location markup), motion (reduced-motion check)

## localStorage keys
- `bosphorus-ferry-save` — current playthrough (`GameState` + `_v` save-version stamp)
- `bosphorus-ferry-endings` — endings discovered across playthroughs
- `bosphorus-ferry-completed` — whether the game has ever been finished
- `bosphorus-ferry-text-speed` — typewriter speed preference
- `bosphorus-ferry-audio` — ambient-audio on/off
- `bosphorus-ferry-stats` / `bosphorus-ferry-analytics` / `bosphorus-ferry-session` — local play stats and (disabled-by-default) analytics

## Notes
- `endingCalculator.ts` is LIVE, not dead. Endings are reached two ways: (1) 12 episode-3 choices link directly to a specific `ending_*` scene, and (2) 8 climax choices route through the sentinel `ending_calculate`, which calls `calculateEnding(state)` to pick the ending by weighted score over flags, axes, and NPC trust. So character axes both gate choices (via conditions) AND feed the final calculation.
- Accessibility: the app honours `prefers-reduced-motion` — the typewriter reveals instantly, the intro shows a static card, and CSS animations are neutralised (see `src/utils/motion.ts` + the reduced-motion block in `src/index.css`).
- Narrative data bundle is ~550KB (expected, configured in vite chunkSizeWarningLimit).
- Git user: "Hulki Okan Tabak" <hulkiokantabak@users.noreply.github.com>
