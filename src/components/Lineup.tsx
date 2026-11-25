"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { grossOf, lineup, lineupSpecs, models, netOf, priceList, versionOf } from "@/lib/content";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";

type Group = (typeof lineup)[number]["group"];
type Filter = Group | "all";
type Vehicle = (typeof lineup)[number];
type Row = (typeof priceList)[number];

const ease = [0.16, 1, 0.3, 1] as const;
/** Ground line of every tile in public/cutouts/kafelki */
const GROUND = 970;
/** Free space between neighbouring vehicles, as a share of the vehicle's own width (they never overlap) */
const GAP = 0.22;

const zl = (n: number) =>
  n.toLocaleString("pl-PL", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ | /g, " ");

const groupOf = (r: Row): Group =>
  (r.href?.split("/").pop() as Group | undefined) ??
  (r.model.startsWith("212") ? "baw-212" : r.model.startsWith("Mini") ? "baw-mini-truck" : "baw-light-truck");

const rowsOf = (v: Vehicle) => priceList.filter((r) => r.img === v.img && v.versions.includes(r.version));
/** Page of the vehicle's version, or of its model when the version has none */
const hrefOf = (v: Vehicle) => versionOf(rowsOf(v)[0])?.href ?? `/modele/${v.group}`;

/** The vehicle's photo cropped to its outline, so it fills the box it is given */
function VehicleImage({ v, sizes }: { v: Vehicle; sizes: string }) {
  return (
    <Image
      src={v.img}
      alt=""
      width={1600}
      height={1000}
      sizes={sizes}
      className="absolute max-w-none"
      style={{
        width: `${(1600 / (v.box[2] - v.box[0])) * 100}%`,
        height: `${(1000 / (GROUND - v.box[1])) * 100}%`,
        left: `${(-v.box[0] / (v.box[2] - v.box[0])) * 100}%`,
        top: `${(-v.box[1] / (GROUND - v.box[1])) * 100}%`,
      }}
    />
  );
}

/**
 * Transition to a vehicle's page: the vehicle grows from where it stands to the middle of the screen over a dark
 * backdrop, then the page opens.
 */
function ZoomOut({ v, from }: { v: Vehicle; from: DOMRect }) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const ratio = from.width / from.height;
  const w = Math.min(vw * 0.86, vh * 0.6 * ratio, 1100);
  const h = w / ratio;
  return createPortal(
    <motion.div className="fixed inset-0 z-[90]" aria-hidden>
      <motion.div
        className="absolute inset-0 bg-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      />
      <motion.div
        className="absolute"
        initial={{ left: from.left, top: from.top, width: from.width, height: from.height }}
        animate={{ left: (vw - w) / 2, top: (vh - h) / 2, width: w, height: h }}
        transition={{ duration: 0.65, ease }}
      >
        <motion.span
          className="absolute -inset-x-[10%] -bottom-[8%] h-[38%] rounded-[50%] bg-brand/55 blur-3xl"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
        />
        {/* Same sizes as on the stage, so the browser reuses the image it already has */}
        <VehicleImage v={v} sizes="(max-width:768px) 60vw, 40vw" />
      </motion.div>
    </motion.div>,
    document.body,
  );
}
const modelOf = (g: Group) => models.find((m) => m.slug === g)!;

/** Short price under a vehicle's name: the cheapest of its versions, gross or net as the importer gave it */
function priceFrom(v: Vehicle) {
  const rows = rowsOf(v);
  const r = rows.reduce((a, b) => ((b.gross ?? b.net) < (a.gross ?? a.net) ? b : a));
  return `${rows.length > 1 ? "od " : ""}${zl(r.gross ?? r.net)} zł ${r.gross ? "brutto" : "netto"}`;
}

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
 * The whole BAW range as one lineup (212, Light Truck, Mini Truck), side by side. The three
 * models above it work as a live filter: the other vehicles drive out and the chosen ones grow to fill the stage.
 * Pointing at (or tapping) a vehicle brings it forward and shows its price and key figures.
 */
