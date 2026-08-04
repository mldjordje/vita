"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
  HeartPulse,
  Home,
  MapPin,
  MessageCircle,
  Plus,
  Settings,
  UserRound,
} from "lucide-react";
import { DemoTopbar } from "@/components/demo/DemoTopbar";

const clientNav = [
  { id: "pregled", label: "Pregled", icon: Home },
  { id: "termini", label: "Moji termini", icon: CalendarDays },
  { id: "dokumenti", label: "Dokumenti", icon: FileText },
  { id: "poruke", label: "Poruke", icon: MessageCircle, badge: "2" },
  { id: "profil", label: "Moj profil", icon: UserRound },
] as const;

const history = [
  {
    date: "21. jul 2026.",
    service: "Ginekološki pregled",
    doctor: "dr Ivana Cvetanović",
    status: "Završen",
  },
  {
    date: "18. jun 2026.",
    service: "Ultrazvučni pregled",
    doctor: "dr Vesna Krstić",
    status: "Završen",
  },
] as const;

function ClientSidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <aside className="hidden min-h-svh w-[252px] shrink-0 flex-col bg-wine-deep px-4 py-6 text-marble min-[900px]:flex">
      <Link href="/" className="px-4">
        <span className="u-display text-2xl">Vita Clinic</span>
        <span className="u-eyebrow mt-1 block text-marble/40">Portal za pacijentkinje</span>
      </Link>

      <nav className="mt-10 space-y-1" aria-label="Klijentski portal">
        {clientNav.map(({ id, label, icon: Icon, ...item }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                selected
                  ? "bg-white/12 text-white"
                  : "text-marble/62 hover:bg-white/7 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.7} />
              <span className="flex-1">{label}</span>
              {"badge" in item && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blush px-1.5 text-[10px] font-bold text-wine">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <HeartPulse size={20} className="text-gold-soft" />
        <p className="mt-4 text-sm font-medium">Treba ti pomoć?</p>
        <p className="mt-1 text-xs leading-relaxed text-marble/50">
          Pozovi recepciju ili pošalji poruku direktno iz portala.
        </p>
        <a
          href="tel:+381617036960"
          className="mt-4 block text-sm font-semibold text-gold-soft"
        >
          061 703 6960
        </a>
      </div>
    </aside>
  );
}

export default function ClientPage() {
  const [active, setActive] = useState("pregled");

  return (
    <main className="min-h-svh bg-[#f5f2f0] text-ink">
      <div className="flex min-h-svh">
        <ClientSidebar active={active} onChange={setActive} />

        <section className="min-w-0 flex-1">
          <DemoTopbar eyebrow="Dobro došla nazad" title="Milica Jovanović" />

          <nav
            className="u-scrollbar-none flex gap-1 overflow-x-auto border-b border-ink/10 bg-white px-4 py-2 min-[900px]:hidden"
            aria-label="Klijentski portal"
          >
            {clientNav.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium ${
                  active === id ? "bg-wine text-marble" : "text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="mx-auto max-w-[1380px] p-5 sm:p-8">
            {active === "pregled" && <Overview onNavigate={setActive} />}
            {active === "termini" && <Appointments />}
            {active === "dokumenti" && <Documents />}
            {active === "poruke" && <Messages />}
            {active === "profil" && <Profile />}
          </div>
        </section>
      </div>
    </main>
  );
}

function Overview({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="u-eyebrow text-rose">Moj Vita pregled</p>
          <h2 className="u-display mt-2 text-[clamp(2.2rem,4vw,3.7rem)] leading-none text-wine-deep">
            Sve što ti je važno.
          </h2>
        </div>
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 rounded-full bg-wine px-5 py-3 text-sm font-medium text-marble transition-colors hover:bg-wine-deep"
        >
          <Plus size={16} /> Zakaži novi termin
        </Link>
      </div>

      <div className="mt-8 grid gap-5 min-[1180px]:grid-cols-[1.2fr_0.8fr]">
        <article className="relative overflow-hidden rounded-3xl bg-wine-deep p-6 text-marble shadow-[0_24px_70px_rgba(90,17,48,0.16)] sm:p-8">
          <img
            src="/media/trudnoca-uzv.webp"
            alt=""
            className="absolute right-0 top-0 h-full w-[42%] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wine-deep via-wine-deep/95 to-transparent" />
          <div className="relative max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft">
              <span className="h-2 w-2 rounded-full bg-gold-soft" />
              Sledeći termin
            </div>
            <h3 className="u-display mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
              Kontrola trudnoće
            </h3>
            <p className="mt-3 text-sm text-marble/62">sa dr Ivanom Cvetanović</p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <p className="flex items-center gap-2 text-sm">
                <CalendarDays size={17} className="text-gold-soft" />
                Četvrtak, 6. avgust
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Clock3 size={17} className="text-gold-soft" />
                10:00
              </p>
              <p className="flex items-center gap-2 text-sm">
                <MapPin size={17} className="text-gold-soft" />
                Ćirila i Metodija 14
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate("termini")}
                className="rounded-full bg-marble px-5 py-2.5 text-sm font-medium text-wine"
              >
                Detalji termina
              </button>
              <button
                type="button"
                className="rounded-full border border-marble/20 px-5 py-2.5 text-sm font-medium text-marble/75 transition-colors hover:text-white"
              >
                Dodaj u kalendar
              </button>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-ink/8 bg-white p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="u-eyebrow text-rose">Trudnoća</p>
              <h3 className="u-display mt-2 text-3xl text-wine-deep">28. nedelja</h3>
            </div>
            <span className="rounded-full bg-blush-soft px-3 py-1.5 text-xs font-medium text-wine">
              Treći trimestar
            </span>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Početak</span>
              <span>Očekivani termin: 24. oktobar</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-marble-deep">
              <div className="h-full w-[70%] rounded-full bg-wine" />
            </div>
          </div>
          <div className="mt-7 rounded-2xl bg-blush-soft p-4">
            <p className="text-sm font-semibold text-wine-deep">Sledeće: 4D pregled</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Idealno između 28. i 32. nedelje trudnoće.
            </p>
          </div>
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <article className="rounded-3xl border border-ink/8 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="u-eyebrow text-muted">Istorija</p>
              <h3 className="u-display mt-2 text-2xl text-wine-deep">Poslednje posete</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("termini")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-wine"
            >
              Svi termini <ArrowRight size={15} />
            </button>
          </div>
          <div className="mt-6 divide-y divide-ink/8">
            {history.map((item) => (
              <div key={item.date} className="flex flex-wrap items-center gap-4 py-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blush-soft text-wine">
                  <CalendarDays size={18} />
                </span>
                <div className="min-w-[190px] flex-1">
                  <p className="text-sm font-semibold">{item.service}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.date} · {item.doctor}
                  </p>
                </div>
                <span className="rounded-full bg-[#e9f6ef] px-3 py-1 text-xs font-medium text-[#27754a]">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-ink/8 bg-white p-6">
          <p className="u-eyebrow text-muted">Brze akcije</p>
          <div className="mt-5 space-y-2">
            {[
              { label: "Pošalji poruku", icon: MessageCircle, action: "poruke" },
              { label: "Pogledaj nalaze", icon: FileText, action: "dokumenti" },
              { label: "Izmeni profil", icon: Settings, action: "profil" },
            ].map(({ label, icon: Icon, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => onNavigate(action)}
                className="flex w-full items-center gap-3 rounded-2xl border border-ink/8 px-4 py-3.5 text-left text-sm font-medium transition-colors hover:border-wine/20 hover:bg-blush-soft"
              >
                <Icon size={17} className="text-wine" />
                <span className="flex-1">{label}</span>
                <ArrowRight size={15} className="text-muted" />
              </button>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div>
      <p className="u-eyebrow text-rose">{eyebrow}</p>
      <h2 className="u-display mt-2 text-[clamp(2.2rem,4vw,3.7rem)] leading-none text-wine-deep">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{copy}</p>
    </div>
  );
}

function Appointments() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <PageIntro
          eyebrow="Moji termini"
          title="Posete i rezervacije"
          copy="Svi prethodni i predstojeći termini, sa dokumentima i detaljima pregleda."
        />
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 rounded-full bg-wine px-5 py-3 text-sm font-medium text-marble"
        >
          <Plus size={16} /> Novi termin
        </Link>
      </div>
      <div className="mt-8 overflow-hidden rounded-3xl border border-ink/8 bg-white">
        <div className="border-b border-ink/8 bg-blush-soft/55 px-6 py-4">
          <p className="text-sm font-semibold text-wine-deep">Predstojeći termin</p>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <div className="rounded-2xl bg-wine px-5 py-4 text-center text-marble">
            <span className="text-xs font-semibold tracking-[0.15em]">AVG</span>
            <span className="u-display mt-1 block text-3xl">06</span>
          </div>
          <div>
            <h3 className="u-display text-2xl text-wine-deep">Kontrola trudnoće</h3>
            <p className="mt-2 text-sm text-muted">
              10:00 · dr Ivana Cvetanović · Ćirila i Metodija 14
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-wine/20 px-5 py-2.5 text-sm font-medium text-wine"
          >
            Promeni termin
          </button>
        </div>
      </div>
      <div className="mt-5 rounded-3xl border border-ink/8 bg-white p-6">
        <p className="u-eyebrow text-muted">Prethodne posete</p>
        <div className="mt-5 divide-y divide-ink/8">
          {history.map((item) => (
            <div key={item.date} className="flex flex-wrap items-center gap-4 py-5">
              <CalendarDays size={19} className="text-wine" />
              <div className="min-w-[190px] flex-1">
                <p className="text-sm font-semibold">{item.service}</p>
                <p className="mt-1 text-xs text-muted">
                  {item.date} · {item.doctor}
                </p>
              </div>
              <button type="button" className="text-sm font-medium text-wine">
                Pogledaj detalje
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Documents() {
  const docs = [
    { name: "Nalaz ginekološkog pregleda", date: "21. jul 2026.", type: "PDF · 248 KB" },
    { name: "Laboratorijski rezultati", date: "18. jun 2026.", type: "PDF · 1.2 MB" },
    { name: "Ultrazvučni snimci", date: "18. jun 2026.", type: "ZIP · 8.4 MB" },
  ];
  return (
    <>
      <PageIntro
        eyebrow="Dokumenti"
        title="Nalazi na jednom mestu"
        copy="Demo biblioteka nalaza, analiza i snimaka dostupnih nakon pregleda."
      />
      <div className="mt-8 grid gap-4">
        {docs.map((doc) => (
          <article
            key={doc.name}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-ink/8 bg-white p-5"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-blush-soft text-wine">
              <FileText size={20} />
            </span>
            <div className="min-w-[210px] flex-1">
              <h3 className="text-sm font-semibold">{doc.name}</h3>
              <p className="mt-1 text-xs text-muted">
                {doc.date} · {doc.type}
              </p>
            </div>
            <button type="button" className="rounded-full border border-wine/20 px-4 py-2 text-xs font-semibold text-wine">
              Preuzmi
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

function Messages() {
  return (
    <>
      <PageIntro
        eyebrow="Poruke"
        title="Razgovor sa ordinacijom"
        copy="Brza pitanja za recepciju i diskretna komunikacija sa timom."
      />
      <div className="mt-8 overflow-hidden rounded-3xl border border-ink/8 bg-white">
        <div className="border-b border-ink/8 px-6 py-4">
          <p className="text-sm font-semibold text-wine-deep">Vita recepcija</p>
          <p className="mt-1 text-xs text-[#27754a]">Dostupni smo · odgovor obično za 10 min</p>
        </div>
        <div className="space-y-4 bg-marble/60 p-6">
          <div className="max-w-md rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-relaxed shadow-sm">
            Zdravo Milice, podsećamo te na kontrolu u četvrtak u 10:00. Da li termin i dalje odgovara?
            <p className="mt-2 text-[10px] text-muted">Danas, 09:12</p>
          </div>
          <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-wine p-4 text-sm leading-relaxed text-marble">
            Zdravo, odgovara. Vidimo se u četvrtak!
            <p className="mt-2 text-[10px] text-marble/50">Danas, 09:18</p>
          </div>
        </div>
        <div className="flex gap-3 border-t border-ink/8 p-4">
          <input
            placeholder="Napiši poruku..."
            className="min-w-0 flex-1 rounded-full border border-ink/10 bg-marble px-5 py-3 text-sm outline-none focus:border-wine"
          />
          <button type="button" className="rounded-full bg-wine px-5 py-3 text-sm font-medium text-marble">
            Pošalji
          </button>
        </div>
      </div>
    </>
  );
}

function Profile() {
  return (
    <>
      <PageIntro
        eyebrow="Moj profil"
        title="Lični podaci"
        copy="Kontakt podaci koji se koriste za potvrdu i podsetnike termina."
      />
      <form className="mt-8 max-w-3xl rounded-3xl border border-ink/8 bg-white p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Ime i prezime", "Milica Jovanović"],
            ["Telefon", "064 123 45 67"],
            ["Email", "milica@example.com"],
            ["Datum rođenja", "18. 05. 1993."],
          ].map(([label, value]) => (
            <label key={label}>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {label}
              </span>
              <input
                defaultValue={value}
                className="w-full rounded-xl border border-ink/10 bg-marble px-4 py-3.5 text-sm outline-none focus:border-wine"
              />
            </label>
          ))}
        </div>
        <button type="button" className="mt-7 rounded-full bg-wine px-6 py-3 text-sm font-medium text-marble">
          Sačuvaj izmene
        </button>
      </form>
    </>
  );
}
