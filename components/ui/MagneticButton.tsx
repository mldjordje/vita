"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReduced } from "@/lib/anim";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "solid" | "ghost";
  onClick?: () => void;
};

/** Mali lokalni helper za spajanje klasa — bez dodatne zavisnosti. */
function cx(...parts: Array<string | false | undefined | null>): string {
  return parts.filter(Boolean).join(" ");
}

const BASE_CLASS =
  "inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors will-change-transform";

const VARIANT_CLASS: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  solid: "bg-wine text-marble hover:bg-wine-deep",
  ghost: "border border-current bg-transparent",
};

const RADIUS = 80; // px, koliko se dejstvo proteže preko granica elementa
const PULL = 0.35; // koeficijent pomeraja kontejnera
const INNER_PULL = 0.4; // dodatnih 40% jače za unutrašnji span (paralaksa)

export function MagneticButton({
  children,
  href,
  className,
  variant = "solid",
  onClick,
}: MagneticButtonProps) {
  // Dva odvojena ref-a (umesto jednog castovanog) da tipovi ostanu tačni za <a> i <button>.
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el: HTMLElement | null = href ? anchorRef.current : buttonRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // Efekat samo na uređajima sa preciznim pokazivačem i bez smanjenog motion-a.
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReduced()) return;

    let active = false;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const expanded = {
        left: rect.left - RADIUS,
        right: rect.right + RADIUS,
        top: rect.top - RADIUS,
        bottom: rect.bottom + RADIUS,
      };

      const inside =
        e.clientX >= expanded.left &&
        e.clientX <= expanded.right &&
        e.clientY >= expanded.top &&
        e.clientY <= expanded.bottom;

      if (!inside) {
        if (active) {
          active = false;
          gsap.to([el, inner], {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        }
        return;
      }

      active = true;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      gsap.to(el, {
        x: dx * PULL,
        y: dy * PULL,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(inner, {
        x: dx * PULL * INNER_PULL,
        y: dy * PULL * INNER_PULL,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      gsap.killTweensOf([el, inner]);
    };
  }, [href]);

  const classes = cx(BASE_CLASS, VARIANT_CLASS[variant], className);

  if (href) {
    return (
      <a ref={anchorRef} href={href} onClick={onClick} className={classes}>
        <span ref={innerRef} className="inline-flex items-center gap-2 will-change-transform">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button ref={buttonRef} type="button" onClick={onClick} className={classes}>
      <span ref={innerRef} className="inline-flex items-center gap-2 will-change-transform">
        {children}
      </span>
    </button>
  );
}
