"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, onPreloaderDone, prefersReduced } from "@/lib/anim";
import { clinic, nav } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Header() {
  const rootRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root || !bar) return;

    if (prefersReduced()) {
      gsap.set(root, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(root, { yPercent: -100, opacity: 0 });

      const stop = onPreloaderDone(() => {
        gsap.to(root, {
          yPercent: 0,
          opacity: 1,
          duration: DUR.onehalf,
          ease: EASE.outExpo,
          delay: DUR.half,
        });
      });

      // Preko heroja je providan; čim se pređe hero dobija staklo i tanku liniju.
      const st = ScrollTrigger.create({
        start: () => window.innerHeight * 0.9,
        onToggle: (self) => {
          gsap.to(bar, {
            backgroundColor: self.isActive ? "rgba(248,246,244,0.82)" : "rgba(248,246,244,0)",
            borderBottomColor: self.isActive ? "rgba(35,34,39,0.10)" : "rgba(35,34,39,0)",
            backdropFilter: self.isActive ? "blur(14px)" : "blur(0px)",
            color: self.isActive ? "#232227" : "#f8f6f4",
            duration: DUR.half,
            ease: EASE.inOutSoft,
          });
        },
      });

      return () => {
        stop();
        st.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        className="border-b border-transparent text-marble"
        style={{ backgroundColor: "rgba(248,246,244,0)" }}
      >
        <div className="u-shell flex h-[76px] items-center justify-between gap-8">
          <a href="/" className="group flex items-baseline gap-2">
            <span className="u-display text-xl tracking-tight">{clinic.name}</span>
            <span className="u-eyebrow hidden text-current/50 sm:inline">{clinic.city}</span>
          </a>

          <nav className="hidden items-center gap-8 min-[900px]:flex" aria-label="Glavna navigacija">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-current/75 transition-colors hover:text-current"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/client"
              className="hidden text-sm text-current/70 transition-colors hover:text-current min-[700px]:inline"
            >
              Moj nalog
            </a>
            <MagneticButton
              variant="ghost"
              href="/booking"
              className="!px-5 !py-2.5 text-sm"
            >
              Zakažite
            </MagneticButton>
          </div>
        </div>
      </div>
    </header>
  );
}
