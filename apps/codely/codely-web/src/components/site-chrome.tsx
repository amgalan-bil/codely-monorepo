'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

/**
 * Routes that take over the whole viewport: the lesson editor and the
 * challenge workspace both ship their own top bar and bottom bar, and a
 * footer under an editor would be dead scroll.
 */
function isWorkspace(pathname: string): boolean {
  // /academy/[course]/[exercise] — the course overview page keeps the chrome.
  if (/^\/academy\/[^/]+\/[^/]+/.test(pathname)) return true;
  // /challenges/[pack] — the pack list keeps the chrome.
  if (/^\/challenges\/[^/]+/.test(pathname)) return true;
  return false;
}

/** Auth pages are centred cards with no navigation around them. */
function isAuth(pathname: string): boolean {
  return pathname === '/signin' || pathname === '/signup';
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isWorkspace(pathname)) return <>{children}</>;
  if (isAuth(pathname)) return <>{children}</>;

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
