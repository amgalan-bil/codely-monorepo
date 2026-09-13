# Codely

Nx monorepo running **Nx 23.2 · Next.js 16 · React 19 · Tailwind CSS 4 · shadcn/ui (radix-nova) · TypeScript · Bun**.

## Layout

```
apps/
  codely/                      namespace (logical grouping)
    codely-web/                Next.js app        → @codely/codely-web
    codely-web-e2e/            Cypress E2E        → @codely/codely-web-e2e
    codely-service/            GraphQL API worker → @codely/codely-service
libs/
  shadcn/                      shared UI library  → @codely/shadcn
  feature-auth/                React library      → @codely/feature-auth
  shared-types/                TS library         → @codely/shared-types
docs/                          workspace notes
```

Nx derives project names from `package.json#name`, so every target is addressed by its
scoped name (`@codely/codely-web`, not `codely-web`).

## Getting started

```sh
bun install
bun run dev            # or: bunx nx dev @codely/codely-web
```

| Task               | Script              | Nx equivalent                        |
| ------------------ | ------------------- | ------------------------------------ |
| Dev server         | `bun run dev`       | `bunx nx dev @codely/codely-web`     |
| Production build   | `bun run build`     | `bunx nx build @codely/codely-web`   |
| Serve the build    | `bun run start`     | `bunx nx start @codely/codely-web`   |
| Unit tests         | `bun run test`      | `bunx nx run-many -t test`           |
| E2E (Cypress)      | `bun run e2e`       | `bunx nx e2e @codely/codely-web-e2e` |
| Lint               | `bun run lint`      | `bunx nx run-many -t lint`           |
| Type check         | `bun run typecheck` | `bunx nx run-many -t typecheck`      |
| Sync TS references | `bun run sync`      | `bunx nx sync`                       |
| Format             | `bun run format`    | `bunx nx format:write`               |
| Project graph      | `bun run graph`     | `bunx nx graph`                      |

Only changed projects: `bunx nx affected -t build,test,lint`.

## Shared UI

Components live in `libs/shadcn/src/ui` and are written there by the shadcn CLI:

```sh
bun run ui:add button card      # = shadcn add --cwd libs/shadcn button card
```

After adding, export the component from `libs/shadcn/src/index.ts` so auto-import picks it up.

Import shapes (all wired through `tsconfig.base.json#paths` and the lib's `package.json#exports`):

```ts
import { Button, Card } from '@codely/shadcn'; // barrel — best auto-import
import { Button } from '@codely/shadcn/ui/button'; // per file — best tree-shaking
import { cn } from '@codely/shadcn/utils';
import { useIsMobile } from '@codely/shadcn/hooks/use-mobile';
```

`@codely/shadcn/ui` (no component) and deep relative paths into `libs/` are not supported.

## Database and API

`@codely/codely-service` is an Apollo Server running on a Cloudflare Worker, reading and
writing Cloudflare D1 through Drizzle. The Next.js app talks to it over HTTP from server
components and server actions (`apps/codely/codely-web/src/lib/graphql.ts`), so no database
credentials ever reach the browser.

```sh
cp .env.example .env                                        # D1 credentials for drizzle-kit
bunx nx run @codely/codely-service:drizzle:migrate-local     # create the local D1 schema
bun run api                                                  # worker on http://localhost:4001
bun run dev                                                  # app on http://localhost:3000
```

Then open [/snippets](http://localhost:3000/snippets) — it lists rows through `getSnippets`
and writes through the `createUser`, `createSnippet` and `deleteSnippet` mutations.

| Task                                 | Command                                                     |
| ------------------------------------ | ----------------------------------------------------------- |
| Generate a migration from the schema | `bunx nx run @codely/codely-service:drizzle:generate`       |
| Apply migrations locally             | `bunx nx run @codely/codely-service:drizzle:migrate-local`  |
| Apply migrations to remote D1        | `bunx nx run @codely/codely-service:drizzle:migrate-remote` |
| Browse data                          | `bunx nx run @codely/codely-service:drizzle:studio`         |
| Deploy the worker                    | `bunx nx run @codely/codely-service:deploy`                 |

More detail in [apps/codely/codely-service/README.md](apps/codely/codely-service/README.md).

## Adding projects

```sh
bunx nx g @nx/next:app apps/{namespace}/{name} --style=css --linter=eslint
bunx nx g @nx/react:library libs/{name} --bundler=none --unitTestRunner=none --style=none
bunx nx g @nx/js:library libs/{name} --bundler=none --unitTestRunner=none
```

Then: add the namespace to `package.json#workspaces` (`apps/{namespace}/*`), add the path
alias to `tsconfig.base.json`, run `bun install` and `bunx nx sync`.

Workspace conventions and the deviations from the setup guide are in
[docs/setup-notes.md](docs/setup-notes.md).
