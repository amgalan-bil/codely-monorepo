'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'en' | 'mn';

/**
 * UI strings, English first.
 *
 * Only chrome and repeated labels live here — the long-form page copy (program
 * descriptions, lesson bodies, challenge prompts) is content and belongs with
 * the data modules, where challenge prompts are already written in Mongolian.
 * A missing key renders its English value, so adding a string never breaks MN.
 */
const dictionary = {
  'nav.home': ['Home', 'Нүүр'],
  'nav.programs': ['Programs', 'Хөтөлбөрүүд'],
  'nav.academy': ['Academy', 'Академи'],
  'nav.community': ['Community', 'Нийгэмлэг'],
  'nav.about': ['About Us', 'Бидний тухай'],

  'nav.fullCourses': ['Full Courses', 'Бүтэн хичээлүүд'],
  'nav.challengePacks': ['Challenge Packs', 'Бодлогын багц'],
  'nav.communityHome': ['Home', 'Нүүр'],
  'nav.showcase': ['Project Showcase', 'Төслийн үзэсгэлэн'],
  'nav.leaderboards': ['Leaderboards', 'Тэргүүлэгчид'],
  'nav.monthlyChallenge': ['Monthly Challenge', 'Сарын тэмцээн'],
  'nav.aboutCodely': ['About Codely', 'Codely-н тухай'],
  'nav.ourTeam': ['Our Team', 'Манай баг'],
  'nav.alumni': ['Alumni', 'Төгсөгчид'],

  'account.myProfile': ['My Profile', 'Миний профайл'],
  'account.myCourses': ['My Courses', 'Миний хичээлүүд'],
  'account.achievements': ['Achievements', 'Амжилтууд'],
  'account.settings': ['Settings', 'Тохиргоо'],
  'account.signOut': ['Sign Out', 'Гарах'],
  'account.signIn': ['Sign In', 'Нэвтрэх'],
  'account.signUp': ['Sign Up', 'Бүртгүүлэх'],

  'common.search': ['Search', 'Хайх'],
  'common.searchPlaceholder': ['Search courses, projects, people…', 'Хичээл, төсөл, хүн хайх…'],
  'common.viewProgram': ['View Program', 'Хөтөлбөр үзэх'],
  'common.viewAllPrograms': ['View All Programs', 'Бүх хөтөлбөрийг үзэх'],
  'common.enrolled': ['enrolled', 'суралцагч'],
  'common.projects': ['projects', 'төсөл'],
  'common.weeks': ['weeks', 'долоо хоног'],
  'common.lessons': ['lessons', 'хичээл'],
  'common.exercises': ['Exercises', 'Дасгалууд'],
  'common.completed': ['Completed', 'Дууссан'],
  'common.locked': ['Locked', 'Түгжээтэй'],
  'common.startProject': ['Start Project', 'Төсөл эхлүүлэх'],
  'common.redoProject': ['Redo Project', 'Дахин хийх'],
  'common.continue': ['Continue', 'Үргэлжлүүлэх'],
  'common.back': ['Back', 'Буцах'],
  'common.next': ['Next', 'Дараах'],
  'common.run': ['Run', 'Ажиллуулах'],
  'common.submit': ['Submit answer', 'Хариу илгээх'],
  'common.terminal': ['Terminal', 'Терминал'],
  'common.all': ['All', 'Бүгд'],
  'common.beginner': ['Beginner', 'Анхан шат'],
  'common.intermediate': ['Intermediate', 'Дунд шат'],
  'common.advanced': ['Advanced', 'Ахисан шат'],

  'footer.tagline': [
    "Mongolia's premier coding academy. Building the next generation of tech talent.",
    'Монголын тэргүүлэх код бичлэгийн академи. Технологийн дараагийн үеийг бэлтгэнэ.',
  ],
  'footer.programs': ['Programs', 'Хөтөлбөрүүд'],
  'footer.learn': ['Learn', 'Суралцах'],
  'footer.company': ['Company', 'Компани'],
  'footer.careers': ['Careers', 'Ажлын байр'],
  'footer.contact': ['Contact', 'Холбоо барих'],
  'footer.rights': [
    '© 2026 Codely Coding Academy. All rights reserved.',
    '© 2026 Codely Coding Academy. Бүх эрх хуулиар хамгаалагдсан.',
  ],
  'footer.madeIn': ['Made with ♥ in Mongolia', 'Монголд ♥-ээр бүтээв'],
} satisfies Record<string, [string, string]>;

export type TranslationKey = keyof typeof dictionary;

type LocaleValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleValue | null>(null);

const STORAGE_KEY = 'codely.locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Server and first client render must agree, so the stored choice is applied
  // in an effect rather than read during render.
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'mn' || stored === 'en') setLocaleState(stored);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback(
    (key: TranslationKey) => dictionary[key][locale === 'mn' ? 1 : 0],
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used inside <LocaleProvider>');
  return value;
}
