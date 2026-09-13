'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

/** Centred card on a quiet gradient — no header, no footer, no distractions. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(124_58_237/13%),transparent_65%)] blur-3xl"
      />
      <div className="relative w-full max-w-[420px]">{children}</div>
    </main>
  );
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-zinc-300">
      {children}
    </label>
  );
}

export function TextField({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      autoComplete={autoComplete}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="mt-1.5 h-11 w-full rounded-lg border border-hairline bg-white/[0.03] px-3.5 text-[14px] text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none"
    />
  );
}

export function SocialButtons({ label }: { label: string }) {
  return (
    <>
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-hairline" />
        <span className="font-mono text-[11px] text-zinc-600">{label}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Google', mark: 'G' },
          { label: 'GitHub', mark: 'GH' },
        ].map((provider) => (
          <button
            key={provider.label}
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-hairline bg-white/[0.03] text-[13.5px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.08]"
          >
            <span className="font-mono text-[12px] text-zinc-500">{provider.mark}</span>
            {provider.label}
          </button>
        ))}
      </div>
    </>
  );
}

/**
 * Accounts are intentionally not wired up yet — the auth provider is still
 * being chosen — so the form says so rather than silently doing nothing.
 */
export function PendingAuthNotice() {
  return (
    <p className="mt-4 rounded-lg border border-amber-500/25 bg-amber-500/[0.08] px-3.5 py-3 text-[12.5px] leading-relaxed text-amber-200">
      Accounts aren&apos;t connected yet — the auth provider is still being decided. Meanwhile you
      can{' '}
      <Link href="/academy" className="font-semibold underline">
        browse the Academy
      </Link>{' '}
      or{' '}
      <Link href="/profile" className="font-semibold underline">
        preview a profile
      </Link>
      .
    </p>
  );
}
