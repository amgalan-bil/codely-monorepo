import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Credentials live in the workspace-root .env; a service-local .env wins if present.
config({ path: ['.env', '../../../.env'], quiet: true });

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is missing — copy .env.example to .env at the workspace root and fill it in.`,
    );
  }
  return value;
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/index.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: requireEnv('CLOUDFLARE_ACCOUNT_ID'),
    databaseId: requireEnv('CLOUDFLARE_DATABASE_ID'),
    token: requireEnv('CLOUDFLARE_D1_TOKEN'),
  },
});
