import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'drizzle-kit';

/**
 * Points drizzle-kit at the SQLite file `wrangler dev` keeps for the local D1
 * binding. The filename is a hash of the database, so it is discovered rather
 * than hard-coded — it exists once you have run `nx run @codely/codely-service:dev`
 * or `drizzle:migrate-local` at least once.
 */
const miniflareD1Dir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject';

const localDbFile = existsSync(miniflareD1Dir)
  ? readdirSync(miniflareD1Dir).find((file) => file.endsWith('.sqlite'))
  : undefined;

export default defineConfig({
  out: './drizzle',
  schema: './src/db/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: localDbFile ? join(miniflareD1Dir, localDbFile) : ':memory:',
  },
});
