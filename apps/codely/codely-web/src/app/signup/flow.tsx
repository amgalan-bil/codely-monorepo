'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { CodelyMark } from '@/components/codely-logo';
import { programs } from '@/data/programs';
import { AuthShell, FieldLabel, PendingAuthNotice, SocialButtons, TextField } from '../auth-ui';

const steps = [
  { key: 'account', label: 'Account', icon: '👤' },
  { key: 'program', label: 'Program', icon: '🎯' },
  { key: 'ready', label: 'Ready!', icon: '🚀' },
];

const goals = [
  'Change careers into tech',
  'Level up in my current job',
  'Build my own product',
  'Just curious',
];

export function SignUpFlow() {
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState({ name: '', email: '', password: '' });
  const [track, setTrack] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const chosen = programs.find((program) => program.slug === track);
  // Every field is optional while accounts are stubbed, so the flow stays walkable.
  const canAdvance = step === 0 ? true : step === 1 ? Boolean(track) : true;

  return (
    <AuthShell>
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <CodelyMark size={34} />
          <span className="font-display text-[19px] font-bold text-white">Codely</span>
        </Link>
        <h1 className="mt-6 text-[30px] font-bold text-white">Start Your Journey</h1>
        <p className="mt-2 text-[13.5px] text-zinc-400">Create your free account in 3 steps</p>
      </div>

      <ol className="mt-8 flex items-center justify-center gap-2">
        {steps.map((entry, index) => (
          <li key={entry.key} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => index < step && setStep(index)}
              disabled={index > step}
              className={`flex items-center gap-2 ${index > step ? 'cursor-default' : ''}`}
            >
              <span
                className={`flex size-7 items-center justify-center rounded-full text-[13px] transition-colors ${
                  index <= step ? 'bg-brand text-white' : 'bg-white/[0.06] text-zinc-500'
                }`}
              >
                {index < step ? <Check className="size-3.5" /> : entry.icon}
              </span>
              <span
                className={`text-[12.5px] font-semibold ${
                  index <= step ? 'text-white' : 'text-zinc-600'
                }`}
              >
                {entry.label}
              </span>
            </button>
            {index < steps.length - 1 ? <span className="h-px w-8 bg-hairline" /> : null}
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-hairline bg-surface-2 p-7">
        {step === 0 ? (
          <>
            <h2 className="text-[18px] font-bold text-white">Create your account</h2>
            <div className="mt-5 space-y-4">
              <div>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <TextField
                  id="name"
                  autoComplete="name"
                  placeholder="Ariunaa Oyunbaatar"
                  value={account.name}
                  onChange={(name) => setAccount({ ...account, name })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <TextField
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ariunaa@email.mn"
                  value={account.email}
                  onChange={(email) => setAccount({ ...account, email })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <TextField
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={account.password}
                  onChange={(password) => setAccount({ ...account, password })}
                />
              </div>
            </div>
            <SocialButtons label="or sign up with" />
          </>
        ) : null}

        {step === 1 ? (
          <>
            <h2 className="text-[18px] font-bold text-white">Pick your starting track</h2>
            <p className="mt-1.5 text-[13px] text-zinc-400">You can change this later.</p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {programs.map((program) => {
                const selected = program.slug === track;
                return (
                  <button
                    key={program.slug}
                    type="button"
                    onClick={() => setTrack(program.slug)}
                    aria-pressed={selected}
                    style={{ '--track': program.color } as CSSProperties}
                    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                      selected ? 'track-chip-active' : 'track-chip-idle'
                    }`}
                  >
                    <span className="text-[17px] leading-none">{program.icon}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] font-bold">{program.name}</span>
                      <span className="block font-mono text-[10.5px] opacity-70">
                        {program.level}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <h3 className="mt-6 text-[13px] font-semibold text-zinc-300">What brings you here?</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {goals.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGoal(item)}
                  aria-pressed={item === goal}
                  className={`rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                    item === goal
                      ? 'bg-brand text-white'
                      : 'border border-hairline text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <div className="text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand/15 text-[28px]">
              🚀
            </span>
            <h2 className="mt-5 text-[20px] font-bold text-white">
              {account.name.trim() ? `You're set, ${account.name.trim().split(' ')[0]}!` : "You're set!"}
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">
              {chosen
                ? `Starting with ${chosen.name} — ${chosen.duration}, ${chosen.projects} projects.`
                : 'Pick a track any time from the Programs page.'}
            </p>

            <dl className="mt-6 space-y-2.5 rounded-xl border border-hairline bg-white/[0.02] px-4 py-4 text-left">
              {[
                ['Name', account.name || '—'],
                ['Email', account.email || '—'],
                ['Track', chosen?.name ?? '—'],
                ['Goal', goal ?? '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[11.5px] text-zinc-500">{label}</dt>
                  <dd className="truncate text-[13px] text-zinc-200">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <div className="mt-6 flex gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="h-11 rounded-lg border border-hairline bg-white/[0.04] px-5 text-[14px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.09]"
            >
              Back
            </button>
          ) : null}

          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => (step < 2 ? setStep(step + 1) : setAttempted(true))}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-black text-[14px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step < 2 ? 'Continue →' : 'Create Account →'}
          </button>
        </div>

        {attempted ? <PendingAuthNotice /> : null}

        <p className="mt-5 text-center text-[13px] text-zinc-400">
          Already have an account?{' '}
          <Link href="/signin" className="font-semibold text-brand-soft hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
