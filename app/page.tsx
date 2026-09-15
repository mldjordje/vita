import type { Metadata } from "next";
import { clinic } from "@/lib/content";
import styles from "./coming-soon.module.css";

export const metadata: Metadata = {
  title: `${clinic.name} ${clinic.city} — uskoro`,
  description: "Novi sajt Vita Clinic Niš stiže uskoro. Ginekologija, akušerstvo i ultrazvučna dijagnostika.",
  robots: { index: true, follow: true },
};

const word = "Uskoro";

/**
 * Privremena naslovna dok traje izrada sajta. Demo landing živi na /preview.
 * Sve animacije su čist CSS da bi stranica bila laka i odmah interaktivna.
 */
export default function ComingSoon() {
  return (
    <main className={styles.root}>
      <div className={styles.media} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.veil} />
        <div className={styles.grain} />
      </div>

      <div className={styles.orbs} aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <header className={styles.top}>
        <span className={styles.brand}>
          {clinic.name} <em>{clinic.city}</em>
        </span>
        <a className={styles.phoneTop} href={clinic.phoneHref}>
          {clinic.phone}
        </a>
      </header>

      <section className={styles.center}>
        <svg className={styles.lotus} viewBox="0 0 120 80" aria-hidden>
          <path d="M60 8 C48 24 46 44 60 66 C74 44 72 24 60 8 Z" />
          <path d="M60 66 C44 58 30 42 28 22 C42 28 54 42 60 66 Z" />
          <path d="M60 66 C76 58 90 42 92 22 C78 28 66 42 60 66 Z" />
          <path d="M60 66 C40 66 18 58 6 42 C24 40 44 50 60 66 Z" />
          <path d="M60 66 C80 66 102 58 114 42 C96 40 76 50 60 66 Z" />
          <path d="M30 72 H90" />
        </svg>

        <p className={styles.eyebrow}>{clinic.tagline}</p>

        <h1 className={styles.title} aria-label={word}>
          {word.split("").map((ch, i) => (
            <span key={i} className={styles.char} style={{ "--i": i } as React.CSSProperties} aria-hidden>
              {ch}
            </span>
          ))}
        </h1>

        <div className={styles.rule} aria-hidden />

        <p className={styles.lead}>
          Pripremamo novi sajt specijalističke ordinacije. Do tada smo tu za vas —
          zakažite pregled telefonom ili nam pišite na Instagramu.
        </p>

        <div className={styles.actions}>
          <a className={styles.primary} href={clinic.phoneHref}>
            <span>Pozovite {clinic.phone}</span>
          </a>
          <a className={styles.secondary} href={clinic.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </section>

      <footer className={styles.bottom}>
        <span>{clinic.address}</span>
        <span className={styles.dot} aria-hidden />
        <span>Ginekologija · Akušerstvo · Ultrazvuk</span>
      </footer>
    </main>
  );
}
