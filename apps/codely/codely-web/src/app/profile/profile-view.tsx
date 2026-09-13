'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Globe, Lock, Play } from 'lucide-react';
import { StreakCalendar } from '@/components/streak-calendar';
import {
  activeLessons,
  badges,
  completedLessons,
  nextLessons,
  profile,
} from '@/data/profile';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'lessons', label: 'My Lessons' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'community', label: 'Community' },
];

export function ProfileView() {
  const router = useRouter();
  // The tab lives in the URL so the header account menu can deep-link into it.
  const tab = useSearchParams().get('tab') ?? 'overview';

  const levelSpan = profile.levelCeiling - profile.levelFloor;
  const levelProgress = Math.round(((profile.totalXp - profile.levelFloor) / levelSpan) * 100);
  const toNextLevel = profile.levelCeiling - profile.totalXp;

  return (
    <main>
      {/* ------------------------------------------------------------- banner */}
      <section className="border-b border-hairline bg-[linear-gradient(120deg,rgb(124_58_237/16%),rgb(6_182_212/6%))]">
        <div className="mx-auto flex w-full max-w-[1130px] flex-wrap items-center gap-8 px-6 py-10">
          <div className="relative">
            <span className="flex size-[76px] items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-black font-display text-[26px] font-bold text-white">
              {profile.initials}
            </span>
            <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {badges
                .filter((badge) => badge.earned)
                .map((badge) => (
                  <span
                    key={badge.id}
                    title={badge.name}
                    className="flex size-6 items-center justify-center rounded-full text-[11px] ring-2 ring-surface"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${badge.color} 30%, #12121a)`,
                    }}
                  >
                    {badge.icon}
                  </span>
                ))}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-[30px] font-bold leading-tight text-white">{profile.name}</h1>
            <p className="mt-1 font-mono text-[12px] text-zinc-400">
              {profile.handle} · Enrolled since {profile.since}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <span className="rounded-lg bg-brand/15 px-3 py-1.5 font-mono text-[11.5px] text-brand-soft">
                {profile.programs.join(' · ')}
              </span>
              <span className="rounded-lg bg-emerald-500/12 px-3 py-1.5 font-mono text-[11.5px] text-emerald-400">
                🔥 {profile.streak} day streak
              </span>
            </div>
          </div>

          <dl className="flex gap-3">
            {[
              { value: profile.totalXp.toLocaleString(), label: 'Total XP', tone: 'text-amber-400' },
              { value: `#${profile.rank}`, label: 'Rank', tone: 'text-brand-soft' },
              { value: String(profile.completed), label: 'Completed', tone: 'text-emerald-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-hairline bg-surface-2 px-5 py-4 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className={`font-display text-[24px] font-bold ${stat.tone}`}>{stat.value}</dd>
                <p className="mt-0.5 font-mono text-[10.5px] text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --------------------------------------------------------------- tabs */}
      <nav className="border-b border-hairline">
        <div className="mx-auto flex w-full max-w-[1130px] gap-2 px-6 py-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                router.replace(item.id === 'overview' ? '/profile' : `/profile?tab=${item.id}`, {
                  scroll: false,
                })
              }
              aria-current={item.id === tab}
              className={`h-9 rounded-lg px-4 text-[13.5px] font-semibold transition-colors ${
                item.id === tab
                  ? 'bg-brand text-white'
                  : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="mx-auto w-full max-w-[1130px] px-6 py-10">
        {tab === 'overview' ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_296px]">
            <div className="min-w-0 space-y-6">
              <StreakCalendar streak={profile.streak} />

              <section className="rounded-2xl border border-hairline bg-surface-2 p-5">
                <h2 className="text-[15px] font-bold text-white">📚 Current Lessons</h2>
                <ul className="mt-4 space-y-5">
                  {activeLessons.map((lesson) => (
                    <li key={lesson.title}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-[14.5px] font-bold text-white">
                            {lesson.title}
                          </p>
                          <p className="mt-0.5 font-mono text-[11.5px] text-zinc-500">
                            {lesson.programName} · {lesson.chapter}
                          </p>
                        </div>
                        <Link
                          href={`/academy/${lesson.courseId}`}
                          className="shrink-0 rounded-lg bg-brand/15 px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-soft transition-colors hover:bg-brand/25"
                        >
                          Continue
                        </Link>
                      </div>
                      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-soft"
                          style={{ width: `${lesson.percent}%` }}
                        />
                      </div>
                      <p className="mt-1.5 font-mono text-[11px] text-zinc-500">
                        {lesson.percent}% complete
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-hairline bg-surface-2 p-5">
                <h2 className="text-[15px] font-bold text-white">✨ Up Next</h2>
                <ul className="mt-4 space-y-2.5">
                  {nextLessons.map((lesson) => (
                    <li key={lesson.title}>
                      <Link
                        href={`/academy/${lesson.courseId}`}
                        className="flex items-center gap-3.5 rounded-xl border border-hairline bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                          <Play className="size-3.5 fill-current" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-bold text-white">
                            {lesson.title}
                          </p>
                          <p className="font-mono text-[11px] text-zinc-500">
                            {lesson.programName} · {lesson.level}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-amber-500/12 px-2.5 py-1 font-mono text-[11px] text-amber-400">
                          +{lesson.xp} XP
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
              <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
                <h2 className="text-[14px] font-bold text-white">Level Progress</h2>
                <p className="mt-4 text-center font-display text-[40px] font-bold leading-none text-brand-soft">
                  {profile.level}
                </p>
                <p className="mt-1 text-center font-mono text-[11px] text-zinc-500">
                  Current Level
                </p>

                <div className="mt-5 flex items-baseline justify-between font-mono text-[11px] text-zinc-500">
                  <span>{profile.totalXp.toLocaleString()} XP</span>
                  <span>{profile.levelCeiling.toLocaleString()} XP</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-soft"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-[11px] text-zinc-500">
                  {toNextLevel} XP to Level {profile.level + 1}
                </p>
              </div>

              <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
                <h2 className="text-[14px] font-bold text-white">Badges</h2>
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {badges
                    .filter((badge) => badge.earned)
                    .map((badge) => (
                      <div key={badge.id} className="text-center">
                        <span
                          className="mx-auto flex size-11 items-center justify-center rounded-xl text-[17px]"
                          style={{
                            backgroundColor: `color-mix(in oklab, ${badge.color} 18%, transparent)`,
                            border: `1px solid color-mix(in oklab, ${badge.color} 34%, transparent)`,
                          }}
                        >
                          {badge.icon}
                        </span>
                        <p className="mt-1.5 font-mono text-[10px] text-zinc-500">{badge.name}</p>
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  onClick={() => router.replace('/profile?tab=achievements', { scroll: false })}
                  className="mt-4 h-9 w-full rounded-lg bg-brand/12 text-[12.5px] font-semibold text-brand-soft transition-colors hover:bg-brand/20"
                >
                  View All Badges →
                </button>
              </div>

              <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.06] p-5">
                <h2 className="flex items-center gap-2 text-[14px] font-bold text-white">
                  <Globe className="size-4" />
                  Explore Community
                </h2>
                <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-400">
                  Share your projects, join challenges, and learn with peers.
                </p>
                <Link
                  href="/community"
                  className="mt-4 flex h-10 items-center justify-center rounded-lg bg-cyan-500 text-[13px] font-bold text-black transition-colors hover:bg-cyan-400"
                >
                  Go to Community →
                </Link>
              </div>
            </aside>
          </div>
        ) : null}

        {tab === 'lessons' ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="text-[22px] font-bold text-white">In Progress</h2>
              <ul className="mt-5 space-y-4">
                {activeLessons.map((lesson) => (
                  <li
                    key={lesson.title}
                    className="rounded-2xl border border-hairline bg-surface-2 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-[15.5px] font-bold text-white">
                          {lesson.title}
                        </p>
                        <p className="mt-0.5 font-mono text-[11.5px] text-zinc-500">
                          {lesson.programName}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-amber-500/12 px-2.5 py-1 font-mono text-[11px] text-amber-400">
                        ⚡ {lesson.xp} XP
                      </span>
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-soft"
                        style={{ width: `${lesson.percent}%` }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-mono text-[11.5px] text-zinc-500">
                        {lesson.percent}%
                      </span>
                      <Link
                        href={`/academy/${lesson.courseId}`}
                        className="rounded-lg bg-brand px-4 py-1.5 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-strong"
                      >
                        Continue
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[22px] font-bold text-white">Completed</h2>
              <ul className="mt-5 space-y-2.5">
                {completedLessons.map((lesson) => (
                  <li
                    key={lesson.title}
                    className="flex items-center gap-3.5 rounded-xl border border-hairline bg-surface-2 px-4 py-3.5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                      <Check className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-bold text-white">{lesson.title}</p>
                      <p className="font-mono text-[11px] text-zinc-500">
                        {lesson.programName} · {lesson.date}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber-500/12 px-2.5 py-1 font-mono text-[11px] text-amber-400">
                      +{lesson.xp}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        {tab === 'achievements' ? (
          <section>
            <h2 className="text-[22px] font-bold text-white">All Badges &amp; Achievements</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {badges.map((badge) => (
                <article
                  key={badge.id}
                  className={`rounded-2xl border p-6 text-center ${
                    badge.earned ? 'border-hairline bg-surface-2' : 'border-hairline bg-surface-2/50'
                  }`}
                >
                  <span
                    className={`mx-auto flex size-14 items-center justify-center rounded-2xl text-[24px] ${
                      badge.earned ? '' : 'opacity-40 grayscale'
                    }`}
                    style={{
                      backgroundColor: badge.earned
                        ? `color-mix(in oklab, ${badge.color} 16%, transparent)`
                        : 'rgb(255 255 255 / 4%)',
                      border: badge.earned
                        ? `1px solid color-mix(in oklab, ${badge.color} 38%, transparent)`
                        : '1px solid transparent',
                    }}
                  >
                    {badge.icon}
                  </span>
                  <h3
                    className={`mt-4 text-[15px] font-bold ${
                      badge.earned ? 'text-white' : 'text-zinc-600'
                    }`}
                  >
                    {badge.name}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] text-zinc-500">{badge.description}</p>
                  <p
                    className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[11.5px]"
                    style={{ color: badge.earned ? badge.color : undefined }}
                  >
                    {badge.earned ? (
                      <>
                        <Check className="size-3" /> Earned
                      </>
                    ) : (
                      <span className="flex items-center gap-1.5 text-zinc-600">
                        <Lock className="size-3" /> Locked
                      </span>
                    )}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'community' ? (
          <section className="py-16 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-cyan-500/12 text-cyan-400">
              <Globe className="size-8" />
            </span>
            <h2 className="mt-6 text-[24px] font-bold text-white">Join the Conversation</h2>
            <p className="mx-auto mt-2 max-w-[420px] text-[14px] leading-relaxed text-zinc-400">
              Share your projects, ask questions, and grow with the Codely community.
            </p>
            <Link
              href="/community"
              className="mt-7 inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-brand to-black px-6 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Explore Community →
            </Link>
          </section>
        ) : null}

        {tab === 'settings' ? (
          <section className="py-16 text-center">
            <h2 className="text-[24px] font-bold text-white">Settings</h2>
            <p className="mx-auto mt-2 max-w-[440px] text-[14px] leading-relaxed text-zinc-400">
              Account settings unlock once sign-in is connected. Language can be switched from the
              EN / MN toggle in the header meanwhile.
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
