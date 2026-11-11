"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { dealers, type Dealer } from "@/lib/content";
import { POLAND_PATH, POLAND_VIEWBOX, VOIVODESHIPS_PATH, project } from "@/lib/poland";

const directions = (d: Dealer) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.street ? `${d.street}, ${d.city}` : d.city)}`;

function SoonCard({ d }: { d: Dealer }) {
  return (
    <motion.article
      key={d.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-soon/30 bg-ink p-7"
    >
      <span className="text-[11px] font-semibold tracking-[0.15em] text-soon uppercase">Otwarcie wkrótce · {d.region}</span>
      <h3 className="mt-2 mb-4 font-display text-2xl font-bold">{d.name}</h3>
      <p className="flex gap-3 text-white/80">
        <MapPin className="mt-0.5 size-4 shrink-0 text-soon" />
        <span>{d.city}</span>
      </p>
      <p className="mt-4 text-white/70">Nowy salon BAW rusza tu już niedługo. Adres i dane kontaktowe podamy wkrótce.</p>
    </motion.article>
  );
}

function DealerCard({ d }: { d: Dealer }) {
  if (d.comingSoon) return <SoonCard d={d} />;
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
          <span>{d.street ? `${d.street}, ${d.city}` : d.city}</span>
        </p>
        {[d.phone ?? []].flat().map((phone) => (
          <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="flex gap-3 transition hover:text-white">
            <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
            {phone}
          </a>
        ))}
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
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-hover"
            >
              Strona dealera <ArrowUpRight className="size-4" />
            </a>
          ) : (
            <Link
              href={d.url}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-hover"
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

/** Pins whose city label goes to the left, where a neighbour (Ksawerów next to Łódź, Nowy Targ next to Nowy Sącz) would cover it. */
const LABEL_LEFT = new Set(["ksawerow", "nowy-targ"]);

/** Map of Poland with a pin per location: open ones in white/brand, announced ones in gold. */
export function PinsMap({
  activeId,
  onSelect,
  className = "",
  visibleIds,
  labels = false,
  legend = true,
}: {
  activeId?: string;
  onSelect: (id: string) => void;
  className?: string;
  /** Pins not in the set are hidden and pop in when added (used by the scroll animation). All shown when omitted. */
  visibleIds?: ReadonlySet<string>;
  /** City name next to each pin */
  labels?: boolean;
  legend?: boolean;
}) {
  const open = dealers.filter((d) => !d.comingSoon);
  const soon = dealers.filter((d) => d.comingSoon);
  return (
    <div className={`relative ${className}`}>
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
        <path d={VOIVODESHIPS_PATH} fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Open locations are drawn last so they sit on top where pins overlap. */}
        {[...soon, ...open].map((d) => {
          const [x, y] = project(d.lat, d.lng);
          const on = d.id === activeId;
          const accent = d.comingSoon ? "var(--color-soon)" : "var(--color-brand)";
          const shown = !visibleIds || visibleIds.has(d.id);
          return (
            <g
              key={d.id}
              transform={`translate(${x} ${y})`}
              role="button"
              tabIndex={shown ? 0 : -1}
              aria-hidden={!shown || undefined}
              aria-label={`${d.name}, ${d.city}${d.comingSoon ? ", otwarcie wkrótce" : ""}`}
              aria-pressed={on}
              onClick={() => onSelect(d.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(d.id))}
              className={`cursor-pointer outline-none [&:focus-visible_.pin]:stroke-white ${shown ? "" : "pointer-events-none"}`}
            >
              <g
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  opacity: shown ? 1 : 0,
                  transformOrigin: "0px 0px",
                  transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s",
                }}
              >
              {on && (
                <circle r="18" fill={accent} opacity="0.35">
                  <animate attributeName="r" values="16;46" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.45;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
              )}
              <circle r="34" fill="transparent" />
              <path
                className="pin transition-transform duration-300"
                d="M0 0c-4-9-16-17-16-29a16 16 0 1 1 32 0c0 12-12 20-16 29Z"
                fill={on || d.comingSoon ? accent : "#f2f3f5"}
                stroke="var(--color-ink)"
                strokeWidth="3"
                transform={on ? "scale(1.25)" : undefined}
              />
              <circle
                cy="-29"
                r="5.5"
                fill={on ? "#fff" : d.comingSoon ? "var(--color-ink)" : "var(--color-brand)"} transform={on ? "scale(1.25)" : undefined} />
                {labels && (
                  <text
                    x={LABEL_LEFT.has(d.id) ? -22 : 22}
                    y={LABEL_LEFT.has(d.id) ? 6 : -22}
                    textAnchor={LABEL_LEFT.has(d.id) ? "end" : "start"}
                    fontSize="24"
                    fontWeight="600"
                    fill={d.comingSoon ? "var(--color-soon)" : "#f2f3f5"}
                    stroke="var(--color-ink)"
                    strokeWidth="6"
                    paintOrder="stroke"
                  >
                    {d.city.replace(/^\d{2}-\d{3}\s/, "")}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
      {legend && (
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#f2f3f5] ring-2 ring-brand ring-inset" /> Salony i serwisy
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-soon" /> Otwarcie wkrótce
        </span>
        <span>Kliknij punkt na mapie, aby zobaczyć szczegóły.</span>
      </div>
      )}
    </div>
  );
}

/** Map of Poland with a pin per dealer; clicking a pin (or a name in the list) shows its contact card. */
export default function DealerMap() {
  const [activeId, setActiveId] = useState(dealers[0]?.id);
  const active = dealers.find((d) => d.id === activeId) ?? dealers[0];
  const open = dealers.filter((d) => !d.comingSoon);
  const soon = dealers.filter((d) => d.comingSoon);

  const listItem = (d: Dealer) => {
    const on = d.id === active?.id;
    return (
      <li key={d.id}>
        <button
          onClick={() => setActiveId(d.id)}
          aria-pressed={on}
          className={`flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition ${
            on ? (d.comingSoon ? "bg-soon/15" : "bg-brand/15") : "hover:bg-white/5"
          }`}
        >
          <span>
            <span className="block font-semibold">{d.name}</span>
            <span className="text-sm text-muted">
              {d.city.replace(/^\d{2}-\d{3}\s/, "")} · {d.comingSoon ? "otwarcie wkrótce" : d.kind}
            </span>
          </span>
          <MapPin
            className={`size-5 shrink-0 ${d.comingSoon ? (on ? "text-soon" : "text-soon/50") : on ? "text-brand" : "text-white/40"}`}
          />
        </button>
      </li>
    );
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
      <PinsMap activeId={active?.id} onSelect={setActiveId} />

      <div className="space-y-5">
        <AnimatePresence mode="wait">{active && <DealerCard key={active.id} d={active} />}</AnimatePresence>
        <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
          {open.map(listItem)}
        </ul>
        {soon.length > 0 && (
          <div>
            <h3 className="mb-3 px-1 text-[11px] font-semibold tracking-[0.15em] text-soon uppercase">Otwarcie wkrótce</h3>
            <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-soon/25">{soon.map(listItem)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
