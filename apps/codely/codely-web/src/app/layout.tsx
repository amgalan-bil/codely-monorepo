import type { ReactNode } from 'react';
import { Chakra_Petch, JetBrains_Mono, Nunito } from 'next/font/google';
import './global.css';
import { Providers } from './providers';
import { SiteChrome } from '@/components/site-chrome';

/** Display face — every h1/h2/h3, nav label and stat numeral. */
const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-chakra',
  display: 'swap',
});

/** Body face — paragraphs, buttons, descriptions. */
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

/** Code, labels, XP counters, badges and status text. */
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Codely Coding Academy',
    template: '%s | Codely',
  },
  description:
    "Mongolia's first non-profit coding academy. Real projects, real mentors, real results — in Mongolian and English.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // `dark` is fixed: Codely ships a single dark theme by design.
    <html
      lang="en"
      className={`dark ${chakra.variable} ${nunito.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-surface font-sans text-foreground antialiased">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
