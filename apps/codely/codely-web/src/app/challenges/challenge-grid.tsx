'use client';

import { useState } from 'react';
import { challengeLanguages, challengePacks } from '@/data/challenges';
import { PackCard } from './pack-card';

export function ChallengeGrid() {
  const [language, setLanguage] = useState('All');

  const visible =
    language === 'All'
      ? challengePacks
      : challengePacks.filter((pack) => pack.language === language);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5">
        {challengeLanguages.map((item) => {
          const active = item === language;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              aria-pressed={active}
              className={`h-9 rounded-full px-5 text-[13.5px] font-semibold transition-colors ${
                active
                  ? 'bg-white text-black'
                  : 'border border-hairline bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mx-auto mt-12 grid max-w-[860px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-[13.5px] text-zinc-500">
          {language} багц удахгүй нэмэгдэнэ.
        </p>
      )}
    </>
  );
}
