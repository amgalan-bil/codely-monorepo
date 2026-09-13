import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { snippetsTable, usersTable } from '../../../db/index';
import type { MutationResolvers } from '../../../types/index';

export const createSnippet: MutationResolvers['createSnippet'] = async (
  _,
  { input },
  { db },
) => {
  const { authorId, title, language, code, description, tags, visibility } =
    input;

  try {
    const [author] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.id, authorId))
      .limit(1);

    if (!author) {
      throw new GraphQLError('Author does not exist', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    await db.insert(snippetsTable).values({
      authorId,
      title,
      language,
      code,
      description: description ?? null,
      tags: tags ?? [],
      visibility: visibility ?? 'PUBLIC',
    });

    return { message: 'Snippet created successfully' };
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to create snippet: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};
