"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, STAGGER, prefersReduced } from "@/lib/anim";
import { packages } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Toast, useToast } from "@/components/ui/Toast";

const formatPrice = (n: number) => new Intl.NumberFormat("sr-RS").format(Math.round(n));

/** Lotos iz njihovog logotipa, sveden na crtu — razdvaja naslov od spiska. */
function LotusDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 20" aria-hidden="true" className={`h-4 w-16 ${className}`}>
      <path
        d="M32 17c-4 0-7-3-7-7 0-3 3-7 7-9 4 2 7 6 7 9 0 4-3 7-7 7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
      />
      <path
        d="M32 17c-5 0-11-2-14-6 4-2 10-1 14 6Zm0 0c5 0 11-2 14-6-4-2-10-1-14 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
      />
    </svg>
  );
}

export function Packages() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { message, show } = useToast();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-pkg]"));
    const priceEls = Array.from(section.querySelectorAll<HTMLElement>("[data-price]"));
    if (!cards.length) return;

    if (prefersReduced()) {
      priceEls.forEach((el) => {
        el.textContent = formatPrice(Number(el.dataset.price ?? 0));
      });
      return;
    }

    const ctx = gsap.context(() => {
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

      // Cena se ispisuje brojanjem — jedini broj na stranici koji sme da bude glavni glumac.
      priceEls.forEach((el) => {
        const target = Number(el.dataset.price ?? 0);
        const counter = { v: 0 };

        gsap.to(counter, {
          v: target,
          duration: DUR.two,
          ease: EASE.outExpo,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          // Nula se upisuje tek kad brojanje krene. Da se postavlja unapred,
          // svaki otkaz ScrollTrigger-a ostavio bi „0 RSD" na sajtu prave ordinacije.
          onStart: () => {
            el.textContent = formatPrice(0);
          },
          onUpdate: () => {
            el.textContent = formatPrice(counter.v);
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="paketi" ref={sectionRef} className="relative bg-blush-soft py-[14vh]">
      <div className="u-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="u-eyebrow text-rose">Paketi usluga</p>
            <h2 className="u-display u-h2 mt-3 max-w-xl text-wine-deep">
              Sve na jednom
              <br />
              pregledu
            </h2>
          </div>
          <p className="u-lead max-w-sm text-muted">
            Cene su objavljene i važe za pregled u ordinaciji, bez skrivenih doplata.
          </p>
        </div>

        <div className="mt-16 grid gap-6 min-[900px]:grid-cols-3 min-[900px]:gap-8">
          {packages.map((pkg) => {
            const featured = pkg.featured;
            return (
              <article
                key={pkg.id}
                data-pkg
                className={[
                  "flex flex-col rounded-sm p-8 min-[900px]:p-10",
                  featured
                    ? "bg-wine text-marble shadow-xl min-[900px]:-mt-6 min-[900px]:pb-14"
                    : "border border-wine/12 bg-marble text-ink",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className={`u-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight ${
                      featured ? "text-marble" : "text-wine-deep"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  {featured && (
                    <span className="u-eyebrow shrink-0 rounded-full bg-marble/15 px-3 py-1 text-gold-soft">
                      Najtraženiji
                    </span>
                  )}
                </div>

                <LotusDivider className={`mt-5 ${featured ? "text-gold-soft" : "text-gold"}`} />

                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span
                        className={`mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 ${
                          featured ? "bg-gold-soft" : "bg-gold"
                        }`}
                      />
                      <span className={featured ? "text-marble/85" : "text-ink-soft"}>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-10 flex items-baseline gap-2">
                  <span
                    data-price={pkg.price.replace(/\./g, "")}
                    className={`u-display text-[clamp(2.4rem,4.4vw,3.4rem)] leading-none tabular-nums ${
                      featured ? "text-marble" : "text-wine"
                    }`}
                  >
                    {pkg.price}
                  </span>
                  <span
                    className={`u-eyebrow ${featured ? "text-marble/60" : "text-muted"}`}
                  >
                    {pkg.currency}
                  </span>
                </p>

                <MagneticButton
                  variant={featured ? "solid" : "ghost"}
                  onClick={() => show("Demo prikaz — zakazivanje nije aktivno.")}
                  className={[
                    "mt-7 w-full justify-center",
                    featured
                      ? "!bg-marble !text-wine hover:!bg-gold-soft"
                      : "border-wine/25 text-wine hover:bg-wine hover:text-marble",
                  ].join(" ")}
                >
                  Zakažite termin
                </MagneticButton>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-muted">
          Cene preuzete sa zvaničnih objava ordinacije. Konačnu cenu potvrđuje lekar na pregledu.
        </p>
      </div>

      <Toast message={message} />
    </section>
  );
}
