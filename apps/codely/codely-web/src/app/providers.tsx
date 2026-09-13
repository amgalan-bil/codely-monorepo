'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@codely/shadcn/ui/sonner';
import { LocaleProvider } from '@/lib/i18n';

export function Providers({ children }: { children: ReactNode }) {
  return (
    // forcedTheme keeps shadcn's next-themes consumers in dark; there is no
    // light palette to fall back to.
    <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
      <LocaleProvider>
        {children}
        <Toaster theme="dark" />
      </LocaleProvider>
    </ThemeProvider>
  );
}
