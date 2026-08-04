"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, STAGGER, prefersReduced } from "@/lib/anim";
import { pregnancy } from "@/lib/content";

/** EKG linija sa po jednim otkucajem ispod svake kartice. */
function buildEkgPath(count: number, width = 1200, mid = 40) {
  const step = width / count;
  let d = `M0 ${mid} `;
  for (let i = 0; i < count; i++) {
    const x = step * (i + 0.5);
    d += `L${x - 21} ${mid} l10 -26 l12 52 l11 -40 l9 14 `;
  }
  d += `L${width} ${mid}`;
  return d;
}

export function PregnancyTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const ekgPath = useMemo(() => buildEkgPath(pregnancy.length), []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;
    if (prefersReduced()) return;

    const mm = gsap.matchMedia();
    let activeIndex = -1;

    mm.add("(min-width: 900px)", () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const path = pathRef.current;
      const pathLen = path ? path.getTotalLength() : 0;
      if (path) {
        gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
      }

      // Geometrija se čita jednom; po frejmu se samo računa iz pomeraja.
      let offsets: number[] = [];
      let widths: number[] = [];
      let total = 0;

      const measure = () => {
        // Levi razmak centrira prvu karticu na startu.
        const vw = window.innerWidth;
        gsap.set(track, { paddingLeft: vw / 2 - cards[0].offsetWidth / 2 });

        offsets = cards.map((c) => c.offsetLeft);
        widths = cards.map((c) => c.offsetWidth);

        // Namerno se NE koristi track.scrollWidth: kod flex kontejnera koji se
        // preliva browser ne uračunava desni padding, pa bi putanja bila prekratka
        // i 40. nedelja — poenta sekcije — nikad ne bi stigla u centar ekrana.
        const last = cards[cards.length - 1];
        total = last.offsetLeft + last.offsetWidth / 2 - vw / 2;
      };

      measure();

      const clamp01 = gsap.utils.clamp(0, 1);

      gsap.to(track, {
        x: () => -total,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${total}`,
          pin,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Mora pre merenja start/end vrednosti, inače end koristi staru dužinu.
          onRefreshInit: measure,
          onUpdate: (self) => {
            const x = -self.progress * total;
            const vw = window.innerWidth;
            let nearest = 0;
            let nearestDist = Infinity;

            for (let i = 0; i < cards.length; i++) {
              const center = offsets[i] + widths[i] / 2 + x;
              const dist = Math.abs(center - vw / 2);
              // Kartica gubi prisustvo srazmerno udaljenosti od centra ekrana —
              // zbog toga sekcija deluje kao film, a ne kao vodoravna lista.
              const f = clamp01(dist / (vw * 0.58));
              gsap.set(cards[i], { scale: 1 - f * 0.09, opacity: 1 - f * 0.62 });
              if (dist < nearestDist) {
                nearestDist = dist;
                nearest = i;
              }
            }

            if (path) {
              gsap.set(path, { strokeDashoffset: pathLen * (1 - self.progress) });
            }
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
            if (nearest !== activeIndex) {
              activeIndex = nearest;
              setActive(nearest);
            }
          },
        },
      });
    });

    mm.add("(max-width: 899px)", () => {
      const cards = Array.from(track.children) as HTMLElement[];
      gsap.set(cards, { opacity: 0, y: 32 });
      ScrollTrigger.batch(cards, {
        start: "top 82%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DUR.one,
            ease: EASE.outExpo,
            stagger: STAGGER.card,
          }),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="trudnoca"
      ref={sectionRef}
      className="relative bg-ink text-marble"
      aria-label="Put kroz trudnoću, od šeste do četrdesete nedelje"
    >
      <div ref={pinRef} className="relative min-[900px]:h-svh min-[900px]:overflow-hidden">
        <div className="u-shell relative z-10 pt-[12vh] min-[900px]:pt-[10vh]">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="u-eyebrow text-gold">Vođenje trudnoće</p>
              <h2 className="u-display u-h2 mt-3 max-w-xl">
                Od prvog otkucaja
                <br />
                do prvog plača
              </h2>
            </div>

            <div className="hidden shrink-0 text-right min-[900px]:block">
              <p className="u-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-gold-soft tabular-nums">
                {pregnancy[active].week}
                <span className="text-marble/25"> / 40</span>
              </p>
              <p className="u-eyebrow mt-2 text-marble/40">nedelja</p>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="u-shell relative z-10 mt-14 flex flex-col gap-14 pb-[14vh] min-[900px]:absolute min-[900px]:inset-y-0 min-[900px]:mt-0 min-[900px]:w-max min-[900px]:max-w-none min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-[6vw] min-[900px]:pb-0"
        >
          {pregnancy.map((item) => (
            <article
              key={item.week}
              className="relative shrink-0 will-change-transform min-[900px]:w-[clamp(320px,40vw,520px)]"
            >
              <span
                aria-hidden="true"
                className="u-display pointer-events-none absolute -left-2 -top-[0.45em] select-none text-[clamp(6rem,13vw,15rem)] leading-none text-marble/[0.06]"
              >
                {item.week}
              </span>

              <div className="relative">
                <p className="u-eyebrow text-gold">{item.week}. nedelja</p>
                <h3 className="u-display u-h3 mt-3">{item.title}</h3>
                <p className="u-lead mt-4 max-w-[34ch] text-marble/70">{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* EKG linija — crta se u istom ritmu kao pomeranje trake. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-[8vh] left-0 hidden h-20 w-full text-gold min-[900px]:block"
        >
          <path
            ref={pathRef}
            d={ekgPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 hidden h-px w-full origin-left scale-x-0 bg-gold/40 min-[900px]:block"
          ref={progressRef}
        />
      </div>
    </section>
  );
}
