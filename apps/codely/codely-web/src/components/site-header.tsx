'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { CodelyLogo } from './codely-logo';
import { programs } from '@/data/programs';
import { badges, profile } from '@/data/profile';
import { useLocale, type TranslationKey } from '@/lib/i18n';

type MenuItem = {
  label: string;
  href: string;
  icon?: string;
  /** Colour token, so program entries read as themselves in the menu. */
  color?: string;
};

type NavItem = {
  key: TranslationKey;
  href: string;
  menu?: MenuItem[];
};

const alumniChannels = programs.map((program) => ({
  label: `${program.name} Alumni`,
  href: `/community?channel=${program.slug}`,
  icon: program.icon,
  color: program.color,
}));

const navItems: NavItem[] = [
  { key: 'nav.home', href: '/' },
  {
    key: 'nav.programs',
    href: '/programs',
    menu: programs.map((program) => ({
      label: program.name,
      href: `/programs/${program.slug}`,
      icon: program.icon,
      color: program.color,
    })),
  },
  {
    key: 'nav.academy',
    href: '/academy',
    menu: [
      { label: 'Full Courses', href: '/academy', icon: '📚' },
      { label: 'Challenge Packs', href: '/challenges', icon: '🃏' },
    ],
  },
  {
    key: 'nav.community',
    href: '/community',
    menu: [
      { label: 'Home', href: '/community', icon: '🏠' },
      { label: 'Project Showcase', href: '/community/project-showcase', icon: '🚀' },
      { label: 'Monthly Challenge', href: '/community/monthly-challenge', icon: '🏆' },
      ...alumniChannels,
    ],
  },
  {
    key: 'nav.about',
    href: '/about',
    menu: [
      { label: 'About Codely', href: '/about', icon: '🏔️' },
      { label: 'Our Team', href: '/about#team', icon: '👥' },
    ],
  },
];

/** Menu labels come from the dictionary when a translation exists. */
const menuKeys: Record<string, TranslationKey> = {
  'Full Courses': 'nav.fullCourses',
  'Challenge Packs': 'nav.challengePacks',
  Home: 'nav.communityHome',
  'Project Showcase': 'nav.showcase',
  'Monthly Challenge': 'nav.monthlyChallenge',
  'About Codely': 'nav.aboutCodely',
  'Our Team': 'nav.ourTeam',
};

