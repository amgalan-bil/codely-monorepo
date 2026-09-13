# Codely site — build checkpoint

_Paused 2026-09-11. Build, typecheck and lint all pass; 140 routes prerender._

## Where to pick up

```sh
bun run dev          # http://localhost:3000
bun run build        # full production build
bunx tsc --noEmit -p apps/codely/codely-web/tsconfig.json
bunx nx lint @codely/codely-web
```

## What is built

All 16 routes return 200 and are prerendered:

| Route | What it is |
| --- | --- |
| `/` | Hero (blockchain network + terminal card), stats, 6 programs, Academy preview, testimonials, CTA |
| `/programs` | "Choose Your Path" hero + 6 cards + 6 participant testimonials |
| `/programs/[slug]` | Hero → Skills → What Makes It Unique → Curriculum → "Life at …" gallery (She Can Code only) |
| `/academy` | Project Tutorials (v40 design): program tabs w/ progress, difficulty filters, project grid |
| `/academy/[courseId]` | Course overview — colour-washed hero, chapter timeline, right rail (progress / badges / cheat sheet / community) |
| `/academy/[courseId]/[exerciseSlug]` | Split-pane lesson workspace: prose + Help accordions ‖ editor + terminal, chapter drawer |
| `/challenges` | Challenge Packs — filter pills, 3D flip trading cards |
| `/challenges/[packId]` | Flip-card problem ‖ editor + terminal, challenge drawer, unrestricted navigation |
| `/community` | Feed with composer, likes, sort tabs, channel filter, stats + trending tags rail |
| `/community/leaderboards` | Podium + period tabs + ranked table |
| `/community/project-showcase` | Track filters + project grid with likes |
| `/community/monthly-challenge` | Challenge banner, stats, how-to-enter, prizes, standings, past winners |
| `/about` | Mission, journey timeline, team grid (click to expand bio), hiring CTA |
| `/signin`, `/signup` | Full UI; sign-up is a working 3-step flow. **Auth deliberately not wired.** |
| `/profile` | Tabs: Overview (monthly streak heatmap, current lessons, up next) · My Lessons · Achievements · Community |

## Deliberately not done

- **Authentication.** Clerk vs. alternative is still undecided. Both auth forms hold state
  and validate shape, but submitting shows `PendingAuthNotice` in `src/app/auth-ui.tsx`
  instead of creating a session. That component and the two forms are the only places to
  touch when the provider is chosen.
- **Code execution.** `CodeEditor.run()` echoes a transcript rather than evaluating.
  Swap that one function for a sandbox call; nothing else changes.
- **Mongolian coverage.** The EN/MN toggle is real (`src/lib/i18n.tsx`, persisted to
  localStorage). The dictionary covers header, footer, nav and repeated labels. Long-form
  page copy is still English-only — challenge prompts in `src/data/challenges.ts` are
  already written in Mongolian.

## Decisions worth remembering

- **Academy has two layers.** `/academy` keeps the v40 project-tutorial design (program
  tabs, project cards). Each project card links through to the *language* course for its
  tag — `languageToCourse` in `src/data/courses.ts` maps `Python → /academy/python`,
  `HTML/CSS → /academy/html`, and so on. That satisfies both the "revert to v40" request
  and the "every language gets its own Codedex-style course page" request.
- **Program palette** lives as `--track-*` tokens in `global.css`; components set
  `--track` and the `.track-*` classes mix it. Retoning is a one-file change.
  She Can Code `#ec4899` · MonPy `#10b981` · Cat AI `#ef4444` · C++ `#f59e0b` ·
  Arduino `#06b6d4` · I++ `#7c3aed`, in that display order.
- **Dark only.** The palette sits on `:root`, `dark` is hard-coded on `<html>`, and
  next-themes runs with `forcedTheme="dark"`.
- **Chrome is conditional.** `SiteChrome` hides header and footer on the two workspace
  routes and both auth pages.
- **Streak is a monthly heatmap**, not the weekly row in the old screenshots — that was
  an explicit later request. Month arrows browse backwards; data comes from
  `activityFor()`, seeded deterministically so SSR and client agree.
- **Images** are Unsplash placeholders (`next.config.js` allows that host only). Real
  Codely photography drops into `src/data/programs.ts` / `team.ts`.
- **Hero illustration**: the pixel Ulaanbaatar artwork was never supplied as a file. The
  hero currently runs on the blockchain SVG alone; `src/app/page.tsx` has the comment
  marking where `public/hero-city.png` slots in.
- **Logos**: the supplied program logos were screenshots, not assets. Program icons are
  emoji in tinted squares; `CodelyLogo` in `src/components/codely-logo.tsx` draws the
  `</codely>` wordmark as SVG.

## Fonts

| Font | Used for | Sizes |
| --- | --- | --- |
| Chakra Petch 400–700 | h1–h4, nav labels, stat numerals, pixel card labels | 68px hero → 15px card titles |
| Nunito 400–800 | body copy, buttons, descriptions | 12–16px |
| JetBrains Mono 400–500 | code, XP counters, badges, meta labels, section eyebrows | 10–14px |

Wired in `src/app/layout.tsx` via `next/font/google`, exposed as
`--font-chakra` / `--font-nunito` / `--font-jetbrains` and mapped to the Tailwind
`font-display` / `font-sans` / `font-mono` utilities.

## Next steps when resuming

1. Visual pass in the browser — this was the step in progress when work paused.
2. Decide auth (Clerk?) and wire `signin` / `signup`.
3. Extend the MN dictionary to page body copy.
4. Replace Unsplash placeholders with Codely's own photography and logo files.
