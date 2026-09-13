import { GraphQLError } from 'graphql';
import type { QueryResolvers } from '../../../types/index';

export const getUsers: QueryResolvers['getUsers'] = async (_, __, { db }) => {
  try {
    return await db.query.usersTable.findMany({
      orderBy: (users, { desc }) => desc(users.createdAt),
    });
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to load users: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};

export const getUserById: QueryResolvers['getUserById'] = async (
  _,
  { userId },
  { db },
) => {
  if (!userId) {
    throw new GraphQLError('userId is required', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  try {
    const user = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    });

    return user ?? null;
  } catch (err: unknown) {
    if (err instanceof GraphQLError) throw err;
    throw new GraphQLError(
      `Failed to load user: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
  }
};
