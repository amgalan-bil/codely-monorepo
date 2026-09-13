import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { commentsTable, snippetsTable } from '../../../db/index';
import type { MutationResolvers } from '../../../types/index';

export const createComment: MutationResolvers['createComment'] = async (
  _,
  { input },
  { db },
) => {
  const { snippetId, authorId, body } = input;

  if (!body.trim()) {
    throw new GraphQLError('Comment body cannot be empty', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  try {
    const [snippet] = await db
      .select({ id: snippetsTable.id })
      .from(snippetsTable)
      .where(eq(snippetsTable.id, snippetId))
      .limit(1);

    if (!snippet) {
      throw new GraphQLError('Snippet not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    await db.insert(commentsTable).values({
      snippetId,
      authorId,
      body: body.trim(),
    });

    return { message: 'Comment created successfully' };
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to create comment: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};
