'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState, type CSSProperties } from 'react';
import { Heart, MessageSquare, Share2, Star } from 'lucide-react';
import { communityStats, posts as seedPosts, trendingTags, type Post } from '@/data/community';
import { programs } from '@/data/programs';
import { profile } from '@/data/profile';

const sorts = ['Recent', 'Popular', 'Following'] as const;
type Sort = (typeof sorts)[number];

function programName(slug: string) {
  return programs.find((program) => program.slug === slug)?.name ?? slug;
}

function programColor(slug: string) {
  return programs.find((program) => program.slug === slug)?.color ?? 'var(--brand)';
}

export function CommunityFeed() {
  const channel = useSearchParams().get('channel');

  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [liked, setLiked] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>('Recent');
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState({ title: '', body: '', tags: '' });

  const visible = useMemo(() => {
    const scoped = channel ? posts.filter((post) => post.author.program === channel) : posts;
    if (sort === 'Popular') return [...scoped].sort((a, b) => b.likes - a.likes);
    // "Following" has no follow graph yet, so it mirrors Recent with pins first.
    return [...scoped].sort((a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false));
  }, [channel, posts, sort]);

  function toggleLike(id: string) {
    setLiked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function publish(event: React.FormEvent) {
    event.preventDefault();
    if (!draft.title.trim()) return;

    setPosts((current) => [
      {
        id: `local-${Date.now()}`,
        author: {
          name: profile.name,
          initials: profile.initials,
          program: channel ?? 'monpy',
        },
        time: 'just now',
        title: draft.title.trim(),
        body: draft.body.trim(),
        tags: draft.tags
          .split(/[\s,]+/)
          .filter(Boolean)
          .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)),
        likes: 0,
        comments: 0,
      },
      ...current,
    ]);
    setDraft({ title: '', body: '', tags: '' });
    setComposing(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_268px]">
      <div className="min-w-0">
        <div id="compose" className="flex flex-wrap items-center gap-2.5">
          {sorts.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSort(item)}
              aria-pressed={item === sort}
              className={`h-8 rounded-full px-4 text-[12.5px] font-semibold transition-colors ${
                item === sort
                  ? 'bg-brand/15 text-brand-soft'
                  : 'border border-hairline text-zinc-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setComposing((open) => !open)}
            className="ml-auto h-8 rounded-full bg-brand px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-strong"
          >
            {composing ? 'Cancel' : '+ New Post'}
          </button>
        </div>

        {composing ? (
          <form
            onSubmit={publish}
            className="mt-4 space-y-3 rounded-2xl border border-brand/25 bg-surface-2 p-5"
          >
            <input
              autoFocus
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              placeholder="What are you building?"
              className="w-full rounded-lg border border-hairline bg-white/[0.03] px-3.5 py-2.5 text-[14px] text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none"
            />
            <textarea
              value={draft.body}
              onChange={(event) => setDraft({ ...draft, body: event.target.value })}
              rows={3}
              placeholder="Share the details…"
              className="w-full resize-none rounded-lg border border-hairline bg-white/[0.03] px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none"
            />
            <input
              value={draft.tags}
              onChange={(event) => setDraft({ ...draft, tags: event.target.value })}
              placeholder="Tags — python, api"
              className="w-full rounded-lg border border-hairline bg-white/[0.03] px-3.5 py-2.5 font-mono text-[12.5px] text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] text-zinc-500">
                Posts stay on this device until accounts are live.
              </p>
              <button
                type="submit"
                className="h-9 rounded-lg bg-brand px-5 text-[13px] font-bold text-white transition-colors hover:bg-brand-strong"
              >
                Post
              </button>
            </div>
          </form>
        ) : null}

        <ul className="mt-5 space-y-4">
          {visible.map((post) => {
            const isLiked = liked.includes(post.id);
            return (
              <li
                key={post.id}
                style={{ '--track': programColor(post.author.program) } as CSSProperties}
                className="rounded-2xl border border-hairline bg-surface-2 p-5"
              >
                {post.pinned ? (
                  <p className="mb-3 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-soft">
                    <Star className="size-3 fill-current" />
                    Pinned
                  </p>
                ) : null}

                <div className="flex items-center gap-3">
                  <span className="track-icon flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold text-white">
                    {post.author.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="text-[13.5px] font-bold text-white">{post.author.name}</span>
                      <span className="track-pill rounded-md px-2 py-0.5 font-mono text-[10.5px]">
                        {programName(post.author.program)}
                      </span>
                    </p>
                    <p className="font-mono text-[11px] text-zinc-500">{post.time}</p>
                  </div>
                </div>

                <h2 className="mt-4 text-[16px] font-bold text-white">{post.title}</h2>
                {post.body ? (
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-zinc-400">{post.body}</p>
                ) : null}

                {post.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-5 border-t border-hairline pt-3.5">
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    aria-pressed={isLiked}
                    className={`flex items-center gap-1.5 font-mono text-[12px] transition-colors ${
                      isLiked ? 'text-pink-400' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`size-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    {post.likes + (isLiked ? 1 : 0)}
                  </button>
                  <span className="flex items-center gap-1.5 font-mono text-[12px] text-zinc-500">
                    <MessageSquare className="size-3.5" />
                    {post.comments}
                  </span>
                  <button
                    type="button"
                    className="ml-auto text-zinc-600 transition-colors hover:text-white"
                    aria-label="Share"
                  >
                    <Share2 className="size-3.5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 ? (
          <p className="mt-10 text-[13.5px] text-zinc-500">
            No posts in this channel yet — be the first.
          </p>
        ) : null}
      </div>

      <aside className="space-y-4 xl:sticky xl:top-20 xl:h-fit">
        <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
          <h2 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
            Community Stats
          </h2>
          <dl className="mt-4 space-y-2.5">
            {communityStats.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between">
                <dt className="text-[13px] text-zinc-400">{stat.label}</dt>
                <dd className="font-mono text-[12.5px] font-medium text-brand-soft">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
          <h2 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
            Trending Tags
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:bg-white/[0.1] hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
