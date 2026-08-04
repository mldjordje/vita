"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  HeartPulse,
  LayoutDashboard,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import { DemoTopbar } from "@/components/demo/DemoTopbar";
import { demoAppointments, demoDoctors } from "@/lib/demo-data";

type Role = "owner" | "worker";
type AdminNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const ownerNav: AdminNavItem[] = [
  { id: "overview", label: "Pregled", icon: LayoutDashboard },
  { id: "calendar", label: "Kalendar", icon: CalendarDays },
  { id: "appointments", label: "Termini", icon: Clock3 },
  { id: "patients", label: "Pacijentkinje", icon: UsersRound },
  { id: "team", label: "Tim i lekari", icon: Stethoscope },
  { id: "finance", label: "Finansije", icon: CircleDollarSign },
  { id: "analytics", label: "Analitika", icon: BarChart3 },
  { id: "settings", label: "Podešavanja", icon: Settings },
];

const workerNav: AdminNavItem[] = [
  { id: "my-day", label: "Moj dan", icon: LayoutDashboard },
  { id: "my-calendar", label: "Moj kalendar", icon: CalendarDays },
  { id: "my-appointments", label: "Moji termini", icon: Clock3 },
  { id: "my-patients", label: "Moje pacijentkinje", icon: UsersRound },
  { id: "availability", label: "Moja dostupnost", icon: Activity },
  { id: "profile", label: "Profil", icon: UserRound },
];

const statusStyles: Record<string, string> = {
  Potvrđen: "bg-[#e9f6ef] text-[#27754a]",
  "Čeka potvrdu": "bg-[#fff3d8] text-[#8a5b08]",
  Otkazan: "bg-[#fce8ec] text-[#9b2c42]",
};

