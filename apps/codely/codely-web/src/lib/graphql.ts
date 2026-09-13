const endpoint = process.env['CODELY_GRAPHQL_URL'] ?? 'http://127.0.0.1:4001';

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string }[];
};

/**
 * Minimal server-side GraphQL client for the codely-service worker.
 * Run the API with `bunx nx run @codely/codely-service:dev`.
 */
export async function graphqlRequest<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join('; '));
  }

  if (!payload.data) {
    throw new Error('GraphQL response contained no data');
  }

  return payload.data;
}

export type SnippetSummary = {
  id: string;
  title: string;
  description: string | null;
  language: string;
  code: string;
  tags: string[];
  createdAt: string;
  author: { id: string; userName: string } | null;
};

export type UserSummary = {
  id: string;
  userName: string;
  email: string;
};

export const GET_SNIPPETS = /* GraphQL */ `
  query GetSnippets($limit: Int) {
    getSnippets(limit: $limit) {
      id
      title
      description
      language
      code
      tags
      createdAt
      author {
        id
        userName
      }
    }
  }
`;

export const GET_USERS = /* GraphQL */ `
  query GetUsers {
    getUsers {
      id
      userName
      email
    }
  }
`;

export const CREATE_USER = /* GraphQL */ `
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      message
    }
  }
`;

export const CREATE_SNIPPET = /* GraphQL */ `
  mutation CreateSnippet($input: SnippetInput!) {
    createSnippet(input: $input) {
      message
    }
  }
`;

export const DELETE_SNIPPET = /* GraphQL */ `
  mutation DeleteSnippet($snippetId: ID!, $authorId: ID!) {
    deleteSnippet(snippetId: $snippetId, authorId: $authorId) {
      message
    }
  }
`;
