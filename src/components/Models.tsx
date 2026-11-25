"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Box, Check, ImageIcon, Loader2, Rotate3d } from "lucide-react";
import { useRef, useState } from "react";
import { colors212, lightTruck, miniTruckVersions, offroadFeatures, offroadSpecs, paints212 } from "@/lib/content";
import { pageTitle, pageTop } from "@/lib/styles";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";
import SwipeStage, { useSwipeIndex } from "./SwipeStage";

const Car3D = dynamic(() => import("./Car3D"), { ssr: false });

function useParallax(target: React.RefObject<HTMLElement | null>, distance: number): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
}

/**
 * One colour photo of the 212, cropped to the car's measured outline and centred in its box. Every colour fills
 * the same frame, so the car keeps its size and position when the visitor switches colours.
 */
function CroppedCar({ photo }: { photo: (typeof colors212)[number] }) {
  const [l, t, r, b] = photo.box;
  const carW = r - l;
  const carH = b - t;
  return (
    <div
      className="absolute top-1/2 left-1/2 w-[103%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
      style={{ aspectRatio: `${carW} / ${carH}` }}
    >
      <Image
        src={photo.src}
        alt={`BAW 212 — ${photo.name}`}
        width={photo.w}
        height={photo.h}
        sizes="(max-width:1024px) 110vw, 62vw"
        quality={90}
        className="absolute max-w-none drop-shadow-[0_40px_40px_rgba(0,0,0,.6)]"
        style={{
          width: `${(photo.w / carW) * 100}%`,
          height: `${(photo.h / carH) * 100}%`,
          left: `${(-l / carW) * 100}%`,
          top: `${(-t / carH) * 100}%`,
        }}
      />
    </div>
  );
}

function SpecGrid({ specs }: { specs: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
      {specs.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.8 }}
          className="bg-ink p-5 md:p-6"
        >
          <b className="block font-display text-xl font-bold md:text-2xl">{s.value}</b>
          <small className="text-[13px] text-muted">{s.label}</small>
        </motion.div>
      ))}
    </div>
  );
}

