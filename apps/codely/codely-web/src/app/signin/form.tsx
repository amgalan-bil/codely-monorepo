'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CodelyMark } from '@/components/codely-logo';
import { AuthShell, FieldLabel, PendingAuthNotice, SocialButtons, TextField } from '../auth-ui';

export function SignInForm() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [attempted, setAttempted] = useState(false);

  return (
    <AuthShell>
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <CodelyMark size={34} />
          <span className="font-display text-[19px] font-bold text-white">Codely</span>
        </Link>
        <h1 className="mt-6 text-[30px] font-bold text-white">Welcome Back</h1>
        <p className="mt-2 text-[13.5px] text-zinc-400">Pick up where you left off</p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setAttempted(true);
        }}
        className="mt-9 rounded-2xl border border-hairline bg-surface-2 p-7"
      >
        <h2 className="text-[18px] font-bold text-white">Sign in</h2>

        <div className="mt-5 space-y-4">
          <div>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <TextField
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ariunaa@email.mn"
              value={values.email}
              onChange={(email) => setValues({ ...values, email })}
            />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <span className="text-[12px] text-brand-soft">Forgot?</span>
            </div>
            <TextField
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={values.password}
              onChange={(password) => setValues({ ...values, password })}
            />
          </div>
        </div>

        <SocialButtons label="or sign in with" />

        <button
          type="submit"
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-black text-[14px] font-bold text-white transition-opacity hover:opacity-90"
        >
          Sign In →
        </button>

        {attempted ? <PendingAuthNotice /> : null}

        <p className="mt-5 text-center text-[13px] text-zinc-400">
          New to Codely?{' '}
          <Link href="/signup" className="font-semibold text-brand-soft hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
