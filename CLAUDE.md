# Bosphorus Ferry

Choice-driven text adventure game set in Istanbul. 3 episodes, 16 NPCs, 8 endings.

## Stack
- React 19, TypeScript, Vite 7, Tailwind CSS 4
- No backend — fully static SPA with localStorage saves

## Commands
- `npm run dev` — start dev server
- `npm run build` — typecheck + production build
- `npm run preview` — preview production build locally

## Deployment
- GitHub repo: https://github.com/hulkiokantabak/Bosphorus-Ferry
- Live site: https://hulkiokantabak.github.io/Bosphorus-Ferry/
- Auto-deploys via GitHub Actions on push to `main`
- Vite `base` is set to `/Bosphorus-Ferry/` for GitHub Pages

## Architecture
- `src/engine/` — game engine (scene registry, state manager, condition checker, ending calculator)
- `src/data/` — narrative content (episode1-3, ferry transitions, endings)
- `src/components/` — React UI (14 components)
- `src/hooks/` — useGame (main game logic), useTypewriter (text animation)
- Save key: `bosphorus-ferry-save` in localStorage

## Notes
- `endingCalculator.ts` is dead code — endings link directly from episode 3 scenes. Character axes affect which choices are available via conditions, not which ending is calculated.
- Narrative data bundle is ~550KB (expected, configured in vite chunkSizeWarningLimit).
- Git user: "Hulki Okan Tabak" <hulkiokantabak@users.noreply.github.com>
