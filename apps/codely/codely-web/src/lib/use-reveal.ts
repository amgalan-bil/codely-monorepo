'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element the first time it enters the viewport.
 *
 * Returns a ref to attach and the shown flag; pair it with the `.reveal` class
 * in global.css, which carries the easing.
 */
export function useReveal<T extends HTMLElement>(rootMargin = '-12% 0px') {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Without IntersectionObserver the content should simply be visible.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, shown };
}
