"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, LocateFixed } from "lucide-react";
import { useState } from "react";
import { dealers, type Dealer } from "@/lib/content";
import { DealerCard, PinsMap } from "./DealerMap";
import { Counter, Eyebrow, Reveal, SplitText } from "./ui";

const open = dealers.filter((d) => !d.comingSoon);
const soon = dealers.filter((d) => d.comingSoon);
const cityName = (d: Dealer) => d.city.replace(/^\d{2}-\d{3}\s/, "");

/** Straight-line distance in km, good enough to pick the nearest showroom. */
function km(aLat: number, aLng: number, bLat: number, bLng: number) {
  const r = (x: number) => (x * Math.PI) / 180;
  const h =
    Math.sin(r(bLat - aLat) / 2) ** 2 + Math.cos(r(aLat)) * Math.cos(r(bLat)) * Math.sin(r(bLng - aLng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

function CityChip({ d, on, onSelect }: { d: Dealer; on: boolean; onSelect: (id: string) => void }) {
  const soonChip = !!d.comingSoon;
  return (
    <button
      onClick={() => onSelect(d.id)}
      aria-pressed={on}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
        on
          ? soonChip
            ? "border-soon bg-soon text-ink"
            : "border-brand bg-brand text-white"
          : soonChip
            ? "border-soon/40 text-soon hover:border-soon"
            : "border-white/20 text-white/85 hover:border-white/60"
      }`}
    >
      <span className={`size-2 rounded-full ${on ? "bg-current" : soonChip ? "bg-soon" : "bg-brand"}`} />
      {cityName(d)}
    </button>
  );
}

/**
 * Home page take on the dealer network: the count of open and announced locations up front,
 * cities as chips (open / opening soon), a "nearest showroom" button and a compact map.
 * The full list with every address lives on /serwis.
 */
export default function DealerNetwork() {
  const [activeId, setActiveId] = useState(open[0]?.id);
  const [locating, setLocating] = useState(false);
  const [note, setNote] = useState<string>();
  const active = dealers.find((d) => d.id === activeId) ?? open[0];

  const select = (id: string) => {
    setActiveId(id);
    setNote(undefined);
  };

  const findNearest = () => {
    if (!navigator.geolocation) {
      setNote("Twoja przeglądarka nie udostępnia lokalizacji. Wybierz miasto z listy.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const ranked = open
          .map((d) => ({ d, dist: km(coords.latitude, coords.longitude, d.lat, d.lng) }))
          .sort((a, b) => a.dist - b.dist);
        const nearest = ranked[0];
        setLocating(false);
        if (!nearest) return;
        setActiveId(nearest.d.id);
        setNote(`Najbliżej Ciebie: ${cityName(nearest.d)}, ok. ${Math.round(nearest.dist)} km w linii prostej.`);
      },
      () => {
        setLocating(false);
        setNote("Nie udało się ustalić lokalizacji. Wybierz miasto z listy.");
      },
      { timeout: 10000, maximumAge: 600000 },
    );
  };

  return (
    <section id="salony" className="bg-ink-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Salony BAW</Eyebrow>
          </Reveal>
          <SplitText
            text="Sieć BAW rośnie. Coraz bliżej Ciebie."
            className="mt-5 max-w-[16ch] font-display text-[clamp(30px,3.8vw,52px)] leading-[1.05] font-bold tracking-tight"
          />

          <Reveal delay={0.1} className="mt-10 grid max-w-[460px] grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-ink p-6">
              <div className="font-display text-[clamp(36px,4vw,52px)] leading-none font-bold">
                <Counter to={open.length} />
              </div>
              <div className="mt-2 text-sm text-muted">salonów i serwisów działa</div>
            </div>
            <div className="rounded-3xl border border-soon/30 bg-ink p-6">
              <div className="font-display text-[clamp(36px,4vw,52px)] leading-none font-bold text-soon">
                +<Counter to={soon.length} />
              </div>
              <div className="mt-2 text-sm text-muted">otwarć już wkrótce</div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <button
              onClick={findNearest}
              disabled={locating}
              className="inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3 font-semibold transition hover:bg-brand-hover disabled:opacity-60"
            >
              <LocateFixed className={`size-5 ${locating ? "animate-spin" : ""}`} />
              {locating ? "Szukam…" : "Pokaż najbliższy salon"}
            </button>
            <p aria-live="polite" className="mt-3 min-h-6 text-sm text-white/75">
              {note}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-white/60 uppercase">Otwarte</h3>
              <div className="flex flex-wrap gap-2">
                {open.map((d) => (
                  <CityChip key={d.id} d={d} on={d.id === active?.id} onSelect={select} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-soon uppercase">Otwarcie wkrótce</h3>
              <div className="flex flex-wrap gap-2">
                {soon.map((d) => (
                  <CityChip key={d.id} d={d} on={d.id === active?.id} onSelect={select} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* On phones the card sits right under the chips, so a tap shows the result without scrolling. */}
          <div className="mt-8 lg:hidden">
            <AnimatePresence mode="wait">{active && <DealerCard key={active.id} d={active} />}</AnimatePresence>
          </div>

          <Link
            href="/serwis"
            className="group mt-10 inline-flex items-center gap-2 font-semibold text-white/85 transition hover:text-white"
          >
            Wszystkie adresy i zakres serwisu
            <ArrowRight className="size-4 text-brand transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-6 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <PinsMap activeId={active?.id} onSelect={select} className="mx-auto max-w-[560px]" />
          </motion.div>
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">{active && <DealerCard key={active.id} d={active} />}</AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
