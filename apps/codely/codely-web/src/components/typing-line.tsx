'use client';

import { useEffect, useState } from 'react';

/**
 * Types a line out character by character behind a purple block caret.
 *
 * Starts empty on both server and client so hydration matches, then types
 * after `delay`. The caret holds solid while typing and blinks once the line
 * is complete. With reduced motion the full line appears at once.
 *
 * Progress is worked out from elapsed time rather than by counting timer
 * ticks: browsers throttle timers in background tabs to about one wake-up a
 * second, and a tick counter would crawl there instead of finishing on time.
 */
export function TypingLine({
  text,
  delay = 900,
  speed = 42,
  className = '',
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(text.length);
      return undefined;
    }

    const start = performance.now() + delay;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const next = Math.min(text.length, Math.floor((performance.now() - start) / speed) + 1);
      setShown(Math.max(next, 0));
      if (next < text.length) timer = setTimeout(tick, speed);
    }

    setShown(0);
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  const typing = shown > 0 && shown < text.length;

  return (
    <span className={className}>
      {text.slice(0, shown)}
      <span className="caret-block" data-typing={typing} />
    </span>
  );
}
