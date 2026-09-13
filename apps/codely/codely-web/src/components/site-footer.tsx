'use client';

import Link from 'next/link';
import { CodelyMark } from './codely-logo';
import { programs } from '@/data/programs';
import { useLocale } from '@/lib/i18n';

export function SiteFooter() {
  const { t } = useLocale();

  const columns = [
    {
      title: t('footer.programs'),
      links: programs.map((program) => ({
        label: program.name,
        href: `/programs/${program.slug}`,
      })),
    },
    {
      title: t('footer.learn'),
      links: [
        { label: t('nav.fullCourses'), href: '/academy' },
        { label: t('nav.challengePacks'), href: '/challenges' },
        { label: t('nav.community'), href: '/community' },
        { label: t('nav.monthlyChallenge'), href: '/community/monthly-challenge' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('nav.aboutCodely'), href: '/about' },
        { label: t('nav.ourTeam'), href: '/about#team' },
        { label: t('footer.careers'), href: '/about#careers' },
        { label: t('footer.contact'), href: '/about#contact' },
      ],
    },
  ];

  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto w-full max-w-[1130px] px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <CodelyMark size={30} />
              <span className="font-display text-[17px] font-bold text-white">Codely</span>
            </Link>
            <p className="mt-4 max-w-[260px] text-[13.5px] leading-relaxed text-zinc-400">
              {t('footer.tagline')}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[13.5px] font-bold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11.5px] text-zinc-500">{t('footer.rights')}</p>
          <p className="font-mono text-[11.5px] text-zinc-500">{t('footer.madeIn')}</p>
        </div>
      </div>
    </footer>
  );
}
