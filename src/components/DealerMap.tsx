"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { dealers, type Dealer } from "@/lib/content";
import { POLAND_PATH, POLAND_VIEWBOX, project } from "@/lib/poland";

const directions = (d: Dealer) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${d.street}, ${d.city}`)}`;

function DealerCard({ d }: { d: Dealer }) {
  const external = d.url && /^https?:/.test(d.url);
  return (
    <motion.article
      key={d.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-white/10 bg-ink p-7"
    >
      <span className="text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
        {d.kind} · {d.region}
      </span>
      <h3 className="mt-2 mb-4 font-display text-2xl font-bold">{d.name}</h3>
      <address className="space-y-2.5 text-white/80 not-italic">
        <p className="flex gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>
            {d.street}, {d.city}
          </span>
        </p>
        {d.phone && (
          <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="flex gap-3 transition hover:text-white">
            <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
            {d.phone}
          </a>
        )}
        {d.email && (
          <a href={`mailto:${d.email}`} className="flex gap-3 transition hover:text-white">
            <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
            {d.email}
          </a>
        )}
      </address>
      <div className="mt-6 flex flex-wrap gap-3">
        {d.url &&
          (external ? (
            <a
              href={d.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e2124a]"
            >
              Strona dealera <ArrowUpRight className="size-4" />
            </a>
          ) : (
            <Link
              href={d.url}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e2124a]"
            >
              Kontakt <ArrowUpRight className="size-4" />
            </Link>
          ))}
        <a
          href={directions(d)}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:border-white"
        >
          Wyznacz trasę <Navigation className="size-4" />
        </a>
      </div>
    </motion.article>
  );
}

/** Map of Poland with a pin per dealer; clicking a pin (or a name in the list) shows its contact card. */
export default function DealerMap() {
  const [activeId, setActiveId] = useState(dealers[0]?.id);
  const active = dealers.find((d) => d.id === activeId) ?? dealers[0];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
      <div className="relative">
        <svg
          viewBox={`0 0 ${POLAND_VIEWBOX.width} ${POLAND_VIEWBOX.height}`}
          className="h-auto w-full"
          role="group"
          aria-label="Mapa Polski z lokalizacjami salonów i serwisów BAW"
        >
          <defs>
            <pattern id="pl-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="1.6" fill="rgb(255 255 255 / 0.16)" />
            </pattern>
          </defs>
          <path d={POLAND_PATH} fill="url(#pl-dots)" stroke="rgb(255 255 255 / 0.28)" strokeWidth="2" strokeLinejoin="round" />
          {dealers.map((d) => {
            const [x, y] = project(d.lat, d.lng);
            const on = d.id === active?.id;
            return (
              <g
                key={d.id}
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-label={`${d.name}, ${d.city}`}
                aria-pressed={on}
                onClick={() => setActiveId(d.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActiveId(d.id))}
                className="cursor-pointer outline-none [&:focus-visible_.pin]:stroke-white"
              >
                {on && (
                  <circle r="18" fill="var(--color-brand)" opacity="0.35">
                    <animate attributeName="r" values="16;46" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.45;0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle r="34" fill="transparent" />
                <path
                  className="pin transition-transform duration-300"
                  d="M0 0c-4-9-16-17-16-29a16 16 0 1 1 32 0c0 12-12 20-16 29Z"
                  fill={on ? "var(--color-brand)" : "#f2f3f5"}
                  stroke="var(--color-ink)"
                  strokeWidth="3"
                  transform={on ? "scale(1.25)" : undefined}
                />
                <circle cy="-29" r="5.5" fill={on ? "#fff" : "var(--color-brand)"} transform={on ? "scale(1.25)" : undefined} />
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-sm text-muted">Kliknij punkt na mapie, aby zobaczyć dane kontaktowe.</p>
      </div>

      <div className="space-y-5">
        <AnimatePresence mode="wait">{active && <DealerCard key={active.id} d={active} />}</AnimatePresence>
        <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
          {dealers.map((d) => (
            <li key={d.id}>
              <button
                onClick={() => setActiveId(d.id)}
                aria-pressed={d.id === active?.id}
                className={`flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition ${
                  d.id === active?.id ? "bg-brand/15" : "hover:bg-white/5"
                }`}
              >
                <span>
                  <span className="block font-semibold">{d.name}</span>
                  <span className="text-sm text-muted">
                    {d.city.replace(/^\d{2}-\d{3}\s/, "")} · {d.kind}
                  </span>
                </span>
                <MapPin className={`size-5 shrink-0 ${d.id === active?.id ? "text-brand" : "text-white/40"}`} />
              </button>
            </li>
          ))}
          <li className="px-6 py-4 text-sm text-muted">Kolejne salony i serwisy w Polsce wkrótce.</li>
        </ul>
      </div>
    </div>
  );
}
