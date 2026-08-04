"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Flip } from "gsap/Flip";
import { DUR, EASE, isDesktop, prefersReduced } from "@/lib/anim";
import { gallery } from "@/lib/content";

if (typeof window !== "undefined") gsap.registerPlugin(Flip);

// Razbijen raspored — pravilan grid od sedam slika izgleda kao katalog.
const LAYOUT = [
  "min-[900px]:col-start-1 min-[900px]:col-span-6 min-[900px]:aspect-[4/3]",
  "min-[900px]:col-start-8 min-[900px]:col-span-5 min-[900px]:aspect-[3/4] min-[900px]:mt-[14vh]",
  "min-[900px]:col-start-2 min-[900px]:col-span-4 min-[900px]:aspect-[3/4] min-[900px]:-mt-[6vh]",
  "min-[900px]:col-start-7 min-[900px]:col-span-5 min-[900px]:aspect-[4/3] min-[900px]:mt-[10vh]",
  "min-[900px]:col-start-1 min-[900px]:col-span-4 min-[900px]:aspect-square",
  "min-[900px]:col-start-5 min-[900px]:col-span-4 min-[900px]:aspect-[4/5] min-[900px]:mt-[8vh]",
  "min-[900px]:col-start-9 min-[900px]:col-span-4 min-[900px]:aspect-square min-[900px]:-mt-[4vh]",
];

const SPEED = [-5, 7, -9, 4, -6, 8, -3];

export function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const openedRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    const figure = openedRef.current;
    const home = homeRef.current;
    if (!figure || !home) return;

    if (prefersReduced()) {
      home.appendChild(figure);
      figure.classList.remove("is-lightbox");
      gsap.set(backdropRef.current, { opacity: 0 });
      openedRef.current = null;
      homeRef.current = null;
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    const state = Flip.getState(figure);
    home.appendChild(figure);
    figure.classList.remove("is-lightbox");

    Flip.from(state, {
      duration: DUR.one,
      ease: EASE.inOutSoft,
      absolute: true,
      onComplete: () => {
        openedRef.current = null;
        homeRef.current = null;
        triggerRef.current?.focus();
      },
    });

    gsap.to(backdropRef.current, { opacity: 0, duration: DUR.half });
    setOpen(false);
  }, []);

  const openAt = useCallback(
    (figure: HTMLElement, trigger: HTMLElement) => {
      if (openedRef.current || !overlayRef.current) return;

      triggerRef.current = trigger;
      homeRef.current = figure.parentElement;
      openedRef.current = figure;

      if (prefersReduced()) {
        overlayRef.current.appendChild(figure);
        figure.classList.add("is-lightbox");
        setOpen(true);
        gsap.set(backdropRef.current, { opacity: 1 });
        requestAnimationFrame(() => closeButtonRef.current?.focus());
        return;
      }

      const state = Flip.getState(figure);
      overlayRef.current.appendChild(figure);
      figure.classList.add("is-lightbox");

      setOpen(true);
      gsap.to(backdropRef.current, { opacity: 1, duration: DUR.half });
      Flip.from(state, { duration: DUR.one, ease: EASE.outExpo, absolute: true });
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    },
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open, close]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const figures = Array.from(section.querySelectorAll<HTMLElement>("[data-fig]"));
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.set(figures, { clipPath: "inset(14% 0% 14% 0%)", opacity: 0 });

      ScrollTrigger.batch(figures, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: DUR.two,
            ease: EASE.outExpo,
            stagger: 0.08,
          }),
      });

      if (!isDesktop()) return;

      figures.forEach((fig, i) => {
        const img = fig.querySelector("img");
        if (!img) return;
        // Svaka slika ima svoju brzinu — dubina bez WebGL-a.
        gsap.fromTo(
          img,
          { yPercent: 0 },
          {
            yPercent: SPEED[i % SPEED.length],
            ease: "none",
            scrollTrigger: {
              trigger: fig,
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
      id="ordinacija"
      ref={sectionRef}
      className="u-grain relative overflow-hidden bg-ink py-[14vh] text-marble"
    >
      <div className="u-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="u-eyebrow text-blush/70">Ordinacija</p>
            <h2 className="u-display u-h2 mt-3 max-w-xl">Prostor koji smiruje</h2>
          </div>
          <p className="u-lead max-w-sm text-marble/80">
            Mermer, prigušeno svetlo i tišina. Kliknite na fotografiju za uvećanje.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 min-[900px]:grid-cols-12 min-[900px]:gap-6">
          {gallery.map((item, i) => (
            <div key={item.id} className={`relative ${LAYOUT[i]}`}>
              <button
                type="button"
                onClick={(e) => {
                  const fig = e.currentTarget.querySelector<HTMLElement>("[data-fig]");
                  if (fig) openAt(fig, e.currentTarget);
                }}
                aria-label={`Uvećaj: ${item.alt}`}
                className="group block h-full w-full cursor-zoom-in"
              >
                <figure
                  data-fig
                  className="relative h-full w-full overflow-hidden rounded-sm bg-ink-soft will-change-transform"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full scale-110 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.16]"
                  />
                </figure>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={backdropRef}
        onClick={close}
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] bg-ink/92 opacity-0 ${open ? "" : "pointer-events-none"}`}
      />
      <div
        ref={overlayRef}
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label="Uvećana fotografija"
        tabIndex={open ? -1 : undefined}
        className={`fixed inset-0 z-[71] flex items-center justify-center p-6 ${
          open ? "" : "pointer-events-none"
        }`}
        onClick={close}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Zatvori uvećanu fotografiju"
          className={`absolute right-5 top-5 z-10 grid size-12 place-items-center rounded-full border border-marble/20 bg-ink/70 text-marble backdrop-blur-md transition-colors hover:bg-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
            open ? "" : "hidden"
          }`}
        >
          <X aria-hidden="true" size={20} strokeWidth={1.7} />
        </button>
      </div>
    </section>
  );
}
