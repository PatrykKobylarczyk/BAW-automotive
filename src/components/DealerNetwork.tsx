"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowRight, Bell, LocateFixed, Mail, MapPin, Navigation, Phone, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { dealers, type Dealer } from "@/lib/content";
import { PinsMap } from "./DealerMap";
import { LeadForm, field } from "./LeadForm";
import { Eyebrow, Reveal } from "./ui";

const open = dealers.filter((d) => !d.comingSoon);
const soon = dealers.filter((d) => d.comingSoon);
/** Order in which pins light up while scrolling: working showrooms first, then the announced ones. */
const sequence = [...open, ...soon];
const cityName = (d: Dealer) => d.city.replace(/^\d{2}-\d{3}\s/, "");
const directions = (d: Dealer) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.street ? `${d.street}, ${d.city}` : d.city)}`;

/** Straight-line distance in km, good enough to pick the nearest showroom. */
function km(aLat: number, aLng: number, bLat: number, bLng: number) {
  const r = (x: number) => (x * Math.PI) / 180;
  const h =
    Math.sin(r(bLat - aLat) / 2) ** 2 + Math.cos(r(aLat)) * Math.cos(r(bLat)) * Math.sin(r(bLng - aLng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/** Part 1: the section pins to the screen and the map fills up with showrooms as the visitor scrolls. */
function GrowingMap({ activeId, onSelect }: { activeId?: string; onSelect: (id: string) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [count, setCount] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // First pin a little after the section pins, the last one before it lets go.
    const n = Math.round(Math.min(1, Math.max(0, (p - 0.04) / 0.78)) * sequence.length);
    setCount(n);
  });

  const shown = reduce ? sequence.length : count;
  const visibleIds = useMemo(() => new Set(sequence.slice(0, shown).map((d) => d.id)), [shown]);
  const openShown = Math.min(shown, open.length);
  const soonShown = Math.max(0, shown - open.length);
  const done = shown === sequence.length;
  const latest = shown > 0 ? sequence[shown - 1] : undefined;

  return (
    <div ref={track} className={reduce ? "" : "relative h-[260vh]"}>
      <div className={reduce ? "py-24" : "sticky top-0 flex h-svh items-center overflow-hidden"}>
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="pt-20 lg:pt-0">
            <Eyebrow>Salony BAW</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(28px,3.8vw,52px)] leading-[1.05] font-bold tracking-tight">
              Sieć BAW rośnie.
            </h2>

            <div className="mt-5 flex items-end gap-4 lg:mt-10">
              <span className="font-display text-[clamp(64px,10vw,150px)] leading-[0.8] font-extrabold tabular-nums">
                {shown}
              </span>
              <span className="mb-1 max-w-[12ch] text-sm text-muted md:text-base">
                {shown === 1 ? "lokalizacja" : shown > 1 && shown < 5 ? "lokalizacje" : "lokalizacji"} BAW w Polsce
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm md:mt-6 md:text-base">
              <span className="inline-flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-brand" />
                <b className="tabular-nums">{openShown}</b> działa
              </span>
              <span className={`inline-flex items-center gap-2 transition-opacity duration-500 ${soonShown ? "opacity-100" : "opacity-30"}`}>
                <span className="size-2.5 rounded-full bg-soon" />
                <b className="text-soon tabular-nums">{soonShown}</b> otwarcie wkrótce
              </span>
            </div>

            <div className="mt-4 hidden h-7 text-white/70 md:block lg:mt-8">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.p key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-semibold text-white">
                    …i to dopiero początek.
                  </motion.p>
                ) : (
                  latest && (
                    <motion.p
                      key={latest.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {latest.comingSoon ? "Wkrótce: " : ""}
                      <b className={latest.comingSoon ? "text-soon" : "text-white"}>{cityName(latest)}</b>
                    </motion.p>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>

          <PinsMap
            activeId={done ? activeId : undefined}
            onSelect={onSelect}
            visibleIds={visibleIds}
            labels
            legend={false}
            className="mx-auto w-full max-w-[min(100%,calc(55svh*1000/940))] lg:max-w-[min(100%,calc(80svh*1000/940))]"
          />
        </div>
      </div>
    </div>
  );
}

function OpenCard({ d, on, distance }: { d: Dealer; on: boolean; distance?: number }) {
  return (
    <article
      id={`salon-${d.id}`}
      className={`scroll-mt-28 rounded-3xl border p-6 transition-colors ${on ? "border-brand bg-brand-dark/25" : "border-white/10 bg-ink"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          {d.kind} · {cityName(d)}
        </span>
        {distance !== undefined && (
          <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold tracking-wider whitespace-nowrap uppercase">
            Najbliżej · {Math.round(distance)} km
          </span>
        )}
      </div>
      <h3 className="mt-2 mb-3 text-lg leading-snug font-semibold">{d.name}</h3>
      <address className="space-y-1.5 text-[15px] text-white/80 not-italic">
        <p className="flex gap-2.5">
          <MapPin className="mt-1 size-4 shrink-0 text-brand" />
          {d.street ? `${d.street}, ${d.city}` : d.city}
        </p>
        {[d.phone ?? []].flat().map((phone) => (
          <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="flex gap-2.5 transition hover:text-white">
            <Phone className="mt-1 size-4 shrink-0 text-brand" />
            {phone}
          </a>
        ))}
        {d.email && (
          <a href={`mailto:${d.email}`} className="flex gap-2.5 break-all transition hover:text-white">
            <Mail className="mt-1 size-4 shrink-0 text-brand" />
            {d.email}
          </a>
        )}
      </address>
      <a
        href={directions(d)}
        target="_blank"
        rel="noopener"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white"
      >
        Wyznacz trasę <Navigation className="size-4 text-brand" />
      </a>
    </article>
  );
}