export default function Lineup() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState("212-suv");
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  // How the last press started: a touch picks the vehicle first, a second touch opens its page
  // (and whether the vehicle was already picked when the touch began: a tap also fires focus and mouseenter)
  const pointer = useRef<{ type: string; wasActive: boolean }>({ type: "mouse", wasActive: false });
  const [leaving, setLeaving] = useState<{ v: Vehicle; from: DOMRect } | null>(null);
  const open = (v: Vehicle, el: HTMLElement) => {
    const href = hrefOf(v);
    if (reduceMotion) return router.push(href);
    router.prefetch(href);
    setLeaving({ v, from: el.getBoundingClientRect() });
    setTimeout(() => router.push(href), 700);
  };
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
  // Side room on a phone, so the picked vehicle (drawn a little larger) is never cut at the screen edge
  const pad = mobile ? 72 : Math.max(64, size.w - 1216);
  const sumW = visible.reduce((s, v) => s + (v.box[2] - v.box[0]) * v.scale * (1 + GAP), 0);
  const maxTall = Math.max(...visible.map((v) => (GROUND - v.box[1]) * v.scale));
  const unit = Math.min((size.w - pad) / sumW, maxH / maxTall, 0.6);
  // Never smaller than this: when the vehicles don't fit, the stage scrolls sideways (swipe, drag or arrows)
  const minUnit = mobile ? 0.2 : 0.27;
  const u = Math.max(unit, minUnit);
  // Band under the floor line for the names and prices
  const floor = mobile ? 88 : 72;
  // The stage is as tall as the tallest vehicle on show plus air above it for the picked one, which grows and lifts
  const stageH = maxTall * u * 1.24 + floor + 12;

  // Bumped on a click, tap or filter change (not on hover), to bring the picked vehicle to the middle of the stage
  const [centerReq, setCenterReq] = useState(0);
  const pick = (id: string) => {
    setActiveId(id);
    setCenterReq((n) => n + 1);
  };
  const pickFilter = (f: Filter) => {
    setFilter(f);
    if (f !== "all" && active.group !== f) setActiveId(lineup.find((v) => v.group === f)!.id);
    setCenterReq((n) => n + 1);
  };

  // Arrows and mouse drag for the sideways scroll on a computer
  const [edges, setEdges] = useState({ left: false, right: false });
  const updateEdges = () => {
    const t = track.current;
    if (t) setEdges({ left: t.scrollLeft > 4, right: t.scrollLeft + t.clientWidth < t.scrollWidth - 4 });
  };
  useEffect(() => {
    const id = setTimeout(updateEdges, 900);
    return () => clearTimeout(id);
  }, [u, filter]);
  const scrollStage = (dir: 1 | -1) => {
    const t = track.current;
    t?.scrollBy({ left: dir * t.clientWidth * 0.6, behavior: "smooth" });
  };
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  useEffect(() => {
    if (!centerReq) return;
    const t = track.current;
    const el = t?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!t || !el || t.scrollWidth <= t.clientWidth) return;
    const id = setTimeout(() => {
      t.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - t.clientWidth / 2, behavior: "smooth" });
    }, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerReq]);

  const groupRows = priceList.filter((r) => filter === "all" || groupOf(r) === filter);
  const activeRows = rowsOf(active);
  const activeModel = modelOf(active.group);

  return (
    <section id="modele" className="relative overflow-hidden py-24 md:py-32">
      <AnimatePresence>{leaving && <ZoomOut v={leaving.v} from={leaving.from} />}</AnimatePresence>
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
              Cała gama w jednym ustawieniu. Wybierz, do czego potrzebujesz auta, albo wskaż
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
      <div ref={stage} className="relative mt-8 md:mt-10">
        <div
          ref={track}
          onScroll={updateEdges}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || !track.current) return;
            drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || !track.current) return;
            if (Math.abs(e.clientX - d.x) > 5) d.moved = true;
            if (d.moved) track.current.scrollLeft = d.left - (e.clientX - d.x);
          }}
          onPointerUp={() => setTimeout(() => (drag.current = null))}
          onPointerLeave={() => (drag.current = null)}
          onClickCapture={(e) => {
            if (drag.current?.moved) e.stopPropagation();
          }}
          className={`relative isolate overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            edges.left || edges.right ? "md:cursor-grab md:active:cursor-grabbing" : ""
          }`}
        >
          <motion.div initial={false} animate={{ height: stageH }} transition={{ duration: 0.8, ease }} className="relative w-max min-w-full">
          {/* Floor */}
          <div className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{ bottom: floor }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-white/[0.04] to-transparent" style={{ height: floor }} />

          <div
            className="relative mx-auto flex h-full w-max min-w-full items-end justify-center"
            style={{ paddingInline: pad / 2, paddingBottom: floor }}
            onDragStart={(e) => e.preventDefault()}
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
                    marginLeft: shown && !first ? w * GAP : 0,
                    opacity: shown ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, ease }}
                >
                  <motion.button
                    type="button"
                    aria-label={`${modelOf(v.group).short} ${v.label}`}
                    aria-pressed={isActive}
                    tabIndex={shown ? 0 : -1}
                    onMouseEnter={() => {
                      if (pointer.current.type === "touch") return;
                      setActiveId(v.id);
                      router.prefetch(hrefOf(v));
                    }}
                    onFocus={() => setActiveId(v.id)}
                    onPointerDown={(e) => (pointer.current = { type: e.pointerType, wasActive: isActive })}
                    onClick={(e) => {
                      // Mouse and keyboard open the page straight away; on a touch screen the first tap only picks
                      if (pointer.current.type === "touch" && !pointer.current.wasActive) return pick(v.id);
                      open(v, e.currentTarget);
                    }}
                    className="group absolute inset-0 block origin-bottom cursor-pointer outline-none md:cursor-[inherit]"
                    initial={{ x: 260, opacity: 0 }}
                    animate={
                      inView
                        ? { x: 0, opacity: leaving?.v.id === v.id ? 0 : 1, scale: isActive ? 1.12 : 1, y: isActive ? -8 : 0 }
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
                      <VehicleImage v={v} sizes="(max-width:768px) 60vw, 40vw" />
                    </span>
                    {/* Name on the floor */}
                    <span
                      className={`absolute top-full left-[12%] mt-3 text-left text-[11px] leading-tight font-semibold tracking-wide whitespace-nowrap transition-colors md:text-xs ${
                        isActive ? "text-white" : "text-white/40"
                      }`}
                    >
                      {modelOf(v.group).short}
                      <span className="block font-normal">{v.label}</span>
                      <span className={`mt-1 block font-semibold transition-colors ${isActive ? "text-brand-hover" : "text-brand"}`}>
                        {priceFrom(v)}
                      </span>

                    </span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
          </motion.div>
        </div>
        {/* Edge fades and arrows, while there is more to see on that side */}
        {(["left", "right"] as const).map((side) => (
          <div
            key={side}
            className={`pointer-events-none absolute inset-y-0 z-10 ${side === "left" ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"} w-10 from-ink to-transparent transition-opacity duration-300 md:w-28 ${edges[side] ? "opacity-100" : "opacity-0"}`}
          >
            <button
              type="button"
              aria-label={side === "left" ? "Poprzednie auta" : "Następne auta"}
              onClick={() => scrollStage(side === "left" ? -1 : 1)}
              tabIndex={edges[side] ? 0 : -1}
              className={`absolute top-[42%] hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/80 backdrop-blur-md transition hover:border-brand hover:bg-brand md:grid ${
                side === "left" ? "left-6" : "right-6"
              } ${edges[side] ? "pointer-events-auto" : ""}`}
            >
              {side === "left" ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
            </button>
          </div>
        ))}
        {/* Short hint with arrows that show which way there is more to see */}
        {(edges.left || edges.right) && (
          <div className="mt-5 flex justify-center px-5 md:mt-4">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] py-2 pr-3 pl-2 text-[13px] font-medium text-white/85 backdrop-blur-md">
              <ChevronLeft className={`size-4 transition-opacity ${edges.left ? "text-brand opacity-100" : "opacity-25"}`} />
              <Hand className="size-4 text-brand md:hidden" />
              <span className="md:hidden">Przesuń · dotknij auta</span>
              <span className="hidden md:inline">Przeciągnij · kliknij auto</span>
              <motion.span
                animate={edges.right && !reduceMotion ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex"
              >
                <ChevronRight className={`size-4 transition-opacity ${edges.right ? "text-brand opacity-100" : "opacity-25"}`} />
              </motion.span>
            </p>
          </div>
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
            {/* Both actions the same width and centred on one axis, so they line up although only one has a fill */}
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <MagneticButton href="#kontakt" className="justify-center">Zapytaj o ofertę</MagneticButton>
              <Link
                href={hrefOf(active)}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-[15px] text-[15px] font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
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
                      onClick={() => v && pick(v.id)}
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