export default function AdminPage() {
  const [role, setRole] = useState<Role>("owner");
  const [active, setActive] = useState("overview");
  const nav = role === "owner" ? ownerNav : workerNav;

  const activeLabel = useMemo(
    () => nav.find((item) => item.id === active)?.label ?? nav[0].label,
    [active, nav]
  );

  const changeRole = (nextRole: Role) => {
    setRole(nextRole);
    setActive(nextRole === "owner" ? "overview" : "my-day");
  };

  return (
    <main className="min-h-svh bg-[#f3f1ef] text-ink">
      <div className="flex min-h-svh">
        <aside className="hidden w-[264px] shrink-0 flex-col bg-[#24131a] px-4 py-6 text-marble min-[960px]:flex">
          <Link href="/" className="px-4">
            <span className="u-display text-2xl">Vita Clinic</span>
            <span className="u-eyebrow mt-1 block text-marble/35">Clinic workspace</span>
          </Link>

          <div className="mx-2 mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-1">
            <p className="px-3 pb-2 pt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-marble/35">
              Demo prikaz
            </p>
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => changeRole("owner")}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  role === "owner" ? "bg-wine text-white" : "text-marble/50 hover:text-white"
                }`}
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => changeRole("worker")}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  role === "worker" ? "bg-wine text-white" : "text-marble/50 hover:text-white"
                }`}
              >
                Worker
              </button>
            </div>
          </div>

          <nav className="mt-7 space-y-1" aria-label="Admin navigacija">
            {nav.map(({ id, label, icon: Icon }) => {
              const selected = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                    selected
                      ? "bg-white/10 text-white"
                      : "text-marble/52 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.7} />
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="mx-2 mt-auto flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3">
            <img
              src={role === "owner" ? "/media/recepcija-osoblje.webp" : demoDoctors[0].image}
              alt=""
              className="h-10 w-10 rounded-xl object-cover object-[50%_28%]"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {role === "owner" ? "Miljana Mitrović" : "dr Ivana C."}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-marble/35">
                {role === "owner" ? "Vlasnik ordinacije" : "Ginekolog"}
              </p>
            </div>
            <MoreHorizontal size={16} className="text-marble/35" />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <DemoTopbar
            eyebrow={role === "owner" ? "Owner workspace" : "Worker workspace"}
            title={activeLabel}
            person={role === "owner" ? "Miljana M." : "dr Ivana"}
          />

          <div className="border-b border-ink/10 bg-white px-4 py-3 min-[960px]:hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-xl bg-marble-deep p-1">
                {(["owner", "worker"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => changeRole(item)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize ${
                      role === item ? "bg-wine text-white" : "text-muted"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <span className="u-eyebrow text-muted">Demo prikaz</span>
            </div>
            <nav
              className="u-scrollbar-none mt-3 flex gap-1 overflow-x-auto pb-1"
              aria-label="Admin navigacija"
            >
              {nav.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium ${
                    active === id ? "bg-ink text-white" : "text-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mx-auto max-w-[1540px] p-5 sm:p-8">
            {role === "owner" ? (
              <OwnerContent active={active} onNavigate={setActive} />
            ) : (
              <WorkerContent active={active} onNavigate={setActive} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminIntro({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="u-eyebrow text-rose">{eyebrow}</p>
        <h2 className="u-display mt-2 text-[clamp(2rem,3.8vw,3.4rem)] leading-none text-wine-deep">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{copy}</p>
      </div>
      {action && (
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-wine px-5 py-3 text-sm font-medium text-white"
        >
          <Plus size={16} /> {action}
        </button>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border p-5 ${
        accent ? "border-wine bg-wine text-white" : "border-ink/8 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${accent ? "text-white/55" : "text-muted"}`}>
          {label}
        </p>
        <span
          className={`grid h-9 w-9 place-items-center rounded-xl ${
            accent ? "bg-white/12 text-gold-soft" : "bg-blush-soft text-wine"
          }`}
        >
          <Icon size={17} />
        </span>
      </div>
      <p className="u-display mt-6 text-4xl">{value}</p>
      <p className={`mt-2 text-xs ${accent ? "text-white/55" : "text-muted"}`}>{detail}</p>
    </article>
  );
}

function OwnerContent({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  if (active === "overview") return <OwnerOverview onNavigate={onNavigate} />;
  if (active === "calendar") return <CalendarView owner />;
  if (active === "appointments") return <AppointmentsTable owner />;
  if (active === "patients") return <PatientsView />;
  if (active === "team") return <TeamView />;
  if (active === "finance") return <FinanceView />;
  if (active === "analytics") return <AnalyticsView />;
  return <SettingsView owner />;
}

function OwnerOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <>
      <AdminIntro
        eyebrow="Utorak, 4. avgust"
        title="Dobro jutro, Miljana."
        copy="Klinika je spremna za današnje termine. Dva zahteva čekaju tvoju potvrdu."
        action="Novi termin"
      />

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Danas" value="18" detail="+3 u odnosu na juče" icon={CalendarDays} accent />
        <MetricCard label="Čeka potvrdu" value="4" detail="2 nova zahteva" icon={Clock3} />
        <MetricCard label="Nove pacijentkinje" value="7" detail="ove nedelje" icon={UsersRound} />
        <MetricCard label="Prihod danas" value="92.500" detail="RSD · 68% cilja" icon={CircleDollarSign} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-3xl border border-ink/8 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="u-eyebrow text-muted">Dnevni raspored</p>
              <h3 className="u-display mt-2 text-2xl text-wine-deep">Sledeći termini</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("calendar")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-wine"
            >
              Otvori kalendar <ChevronRight size={15} />
            </button>
          </div>
          <div className="mt-6 divide-y divide-ink/8">
            {demoAppointments.slice(0, 4).map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-ink/8 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="u-eyebrow text-muted">Popunjenost</p>
              <h3 className="u-display mt-2 text-2xl text-wine-deep">Ova nedelja</h3>
            </div>
            <span className="u-display text-3xl text-wine">82%</span>
          </div>
          <div className="mt-7 flex h-48 items-end gap-3">
            {[
              ["PON", 76],
              ["UTO", 92],
              ["SRE", 84],
              ["ČET", 68],
              ["PET", 88],
              ["SUB", 52],
            ].map(([day, height]) => (
              <div key={String(day)} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-36 w-full items-end rounded-xl bg-blush-soft p-1">
                  <div
                    className="w-full rounded-lg bg-wine"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[9px] font-semibold tracking-[0.12em] text-muted">{day}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-marble p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e9f6ef] text-[#27754a]">
                <Activity size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold">Najtraženije: 10–13h</p>
                <p className="mt-0.5 text-xs text-muted">Predlog: otvori još 2 termina u četvrtak.</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <article className="rounded-3xl border border-ink/8 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="u-eyebrow text-muted">Tim danas</p>
              <h3 className="u-display mt-2 text-2xl text-wine-deep">Aktivni lekari</h3>
            </div>
            <button type="button" onClick={() => onNavigate("team")} className="text-sm font-medium text-wine">
              Upravljaj timom
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {demoDoctors.map((doctor, index) => (
              <div key={doctor.id} className="flex items-center gap-3 rounded-2xl border border-ink/8 p-3">
                <img src={doctor.image} alt="" className="h-11 w-11 rounded-xl object-cover object-[50%_28%]" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{doctor.shortName}</p>
                  <p className="mt-0.5 text-xs text-muted">{[7, 5, 6][index]} termina</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-3xl bg-blush-soft p-6">
          <MessageSquareText size={20} className="text-wine" />
          <p className="u-eyebrow mt-6 text-rose">Novi upiti</p>
          <p className="u-display mt-2 text-4xl text-wine-deep">6</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Dva upita čekaju odgovor duže od jednog sata.
          </p>
          <button type="button" className="mt-6 text-sm font-semibold text-wine">
            Otvori inbox
          </button>
        </article>
      </div>
    </>
  );
}

function AppointmentRow({
  appointment,
}: {
  appointment: (typeof demoAppointments)[number];
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <span className="w-12 text-sm font-semibold tabular-nums text-wine">{appointment.time}</span>
      <span className="h-8 w-1 rounded-full bg-wine/25" />
      <div className="min-w-[190px] flex-1">
        <p className="text-sm font-semibold">{appointment.patient}</p>
        <p className="mt-1 text-xs text-muted">
          {appointment.service} · {appointment.doctor}
        </p>
      </div>
      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[appointment.status]}`}>
        {appointment.status}
      </span>
      <button type="button" aria-label={`Opcije za ${appointment.patient}`} className="text-muted hover:text-wine">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

function CalendarView({ owner = false }: { owner?: boolean }) {
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  const doctors = owner ? demoDoctors : demoDoctors.slice(0, 1);
  return (
    <>
      <AdminIntro
        eyebrow={owner ? "Kalendar klinike" : "Moj kalendar"}
        title={owner ? "Svi lekari, jedan pogled" : "Raspored za ovu nedelju"}
        copy={
          owner
            ? "Vizuelni pregled raspoloživosti, potvrđenih termina i slobodnih blokova."
            : "Tvoji termini i slobodni blokovi za prijem pacijentkinja."
        }
        action="Novi termin"
      />
      <div className="mt-7 overflow-hidden rounded-3xl border border-ink/8 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/8 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-wine-deep">3–8. avgust 2026.</p>
            <p className="mt-1 text-xs text-muted">Nedelja 32</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full border border-ink/10 px-4 py-2 text-xs font-medium">
              Danas
            </button>
            <button type="button" className="rounded-full bg-wine px-4 py-2 text-xs font-medium text-white">
              Nedelja
            </button>
          </div>
        </div>
        <div className={`grid min-w-[780px] ${owner ? "grid-cols-[72px_repeat(3,1fr)]" : "grid-cols-[72px_1fr]"}`}>
          <div className="border-r border-ink/8 bg-marble/60" />
          {doctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center gap-3 border-r border-ink/8 p-4 last:border-r-0">
              <img src={doctor.image} alt="" className="h-9 w-9 rounded-lg object-cover object-[50%_28%]" />
              <div>
                <p className="text-xs font-semibold">{doctor.shortName}</p>
                <p className="mt-0.5 text-[10px] text-muted">{doctor.role}</p>
              </div>
            </div>
          ))}
          {hours.map((hour, hourIndex) => (
            <div key={hour} className="contents">
              <div className="border-r border-t border-ink/8 px-3 py-4 text-right text-[10px] text-muted">
                {hour}
              </div>
              {doctors.map((doctor, doctorIndex) => {
                const booked = (hourIndex + doctorIndex) % 3 !== 1;
                return (
                  <div
                    key={`${doctor.id}-${hour}`}
                    className="min-h-20 border-r border-t border-ink/8 p-2 last:border-r-0"
                  >
                    {booked && (
                      <button
                        type="button"
                        className="h-full w-full rounded-xl border-l-[3px] border-wine bg-blush-soft px-3 py-2 text-left"
                      >
                        <span className="block text-xs font-semibold text-wine-deep">
                          {demoAppointments[(hourIndex + doctorIndex) % demoAppointments.length].patient}
                        </span>
                        <span className="mt-1 block text-[10px] text-muted">
                          {demoAppointments[(hourIndex + doctorIndex) % demoAppointments.length].service}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AppointmentsTable({ owner = false }: { owner?: boolean }) {
  const rows = owner ? demoAppointments : demoAppointments.filter((item) => item.doctor === "dr Ivana");
  return (
    <>
      <AdminIntro
        eyebrow={owner ? "Termini" : "Moji termini"}
        title={owner ? "Sve rezervacije" : "Lista mojih pregleda"}
        copy="Pretraga, statusi i ključni detalji spremni za brz rad recepcije i lekara."
        action="Dodaj termin"
      />
      <div className="mt-7 overflow-hidden rounded-3xl border border-ink/8 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/8 p-4">
          <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl bg-marble px-4 py-3 sm:max-w-md">
            <Search size={16} className="text-muted" />
            <input placeholder="Pretraži pacijentkinje..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </label>
          <div className="flex gap-2">
            {["Svi", "Potvrđeni", "Na čekanju"].map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full px-4 py-2 text-xs font-medium ${
                  index === 0 ? "bg-ink text-white" : "border border-ink/10 text-muted"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-ink/8 px-5">
          {rows.map((appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </>
  );
}

function PatientsView() {
  const patients = [
    ["Milica Jovanović", "28. nedelja trudnoće", "06. avgust", "3 dokumenta"],
    ["Ana Petrović", "Redovna kontrola", "04. avgust", "1 dokument"],
    ["Jovana Stanković", "4D ultrazvuk", "04. avgust", "5 dokumenata"],
    ["Teodora Ilić", "Vita paket 2", "29. jul", "2 dokumenta"],
    ["Marija Nikolić", "Kontrola trudnoće", "24. jul", "4 dokumenta"],
  ];
  return (
    <>
      <AdminIntro
        eyebrow="Pacijentkinje"
        title="Kartoni i istorija"
        copy="Brz pristup poslednjim posetama, dokumentima i narednim kontrolama."
        action="Nova pacijentkinja"
      />
      <div className="mt-7 rounded-3xl border border-ink/8 bg-white p-5">
        <label className="flex max-w-md items-center gap-2 rounded-xl bg-marble px-4 py-3">
          <Search size={16} className="text-muted" />
          <input placeholder="Ime, telefon ili broj kartona..." className="flex-1 bg-transparent text-sm outline-none" />
        </label>
        <div className="mt-5 divide-y divide-ink/8">
          {patients.map(([name, note, visit, docs]) => (
            <button key={name} type="button" className="flex w-full flex-wrap items-center gap-4 py-4 text-left">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-blush-soft text-sm font-semibold text-wine">
                {name.split(" ").map((part) => part[0]).join("")}
              </span>
              <span className="min-w-[210px] flex-1">
                <span className="block text-sm font-semibold">{name}</span>
                <span className="mt-1 block text-xs text-muted">{note}</span>
              </span>
              <span className="text-xs text-muted">Poslednja poseta: {visit}</span>
              <span className="rounded-full bg-marble px-3 py-1.5 text-xs text-muted">{docs}</span>
              <ChevronRight size={16} className="text-muted" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function TeamView() {
  return (
    <>
      <AdminIntro
        eyebrow="Tim i lekari"
        title="Ljudi iza Vita iskustva"
        copy="Rasporedi, dostupnost i učinak tima u jednom vizuelnom pregledu."
        action="Dodaj člana"
      />
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {demoDoctors.map((doctor, index) => (
          <article key={doctor.id} className="overflow-hidden rounded-3xl border border-ink/8 bg-white">
            <div className="relative h-44 overflow-hidden bg-blush-soft">
              <img src={doctor.image} alt="" className="h-full w-full object-cover object-[50%_28%]" />
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[#27754a] shadow-sm">
                Aktivna
              </span>
            </div>
            <div className="p-5">
              <h3 className="u-display text-2xl text-wine-deep">{doctor.shortName}</h3>
              <p className="mt-1 text-xs text-muted">{doctor.role}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink/8 pt-4 text-center">
                <div>
                  <p className="u-display text-xl text-wine">{[32, 28, 21][index]}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-muted">Termina</p>
                </div>
                <div>
                  <p className="u-display text-xl text-wine">{[84, 76, 68][index]}%</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-muted">Popunjeno</p>
                </div>
                <div>
                  <p className="u-display text-xl text-wine">{[4.9, 4.8, 4.9][index]}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-muted">Ocena</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function FinanceView() {
  return (
    <>
      <AdminIntro
        eyebrow="Finansije"
        title="Prihod bez ručnih tabela"
        copy="Demo pregled naplaćenih termina, usluga i mesečnih trendova."
        action="Izvezi izveštaj"
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <MetricCard label="Ovaj mesec" value="1.84M" detail="RSD · +14.2%" icon={CircleDollarSign} accent />
        <MetricCard label="Prosečan račun" value="7.240" detail="RSD · +3.8%" icon={FileText} />
        <MetricCard label="Nenaplaćeno" value="46.000" detail="6 termina" icon={Clock3} />
      </div>
      <article className="mt-5 rounded-3xl border border-ink/8 bg-white p-6">
        <p className="u-eyebrow text-muted">Prihod po mesecima</p>
        <div className="mt-8 flex h-64 items-end gap-4">
          {[48, 62, 57, 71, 66, 82, 92].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex h-52 w-full items-end rounded-xl bg-marble p-1.5">
                <div className="w-full rounded-lg bg-wine" style={{ height: `${height}%` }} />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                {["FEB", "MAR", "APR", "MAJ", "JUN", "JUL", "AVG"][index]}
              </span>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

function AnalyticsView() {
  return (
    <>
      <AdminIntro
        eyebrow="Analitika"
        title="Kako klinika raste"
        copy="Najvažniji pokazatelji za odluke o terminima, timu i uslugama."
      />
      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        <article className="rounded-3xl border border-ink/8 bg-white p-6">
          <p className="u-eyebrow text-muted">Najtraženije usluge</p>
          <div className="mt-6 space-y-5">
            {[
              ["Kontrola trudnoće", 86],
              ["Ginekološki pregled", 72],
              ["4D ultrazvuk", 61],
              ["Vita paket 2", 45],
            ].map(([name, value]) => (
              <div key={String(name)}>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="font-medium">{name}</span>
                  <span className="text-muted">{value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-marble-deep">
                  <div className="h-full rounded-full bg-wine" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-3xl border border-ink/8 bg-white p-6">
          <p className="u-eyebrow text-muted">Izvor rezervacija</p>
          <div className="mt-6 space-y-4">
            {[
              ["Online booking", "48%", "184 termina"],
              ["Telefon", "31%", "119 termina"],
              ["Recepcija", "14%", "54 termina"],
              ["Instagram", "7%", "27 termina"],
            ].map(([label, value, detail]) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl bg-marble p-4">
                <span className="u-display w-14 text-2xl text-wine">{value}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="mt-1 text-xs text-muted">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}

function SettingsView({ owner = false }: { owner?: boolean }) {
  return (
    <>
      <AdminIntro
        eyebrow={owner ? "Podešavanja" : "Profil"}
        title={owner ? "Postavke ordinacije" : "Moj profesionalni profil"}
        copy={
          owner
            ? "Radno vreme, podsetnici i podaci ordinacije za ceo tim."
            : "Lični podaci, specijalizacija i podešavanja obaveštenja."
        }
      />
      <div className="mt-7 max-w-3xl rounded-3xl border border-ink/8 bg-white p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            [owner ? "Naziv ordinacije" : "Ime i prezime", owner ? "Vita Clinic Niš" : "dr Ivana Cvetanović"],
            [owner ? "Telefon" : "Specijalizacija", owner ? "061 703 6960" : "Ginekologija i akušerstvo"],
            [owner ? "Email" : "Email", owner ? "vitaclinicnis@gmail.com" : "ivana@vitaclinic.rs"],
            [owner ? "Adresa" : "Telefon", owner ? "Ćirila i Metodija 14, Niš" : "064 321 45 67"],
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
        <button type="button" className="mt-7 rounded-full bg-wine px-6 py-3 text-sm font-medium text-white">
          Sačuvaj izmene
        </button>
      </div>
    </>
  );
}

function WorkerContent({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  if (active === "my-day") return <WorkerOverview onNavigate={onNavigate} />;
  if (active === "my-calendar") return <CalendarView />;
  if (active === "my-appointments") return <AppointmentsTable />;
  if (active === "my-patients") return <PatientsView />;
  if (active === "availability") return <AvailabilityView />;
  return <SettingsView />;
}

function WorkerOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const myAppointments = demoAppointments.filter((item) => item.doctor === "dr Ivana");
  return (
    <>
      <AdminIntro
        eyebrow="Utorak, 4. avgust"
        title="Dobro jutro, Ivana."
        copy="Danas imaš sedam termina. Prvi pregled počinje za 35 minuta."
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <MetricCard label="Moji termini" value="7" detail="danas · 5 potvrđenih" icon={CalendarDays} accent />
        <MetricCard label="Prvi termin" value="09:00" detail="Milica Jovanović" icon={Clock3} />
        <MetricCard label="Slobodan blok" value="14–15h" detail="dostupno za rezervaciju" icon={Activity} />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-ink/8 bg-white p-6">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="u-eyebrow text-muted">Moj raspored</p>
              <h3 className="u-display mt-2 text-2xl text-wine-deep">Sledeće pacijentkinje</h3>
            </div>
            <button type="button" onClick={() => onNavigate("my-calendar")} className="text-sm font-medium text-wine">
              Otvori kalendar
            </button>
          </div>
          <div className="mt-6 divide-y divide-ink/8">
            {myAppointments.map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </article>
        <article className="overflow-hidden rounded-3xl bg-wine-deep text-white">
          <img
            src="/media/dr-ivana-portret.webp"
            alt=""
            className="h-52 w-full object-cover object-[50%_28%] opacity-80"
          />
          <div className="p-6">
            <p className="u-eyebrow text-gold-soft">Moj profil</p>
            <h3 className="u-display mt-2 text-2xl">dr Ivana Cvetanović</h3>
            <p className="mt-2 text-sm text-white/55">Ginekologija i akušerstvo</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="u-display text-2xl">32</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">Ove nedelje</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="u-display text-2xl">84%</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">Popunjenost</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

function AvailabilityView() {
  const days = [
    ["Ponedeljak", "08:00", "16:00", true],
    ["Utorak", "09:00", "17:00", true],
    ["Sreda", "08:00", "14:00", true],
    ["Četvrtak", "12:00", "20:00", true],
    ["Petak", "08:00", "16:00", true],
    ["Subota", "09:00", "13:00", false],
  ] as const;
  return (
    <>
      <AdminIntro
        eyebrow="Moja dostupnost"
        title="Radno vreme i pauze"
        copy="Vizuelno podešavanje nedeljnog rasporeda i blokova van ordinacije."
      />
      <div className="mt-7 max-w-4xl rounded-3xl border border-ink/8 bg-white p-5 sm:p-7">
        <div className="space-y-3">
          {days.map(([day, start, end, enabled]) => (
            <div key={day} className="grid gap-3 rounded-2xl border border-ink/8 p-4 sm:grid-cols-[160px_1fr_auto] sm:items-center">
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${enabled ? "bg-[#3b9463]" : "bg-ink/15"}`} />
                <span className="text-sm font-semibold">{day}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded-xl bg-marble px-4 py-2.5 tabular-nums">{enabled ? start : "Ne radi"}</span>
                {enabled && (
                  <>
                    <span className="text-muted">–</span>
                    <span className="rounded-xl bg-marble px-4 py-2.5 tabular-nums">{end}</span>
                  </>
                )}
              </div>
              <button
                type="button"
                className={`h-7 w-12 rounded-full p-1 transition-colors ${enabled ? "bg-wine" : "bg-ink/10"}`}
                aria-label={`${enabled ? "Isključi" : "Uključi"} ${day}`}
              >
                <span className={`block h-5 w-5 rounded-full bg-white shadow-sm ${enabled ? "ml-auto" : ""}`} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-6 rounded-full bg-wine px-6 py-3 text-sm font-medium text-white">
          Sačuvaj dostupnost
        </button>
      </div>
    </>
  );
}
