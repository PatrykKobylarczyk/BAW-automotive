"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { grossOf, lineup, lineupSpecs, models, netOf, priceList } from "@/lib/content";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";

type Group = (typeof lineup)[number]["group"];
type Filter = Group | "all";
type Vehicle = (typeof lineup)[number];
type Row = (typeof priceList)[number];

const ease = [0.16, 1, 0.3, 1] as const;
/** Ground line of every tile in public/cutouts/kafelki */
const GROUND = 970;
/** How much each vehicle tucks behind the next one, as a share of its own width */
const OVERLAP = 0.14;

const zl = (n: number) =>
  n.toLocaleString("pl-PL", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ | /g, " ");

const groupOf = (r: Row): Group =>
  (r.href?.split("/").pop() as Group | undefined) ??
  (r.model.startsWith("212") ? "baw-212" : r.model.startsWith("Mini") ? "baw-mini-truck" : "baw-light-truck");

const rowsOf = (v: Vehicle) => priceList.filter((r) => r.img === v.img && v.versions.includes(r.version));
const modelOf = (g: Group) => models.find((m) => m.slug === g)!;

/** Price the importer gave (gross or net), with the other one worked out from 23% VAT */
function Price({ r, big = false }: { r: Row; big?: boolean }) {
  return (
    <span className="block">
      <span className={`font-display font-bold whitespace-nowrap ${big ? "text-3xl md:text-4xl" : "text-lg"}`}>
        {zl(r.gross ?? r.net)} zł{" "}
        <span className="font-sans text-sm font-medium text-white/60">{r.gross ? "brutto" : "netto"}</span>
      </span>
      <span className="block text-[13px] text-muted">{r.gross ? `${zl(netOf(r))} zł netto` : `${zl(grossOf(r))} zł brutto`}</span>
    </span>
  );
}

/**
 * The whole BAW range as one lineup, from the smallest to the largest vehicle, in real proportions. The three
 * models above it work as a live filter: the other vehicles drive out and the chosen ones grow to fill the stage.
 * Pointing at (or tapping) a vehicle brings it forward and shows its price and key figures.
 */
