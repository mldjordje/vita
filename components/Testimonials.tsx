"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, prefersReduced } from "@/lib/anim";
import { testimonials } from "@/lib/content";

const RAILS = [
  { direction: -1, offset: "min-[900px]:ml-[8vw]" },
  { direction: 1, offset: "min-[900px]:-ml-[18vw]" },
] as const;

export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReduced()) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>("[data-heading]");
      if (heading) {
        gsap.fromTo(
          heading.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: DUR.one,
            stagger: 0.08,
            ease: EASE.outExpo,
            scrollTrigger: {
              trigger: heading,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      railRefs.current.forEach((rail, index) => {
        if (!rail) return;
        const direction = RAILS[index].direction;

        gsap.fromTo(
          rail,
          { xPercent: direction < 0 ? 0 : -14 },
          {
            xPercent: direction < 0 ? -14 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="iskustva"
      ref={sectionRef}
      aria-labelledby="iskustva-title"
      className="relative overflow-hidden bg-blush-soft py-[14vh] text-ink"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[8vw] bg-gradient-to-r from-blush-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[8vw] bg-gradient-to-l from-blush-soft to-transparent" />

      <div className="u-shell">
        <div data-heading className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="u-eyebrow text-rose">Iskustva pacijentkinja</p>
            <h2 id="iskustva-title" className="u-display u-h2 mt-3 max-w-2xl text-wine-deep">
              Poverenje počinje
              <br />
              razgovorom
            </h2>
          </div>

          <p className="max-w-sm border-l border-wine/20 pl-5 text-sm leading-relaxed text-muted">
            Demo primeri sadržaja. Imena i izjave nisu stvarne recenzije ordinacije.
          </p>
        </div>
      </div>

      <div className="mt-16 space-y-5 min-[900px]:mt-20 min-[900px]:space-y-7">
        {RAILS.map((rail, railIndex) => (
          <div
            key={rail.direction}
            ref={(el) => {
              railRefs.current[railIndex] = el;
            }}
            aria-hidden={railIndex > 0 ? "true" : undefined}
            className={`flex w-max gap-5 will-change-transform min-[900px]:gap-7 ${rail.offset}`}
          >
            {[0, 1, 2].flatMap((copy) =>
              (railIndex === 0 ? testimonials : [...testimonials].reverse()).map(
                (item, itemIndex) => (
                  <blockquote
                    key={`${copy}-${item.name}`}
                    aria-hidden={copy > 0 ? "true" : undefined}
                    className="flex w-[min(82vw,430px)] shrink-0 flex-col justify-between border border-wine/12 bg-marble px-7 py-8 shadow-[0_18px_55px_rgba(90,17,48,0.07)] min-[900px]:min-h-[260px] min-[900px]:w-[clamp(360px,31vw,500px)] min-[900px]:px-9 min-[900px]:py-9"
                  >
                    <p className="u-display text-[clamp(1.35rem,2vw,1.85rem)] leading-[1.34] text-wine-deep">
                      “{item.text}”
                    </p>
                    <footer className="mt-8 flex items-center justify-between gap-5 border-t border-wine/10 pt-5">
                      <cite className="not-italic">
                        <span className="u-eyebrow block text-wine">{item.name}</span>
                        <span className="mt-1 block text-xs text-muted">
                          Demo pacijentkinja
                        </span>
                      </cite>
                      <span
                        aria-hidden="true"
                        className="u-display text-4xl leading-none text-gold-soft"
                      >
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                    </footer>
                  </blockquote>
                )
              )
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
