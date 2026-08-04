"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registracija na jednom mestu — višestruko registrovanje po komponentama
// zna da napravi duple refresh-eve kad Lenis vozi scroll.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Samo u razvoju: omogućava ručno pokretanje scroll-vezanih animacija iz konzole
  // (npr. kad prozor ne renderuje frejmove, pa scroll event ne stiže).
  if (process.env.NODE_ENV === "development") {
    Object.assign(window, { __gsap: gsap, __ScrollTrigger: ScrollTrigger });
  }
}

export { gsap, ScrollTrigger };
