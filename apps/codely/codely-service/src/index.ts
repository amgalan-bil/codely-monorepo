import { ApolloServer, type GraphQLRequestContext } from '@apollo/server';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import type { ExecutionContext } from '@cloudflare/workers-types';
import { drizzleProvider } from './drizzle-provider/index';
import { resolvers } from './graphql/resolvers/index';
import { typeDefs } from './graphql/schemas/index';
import type { GraphQLContext } from './types/index';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Requested-With',
};

const corsPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse(ctx: GraphQLRequestContext<GraphQLContext>) {
        if (!ctx.response.http) return;
        Object.entries(corsHeaders).forEach(([key, value]) => {
          ctx.response.http?.headers.set(key, value);
        });
      },
    };
  },
};

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [corsPlugin],
});

const handler = startServerAndCreateCloudflareWorkersHandler<
  Env,
  GraphQLContext
>(server, {
  context: async ({ env }) => ({
    db: drizzleProvider(env.DB),
    env,
  }),
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const response = await handler(request, env, ctx);

    // The handler's response is immutable, so copy it before stamping CORS on.
    const corsResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      corsResponse.headers.set(key, value);
    });

    return corsResponse;
  },
};
