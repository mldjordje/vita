"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  DUR,
  EASE,
  STAGGER,
  isDesktop,
  onPreloaderDone,
  prefersReduced,
  splitWords,
} from "@/lib/anim";
import { hero } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  // Animira se omotač, ne sam <video>/<img>. Zamena poster→video tako ne dira animaciju.
  const mediaWrapRef = useRef<HTMLDivElement | null>(null);
  const titleLine1Ref = useRef<HTMLSpanElement | null>(null);
  const titleLine2Ref = useRef<HTMLSpanElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const leadRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollCueInnerRef = useRef<HTMLSpanElement | null>(null);

  // Odluka video/poster se donosi tek na klijentu da izbegnemo hydration mismatch.
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    setUseVideo(isDesktop());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const media: HTMLElement | null = mediaWrapRef.current;
    const line1 = titleLine1Ref.current;
    const line2 = titleLine2Ref.current;
    const eyebrow = eyebrowRef.current;
    const lead = leadRef.current;
    const actions = actionsRef.current;
    const scrollCueInner = scrollCueInnerRef.current;

    if (!section || !media || !line1 || !line2 || !eyebrow || !lead || !actions || !scrollCueInner) {
      return;
    }

    const reduced = prefersReduced();

    const ctx = gsap.context(() => {
      if (reduced) {
        // Bez pokreta — samo finalna, čitljiva stanja.
        gsap.set([media, eyebrow, lead, actions], { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(scrollCueInner, { scaleY: 1 });
        return;
      }

      // Početna stanja odmah, pre intro-a, da nema bljeska.
      gsap.set(media, { scale: 1.08 });
      gsap.set(eyebrow, { opacity: 0, y: 24 });
      gsap.set(lead, { opacity: 0, y: 24 });
      gsap.set(actions, { opacity: 0, y: 24 });
      gsap.set(scrollCueInner, { scaleY: 0, transformOrigin: "top" });

      const line1Words = splitWords(line1);
      const line2Words = splitWords(line2);
      const titleWords = [...line1Words, ...line2Words];
      gsap.set(titleWords, { yPercent: 110 });

      let cleanupIntro = () => {};

      const stopListening = onPreloaderDone(() => {
        const tl = gsap.timeline({ defaults: { ease: EASE.outExpo } });

        tl.to(
          media,
          { scale: 1, duration: DUR.two * 1.25, ease: EASE.outSoft },
          0
        );

        tl.to(
          titleWords,
          { yPercent: 0, duration: DUR.onehalf, stagger: STAGGER.word },
          0.1
        );

        tl.to(
          [eyebrow, lead, actions],
          { opacity: 1, y: 0, duration: DUR.one, stagger: 0.08 },
          0.1 + DUR.half
        );

        // Puls scroll cue-a, u ritmu otkucaja — nezavisan beskonačan tween.
        const pulse = gsap.to(scrollCueInner, {
          scaleY: 1,
          duration: DUR.one,
          repeat: -1,
          yoyo: false,
          ease: "power2.inOut",
        });

        cleanupIntro = () => {
          tl.kill();
          pulse.kill();
        };
      });

      // Parallax na scroll — samo desktop.
      let scrollTrigger: ScrollTrigger | undefined;
      let exitTrigger: ScrollTrigger | undefined;
      if (isDesktop()) {
        const parallaxTween = gsap.to(media, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        scrollTrigger = parallaxTween.scrollTrigger;

        // Sadržaj odlazi brže od pozadine — hero se „predaje" sledećoj sekciji.
        if (contentRef.current) {
          const exitTween = gsap.to(contentRef.current, {
            yPercent: -16,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom 30%",
              scrub: true,
            },
          });
          exitTrigger = exitTween.scrollTrigger;
        }
      }

      return () => {
        stopListening();
        cleanupIntro();
        scrollTrigger?.kill();
        exitTrigger?.kill();
      };
    }, section);

    return () => ctx.revert();
    // Namerno prazan niz: intro sme da odigra tačno jednom. Zamena poster→video
    // ne sme da poništi split naslova i ponovo registruje slušače.
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="u-grain relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink"
    >
      <div ref={mediaWrapRef} className="absolute inset-0">
        {useVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.jpg"
            className="h-full w-full object-cover"
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/media/hero-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Jači donji gradijent — bez njega beli tekst pada ispod WCAG AA na svetlim kadrovima. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/45 to-ink/55" />

      <div ref={contentRef} className="u-shell relative pb-[8vh] pt-[18vh]">
        <p ref={eyebrowRef} className="u-eyebrow text-blush">
          {hero.eyebrow}
        </p>

        <h1 className="u-display u-h1 mt-4 text-marble">
          <span ref={titleLine1Ref} className="block">
            {hero.title[0]}
          </span>
          <span ref={titleLine2Ref} className="block text-gold-soft">
            {hero.title[1]}
          </span>
        </h1>

        <p ref={leadRef} className="u-lead mt-6 max-w-xl text-marble">
          {hero.lead}
        </p>

        <div ref={actionsRef} className="mt-10 flex flex-wrap gap-4">
          <MagneticButton variant="solid" href="/booking">
            {hero.cta}
          </MagneticButton>
          <MagneticButton variant="ghost" href="#usluge" className="text-marble">
            {hero.ctaSecondary}
          </MagneticButton>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 h-14 w-px -translate-x-1/2 bg-gold-soft/50"
      >
        <span ref={scrollCueInnerRef} className="block h-full w-full bg-gold-soft" />
      </div>
    </section>
  );
}
