"use client";

import Link from "next/link";
import { ArrowLeft, Bell, ChevronDown } from "lucide-react";

type DemoTopbarProps = {
  eyebrow: string;
  title: string;
  person?: string;
  onPersonClick?: () => void;
};

export function DemoTopbar({
  eyebrow,
  title,
  person = "Milica J.",
  onPersonClick,
}: DemoTopbarProps) {
  return (
    <header className="flex min-h-20 items-center justify-between gap-5 border-b border-ink/10 bg-marble/95 px-5 backdrop-blur-xl min-[900px]:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/"
          aria-label="Nazad na landing"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-wine/30 hover:text-wine"
        >
          <ArrowLeft size={17} />
        </Link>
        <div className="min-w-0">
          <p className="u-eyebrow truncate text-rose">{eyebrow}</p>
          <h1 className="u-display truncate text-[clamp(1.35rem,2vw,2rem)] leading-tight text-wine-deep">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Obaveštenja"
          className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-muted transition-colors hover:text-wine"
        >
          <Bell size={17} />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-wine" />
        </button>
        <button
          type="button"
          onClick={onPersonClick}
          className="hidden items-center gap-3 rounded-full border border-ink/10 bg-white py-1.5 pl-2 pr-3 text-left sm:flex"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-blush text-xs font-semibold text-wine">
            {person
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="text-sm font-medium text-ink">{person}</span>
          <ChevronDown size={14} className="text-muted" />
        </button>
      </div>
    </header>
  );
}
