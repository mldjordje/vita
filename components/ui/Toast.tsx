"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Demo sajt ima dosta dugmadi koja namerno ne rade.
 * Bolje je to reći nego pustiti korisnika da klikne u prazno.
 */
export function useToast(timeout = 2400) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const show = useCallback(
    (text: string) => {
      setMessage(text);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setMessage(null), timeout);
    },
    [timeout]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { message, show };
}

export function Toast({ message }: { message: string | null }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-8 z-[60] flex justify-center px-4"
    >
      <div
        className={`rounded-full bg-ink px-6 py-3 text-sm text-marble shadow-lg transition-all duration-300 ${
          message ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
