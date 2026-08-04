"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { demoDates, demoDoctors, demoServices, demoSlots } from "@/lib/demo-data";

const steps = ["Usluga", "Termin", "Podaci"] as const;
const weekdays = ["PON", "UTO", "SRE", "ČET", "PET", "SUB", "NED"] as const;
const august2026Cells: Array<number | null> = [
  ...Array.from({ length: 5 }, () => null),
  ...Array.from({ length: 31 }, (_, index) => index + 1),
  ...Array.from({ length: 6 }, () => null),
];

export default function BookingPage() {
  const [bookingStarted, setBookingStarted] = useState(false);
  const [accessMethod, setAccessMethod] = useState<"google" | "guest" | null>(null);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] =
    useState<(typeof demoServices)[number]["id"]>(demoServices[1].id);
  const [doctorId, setDoctorId] =
    useState<(typeof demoDoctors)[number]["id"]>(demoDoctors[0].id);
  const [dateIndex, setDateIndex] = useState(1);
  const [slot, setSlot] = useState("10:00");
  const [done, setDone] = useState(false);

  const service = useMemo(
    () => demoServices.find((item) => item.id === serviceId) ?? demoServices[0],
    [serviceId]
  );
  const doctor = useMemo(
    () => demoDoctors.find((item) => item.id === doctorId) ?? demoDoctors[0],
    [doctorId]
  );
  const date = demoDates[dateIndex];

  if (done) {
    return (
      <main className="min-h-svh bg-marble px-5 py-10 text-ink sm:px-8">
        <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-3xl flex-col items-center justify-center text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-wine text-marble shadow-[0_18px_45px_rgba(123,30,63,0.22)]">
            <Check size={34} strokeWidth={1.8} />
          </div>
          <p className="u-eyebrow mt-8 text-rose">Termin je rezervisan</p>
          <h1 className="u-display mt-3 text-[clamp(2.7rem,7vw,5rem)] leading-[0.98] text-wine-deep">
            Vidimo se uskoro
          </h1>
          <p className="u-lead mt-6 max-w-xl text-muted">
            Potvrda termina je spremna. U pravom proizvodu pacijentkinja bi je dobila
            mejlom i SMS porukom.
          </p>

          <div className="mt-10 w-full rounded-3xl border border-wine/10 bg-white p-7 text-left shadow-[0_24px_80px_rgba(90,17,48,0.08)]">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="u-eyebrow text-muted">Rezervacija V-2846</p>
                <h2 className="u-display mt-2 text-2xl text-wine-deep">{service.name}</h2>
              </div>
              <span className="rounded-full bg-[#e9f6ef] px-3 py-1.5 text-xs font-semibold text-[#27754a]">
                Potvrđen
              </span>
            </div>
            <dl className="mt-7 grid gap-5 border-t border-ink/10 pt-6 sm:grid-cols-3">
              <div>
                <dt className="u-eyebrow text-muted">Datum i vreme</dt>
                <dd className="mt-2 text-sm font-medium">
                  {date.date}. avgust · {slot}
                </dd>
              </div>
              <div>
                <dt className="u-eyebrow text-muted">Lekar</dt>
                <dd className="mt-2 text-sm font-medium">{doctor.shortName}</dd>
              </div>
              <div>
                <dt className="u-eyebrow text-muted">Ordinacija</dt>
                <dd className="mt-2 text-sm font-medium">Ćirila i Metodija 14</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/client"
              className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-medium text-marble transition-colors hover:bg-wine-deep"
            >
              Otvori moj nalog <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStep(0);
              }}
              className="rounded-full border border-wine/20 px-6 py-3.5 text-sm font-medium text-wine transition-colors hover:bg-blush-soft"
            >
              Nova rezervacija
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-marble text-ink">
      <div className="grid min-h-svh min-[1000px]:grid-cols-[0.78fr_1.22fr]">
        <aside className="relative hidden overflow-hidden bg-wine-deep text-marble min-[1000px]:flex min-[1000px]:flex-col min-[1000px]:justify-between">
          <img
            src="/media/hero-poster.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/45 via-wine-deep/70 to-wine-deep" />

          <div className="relative p-10">
            <Link href="/" className="u-display text-2xl tracking-tight">
              Vita Clinic
            </Link>
            <p className="u-eyebrow mt-1 text-marble/45">Niš · Demo rezervacija</p>
          </div>

          <div className="relative p-10 pb-12">
            <Sparkles size={22} className="text-gold-soft" />
            <h1 className="u-display mt-6 max-w-md text-[clamp(3rem,5vw,5.5rem)] leading-[0.92]">
              Termin koji biraš bez poziva.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-marble/70">
              Tri kratka koraka, trenutna potvrda i svi detalji pregleda na jednom mestu.
            </p>

            <div className="mt-10 grid gap-3 text-sm text-marble/75">
              <p className="flex items-center gap-3">
                <ShieldCheck size={17} className="text-gold-soft" />
                Podaci su privatni i zaštićeni
              </p>
              <p className="flex items-center gap-3">
                <Clock3 size={17} className="text-gold-soft" />
                Promena termina u par klikova
              </p>
              <p className="flex items-center gap-3">
                <MapPin size={17} className="text-gold-soft" />
                Ćirila i Metodija 14, Niš
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex items-center justify-between gap-5 border-b border-ink/10 px-5 py-5 sm:px-8 min-[1000px]:px-12">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                aria-label="Nazad na landing"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:text-wine"
              >
                <ArrowLeft size={17} />
              </Link>
              <div className="min-[1000px]:hidden">
                <p className="u-display text-lg text-wine-deep">Vita Clinic</p>
                <p className="u-eyebrow text-muted">Rezervacija</p>
              </div>
            </div>
            <p className="hidden text-sm text-muted sm:block">
              Potrebna pomoć? <span className="font-medium text-wine">061 703 6960</span>
            </p>
          </header>

          {!bookingStarted ? (
            <div className="mx-auto flex w-full max-w-2xl flex-1 items-center px-5 py-10 sm:px-8 min-[1000px]:px-12">
              <div className="w-full">
                <p className="u-eyebrow text-rose">Pre zakazivanja</p>
                <h2 className="u-display mt-3 text-[clamp(2.5rem,5vw,4.6rem)] leading-[0.98] text-wine-deep">
                  Sačuvaj termin
                  <br />
                  na svom nalogu
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                  Prijava čuva rezervacije, dokumente i poruke na jednom mestu. Za demo
                  možeš nastaviti i bez naloga.
                </p>

                <div className="mt-10 rounded-3xl border border-wine/10 bg-white p-6 shadow-[0_24px_80px_rgba(90,17,48,0.08)] sm:p-8">
                  <button
                    type="button"
                    onClick={() => {
                      setAccessMethod("google");
                      setBookingStarted(true);
                    }}
                    className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border border-ink/15 bg-white px-5 py-4 text-sm font-semibold text-ink shadow-sm transition-all hover:border-wine/30 hover:bg-blush-soft/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt=""
                      className="h-5 w-5"
                    />
                    Nastavi uz Google
                  </button>

                  <div className="my-6 flex items-center gap-4" aria-hidden="true">
                    <span className="h-px flex-1 bg-ink/10" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      ili
                    </span>
                    <span className="h-px flex-1 bg-ink/10" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAccessMethod("guest");
                      setBookingStarted(true);
                    }}
                    className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-wine px-5 py-4 text-sm font-semibold text-marble transition-colors hover:bg-wine-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
                  >
                    <UserRound size={18} strokeWidth={1.8} />
                    Nastavi bez prijave
                  </button>

                  <p className="mt-5 text-center text-xs leading-relaxed text-muted">
                    Demo prikaz — Google prijava i čuvanje naloga trenutno nisu aktivni.
                  </p>
                </div>

                <div className="mt-7 flex items-start gap-3 rounded-2xl bg-blush-soft px-5 py-4">
                  <ShieldCheck className="mt-0.5 shrink-0 text-wine" size={18} />
                  <p className="text-sm leading-relaxed text-muted">
                    U produkciji se medicinski podaci ne dele sa Google-om; prijava služi
                    samo za bezbedan pristup Vita nalogu.
                  </p>
                </div>
              </div>
            </div>
          ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 min-[1000px]:px-12 min-[1000px]:py-10">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted">
                {accessMethod === "google"
                  ? "Demo Google nalog · milica@example.com"
                  : "Zakazivanje bez prijave"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setBookingStarted(false);
                  setAccessMethod(null);
                  setStep(0);
                }}
                className="text-xs font-semibold text-wine underline decoration-wine/30 underline-offset-4 transition-colors hover:text-wine-deep"
              >
                Promeni način prijave
              </button>
            </div>
            <ol className="flex items-center" aria-label="Koraci rezervacije">
              {steps.map((label, index) => (
                <li key={label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold transition-colors ${
                        index <= step
                          ? "bg-wine text-marble"
                          : "border border-ink/15 bg-white text-muted"
                      }`}
                    >
                      {index < step ? <Check size={14} /> : index + 1}
                    </span>
                    <span
                      className={`hidden text-xs font-semibold uppercase tracking-[0.14em] sm:block ${
                        index <= step ? "text-wine" : "text-muted"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <span
                      className={`mx-3 h-px flex-1 sm:mx-5 ${
                        index < step ? "bg-wine" : "bg-ink/10"
                      }`}
                    />
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-10 flex-1">
              {step === 0 && (
                <div>
                  <p className="u-eyebrow text-rose">Korak 1 od 3</p>
                  <h2 className="u-display mt-2 text-[clamp(2.2rem,4vw,3.6rem)] leading-tight text-wine-deep">
                    Šta zakazujemo?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Izaberi uslugu i lekara. Sve se može promeniti kasnije.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {demoServices.map((item) => {
                      const selected = item.id === serviceId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setServiceId(item.id)}
                          className={`rounded-2xl border p-5 text-left transition-all ${
                            selected
                              ? "border-wine bg-blush-soft shadow-[0_12px_30px_rgba(123,30,63,0.08)]"
                              : "border-ink/10 bg-white hover:border-wine/25"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span className="u-display text-xl text-wine-deep">{item.name}</span>
                            <span
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                                selected
                                  ? "border-wine bg-wine text-white"
                                  : "border-ink/15 text-transparent"
                              }`}
                            >
                              <Check size={13} />
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                          <div className="mt-5 flex items-center justify-between text-xs font-medium">
                            <span className="flex items-center gap-1.5 text-muted">
                              <Clock3 size={14} /> {item.duration}
                            </span>
                            <span className="text-wine">{item.price}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="u-eyebrow mt-9 text-muted">Izaberi lekara</p>
                  <div className="u-scrollbar-none mt-3 flex gap-3 overflow-x-auto pb-2">
                    {demoDoctors.map((item) => {
                      const selected = item.id === doctorId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDoctorId(item.id)}
                          className={`flex min-w-[210px] items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                            selected
                              ? "border-wine bg-white"
                              : "border-ink/10 bg-white/55 hover:border-wine/25"
                          }`}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="h-12 w-12 rounded-xl object-cover object-[50%_28%]"
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold">{item.shortName}</span>
                            <span className="mt-1 block truncate text-xs text-muted">{item.role}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="u-eyebrow text-rose">Korak 2 od 3</p>
                  <h2 className="u-display mt-2 text-[clamp(2.2rem,4vw,3.6rem)] leading-tight text-wine-deep">
                    Izaberi termin
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Prikazujemo prve slobodne termine za {doctor.shortName}.
                  </p>

                  <div className="mt-8 grid items-start gap-5 min-[760px]:grid-cols-[minmax(310px,0.9fr)_minmax(340px,1.1fr)]">
                    <div className="rounded-3xl border border-ink/10 bg-white p-5 sm:p-7">
                      <div className="flex items-center justify-between gap-5">
                        <div>
                          <p className="u-eyebrow text-muted">Izaberi datum</p>
                          <h3 className="u-display mt-2 text-2xl text-wine-deep">
                            Avgust 2026.
                          </h3>
                        </div>
                        <CalendarDays size={21} className="text-wine" />
                      </div>

                      <div
                        role="group"
                        aria-label="Kalendar slobodnih termina za avgust 2026."
                        className="mt-6 grid grid-cols-7 gap-1"
                      >
                        {weekdays.map((day) => (
                          <span
                            key={day}
                            aria-hidden="true"
                            className="pb-2 text-center text-[9px] font-semibold tracking-[0.12em] text-muted"
                          >
                            {day}
                          </span>
                        ))}

                        {august2026Cells.map((day, cellIndex) => {
                          if (day === null) {
                            return <span key={`empty-${cellIndex}`} aria-hidden="true" />;
                          }

                          const availableIndex = demoDates.findIndex(
                            (item) => Number(item.date) === day
                          );
                          const available = availableIndex >= 0;
                          const selected = Number(date.date) === day;

                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={!available}
                              onClick={() => setDateIndex(availableIndex)}
                              aria-label={
                                available
                                  ? `${day}. avgust, slobodan termin`
                                  : `${day}. avgust, nema slobodnih termina`
                              }
                              aria-pressed={available ? selected : undefined}
                              className={`relative grid aspect-square min-h-10 place-items-center rounded-xl text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${
                                selected
                                  ? "bg-wine text-marble shadow-[0_8px_20px_rgba(123,30,63,0.22)]"
                                  : available
                                    ? "bg-blush-soft text-wine hover:bg-blush"
                                    : "cursor-default text-muted/35"
                              }`}
                            >
                              {day}
                              {available && !selected && (
                                <span
                                  aria-hidden="true"
                                  className="absolute bottom-1.5 h-1 w-1 rounded-full bg-wine"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5 flex items-center gap-2 border-t border-ink/8 pt-4 text-xs text-muted">
                        <span className="h-2 w-2 rounded-full bg-wine" aria-hidden="true" />
                        Dani sa slobodnim terminima
                      </div>
                    </div>

                    <div className="rounded-3xl border border-ink/10 bg-white p-5 sm:p-7">
                      <div className="flex items-center justify-between gap-5">
                        <div>
                          <p className="u-eyebrow text-muted">Slobodni termini</p>
                          <p className="mt-2 text-sm font-medium">
                            {date.day}, {date.date}. avgust 2026.
                          </p>
                        </div>
                        <span className="rounded-full bg-blush-soft px-3 py-1.5 text-xs font-semibold text-wine">
                          {doctor.shortName}
                        </span>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 min-[760px]:grid-cols-3">
                        {demoSlots.map((item, index) => {
                          const unavailable = index === 1 || index === 5;
                          const selected = item === slot;
                          return (
                            <button
                              key={item}
                              type="button"
                              disabled={unavailable}
                              onClick={() => setSlot(item)}
                              className={`rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                                unavailable
                                  ? "cursor-not-allowed bg-ink/[0.035] text-muted/45 line-through"
                                  : selected
                                    ? "bg-wine text-marble"
                                    : "border border-ink/10 bg-marble hover:border-wine/30"
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-5 border-t border-ink/8 pt-4 text-xs leading-relaxed text-muted">
                        Izaberi vreme koje ti odgovara. Zauzeti termini su precrtani.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="u-eyebrow text-rose">Korak 3 od 3</p>
                  <h2 className="u-display mt-2 text-[clamp(2.2rem,4vw,3.6rem)] leading-tight text-wine-deep">
                    Još samo tvoji podaci
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Koristimo ih isključivo za potvrdu i podsetnik termina.
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Ime i prezime
                      </span>
                      <input
                        defaultValue="Milica Jovanović"
                        className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-wine"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Telefon
                      </span>
                      <input
                        defaultValue="064 123 45 67"
                        inputMode="tel"
                        className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-wine"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Email
                      </span>
                      <input
                        defaultValue="milica@example.com"
                        inputMode="email"
                        className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-wine"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Napomena za lekara <span className="normal-case tracking-normal">(opciono)</span>
                      </span>
                      <textarea
                        rows={3}
                        placeholder="Napiši sve što smatraš važnim..."
                        className="w-full resize-none rounded-xl border border-ink/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-wine"
                      />
                    </label>
                  </div>

                  <div className="mt-7 rounded-2xl border border-wine/10 bg-blush-soft p-5">
                    <div className="flex gap-3">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-wine" />
                      <div>
                        <p className="text-sm font-semibold text-wine-deep">Pregled rezervacije</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {service.name} · {doctor.shortName} · {date.date}. avgust u {slot}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-wine disabled:invisible"
              >
                <ArrowLeft size={16} /> Nazad
              </button>
              <button
                type="button"
                onClick={() => {
                  if (step === steps.length - 1) {
                    setDone(true);
                  } else {
                    setStep((current) => current + 1);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-medium text-marble transition-colors hover:bg-wine-deep"
              >
                {step === steps.length - 1 ? "Potvrdi termin" : "Nastavi"}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          )}
        </section>
      </div>
    </main>
  );
}
