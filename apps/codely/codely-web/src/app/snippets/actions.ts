'use server';

import { revalidatePath } from 'next/cache';
import {
  CREATE_SNIPPET,
  CREATE_USER,
  DELETE_SNIPPET,
  graphqlRequest,
} from '../../lib/graphql';

type MutationResult = { message: string };

function requireField(formData: FormData, field: string): string {
  const value = formData.get(field);
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

export async function createUserAction(formData: FormData): Promise<void> {
  await graphqlRequest<{ createUser: MutationResult }>(CREATE_USER, {
    input: {
      userName: requireField(formData, 'userName'),
      email: requireField(formData, 'email'),
    },
  });

  revalidatePath('/snippets');
}

export async function createSnippetAction(formData: FormData): Promise<void> {
  const tags = formData.get('tags');

  await graphqlRequest<{ createSnippet: MutationResult }>(CREATE_SNIPPET, {
    input: {
      authorId: requireField(formData, 'authorId'),
      title: requireField(formData, 'title'),
      language: requireField(formData, 'language'),
      code: requireField(formData, 'code'),
      description: formData.get('description')?.toString().trim() || null,
      tags:
        typeof tags === 'string' && tags.trim()
          ? tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
    },
  });

  revalidatePath('/snippets');
}

export async function deleteSnippetAction(formData: FormData): Promise<void> {
  await graphqlRequest<{ deleteSnippet: MutationResult }>(DELETE_SNIPPET, {
    snippetId: requireField(formData, 'snippetId'),
    authorId: requireField(formData, 'authorId'),
  });

  revalidatePath('/snippets');
}
