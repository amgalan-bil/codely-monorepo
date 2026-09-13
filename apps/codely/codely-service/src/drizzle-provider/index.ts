import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import * as schema from '../db/index';

export type Database = DrizzleD1Database<typeof schema>;

export const drizzleProvider = (d1: D1Database): Database =>
  drizzle(d1 as never, { schema });
