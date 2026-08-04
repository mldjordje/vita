"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReduced } from "@/lib/anim";
import { trust } from "@/lib/content";

const BASE_SPEED = 42; // px/s kad se ne skroluje

export function TrustMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReduced()) return;

    const setX = gsap.quickSetter(track, "x", "px");
    const setSkew = gsap.quickSetter(track, "skewX", "deg");

    // Traka je odštampana dvaput, pa je jedan pun ciklus tačno pola širine.
    let half = track.scrollWidth / 2;
    let x = 0;
    let skew = 0;
    let velocity = 0;

    const wrap = gsap.utils.wrap(-half, 0);
    const clampBoost = gsap.utils.clamp(-2200, 2200);
    const clampSkew = gsap.utils.clamp(-6, 6);

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity = self.getVelocity();
      },
    });

    const tick = (_time: number, deltaMs: number) => {
      // Kap na delti — posle prebacivanja taba deltaMs ume da bude ogroman
      // i traka bi odskočila.
      const dt = Math.min(deltaMs, 50) / 1000;
      const boost = clampBoost(velocity);
      const dir = boost < -20 ? -1 : 1; // skrol nagore okreće smer

      x = wrap(x - (BASE_SPEED + Math.abs(boost) * 0.32) * dt * dir);
      setX(x);

      skew += (clampSkew(boost / 280) - skew) * 0.08;
      setSkew(skew);

      velocity *= 0.9; // bez gušenja traka ostaje ubrzana i kad scroll stane
    };

    gsap.ticker.add(tick);

    const onResize = () => {
      half = track.scrollWidth / 2;
    };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
      st.kill();
    };
  }, []);

  const items = [...trust, ...trust];

  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-marble py-6">
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center"
            aria-hidden={i >= trust.length ? "true" : undefined}
          >
            <span className="u-display whitespace-nowrap px-[3vw] text-[clamp(1.3rem,2.6vw,2.4rem)] text-ink/85">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
          </div>
        ))}
      </div>
    </section>
  );
}
