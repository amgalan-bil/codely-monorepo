import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { snippetsTable } from '../../../db/index';
import type { MutationResolvers } from '../../../types/index';

export const deleteSnippet: MutationResolvers['deleteSnippet'] = async (
  _,
  { snippetId, authorId },
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
      throw new GraphQLError('You can only delete your own snippets', {
        extensions: { code: 'FORBIDDEN' },
      });
    }

    // Comments are removed by the `on delete cascade` on comments_table.
    await db.delete(snippetsTable).where(eq(snippetsTable.id, snippetId));

    return { message: 'Snippet deleted successfully' };
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to delete snippet: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};
