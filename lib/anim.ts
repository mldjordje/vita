/**
 * Deljeni animacioni primitivi.
 * Sve trajanje izvedeno iz jednog otkucaja — zbog toga sekcije deluju komponovano.
 */

export const BEAT = 0.64; // sekunde, mora da prati --beat u globals.css

export const DUR = {
  half: BEAT * 0.5, // 320ms
  one: BEAT, // 640ms
  onehalf: BEAT * 1.5, // 960ms
  two: BEAT * 2, // 1280ms
} as const;

export const EASE = {
  outExpo: "expo.out",
  inOutSoft: "power2.inOut",
  outSoft: "power3.out",
} as const;

export const STAGGER = {
  word: 0.045,
  row: 0.07,
  card: 0.09,
} as const;

/** Ista granica kao u CSS media query-ju; ispod ovoga nema pina ni parallaxa. */
export const DESKTOP_MIN = 900;

export const PRELOADER_DONE = "vita:preloader-done";
export const PRELOADER_KEY = "vita:preloaded";

export function prefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktop(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`).matches;
}

/** Preloader se preskače pri drugom ulasku u istoj sesiji i kad je motion smanjen. */
export function shouldSkipPreloader(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReduced()) return true;
  try {
    return sessionStorage.getItem(PRELOADER_KEY) === "1";
  } catch {
    return false;
  }
}

export function markPreloaderSeen(): void {
  try {
    sessionStorage.setItem(PRELOADER_KEY, "1");
  } catch {
    /* private mode — nije bitno, preloader se samo ponovi */
  }
}

/**
 * Stanje umesto samo eventa. Bez ovoga pretplatnik koji se registruje posle
 * emitovanja eventa čeka doveka — a upravo to se dešava kad se komponenta
 * remount-uje (StrictMode, promena state-a) posle završetka preloadera.
 */
let preloaderDone = false;

export function isPreloaderDone(): boolean {
  return preloaderDone || shouldSkipPreloader();
}

/** Jedina tačka kroz koju se preloader završava — i kad odigra i kad se preskoči. */
export function markPreloaderDone(): void {
  if (preloaderDone) return;
  preloaderDone = true;
  markPreloaderSeen();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PRELOADER_DONE));
  }
}

/**
 * Poziva cb kad preloader završi. Ako je već završio ili je preskočen, poziva odmah.
 * Vraća cleanup funkciju.
 */
export function onPreloaderDone(cb: () => void): () => void {
  if (isPreloaderDone()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(PRELOADER_DONE, handler, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE, handler);
}

/**
 * Deli tekst na reči i svaku pakuje u <span class="u-mask"><span>reč</span></span>.
 * Vraća unutrašnje spanove — njih animiramo po y.
 * Razmaci ostaju pravi razmaci da se prelom u više redova ponaša normalno.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  const words = text.split(/(\s+)/);
  el.textContent = "";

  const inners: HTMLElement[] = [];
  for (const chunk of words) {
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(" "));
      continue;
    }
    if (!chunk) continue;
    const mask = document.createElement("span");
    mask.className = "u-mask";
    mask.style.display = "inline-block";
    mask.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.textContent = chunk;
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    mask.appendChild(inner);
    el.appendChild(mask);
    inners.push(inner);
  }
  return inners;
}
