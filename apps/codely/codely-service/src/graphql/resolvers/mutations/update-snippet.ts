import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { snippetsTable } from '../../../db/index';
import type { MutationResolvers } from '../../../types/index';

export const updateSnippet: MutationResolvers['updateSnippet'] = async (
  _,
  { snippetId, authorId, input },
  { db },
) => {
  try {
    const [snippet] = await db
      .select({ id: snippetsTable.id, authorId: snippetsTable.authorId })
      .from(snippetsTable)
      .where(eq(snippetsTable.id, snippetId))
      .limit(1);

    if (!snippet) {
      throw new GraphQLError('Snippet not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    if (snippet.authorId !== authorId) {
      throw new GraphQLError('You can only edit your own snippets', {
        extensions: { code: 'FORBIDDEN' },
      });
    }

    // Only send the fields the caller actually provided.
    const patch = Object.fromEntries(
      Object.entries(input).filter(
        ([, value]) => value !== undefined && value !== null,
      ),
    );

    if (Object.keys(patch).length === 0) {
      throw new GraphQLError('Nothing to update', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    await db
      .update(snippetsTable)
      .set(patch)
      .where(eq(snippetsTable.id, snippetId));

    return { message: 'Snippet updated successfully' };
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to update snippet: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};