const earnedBadges = badges.filter((badge) => badge.earned);

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  // A gap between the trigger and the panel would close the menu mid-move, so
  // the panel sits flush under the trigger with transparent padding as the
  // bridge, and leaving anywhere in the group only closes after a short delay.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDropdown(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  }

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Route changes should never leave a panel hanging open.
  useEffect(() => {
    setOpenMenu(null);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!accountOpen) return undefined;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setAccountOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [accountOpen]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const term = query.trim();
    if (term) router.push(`/academy?q=${encodeURIComponent(term)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[52px] w-full max-w-[1240px] items-center gap-8 px-6">
        <Link href="/" aria-label="Codely home" className="text-white">
          <CodelyLogo height={19} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const label = t(item.key);
            const active = isActive(item.href);
            const open = openMenu === item.key;

            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.menu && openDropdown(item.key)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  aria-expanded={item.menu ? open : undefined}
                  className={`flex h-[52px] items-center gap-1 px-3 text-[13.5px] font-semibold transition-colors ${
                    active || open ? 'text-brand-soft' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {label}
                  {item.menu ? (
                    <ChevronDown
                      className={`size-3.5 opacity-70 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  ) : null}
                </Link>

                {item.menu ? (
                  <div
                    // Sits flush against the trigger; the padding is the bridge
                    // the cursor crosses without ever leaving the hover group.
                    className={`absolute left-0 top-full pt-1 transition-opacity duration-150 ${
                      open ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <div className="min-w-[218px] rounded-xl border border-hairline bg-surface-2 py-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/85%)]">
                      {item.menu.map((entry) => {
                        const key = menuKeys[entry.label];
                        return (
                          <Link
                            key={entry.href + entry.label}
                            href={entry.href}
                            style={{ '--track': entry.color } as CSSProperties}
                            className="flex items-center gap-2.5 px-4 py-2 text-[13.5px] text-zinc-200 transition-colors hover:bg-white/[0.05] hover:text-white"
                          >
                            <span className="w-5 text-center text-[15px] leading-none">
                              {entry.icon}
                            </span>
                            <span className={entry.color ? 'track-text' : undefined}>
                              {key ? t(key) : entry.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          <div className="flex items-center rounded-full border border-hairline bg-white/[0.03] p-0.5">
            {(['en', 'mn'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-bold transition-colors ${
                  locale === code
                    ? 'bg-brand text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          {searchOpen ? (
            <form
              onSubmit={submitSearch}
              className="flex h-8 items-center gap-2 rounded-full border border-hairline bg-white/[0.04] pl-3 pr-2"
            >
              <Search className="size-3.5 shrink-0 text-zinc-400" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('common.searchPlaceholder')}
                aria-label={t('common.search')}
                className="w-40 bg-transparent font-mono text-[12px] text-white placeholder:text-zinc-500 focus:outline-none lg:w-56"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => {
                  setQuery('');
                  setSearchOpen(false);
                }}
                className="text-zinc-500 transition-colors hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              aria-label={t('common.search')}
              onClick={() => setSearchOpen(true)}
              className="flex size-8 items-center justify-center rounded-full border border-hairline bg-white/[0.03] text-zinc-400 transition-colors hover:text-white"
            >
              <Search className="size-4" />
            </button>
          )}

          <div className="relative">
            <button
              type="button"
              aria-label="Account"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
              className="relative block shrink-0"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-brand font-mono text-[11px] font-bold text-white">
                {profile.initials}
              </span>
              <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-amber-500 text-[7px] ring-2 ring-surface">
                {earnedBadges.length}
              </span>
            </button>

            {accountOpen ? (
              <>
                <button
                  type="button"
                  aria-hidden
                  tabIndex={-1}
                  onClick={() => setAccountOpen(false)}
                  className="fixed inset-0 z-0 cursor-default"
                />
                <div className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-hairline bg-surface-2 py-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/85%)]">
                  <div className="flex items-center gap-2.5 px-4 pb-3 pt-1">
                    <span className="flex size-9 items-center justify-center rounded-full bg-brand font-mono text-[11px] font-bold text-white">
                      {profile.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-white">
                        {profile.name.split(' ')[0]}.{profile.name.split(' ')[1]?.[0]}
                      </p>
                      <p className="font-mono text-[10.5px] text-zinc-500">
                        Level {profile.level} · {profile.totalXp.toLocaleString()} XP
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 px-4 pb-2">
                    {earnedBadges.map((badge) => (
                      <span
                        key={badge.id}
                        title={badge.name}
                        className="flex size-6 items-center justify-center rounded-full text-[11px]"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${badge.color} 22%, transparent)`,
                        }}
                      >
                        {badge.icon}
                      </span>
                    ))}
                  </div>
                  {[
                    { key: 'account.myProfile' as const, href: '/profile', icon: '👤' },
                    { key: 'account.myCourses' as const, href: '/profile?tab=lessons', icon: '📚' },
                    { key: 'account.achievements' as const, href: '/profile?tab=achievements', icon: '🏆' },
                    { key: 'account.settings' as const, href: '/profile?tab=settings', icon: '⚙️' },
                  ].map((entry) => (
                    <Link
                      key={entry.key}
                      href={entry.href}
                      className="flex items-center gap-2.5 px-4 py-2 text-[13.5px] text-zinc-200 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <span className="w-4 text-center leading-none">{entry.icon}</span>
                      {t(entry.key)}
                    </Link>
                  ))}
                  <div className="my-1.5 h-px bg-hairline" />
                  <Link
                    href="/signin"
                    className="flex items-center gap-2.5 px-4 py-2 text-[13.5px] text-red-400 transition-colors hover:bg-white/[0.05]"
                  >
                    <span className="w-4 text-center leading-none">🚪</span>
                    {t('account.signOut')}
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