export default function Lineup() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState("212-suv");
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, margin: "-15% 0px" });
  const [size, setSize] = useState({ w: 1200, h: 800 });

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => setSize({ w: Math.min(el.clientWidth, 1680), h: window.innerHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const visible = useMemo(() => lineup.filter((v) => filter === "all" || v.group === filter), [filter]);
  const active = lineup.find((v) => v.id === activeId)!;

  // Pixels per tile pixel: the visible vehicles fill the stage width, but never grow taller than the stage. On a
  // phone the full lineup would be tiny, so there it keeps a readable size and the stage scrolls sideways instead.
  const mobile = size.w < 768;
  const maxH = mobile ? 230 : Math.min(400, size.h * 0.42);
  const pad = mobile ? 64 : 180;
  const sumW = visible.reduce((s, v) => s + (v.box[2] - v.box[0]) * v.scale * (1 - OVERLAP), 0);
  const maxTall = Math.max(...visible.map((v) => (GROUND - v.box[1]) * v.scale));
  const unit = Math.min((size.w - pad) / sumW, maxH / maxTall, 0.6);
  const minUnit = mobile ? 0.2 : 0;
  const u = Math.max(unit, minUnit);
  // The stage is as tall as the tallest vehicle on show, so the full lineup leaves no empty band above it
  const stageH = maxTall * u * 1.1 + 70;

  const pickFilter = (f: Filter) => {
    setFilter(f);
    if (f !== "all" && active.group !== f) setActiveId(lineup.find((v) => v.group === f)!.id);
  };

  // On a phone, keep the picked vehicle in the middle of the scrolling stage
  useEffect(() => {
    const t = track.current;
    const el = t?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!t || !el || t.scrollWidth <= t.clientWidth) return;
    const id = setTimeout(() => {
      t.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - t.clientWidth / 2, behavior: "smooth" });
    }, 350);
    return () => clearTimeout(id);
  }, [activeId, filter]);

  const groupRows = priceList.filter((r) => filter === "all" || groupOf(r) === filter);
  const activeRows = rowsOf(active);
  const activeModel = modelOf(active.group);

  return (
    <section id="modele" className="relative overflow-hidden py-24 md:py-32">
      <div className="text-outline-faint pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 font-display text-[clamp(120px,22vw,340px)] leading-none font-extrabold whitespace-nowrap select-none">
        GAMA BAW
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <Eyebrow>Gama BAW</Eyebrow>
        </Reveal>
        <div className="mt-5 mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <SplitText
            text="Od terenu po miejską logistykę."
            className="max-w-[16ch] font-display text-[clamp(30px,3.8vw,52px)] leading-[1.05] font-bold tracking-tight"
          />
          <Reveal delay={0.15}>
            <p className="max-w-[38ch] text-muted">
              Cała gama w jednym ustawieniu, w prawdziwej skali. Wybierz, do czego potrzebujesz auta, albo wskaż
              pojazd, żeby zobaczyć cenę.
            </p>
          </Reveal>
        </div>

        {/* The three models are the filter */}
        <Reveal delay={0.1}>
          <div role="tablist" aria-label="Pokaż modele" className="grid grid-cols-2 gap-2.5 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-3">
            <FilterTab selected={filter === "all"} onClick={() => pickFilter("all")}>
              <span className="text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">Wszystkie</span>
              <span className="mt-1 block font-display text-lg font-bold whitespace-nowrap">
                {priceList.length} wersji
              </span>
            </FilterTab>
            {models.map((m) => (
              <FilterTab key={m.slug} selected={filter === m.slug} onClick={() => pickFilter(m.slug)}>
                <span className="block truncate text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">{m.category}</span>
                <span className="mt-1 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-4">
                  <span className="font-display text-lg font-bold whitespace-nowrap">{m.short}</span>
                  <span className="text-[13px] whitespace-nowrap text-muted">od {zl(m.priceFrom)} zł</span>
                </span>
              </FilterTab>
            ))}
          </div>
        </Reveal>
      </div>

      {/* The stage: full width, vehicles standing on one floor */}
      <div ref={stage} className="relative mt-6 md:mt-10">
        <div
          ref={track}
          className="relative overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <motion.div initial={false} animate={{ height: stageH }} transition={{ duration: 0.8, ease }} className="relative w-max min-w-full">
          {/* Floor */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[46px] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46px] bg-gradient-to-b from-white/[0.04] to-transparent" />

          <div
            className="relative mx-auto flex h-full w-max min-w-full items-end justify-center pb-[46px]"
            style={{ paddingInline: pad / 2 }}
          >
            {lineup.map((v, i) => {
              const shown = visible.includes(v);
              const w = (v.box[2] - v.box[0]) * v.scale * u;
              const h = (GROUND - v.box[1]) * v.scale * u;
              const isActive = v.id === activeId;
              const first = shown && visible[0] === v;
              return (
                <motion.div
                  key={v.id}
                  data-id={v.id}
                  className="relative shrink-0"
                  style={{ zIndex: isActive ? 50 : i + 1 }}
                  initial={false}
                  animate={{
                    width: shown ? w : 0,
                    height: h,
                    marginLeft: shown && !first ? -w * OVERLAP : 0,
                    opacity: shown ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, ease }}
                >
                  <motion.button
                    type="button"
                    aria-label={`${modelOf(v.group).short} ${v.label}`}
                    aria-pressed={isActive}
                    tabIndex={shown ? 0 : -1}
                    onMouseEnter={() => setActiveId(v.id)}
                    onFocus={() => setActiveId(v.id)}
                    onClick={() => setActiveId(v.id)}
                    className="group absolute inset-0 block origin-bottom cursor-pointer outline-none"
                    initial={{ x: 260, opacity: 0 }}
                    animate={
                      inView
                        ? { x: 0, opacity: 1, scale: isActive ? 1.08 : 1, y: isActive ? -6 : 0 }
                        : { x: 260, opacity: 0 }
                    }
                    transition={{
                      x: { duration: 1.3, ease, delay: 0.1 + (lineup.length - i) * 0.08 },
                      opacity: { duration: 0.8, delay: 0.1 + (lineup.length - i) * 0.08 },
                      default: { duration: 0.5, ease },
                    }}
                  >
                    {/* Spotlight under the picked vehicle */}
                    {isActive && (
                      <motion.span
                        layoutId="lineup-spot"
                        className="absolute -inset-x-[10%] -bottom-[8%] h-[38%] rounded-[50%] bg-brand/55 blur-2xl"
                        transition={{ duration: 0.6, ease }}
                      />
                    )}
                    {/* Contact shadow */}
                    <span className="absolute inset-x-[8%] -bottom-[2%] h-[7%] rounded-[50%] bg-black/70 blur-md" />
                    <span
                      className={`absolute inset-0 transition-[filter] duration-500 ${
                        isActive ? "brightness-110" : "brightness-[.62] saturate-[.7] group-hover:brightness-90"
                      }`}
                    >
                      <Image
                        src={v.img}
                        alt=""
                        width={1600}
                        height={1000}
                        sizes="(max-width:768px) 60vw, 40vw"
                        className="absolute max-w-none"
                        style={{
                          width: `${(1600 / (v.box[2] - v.box[0])) * 100}%`,
                          height: `${(1000 / (GROUND - v.box[1])) * 100}%`,
                          left: `${(-v.box[0] / (v.box[2] - v.box[0])) * 100}%`,
                          top: `${(-v.box[1] / (GROUND - v.box[1])) * 100}%`,
                        }}
                      />
                    </span>
                    {/* Name on the floor */}
                    <span
                      className={`absolute top-full left-[12%] mt-3 text-left text-[11px] leading-tight font-semibold tracking-wide whitespace-nowrap transition-colors md:text-xs ${
                        isActive ? "text-white" : "text-white/40"
                      }`}
                    >
                      {modelOf(v.group).short}
                      <span className="block font-normal">{v.label}</span>
                    </span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
          </motion.div>
        </div>
        {mobile && sumW * u > size.w && (
          <p className="mt-1 px-5 text-center text-xs text-white/40">Przesuń, aby zobaczyć całą gamę →</p>
        )}
      </div>

      {/* The picked vehicle */}
      <div className="relative mx-auto mt-8 max-w-[1280px] px-5 md:mt-10 md:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className="grid gap-6 rounded-3xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur-md md:grid-cols-[1.1fr_1.5fr_auto] md:items-center md:gap-10 md:p-8"
            aria-live="polite"
          >
            <div>
              <span className="text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">{activeModel.category}</span>
              <h3 className="mt-1.5 font-display text-2xl leading-tight font-bold">
                {activeModel.short} <span className="text-white/60">{active.label}</span>
              </h3>
              <div className="mt-3 space-y-2">
                {activeRows.map((r) => (
                  <div key={r.version}>
                    {activeRows.length > 1 && <span className="block text-[13px] text-white/70">{r.version}</span>}
                    <Price r={r} big={activeRows.length === 1} />
                  </div>
                ))}
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {lineupSpecs[active.group].map((s) => (
                <div key={s.label} className="bg-ink-2 p-3 md:p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <b className="block font-display text-base font-bold whitespace-nowrap md:text-xl">{s.value}</b>
                    <small className="text-[12px] leading-tight text-muted">{s.label}</small>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-5 md:flex-col md:items-start">
              <MagneticButton href="#kontakt">Zapytaj o ofertę</MagneticButton>
              <Link
                href={`/modele/${active.group}`}
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white/80 transition hover:text-white"
              >
                Szczegóły modelu
                <ArrowUpRight className="size-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Every version with its price, so nothing is hidden behind a hover */}
        <div className="mt-8">
          <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Wszystkie wersje i ceny</h3>
          <motion.ul layout className="flex flex-wrap gap-2">
            <AnimatePresence initial={false}>
              {groupRows.map((r) => {
                const v = lineup.find((x) => x.img === r.img && x.versions.includes(r.version));
                const on = v?.id === activeId;
                return (
                  <motion.li
                    layout
                    key={r.model + r.version}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      type="button"
                      disabled={!v}
                      onClick={() => v && setActiveId(v.id)}
                      onMouseEnter={() => v && setActiveId(v.id)}
                      className={`flex flex-wrap items-baseline gap-x-2 rounded-full border px-4 py-2 text-left text-[13px] transition ${
                        on ? "border-brand bg-brand/20" : "border-white/10 hover:border-white/30"
                      } ${v ? "" : "cursor-default"}`}
                    >
                      <span className="font-semibold">
                        {r.model.replace(/ \(.*\)/, "")} {r.version.replace(/ \(.*\)/, "")}
                      </span>
                      <span className="whitespace-nowrap text-white/60">
                        {zl(r.gross ?? r.net)} zł {r.gross ? "brutto" : "netto"}
                      </span>
                      {!v && <span className="text-[11px] text-soon">zdjęcie wkrótce</span>}
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
          <Link
            href="/cennik"
            className="group mt-8 inline-flex items-center gap-2 font-semibold text-white/85 transition hover:text-white"
          >
            Pełny cennik, wersje i finansowanie
            <ArrowRight className="size-4 text-brand transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FilterTab({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={`relative isolate min-w-0 rounded-2xl border px-4 py-3.5 text-left transition md:px-5 md:py-4 ${
        selected ? "border-brand/70" : "border-white/10 hover:border-white/30"
      }`}
    >
      {selected && (
        <motion.span
          layoutId="lineup-filter"
          className="absolute inset-0 -z-10 rounded-2xl bg-brand-dark/30"
          transition={{ duration: 0.5, ease }}
        />
      )}
      <span className="relative block">{children}</span>
    </button>
  );
}
