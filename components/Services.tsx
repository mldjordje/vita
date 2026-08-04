"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DUR, EASE, STAGGER, prefersReduced } from "@/lib/anim";
import { services } from "@/lib/content";
import { Toast, useToast } from "@/components/ui/Toast";

export function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const imgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const { message, show } = useToast();

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    const box = boxRef.current;
    if (!section || !list || !box) return;

    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-row]"));
    const reduced = prefersReduced();

    const ctx = gsap.context(() => {
      // Ulazak redova — radi i na dodiru, nezavisno od hover efekta.
      if (!reduced) {
        gsap.set(rows, { opacity: 0, y: 28 });
        ScrollTrigger.batch(rows, {
          start: "top 85%",
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
      }

      const fine = window.matchMedia("(pointer: fine)").matches;
      if (reduced || !fine) return;

      gsap.set(box, { xPercent: -50, yPercent: -50, clipPath: "inset(100% 0% 0% 0%)" });

      const xTo = gsap.quickTo(box, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(box, "y", { duration: 0.55, ease: "power3" });
      const rTo = gsap.quickTo(box, "rotation", { duration: 0.7, ease: "power3" });

      let lastX = 0;
      let active = -1;

      const onMove = (e: PointerEvent) => {
        xTo(e.clientX + 40);
        yTo(e.clientY);
        // Nagib prati brzinu kursora — slika deluje kao da je vučena, ne zalepljena.
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        rTo(gsap.utils.clamp(-6, 6, dx * 0.4));
      };

      const focusRow = (index: number) => {
        if (index === active) return;
        active = index;

        rows.forEach((row, i) => {
          gsap.to(row, {
            opacity: i === index ? 1 : 0.32,
            x: i === index ? 14 : 0,
            duration: DUR.half,
            ease: EASE.outSoft,
          });
        });

        imgsRef.current.forEach((img, i) => {
          if (img) gsap.to(img, { opacity: i === index ? 1 : 0, duration: 0.3 });
        });

        gsap.to(box, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DUR.half * 1.5,
          ease: EASE.outExpo,
        });
      };

      const clearRows = () => {
        active = -1;
        gsap.to(rows, { opacity: 1, x: 0, duration: DUR.half, ease: EASE.outSoft });
        gsap.to(box, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: DUR.half,
          ease: EASE.inOutSoft,
        });
      };

      list.addEventListener("pointermove", onMove);
      list.addEventListener("pointerleave", clearRows);
      const enterHandlers = rows.map((row, i) => {
        const handler = () => focusRow(i);
        row.addEventListener("pointerenter", handler);
        return handler;
      });

      return () => {
        list.removeEventListener("pointermove", onMove);
        list.removeEventListener("pointerleave", clearRows);
        rows.forEach((row, i) => {
          row.removeEventListener("pointerenter", enterHandlers[i]);
        });
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="usluge" ref={sectionRef} className="relative bg-marble py-[14vh]">
      <div className="u-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="u-eyebrow">Usluge</p>
            <h2 className="u-display u-h2 mt-3 max-w-xl">Šta radimo</h2>
          </div>
          <p className="u-lead max-w-sm text-muted">
            Ginekologija, akušerstvo i ultrazvučna dijagnostika na jednom mestu.
          </p>
        </div>

        <ul ref={listRef} className="mt-16 border-t border-ink/10">
          {services.map((service, i) => (
            <li key={service.id} data-row className="border-b border-ink/10">
              <button
                type="button"
                onClick={() => show("Demo prikaz — zakazivanje nije aktivno.")}
                className="group flex w-full items-center gap-5 py-7 text-left min-[900px]:gap-8 min-[900px]:py-9"
              >
                <span className="u-eyebrow w-8 shrink-0 tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Na dodiru nema kursora koji vuče sliku — zato sličica u redu. */}
                <img
                  src={service.image}
                  alt=""
                  className="h-14 w-11 shrink-0 rounded-sm object-cover min-[900px]:hidden"
                />

                <span className="min-w-0 flex-1">
                  <span className="u-display block text-[clamp(1.5rem,3.1vw,2.6rem)] leading-tight transition-colors group-hover:text-wine">
                    {service.title}
                  </span>
                  {/* Na desktopu opis izlazi na hover — grid-rows trik animira visinu
                      bez fiksne vrednosti, pa se redovi razmiču umesto da se preklapaju. */}
                  <span className="mt-1 block text-sm text-muted min-[900px]:mt-0 min-[900px]:grid min-[900px]:grid-rows-[0fr] min-[900px]:transition-[grid-template-rows] min-[900px]:duration-500 min-[900px]:ease-out min-[900px]:group-hover:grid-rows-[1fr]">
                    <span className="max-w-[46ch] min-[900px]:overflow-hidden">
                      <span className="block min-[900px]:pt-2">{service.desc}</span>
                    </span>
                  </span>
                </span>

                <span className="hidden shrink-0 text-sm text-muted min-[900px]:block">
                  {service.duration}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Slika koja prati kursor — jedan okvir, slike se preklapaju da nema treptaja pri učitavanju. */}
      <div
        ref={boxRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[3/4] w-[clamp(240px,20vw,340px)] overflow-hidden rounded-sm will-change-transform min-[900px]:block"
      >
        {services.map((service, i) => (
          <img
            key={service.id}
            ref={(el) => {
              imgsRef.current[i] = el;
            }}
            src={service.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0"
          />
        ))}
      </div>

      <Toast message={message} />
    </section>
  );
}
