import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clinic, doctors, getDoctor } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Stranicu dobija samo lekar za kog imamo odobren tekst.
export function generateStaticParams() {
  return doctors.filter((d) => d.bio).map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDoctor((await params).slug);
  if (!doc) return {};
  return {
    title: `${doc.prefix} ${doc.name} — ${clinic.name} ${clinic.city}`,
    description: doc.bio?.lead,
    openGraph: { images: [doc.image] },
  };
}

export default async function DoctorPage({ params }: Props) {
  const doc = getDoctor((await params).slug);
  if (!doc?.bio) notFound();
  const { bio } = doc;

  const withBio = doctors.filter((d) => d.bio);
  const next = withBio[(withBio.indexOf(doc) + 1) % withBio.length];

  return (
    <>
      <Header standalone />
      <main>
        <section className="u-grain relative overflow-hidden bg-wine-deep pt-[calc(var(--header-h)+8vh)] text-marble">
          <div className="u-shell grid items-end gap-12 min-[900px]:grid-cols-[1.1fr_0.9fr]">
            <div className="pb-[10vh]">
              <Link
                href="/preview/tim"
                className="inline-flex items-center gap-2 text-sm text-marble/60 transition-colors hover:text-marble"
              >
                <ArrowLeft size={15} /> Naš tim
              </Link>
              <p className="u-eyebrow mt-10 text-blush/70">{doc.prefix}</p>
              <h1 className="u-display mt-3 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98]">
                {doc.name}
              </h1>
              <ul className="mt-8 space-y-2 border-l border-gold/60 pl-5 text-marble/85">
                {doc.titles.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <MagneticButton href="/booking" className="!bg-marble !text-wine-deep hover:!bg-blush">
                  Zakažite kod dr {doc.name.split(" ")[0]}
                </MagneticButton>
                <a
                  href={clinic.phoneHref}
                  className="text-sm text-marble/75 underline-offset-4 hover:text-marble hover:underline"
                >
                  ili pozovite {clinic.phone}
                </a>
              </div>
            </div>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md self-end overflow-hidden rounded-t-[999px] bg-wine/40">
              <img
                src={doc.image}
                alt={`${doc.prefix} ${doc.name}`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </section>

        <section className="bg-marble py-[12vh] text-ink">
          <Reveal className="u-shell">
            <p
              data-reveal
              className="u-display max-w-4xl text-[clamp(1.5rem,2.8vw,2.5rem)] leading-snug text-ink"
            >
              {bio.lead}
            </p>

            <dl data-reveal className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ink/10 min-[700px]:grid-cols-3">
              {bio.facts.map((f) => (
                <div key={f.label} className="bg-marble p-6">
                  <dt className="u-eyebrow text-wine/70">{f.label}</dt>
                  <dd className="mt-3 leading-relaxed">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section className="bg-blush-soft py-[12vh] text-ink">
          <Reveal className="u-shell grid gap-12 min-[900px]:grid-cols-[0.4fr_1fr]">
            <div data-reveal>
              <p className="u-eyebrow text-wine/70">Put</p>
              <h2 className="u-display u-h2 mt-3">Karijera</h2>
            </div>
            <ol className="relative border-l border-wine/20">
              {bio.timeline.map((t) => (
                <li key={t.year + t.text} data-reveal className="relative pb-10 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-wine" />
                  <p className="u-display text-2xl text-wine">{t.year}</p>
                  <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="bg-marble py-[12vh] text-ink">
          <Reveal className="u-shell">
            <div data-reveal>
              <p className="u-eyebrow text-wine/70">Stručno usavršavanje</p>
              <h2 className="u-display u-h2 mt-3">Edukacije</h2>
            </div>
            <div className="mt-14 grid gap-10 min-[900px]:grid-cols-3">
              {bio.education.map((g) => (
                <div key={g.area} data-reveal className="border-t border-ink/15 pt-6">
                  <h3 className="u-display text-xl text-wine">{g.area}</h3>
                  <ul className="mt-5 space-y-4">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {next && next !== doc && (
              <Link
                href={`/preview/tim/${next.slug}`}
                data-reveal
                className="group mt-24 flex items-center justify-between gap-6 border-t border-ink/15 pt-8"
              >
                <span>
                  <span className="u-eyebrow text-muted">Sledeći lekar</span>
                  <span className="u-display mt-2 block text-[clamp(1.6rem,3vw,2.6rem)]">
                    {next.prefix} {next.name}
                  </span>
                </span>
                <ArrowRight className="shrink-0 text-wine transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            )}
          </Reveal>
        </section>

        <Contact />
      </main>
    </>
  );
}
