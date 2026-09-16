"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, STAGGER, isDesktop, prefersReduced } from "@/lib/anim";
import { doctors } from "@/lib/content";

// Različite brzine daju dubinu bez WebGL-a — kolone se ne kreću kao jedan blok.
const PARALLAX = [-9, 5, -14];

export function Doctors() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-doc]"));
    const media = Array.from(section.querySelectorAll<HTMLElement>("[data-doc-media]"));
    if (!cards.length) return;

    const reduced = prefersReduced();

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 85%",
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

      if (!isDesktop()) return;

      media.forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 0 },
          {
            yPercent: PARALLAX[i % PARALLAX.length],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tim"
      ref={sectionRef}
      className="u-grain relative overflow-hidden bg-wine-deep py-[14vh] text-marble"
    >
      <div className="u-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="u-eyebrow text-blush/70">Naš tim</p>
            <h2 className="u-display u-h2 mt-3 max-w-xl">
              Lekari kod kojih
              <br />
              možete da zakažete
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="u-lead text-marble/80">
              Specijalisti ginekologije i akušerstva. Termin birate kod lekara kod kog želite.
            </p>
            <Link
              href="/preview/tim"
              className="mt-6 inline-flex items-center gap-2 text-sm text-gold-soft transition-colors hover:text-marble"
            >
              Upoznajte ceo tim <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-10 min-[900px]:grid-cols-3 min-[900px]:gap-8">
          {doctors.map((doc, i) => (
            <Link
              key={doc.id}
              href={doc.bio ? `/preview/tim/${doc.slug}` : "/preview/tim"}
              data-doc
              // Srednja kolona je spuštena — ravan red od tri deluje kao katalog.
              className={`group block ${i === 1 ? "min-[900px]:mt-16" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-wine/40">
                <div data-doc-media className="absolute inset-0 will-change-transform">
                  <img
                    src={doc.image}
                    alt={`${doc.prefix} ${doc.name}`}
                    className="h-full w-full scale-105 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep/70 via-transparent to-transparent" />
              </div>

              <div className="mt-6">
                <p className="u-eyebrow text-gold-soft/80">{doc.prefix}</p>
                <h3 className="u-display mt-2 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight">
                  {doc.name}
                </h3>
                <span className="mt-4 block h-px w-10 origin-left bg-gold transition-transform duration-500 ease-out group-hover:scale-x-[4]" />
                <p className="mt-4 text-sm leading-relaxed text-marble/80">{doc.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