function SoonRow({ d, expanded, onToggle }: { d: Dealer; expanded: boolean; onToggle: () => void }) {
  return (
    <li id={`salon-${d.id}`} className="scroll-mt-28">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <span>
          <span className="block font-semibold">{cityName(d)}</span>
          <span className="text-sm text-muted">{d.region} · otwarcie wkrótce</span>
        </span>
        <button
          onClick={onToggle}
          aria-expanded={expanded}
          className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            expanded ? "border-white/30 text-white" : "border-soon/50 text-soon hover:border-soon hover:bg-soon hover:text-ink"
          }`}
        >
          {expanded ? <X className="size-4" /> : <Bell className="size-4" />}
          {expanded ? "Zamknij" : "Powiadom mnie"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              <LeadForm
                submitLabel="Powiadom mnie o otwarciu"
                successText={`Zapisaliśmy Cię. Damy znać, gdy salon BAW w mieście ${cityName(d)} będzie gotowy.`}
                className="border-soon/25 !p-5 md:!p-6"
              >
                <p className="mb-4 text-sm text-white/75">
                  Zostaw kontakt, a damy znać o otwarciu salonu w mieście {cityName(d)} i zaprosimy na pierwsze jazdy próbne.
                </p>
                <input type="hidden" name="model" value={`Powiadomienie o otwarciu: ${cityName(d)}`} />
                <input type="hidden" name="region" value={d.region} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={field} name="name" autoComplete="name" aria-label="Imię i nazwisko" placeholder="Imię i nazwisko *" required />
                  <input className={field} name="email" type="email" autoComplete="email" aria-label="E-mail" placeholder="E-mail *" required />
                </div>
              </LeadForm>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Part 2: every location in full: working showrooms as cards, announced ones with a "notify me" sign-up. */
function DealerList({ activeId, onSelect }: { activeId?: string; onSelect: (id: string) => void }) {
  const [locating, setLocating] = useState(false);
  const [nearest, setNearest] = useState<{ id: string; km: number }>();
  const [note, setNote] = useState<string>();
  const [expanded, setExpanded] = useState<string>();

  const findNearest = () => {
    if (!navigator.geolocation) {
      setNote("Twoja przeglądarka nie udostępnia lokalizacji.");
      return;
    }
    setLocating(true);
    setNote(undefined);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        const best = open
          .map((d) => ({ id: d.id, km: km(coords.latitude, coords.longitude, d.lat, d.lng) }))
          .sort((a, b) => a.km - b.km)[0];
        if (!best) return;
        setNearest(best);
        onSelect(best.id);
        document.getElementById(`salon-${best.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      },
      () => {
        setLocating(false);
        setNote("Nie udało się ustalić lokalizacji. Wybierz salon z listy.");
      },
      { timeout: 10000, maximumAge: 600000 },
    );
  };

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-24 md:px-8 md:pb-32">
      <Reveal className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          onClick={findNearest}
          disabled={locating}
          className="inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3 font-semibold transition hover:bg-brand-hover disabled:opacity-60"
        >
          <LocateFixed className={`size-5 ${locating ? "animate-spin" : ""}`} />
          {locating ? "Szukam…" : "Pokaż najbliższy salon"}
        </button>
        <Link href="/serwis" className="group inline-flex items-center gap-2 font-semibold text-white/85 transition hover:text-white">
          Zakres serwisu
          <ArrowRight className="size-4 text-brand transition group-hover:translate-x-1" />
        </Link>
        {note && (
          <p aria-live="polite" className="w-full text-sm text-white/75">
            {note}
          </p>
        )}
      </Reveal>

      <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.15em] text-white/60 uppercase">Działające salony i serwisy</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {open.map((d) => (
              <OpenCard key={d.id} d={d} on={d.id === activeId} distance={nearest?.id === d.id ? nearest.km : undefined} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.15em] text-soon uppercase">Otwarcie wkrótce</h3>
          <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-soon/25 bg-ink">
            {soon.map((d) => (
              <SoonRow
                key={d.id}
                d={d}
                expanded={expanded === d.id}
                onToggle={() => setExpanded(expanded === d.id ? undefined : d.id)}
              />
            ))}
          </ul>
          <p className="mt-4 px-1 text-sm text-muted">Nie widzisz swojego miasta? Napisz do nas, sprawdzimy plany na Twój region.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Home page dealer section. The map fills up pin by pin while scrolling (working showrooms, then the ones
 * opening soon), then every location is listed: cards for open ones, a "notify me" sign-up for the rest.
 * Clicking a pin scrolls to that location in the list.
 */
export default function DealerNetwork() {
  const [activeId, setActiveId] = useState<string>();

  const select = (id: string) => {
    setActiveId(id);
    document.getElementById(`salon-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="salony" className="bg-ink-2">
      <GrowingMap activeId={activeId} onSelect={select} />
      <DealerList activeId={activeId} onSelect={setActiveId} />
    </section>
  );
}
