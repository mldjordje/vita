"use client";

import Link from "next/link";
import { CalendarDays, LayoutDashboard, ShieldCheck } from "lucide-react";

const demoLinks = [
  { href: "/booking", label: "Booking", icon: CalendarDays },
  { href: "/client", label: "Klijent", icon: LayoutDashboard },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
] as const;

export function DemoDock() {
  return (
    <aside
      aria-label="Demo ekrani"
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-ink/92 p-1.5 text-marble shadow-2xl backdrop-blur-xl"
    >
      <span className="hidden pl-3 pr-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-marble/45 sm:block">
        Demo
      </span>
      {demoLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-marble/75 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Icon size={14} />
          {label}
        </Link>
      ))}
    </aside>
  );
}
