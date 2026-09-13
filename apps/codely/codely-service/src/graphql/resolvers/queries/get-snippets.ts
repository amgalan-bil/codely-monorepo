import { GraphQLError } from 'graphql';
import type { QueryResolvers } from '../../../types/index';

const MAX_LIMIT = 100;

export const getSnippets: QueryResolvers['getSnippets'] = async (
  _,
  { visibility, limit },
  { db },
) => {
  try {
    return await db.query.snippetsTable.findMany({
      where: visibility
        ? (snippets, { eq }) => eq(snippets.visibility, visibility)
        : undefined,
      limit: Math.min(limit ?? 25, MAX_LIMIT),
      orderBy: (snippets, { desc }) => desc(snippets.createdAt),
    });
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to load snippets: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};

export const getSnippetById: QueryResolvers['getSnippetById'] = async (
  _,
  { snippetId },
  { db },
) => {
  if (!snippetId) {
    throw new GraphQLError('snippetId is required', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  try {
    const snippet = await db.query.snippetsTable.findFirst({
      where: (snippets, { eq }) => eq(snippets.id, snippetId),
    });

    return snippet ?? null;
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to load snippet: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};

export const getSnippetsByUserId: QueryResolvers['getSnippetsByUserId'] =
  async (_, { userId }, { db }) => {
    if (!userId) {
      throw new GraphQLError('userId is required', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    try {
      return await db.query.snippetsTable.findMany({
        where: (snippets, { eq }) => eq(snippets.authorId, userId),
        orderBy: (snippets, { desc }) => desc(snippets.createdAt),
      });
    } catch (err: unknown) {
      if (err instanceof GraphQLError) throw err;
      throw new GraphQLError(
        `Failed to load snippets: ${err instanceof Error ? err.message : 'unknown error'}`,
      );
    }
  };
