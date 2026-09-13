# Setup notes

Where this workspace follows the Codely setup guide, and where it had to differ.
Everything below was verified with `nx typecheck`, `nx lint`, `nx test`, `nx build`
and `nx e2e` on Nx 23.2 / Next 16.1.7 / shadcn CLI 4.21.

## Deviations from the guide

| Guide                                                                                    | Here                                                                                | Why                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `components.json` → `"lib": "@codely/shadcn/lib/*"`, `"hooks": "@codely/shadcn/hooks/*"` | no trailing `/*`                                                                    | The CLI treats these as output _directories_, exactly like `ui`. With `/*` it created a literal `libs/shadcn/src/hooks/*/` folder and wrote `use-mobile.ts` into it, then imported it as `@codely/shadcn/hooks/*/use-mobile`.                                                                    |
| `components.json` → `"css": "apps/codely/codely-web/src/app/global.css"`                 | `"../../apps/codely/codely-web/src/app/global.css"`                                 | The CLI resolves `tailwind.css` relative to the directory holding `components.json`. Confirm with `bunx shadcn info --cwd libs/shadcn`.                                                                                                                                                          |
| `components.json` → `"rsc": false`                                                       | `"rsc": true`, plus `"use client"` on every component that needs it                 | The app is the App Router. A component that calls a React hook or pulls in a Radix primitive has to declare a client boundary or the server build fails.                                                                                                                                         |
| `eslint.config.mjs` override on `files: ['libs/shadcn/src/ui/**/*.{ts,tsx}']`            | `files: ['src/ui/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}']`                        | Flat-config globs resolve against the config file's own directory, and Nx runs eslint with `cwd: libs/shadcn`. The workspace-rooted glob matches nothing, so `@nx/enforce-module-boundaries` still fired. `hooks/**` is there because `sidebar.tsx` imports `use-mobile` by alias too.           |
| `tsconfig.lib.json` (shadcn) as listed                                                   | adds `"lib": ["es2024", "dom", "dom.iterable"]` and `"isolatedDeclarations": false` | Components touch `window`, `document` and `KeyboardEvent`, and the base config's `lib: ["es2024"]` has none of them. `isolatedDeclarations` would require an explicit return type on every one of the 60+ generated components — registry output that gets overwritten on the next `shadcn add`. |
| App `tsconfig.json#include` as listed                                                    | also includes `index.d.ts`                                                          | TypeScript's `noUncheckedSideEffectImports` rejects `import './global.css'` unless the CSS module declarations in `apps/codely/codely-web/index.d.ts` are part of the program.                                                                                                                   |
| §7.3 step 3: reference every lib from the consuming app                                  | only the libs actually imported                                                     | `nx sync` (the `@nx/js:typescript-sync` generator) rewrites `references` from the real dependency graph and strips unused ones. Import the lib, then run `bunx nx sync`.                                                                                                                         |
| `libs/shadcn/package.json` deps: `next-themes`, `sonner`                                 | everything the components import                                                    | Bun installs with an isolated linker, so each package sees only what it declares. React/React DOM are peer deps to keep a single React instance.                                                                                                                                                 |

## Things worth knowing

- **`cn` comes from two places.** `@codely/shadcn/utils` exports the guide's
  `twMerge(clsx(...))` helper; the radix-nova components the CLI writes import `cn` from
  the standalone `cn` package instead. Both merge Tailwind classes; use `@codely/shadcn/utils`
  in app code.
- **Registry output is not Prettier-formatted.** `libs/shadcn/src/ui` and `src/hooks` are in
  `.prettierignore` so `shadcn diff` stays readable.
- **Next.js warns about the workspace root** (`We detected multiple lockfiles ... selected
/Users/<you>/bun.lock`). It comes from a stray `bun.lock` in the home directory, not from
  this repo. Delete that file, or set `turbopack.root` in `apps/codely/codely-web/next.config.js`
  — the guide keeps that file as a plain object, so it is left alone here.
- **TypeScript is 6.0.3**, the version `create-nx-workspace` pins for Nx 23.2. The config is
  already `baseUrl`-free, so it is TS 7 ready whenever you bump it.
