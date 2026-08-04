"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DUR, EASE, shouldSkipPreloader, markPreloaderDone } from "@/lib/anim";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Odluka se donosi tek na klijentu da prvi render ostane isti kao na serveru.
    if (shouldSkipPreloader()) {
      // Mora da javi i kad se preskoči — inače Hero čeka signal koji nikad ne stigne.
      markPreloaderDone();
      setDone(true);
      return;
    }

    document.documentElement.classList.add("lenis-stopped");

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      markPreloaderDone();
      document.documentElement.classList.remove("lenis-stopped");
      setDone(true);
    };

    // Sigurnosni ventil — preloader ne sme trajno da zaglavi stranicu.
    const failsafe = window.setTimeout(finish, 2500);

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      const path = pathRef.current;
      const countEl = countRef.current;
      if (!root || !path || !countEl) {
        finish();
        return;
      }

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: DUR.one,
          ease: EASE.outSoft,
        },
        0
      );

      tl.to(
        counter,
        {
          v: 100,
          duration: DUR.one,
          ease: EASE.outSoft,
          onUpdate: () => {
            countEl.textContent = String(Math.round(counter.v));
          },
        },
        0
      );

      tl.to(
        root,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: DUR.one,
          ease: EASE.outExpo,
        },
        "+=0.08"
      );
    }, rootRef);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <span className="u-eyebrow text-gold/70">VITA CLINIC</span>

      <svg
        viewBox="0 0 320 60"
        className="mt-6 overflow-visible text-gold"
        style={{ width: "clamp(180px, 40vw, 320px)" }}
      >
        <path
          ref={pathRef}
          d="M0 30 H108 l8 -22 l10 44 l9 -34 l7 12 H320"
          stroke="currentColor"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="u-eyebrow text-gold-soft tabular-nums mt-6">
        <span ref={countRef}>0</span>
      </span>
    </div>
  );
}
