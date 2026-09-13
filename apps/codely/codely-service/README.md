# @codely/codely-service

GraphQL API for the Codely workspace: **Apollo Server 5** on a **Cloudflare Worker**,
talking to **Cloudflare D1** through **Drizzle ORM**. Schema changes are managed with
**drizzle-kit**.

```
src/
  db/                    drizzle tables (users, snippets, comments) + relations
  drizzle-provider/      drizzle(d1, { schema }) — one place that binds D1
  graphql/
    schemas/             gql typeDefs, one module per domain
    resolvers/
      queries/           getUsers, getUserById, getSnippets, getSnippetById, …
      mutations/         createUser, createSnippet, updateSnippet, deleteSnippet, createComment
      index.ts           resolver map + field resolvers (Snippet.author, Snippet.comments, …)
  types/                 GraphQLContext and the resolver signatures
  index.ts               ApolloServer + CORS + the worker fetch handler
drizzle/                 generated migrations (committed)
```

Every request builds a context of `{ db, env }`, so a resolver only ever touches
`context.db` — the same shape as the asu-funding service.

## Running it

```sh
bunx nx run @codely/codely-service:drizzle:migrate-local   # apply migrations to local D1
bunx nx run @codely/codely-service:dev                     # wrangler dev on :4001
```

`GET /health` returns `{"status":"ok"}`; everything else is the GraphQL endpoint at `/`.

## Changing the schema

1. Edit a table in `src/db/`.
2. `bunx nx run @codely/codely-service:drizzle:generate` — writes SQL into `drizzle/`.
3. `…:drizzle:migrate-local` for local D1, `…:drizzle:migrate-remote` for the real one.

`drizzle:push` skips migration files and syncs the remote schema directly — handy while
prototyping, destructive once there is data. `drizzle:studio` opens the data browser.

## Configuration

- `wrangler.jsonc` holds the D1 binding (`DB`) and the `migrations_dir`.
- `drizzle.config.ts` uses the `d1-http` driver and reads `CLOUDFLARE_ACCOUNT_ID`,
  `CLOUDFLARE_DATABASE_ID` and `CLOUDFLARE_D1_TOKEN` from the workspace-root `.env`
  (see `.env.example`).
- `drizzle-local.config.ts` points at the SQLite file `wrangler dev` keeps under
  `.wrangler/state`, for running drizzle-kit against local data:
  `bunx drizzle-kit studio --config drizzle-local.config.ts`.
- `worker-configuration.d.ts` is generated — rerun `…:cf-typegen` after editing
  `wrangler.jsonc`.