function PriceCta({ label, price, cta, detailsHref }: { label: string; price: string; cta: string; detailsHref?: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-7">
      <div>
        <small className="block text-[13px] text-muted">{label}</small>
        <strong className="font-display text-3xl font-bold">{price} zł</strong>
      </div>
      <MagneticButton href="#kontakt">{cta}</MagneticButton>
      {detailsHref && (
        <Link
          href={detailsHref}
          className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white/80 transition hover:text-white"
        >
          Szczegóły modelu
          <ArrowUpRight className="size-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}

type SectionProps = {
  /** "h1" on the model's own page, "h2" on the home page */
  headingAs?: "h1" | "h2";
  /** Link to the model page, shown on the home page */
  detailsHref?: string;
};

/** On a model's own page the section is the top of the page: heading in the shared page style, starting at the shared height */
const modelTitle = (as: "h1" | "h2") =>
  as === "h1" ? `mt-5 mb-6 ${pageTitle}` : "mt-4 mb-6 font-display text-[clamp(40px,5.4vw,76px)] leading-none font-extrabold";
const modelSection = (as: "h1" | "h2") => (as === "h1" ? `${pageTop} pb-28 md:pb-40` : "py-28 md:py-40");
const modelGrid = (as: "h1" | "h2") => (as === "h1" ? "items-start" : "items-center");

export function Offroad212({ headingAs = "h2", detailsHref }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"photo" | "3d">("photo");
  const photo = useSwipeIndex(colors212.length);
  const photoIdx = photo.index;
  const [paintIdx, setPaintIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const is3d = mode === "3d";
  const swatches = is3d ? paints212 : colors212;
  const active = is3d ? paintIdx : photoIdx;
  const setActive = (i: number) => (is3d ? setPaintIdx(i) : photo.go(i));
  const wordX = useParallax(ref, 160);
  // The car only drifts down from its place, never up into the view switch above it
  const { scrollYProgress: sectionProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const carY = useTransform(sectionProgress, [0, 1], [70, 0]);
  // Slide-in is driven by the car box itself (not the whole section), so it finishes as soon as
  // the car is fully on screen — on mobile the stacked section is much taller than the car
  const carBox = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: carBox, offset: ["start end", "end end"] });
  const carX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

  return (
    <section ref={ref} id="modele" className={`relative overflow-hidden ${modelSection(headingAs)}`}>
      <motion.div
        style={{ x: wordX }}
        className="text-outline-faint pointer-events-none absolute top-16 left-0 font-display text-[clamp(160px,30vw,460px)] leading-none font-extrabold whitespace-nowrap select-none"
      >
        212 OFF-ROAD
      </motion.div>

      <div className={`relative mx-auto grid max-w-[1280px] gap-14 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr] ${modelGrid(headingAs)}`}>
        <div>
          {/* View switch in its own row above the car, so neither it nor the hint ever covers the photo */}
          <div className="relative z-10 mb-6 flex min-h-11 flex-wrap items-center justify-between gap-3 md:mb-8">
            <div role="tablist" aria-label="Widok" className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
              {(["photo", "3d"] as const).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => {
                    if (m === mode) return;
                    setMode(m);
                    if (m === "photo") setReady(false);
                  }}
                  onMouseEnter={m === "3d" ? () => void import("./Car3D") : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    mode === m ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {mode === m && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-brand" />}
                  <span className="relative flex items-center gap-2">
                    {m === "photo" ? <ImageIcon className="size-4" /> : <Box className="size-4" />}
                    {m === "photo" ? "Zdjęcia" : "Model 3D"}
                  </span>
                </button>
              ))}
            </div>
            <AnimatePresence>
              {is3d && ready && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="pointer-events-none flex items-center gap-2 text-xs text-white/60"
                >
                  <Rotate3d className="size-4 text-brand" /> Przeciągnij, aby obrócić
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div ref={carBox} className="relative aspect-[4/3]">
            <div className="absolute top-[62%] left-1/2 h-1/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-[70px]" />
            <motion.div style={{ y: carY, x: carX }} className="absolute inset-0">
              {/* Photo view (default): swipe or drag through the colours */}
              {!is3d && (
                <SwipeStage
                  count={colors212.length}
                  index={photoIdx}
                  dir={photo.dir}
                  onChange={photo.go}
                  label="Kolory BAW 212"
                  itemLabel={(i) => colors212[i].name}
                  render={(i) => <CroppedCar photo={colors212[i]} />}
                />
              )}
              {/* Stays visible, dimmed, until the 3D model has loaded */}
              <AnimatePresence>
                {is3d && !ready && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0.35 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-none absolute inset-0"
                  >
                    <CroppedCar photo={colors212[photoIdx]} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3D view: the model is downloaded only after the visitor asks for it */}
              {is3d && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: ready ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -inset-x-[8%] -inset-y-[4%] cursor-grab active:cursor-grabbing"
                >
                  <Car3D paint={paints212[paintIdx].hex} onReady={() => setReady(true)} />
                </motion.div>
              )}
              {is3d && !ready && (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/70 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                    <Loader2 className="size-4 animate-spin text-brand" /> Ładowanie modelu 3D…
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Colours under the car, not over it */}
          <div className="mt-6 flex justify-center md:mt-8">
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-3 sm:gap-3 sm:px-4">
              {swatches.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActive(i)}
                  aria-label={c.name}
                  className="relative size-6 rounded-full ring-1 ring-white/25 sm:size-7"
                  style={{ background: c.hex }}
                >
                  {active === i && (
                    <motion.span layoutId="swatch-ring" className="absolute -inset-1.5 rounded-full border-2 border-white" />
                  )}
                </button>
              ))}
              <AnimatePresence mode="wait">
                <motion.span
                  key={mode + active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="ml-1 w-28 text-sm text-white/80 sm:ml-2 sm:w-32"
                >
                  {swatches[active].name}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className={headingAs === "h1" ? "order-first lg:order-none" : undefined}>
          <Reveal>
            <Eyebrow>SUV terenowy</Eyebrow>
          </Reveal>
          <SplitText as={headingAs} text={headingAs === "h1" ? "BAW 212 T01 Off-Road" : "212 Off-Road"} className={modelTitle(headingAs)} />
          <Reveal delay={0.1}>
            <ul className="mb-8 space-y-3">
              {offroadFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-white/80">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <SpecGrid specs={offroadSpecs} />
            <PriceCta label="T01 Diesel, od" price="174 500" cta="Umów jazdę próbną" detailsHref={detailsHref} />
            {headingAs === "h1" && (
              <a
                href="#wersje"
                className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-brand"
              >
                <span>
                  <small className="block text-[13px] text-muted">Trzy wersje 212</small>
                  <span className="font-semibold">T01 SUV · T01 Pick-up · Mavero</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function MiniTruck({ headingAs = "h2", detailsHref }: SectionProps) {
  const intro = useRef<HTMLElement>(null);
  const photoY = useParallax(intro, 40);
  const mini = useSwipeIndex(miniTruckVersions.length);
  const miniVersion = mini.index;

  return (
    <>
      <section ref={intro} className={`relative overflow-hidden bg-ink-2 ${modelSection(headingAs)}`}>
        <div className={`mx-auto grid max-w-[1280px] gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr] ${modelGrid(headingAs)}`}>
          <div>
            <Reveal>
              <Eyebrow>Elektryczny dostawczak</Eyebrow>
            </Reveal>
            <SplitText as={headingAs} text={headingAs === "h1" ? "BAW Mini Truck EV" : "Mini Truck EV"} className={modelTitle(headingAs)} />
            <Reveal delay={0.1}>
              <p className="mb-5 text-lg text-white/80">
                Przełomowy produkt, przemyślany od konstrukcji mechanicznej, przez systemy, aż po serwis. Stworzony do
                stałych tras, wysokiego obrotu i lekkiej dystrybucji w miejskiej logistyce.
              </p>
              <p className="mb-8 text-muted">
                Kompaktowe „MINI body”, wygodne ładowanie i przewaga w ruchu miejskim. Układ kierowniczy stabilny przy
                wysokiej prędkości, a lekki przy niskiej.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <SpecGrid
                specs={[
                  { value: "100% EV", label: "zero emisji w mieście" },
                  { value: "MINI body", label: "kompaktowa konstrukcja" },
                  { value: "Box / Cargo", label: "dwie wersje zabudowy" },
                  { value: "Krótkie trasy", label: "idealny do dostaw ostatniej mili" },
                ]}
              />
              <PriceCta label="Mini Truck, od" price="64 900" cta="Zapytaj o ofertę" detailsHref={detailsHref} />
            </Reveal>
          </div>
          {/* Our photos of both versions, cut out of the background, switched like on the Light Truck */}
          <div className="lg:order-first">
            <div className="relative aspect-[4/3]">
              <div className="absolute top-[60%] left-1/2 h-1/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/35 blur-[70px]" />
              <div className="absolute top-2 left-2 z-10 rounded-full bg-brand px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                Elektryczny
              </div>
              <motion.div style={{ y: photoY }} className="absolute inset-0">
                <SwipeStage
                  count={miniTruckVersions.length}
                  index={miniVersion}
                  dir={mini.dir}
                  onChange={mini.go}
                  label="Wersje BAW Mini Truck EV"
                  itemLabel={(i) => miniTruckVersions[i].label}
                  slideClassName="absolute inset-[6%]"
                  render={(i) => (
                    <Image
                      src={miniTruckVersions[i].src}
                      alt={`BAW Mini Truck EV — ${miniTruckVersions[i].label}`}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      draggable={false}
                      className="object-contain"
                    />
                  )}
                />
              </motion.div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              {miniTruckVersions.map((v, i) => (
                <button
                  key={v.src}
                  onClick={() => mini.go(i)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                    miniVersion === i ? "border-brand bg-brand" : "border-white/15 text-white/75 hover:border-white/40"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LightTruck({ headingAs = "h2", detailsHref }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const shot = useSwipeIndex(lightTruck.gallery.length);
  const carY = useParallax(ref, 60);
  const wordX = useParallax(ref, -140);

  return (
    <section ref={ref} className={`relative overflow-hidden ${modelSection(headingAs)}`}>
      <motion.div
        style={{ x: wordX }}
        className="text-outline-faint pointer-events-none absolute right-0 bottom-10 font-display text-[clamp(160px,30vw,460px)] leading-none font-extrabold whitespace-nowrap select-none"
      >
        LIGHT TRUCK
      </motion.div>
      <div className={`relative mx-auto grid max-w-[1280px] gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] ${modelGrid(headingAs)}`}>
        <div>
          <Reveal>
            <Eyebrow>Samochód użytkowy</Eyebrow>
          </Reveal>
          <SplitText as={headingAs} text={headingAs === "h1" ? "BAW Light Truck" : "Light Truck"} className={modelTitle(headingAs)} />
          <Reveal delay={0.1}>
            <p className="mb-8 text-lg text-white/80">
              Nowa generacja konstrukcji opartej na ramie, z ładownością 1785 kg. Przestronna kabina, wygodne fotele,
              szerokie pole widzenia i dynamiczna sylwetka. Logiczny układ przyrządów i klasyczna konsola typu „T”.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <SpecGrid specs={lightTruck.specs} />
            <PriceCta label="Light Truck, od" price="89 900" cta="Zapytaj o ofertę" detailsHref={detailsHref} />
          </Reveal>
        </div>
        <div>
          <div className="relative aspect-[4/3]">
            <div className="absolute top-[60%] left-1/2 h-1/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/35 blur-[70px]" />
            <motion.div style={{ y: carY }} className="absolute inset-0">
              <SwipeStage
                count={lightTruck.gallery.length}
                index={shot.index}
                dir={shot.dir}
                onChange={shot.go}
                label="Zdjęcia BAW Light Truck"
                itemLabel={(i) => lightTruck.gallery[i].label}
                render={(i) => (
                  <Image
                    src={lightTruck.gallery[i].src}
                    alt={`BAW Light Truck — ${lightTruck.gallery[i].label}`}
                    fill
                    sizes="(max-width:1024px) 100vw, 55vw"
                    draggable={false}
                    className="object-contain"
                  />
                )}
              />
            </motion.div>
          </div>
          <div className="mt-6 grid grid-cols-6 gap-2">
            {lightTruck.gallery.map((g, i) => (
              <button
                key={g.src}
                onClick={() => shot.go(i)}
                title={g.label}
                aria-label={`Pokaż: ${g.label}`}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl border bg-white/[0.03] transition ${
                  shot.index === i ? "border-brand" : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={g.src} alt="" fill sizes="120px" className="object-contain p-1.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
