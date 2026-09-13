import Link from 'next/link';
import { Badge } from '@codely/shadcn/ui/badge';
import { Button } from '@codely/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@codely/shadcn/ui/card';
import { Input } from '@codely/shadcn/ui/input';
import { Label } from '@codely/shadcn/ui/label';
import { Textarea } from '@codely/shadcn/ui/textarea';
import {
  GET_SNIPPETS,
  GET_USERS,
  graphqlRequest,
  type SnippetSummary,
  type UserSummary,
} from '../../lib/graphql';
import {
  createSnippetAction,
  createUserAction,
  deleteSnippetAction,
} from './actions';

// Every render hits the GraphQL worker, so nothing is prerendered at build time.
export const dynamic = 'force-dynamic';

type PageData = {
  snippets: SnippetSummary[];
  users: UserSummary[];
  error: string | null;
};

async function loadPageData(): Promise<PageData> {
  try {
    const [{ getSnippets }, { getUsers }] = await Promise.all([
      graphqlRequest<{ getSnippets: SnippetSummary[] }>(GET_SNIPPETS, {
        limit: 25,
      }),
      graphqlRequest<{ getUsers: UserSummary[] }>(GET_USERS),
    ]);

    return { snippets: getSnippets, users: getUsers, error: null };
  } catch (err: unknown) {
    return {
      snippets: [],
      users: [],
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

export default async function SnippetsPage() {
  const { snippets, users, error } = await loadPageData();

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Snippets</h1>
        <p className="text-muted-foreground">
          Served by <code>@codely/codely-service</code> — Apollo Server on a
          Cloudflare Worker, reading and writing D1 through Drizzle.
        </p>
        <Link
          href="/"
          className="text-muted-foreground w-fit text-sm underline underline-offset-4"
        >
          ← Back home
        </Link>
      </div>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle>The API is not reachable</CardTitle>
            <CardDescription>
              Start it with <code>bunx nx run @codely/codely-service:dev</code>{' '}
              and apply the migrations with{' '}
              <code>
                bunx nx run @codely/codely-service:drizzle:migrate-local
              </code>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Add an author</CardTitle>
          <CardDescription>
            Runs the <code>createUser</code> mutation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createUserAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="userName">Name</Label>
              <Input id="userName" name="userName" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <Button type="submit" className="w-fit">
              Create author
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New snippet</CardTitle>
          <CardDescription>
            Runs the <code>createSnippet</code> mutation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Create an author first — a snippet needs one.
            </p>
          ) : (
            <form action={createSnippetAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="authorId">Author</Label>
                <select
                  id="authorId"
                  name="authorId"
                  required
                  className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  name="language"
                  placeholder="typescript"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" placeholder="react, hooks" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="code">Code</Label>
                <Textarea id="code" name="code" rows={6} required />
              </div>
              <Button type="submit" className="w-fit">
                Save snippet
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Latest snippets
        </h2>

        {snippets.length === 0 && !error ? (
          <p className="text-muted-foreground text-sm">Nothing saved yet.</p>
        ) : null}

        {snippets.map((snippet) => (
          <Card key={snippet.id}>
            <CardHeader>
              <CardTitle>{snippet.title}</CardTitle>
              <CardDescription>
                {snippet.author?.userName ?? 'Unknown author'} ·{' '}
                {snippet.language} ·{' '}
                {new Date(snippet.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {snippet.description ? (
                <p className="text-muted-foreground text-sm">
                  {snippet.description}
                </p>
              ) : null}
              <pre className="bg-muted overflow-x-auto rounded-md p-4 text-xs">
                <code>{snippet.code}</code>
              </pre>
              {snippet.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </CardContent>
            <CardFooter>
              <form action={deleteSnippetAction}>
                <input type="hidden" name="snippetId" value={snippet.id} />
                <input
                  type="hidden"
                  name="authorId"
                  value={snippet.author?.id ?? ''}
                />
                <Button type="submit" variant="destructive" size="sm">
                  Delete
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
