"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, STAGGER, prefersReduced } from "@/lib/anim";

/**
 * Podstranice su server komponente — ovaj omotač samo uvodi [data-reveal]
 * elemente istim ritmom kao sekcije na landingu.
 */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReduced()) return;

    const ctx = gsap.context(() => {
      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 32 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DUR.onehalf,
            ease: EASE.outExpo,
            stagger: STAGGER.card,
          }),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
