"use client";

import { useEffect, useRef } from "react";
import { MapPin, Clock, Phone, Mail, Instagram, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, STAGGER, isDesktop, prefersReduced } from "@/lib/anim";
import { clinic, DEMO_NOTICE } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${clinic.name} ${clinic.address}`
)}`;

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wordmark = wordmarkRef.current;
    if (!section) return;
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      const blocks = Array.from(section.querySelectorAll<HTMLElement>("[data-block]"));
      gsap.set(blocks, { opacity: 0, y: 28 });
      ScrollTrigger.batch(blocks, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DUR.one,
            ease: EASE.outExpo,
            stagger: STAGGER.row,
          }),
      });

      if (!wordmark || !isDesktop()) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const skewTo = gsap.quickTo(wordmark, "skewX", { duration: 0.9, ease: "power3" });
      const xTo = gsap.quickTo(wordmark, "x", { duration: 0.9, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const t = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
        skewTo(t * 2);
        xTo(t * 18);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="kontakt" ref={sectionRef} className="relative bg-marble">
      <div className="u-shell py-[14vh]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div data-block>
            <p className="u-eyebrow text-rose">Kontakt</p>
            <h2 className="u-display u-h2 mt-3 max-w-xl text-wine-deep">
              Zakažite
              <br />
              svoj termin
            </h2>
          </div>
          <div data-block className="flex flex-wrap gap-3">
            <MagneticButton variant="solid" href={clinic.phoneHref}>
              <Phone size={16} strokeWidth={1.8} />
              {clinic.phone}
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href={clinic.instagram}
              className="border-wine/25 text-wine"
            >
              <Instagram size={16} strokeWidth={1.8} />
              Instagram
            </MagneticButton>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 min-[900px]:grid-cols-3">
          <div data-block>
            <p className="u-eyebrow flex items-center gap-2 text-muted">
              <MapPin size={14} strokeWidth={1.8} /> Adresa
            </p>
            <p className="u-display mt-4 text-[clamp(1.3rem,2vw,1.7rem)] leading-snug text-ink">
              {clinic.address}
            </p>
            {/* Namerno link, ne iframe — ugrađena Google mapa košta oko 900KB. */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-wine underline underline-offset-4 transition-colors hover:text-wine-deep"
            >
              Otvorite u Google mapama
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </div>

          <div data-block>
            <p className="u-eyebrow flex items-center gap-2 text-muted">
              <Clock size={14} strokeWidth={1.8} /> Radno vreme
            </p>
            <dl className="mt-4 space-y-2.5">
              {clinic.hours.map((h) => (
                <div key={h.days} className="flex items-baseline justify-between gap-4 text-sm">
                  <dt className="text-ink-soft">{h.days}</dt>
                  <dd className="tabular-nums text-muted">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-block>
            <p className="u-eyebrow flex items-center gap-2 text-muted">
              <Phone size={14} strokeWidth={1.8} /> Direktan kontakt
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={clinic.phoneHref}
                  className="text-ink transition-colors hover:text-wine"
                >
                  {clinic.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinic.email}`}
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-wine"
                >
                  <Mail size={14} strokeWidth={1.8} />
                  {clinic.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted">{clinic.descriptor}</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-wine-deep pt-[8vh] text-marble">
        <div
          ref={wordmarkRef}
          aria-hidden="true"
          className="u-display select-none whitespace-nowrap text-center text-[22vw] leading-[0.78] text-marble/10 will-change-transform"
        >
          VITA CLINIC
        </div>

        <div className="u-shell flex flex-wrap items-center justify-between gap-4 border-t border-marble/10 py-6 text-xs text-marble/45">
          <p>
            © {new Date().getFullYear()} {clinic.name} {clinic.city}
          </p>
          <p className="max-w-md text-right">{DEMO_NOTICE}</p>
        </div>
      </div>
    </footer>
  );
}
