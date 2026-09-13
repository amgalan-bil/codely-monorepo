import Link from 'next/link';
import { Suspense, type ReactNode } from 'react';
import { CommunityNav } from './community-nav';

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <section className="border-b border-hairline bg-[linear-gradient(180deg,rgb(124_58_237/9%),transparent)]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-10">
          <div>
            <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-brand-soft">
              // Community
            </p>
            <h1 className="mt-2 text-[38px] font-bold leading-tight text-white">Build Together</h1>
            <p className="mt-1.5 text-[13.5px] text-zinc-400">
              Share projects · ask questions · grow with Mongolia&apos;s coding community
            </p>
          </div>

          <Link
            href="/community#compose"
            className="rounded-xl bg-brand px-5 py-3 text-[14px] font-bold text-white transition-colors hover:bg-brand-strong"
          >
            + New Post
          </Link>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 py-10 lg:grid-cols-[214px_1fr]">
        <Suspense fallback={null}>
          <CommunityNav />
        </Suspense>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
