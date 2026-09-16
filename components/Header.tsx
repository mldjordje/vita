"use client";

import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, markPreloaderDone, onPreloaderDone, prefersReduced } from "@/lib/anim";
import { clinic, nav } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

type HeaderProps = {
  /** Podstranice nemaju preloader niti sekcije — sidra vode nazad na landing. */
  standalone?: boolean;
};

export function Header({ standalone = false }: HeaderProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root || !bar) return;

    // Bez preloadera na stranici header bi čekao event koji nikad ne stigne.
    if (standalone) markPreloaderDone();

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
          delay: standalone ? 0 : DUR.half,
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
  }, [standalone]);

  const resolve = (href: string) => (standalone && href.startsWith("#") ? `/preview${href}` : href);

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        className="border-b border-transparent text-marble"
        style={{ backgroundColor: "rgba(248,246,244,0)" }}
      >
        <div className="u-shell flex h-[76px] items-center justify-between gap-8">
          <a href="/preview" className="group flex items-baseline gap-2">
            <span className="u-display text-xl tracking-tight">{clinic.name}</span>
            <span className="u-eyebrow hidden text-current/50 sm:inline">{clinic.city}</span>
          </a>

          <nav className="hidden items-center gap-8 min-[900px]:flex" aria-label="Glavna navigacija">
            {nav.map((item) => (
              <a
                key={item.href}
                href={resolve(item.href)}
                className="text-sm text-current/75 transition-colors hover:text-current"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Ordinaciju i dalje najviše zovu telefonom — broj mora da bude na dohvat palca. */}
            <a
              href={clinic.phoneHref}
              aria-label={`Pozovite ${clinic.phone}`}
              className="flex items-center gap-2 rounded-full border border-current/25 px-3 py-2.5 text-sm text-current/80 transition-colors hover:text-current min-[700px]:px-4"
            >
              <Phone size={15} strokeWidth={1.8} />
              <span className="hidden min-[700px]:inline tabular-nums">{clinic.phone}</span>
            </a>
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
