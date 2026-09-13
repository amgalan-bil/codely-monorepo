'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { CSSProperties } from 'react';
import { programs } from '@/data/programs';

const sections = [
  { label: 'Community', href: '/community', icon: '🏠' },
  { label: 'Leaderboards', href: '/community/leaderboards', icon: '🏆' },
  { label: 'Project Showcase', href: '/community/project-showcase', icon: '🚀' },
  { label: 'Monthly Challenge', href: '/community/monthly-challenge', icon: '⚡' },
];

export function CommunityNav() {
  const pathname = usePathname();
  const channel = useSearchParams().get('channel');

  return (
    <nav className="lg:sticky lg:top-20 lg:h-fit">
      <ul className="space-y-0.5">
        {sections.map((section) => {
          const active = pathname === section.href && !channel;
          return (
            <li key={section.href}>
              <Link
                href={section.href}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] transition-colors ${
                  active
                    ? 'bg-brand/12 font-semibold text-white'
                    : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span className="w-5 text-center text-[15px] leading-none">{section.icon}</span>
                <span className="flex-1">{section.label}</span>
                {active ? <span className="size-1.5 rounded-full bg-brand-soft" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="my-4 h-px bg-hairline" />

      <p className="px-3.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
        Channels
      </p>
      <ul className="mt-2 space-y-0.5">
        {programs.map((program) => {
          const active = channel === program.slug;
          return (
            <li key={program.slug}>
              <Link
                href={`/community?channel=${program.slug}`}
                style={{ '--track': program.color } as CSSProperties}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-[13.5px] transition-colors ${
                  active ? 'bg-white/[0.07] font-semibold' : 'hover:bg-white/[0.05]'
                }`}
              >
                <span className="w-5 text-center text-[14px] leading-none">{program.icon}</span>
                <span className="track-text flex-1">{program.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
