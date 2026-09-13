import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { usersTable } from '../../../db/index';
import type { MutationResolvers } from '../../../types/index';

export const createUser: MutationResolvers['createUser'] = async (
  _,
  { input },
  { db },
) => {
  const { userName, email, avatarUrl, role } = input;

  try {
    const [existing] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existing) {
      throw new GraphQLError('A user with that email already exists', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    await db.insert(usersTable).values({
      userName,
      email,
      avatarUrl: avatarUrl ?? '',
      role: role ?? 'MEMBER',
    });

    return { message: 'User created successfully' };
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to create user: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};
