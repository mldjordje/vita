import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";
import { clinic, doctors } from "@/lib/content";

export const metadata: Metadata = {
  title: `Naš tim — ${clinic.name} ${clinic.city}`,
  description: "Specijalisti ginekologije i akušerstva i lekar estetske medicine u Vita Clinic Niš.",
};

export default function TeamPage() {
  return (
    <>
      <Header standalone />
      <main>
        <section className="u-grain relative overflow-hidden bg-wine-deep pb-[10vh] pt-[calc(var(--header-h)+12vh)] text-marble">
          <div className="u-shell">
            <p className="u-eyebrow text-blush/70">Naš tim</p>
            <h1 className="u-display u-h2 mt-4 max-w-3xl">
              Lekari kojima
              <br />
              poveravate sebe
            </h1>
            <p className="u-lead mt-8 max-w-xl text-marble/80">
              Specijalisti ginekologije i akušerstva sa iskustvom iz primarne zaštite žena,
              ultrazvučne dijagnostike i estetske i regenerativne ginekologije. Termin birate kod
              lekara kod kog želite.
            </p>
          </div>
        </section>

        <section className="bg-marble py-[12vh] text-ink">
          <Reveal className="u-shell grid gap-x-8 gap-y-16 min-[900px]:grid-cols-3">
            {doctors.map((doc, i) => {
              const card = (
                <>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-marble-deep">
                    <img
                      src={doc.image}
                      alt={`${doc.prefix} ${doc.name}`}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="u-eyebrow mt-6 text-wine/70">{doc.prefix}</p>
                  <h2 className="u-display mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight">
                    {doc.name}
                  </h2>
                  <span className="mt-4 block h-px w-10 origin-left bg-gold transition-transform duration-500 ease-out group-hover:scale-x-[4]" />
                  <ul className="mt-4 space-y-1 text-sm leading-relaxed text-muted">
                    {doc.titles.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {doc.bio ? (
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-wine">
                      Biografija
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  ) : (
                    <span className="mt-6 inline-block text-sm text-muted/70">Biografija uskoro</span>
                  )}
                </>
              );

              const offset = i === 1 ? "min-[900px]:mt-20" : "";
              return doc.bio ? (
                <Link
                  key={doc.id}
                  href={`/preview/tim/${doc.slug}`}
                  data-reveal
                  className={`group block ${offset}`}
                >
                  {card}
                </Link>
              ) : (
                <article key={doc.id} data-reveal className={`group ${offset}`}>
                  {card}
                </article>
              );
            })}
          </Reveal>
        </section>

        <Contact />
      </main>
    </>
  );
}
