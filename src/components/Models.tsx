"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Box, Check, ImageIcon, Loader2, Rotate3d } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { colors212, lightTruck, media, miniTruckGallery, offroadFeatures, offroadSpecs, paints212 } from "@/lib/content";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";

const Car3D = dynamic(() => import("./Car3D"), { ssr: false });

function useParallax(target: React.RefObject<HTMLElement | null>, distance: number): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
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

function PriceCta({ label, price, cta }: { label: string; price: string; cta: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-7">
      <div>
        <small className="block text-[13px] text-muted">{label}</small>
        <strong className="font-display text-3xl font-bold">{price} zł</strong>
      </div>
      <MagneticButton href="#kontakt">{cta}</MagneticButton>
    </div>
  );
}

export function Offroad212() {
  const ref = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"photo" | "3d">("photo");
  const [photoIdx, setPhotoIdx] = useState(0);
  const [paintIdx, setPaintIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const is3d = mode === "3d";
  const swatches = is3d ? paints212 : colors212;
  const active = is3d ? paintIdx : photoIdx;
  const setActive = is3d ? setPaintIdx : setPhotoIdx;
  const wordX = useParallax(ref, 160);
  const carY = useParallax(ref, 50);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const carX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

  return (
    <section ref={ref} id="modele" className="relative overflow-hidden py-28 md:py-40">
      <motion.div
        style={{ x: wordX }}
        className="text-outline-faint pointer-events-none absolute top-16 left-0 font-display text-[clamp(160px,30vw,460px)] leading-none font-extrabold whitespace-nowrap select-none"
      >
        212 OFF-ROAD
      </motion.div>

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative aspect-[4/3]">
          <div className="absolute top-[62%] left-1/2 h-1/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-[70px]" />
          <motion.div style={{ y: carY, x: carX }} className="absolute inset-0">
            {/* Photo view (default); stays visible until the 3D model has loaded */}
            <AnimatePresence mode="wait">
              {!(is3d && ready) && (
                <motion.div
                  key={is3d ? "loading" : photoIdx}
                  initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
                  animate={{ opacity: is3d ? 0.35 : 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: is3d ? 0 : -60, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={colors212[photoIdx].src}
                    alt={`BAW 212 — ${colors212[photoIdx].name}`}
                    fill
                    sizes="(max-width:1024px) 100vw, 55vw"
                    className="scale-110 object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,.6)]"
                    quality={90}
                  />
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

          {/* Mode switch */}
          <div className="absolute top-0 right-0 z-10 flex flex-col items-end gap-2">
            <button
              onClick={() => {
                setMode(is3d ? "photo" : "3d");
                if (is3d) setReady(false);
              }}
              onMouseEnter={() => void import("./Car3D")}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-4 py-2 text-sm font-semibold backdrop-blur-md transition hover:border-brand hover:bg-brand"
            >
              {is3d ? <ImageIcon className="size-4" /> : <Box className="size-4 text-brand transition group-hover:text-white" />}
              {is3d ? "Wróć do zdjęć" : "Zobacz model 3D"}
            </button>
            <AnimatePresence>
              {is3d && ready && (
                <motion.span
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="pointer-events-none flex items-center gap-2 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md"
                >
                  <Rotate3d className="size-3.5 text-brand" /> Przeciągnij, aby obrócić
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl">
            {swatches.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                aria-label={c.name}
                className="relative size-7 rounded-full ring-1 ring-white/25"
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
                className="ml-2 w-32 text-sm text-white/80"
              >
                {swatches[active].name}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Reveal>
            <Eyebrow>SUV terenowy</Eyebrow>
          </Reveal>
          <SplitText text="212 Off-Road" className="mt-4 mb-6 font-display text-[clamp(40px,5.4vw,76px)] leading-none font-extrabold" />
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
            <PriceCta label="T01 Diesel, od" price="174 500" cta="Umów jazdę próbną" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function MiniTruck() {
  const intro = useRef<HTMLElement>(null);
  const photoY = useParallax(intro, 70);
  const pin = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setDistance(track.current.scrollWidth - window.innerWidth + 40);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section ref={intro} className="relative overflow-hidden bg-ink-2 py-28 md:py-40">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <Eyebrow>Elektryczny dostawczak</Eyebrow>
            </Reveal>
            <SplitText text="Mini Truck EV" className="mt-4 mb-6 font-display text-[clamp(40px,5.4vw,76px)] leading-none font-extrabold" />
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
              <PriceCta label="Mini Truck, od" price="64 900" cta="Zapytaj o ofertę" />
            </Reveal>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] lg:order-first">
            <motion.div style={{ y: photoY }} className="absolute -inset-y-[12%] inset-x-0">
              <Image src={media.evPhoto} alt="BAW Mini Truck EV" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </motion.div>
            <div className="absolute top-5 left-5 rounded-full bg-brand px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
              Elektryczny
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal scroll gallery */}
      <section ref={pin} className="relative h-[300vh] bg-[#eef0f3] text-ink">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-10 flex w-full max-w-[1280px] items-end justify-between px-5 md:px-8">
            <div>
              <span className="mb-3 block text-xs font-semibold tracking-[0.22em] text-brand uppercase">Galeria</span>
              <h3 className="font-display text-[clamp(26px,3vw,40px)] font-bold">Mini Truck z każdej strony</h3>
            </div>
            <div className="hidden h-0.5 w-48 bg-ink/10 md:block">
              <motion.div style={{ width: bar }} className="h-full bg-brand" />
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 md:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
            {miniTruckGallery.map((src, i) => (
              <div key={src} className="group relative aspect-[1630/860] w-[82vw] shrink-0 md:h-[min(52vh,440px)] md:w-auto overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-30px_rgba(10,11,14,.35)]">
                <Image
                  src={src}
                  alt={`BAW Mini Truck — zdjęcie ${i + 1}`}
                  fill
                  sizes="60vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-5 font-display text-sm text-ink/50">
                  {String(i + 1).padStart(2, "0")} / {miniTruckGallery.length}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export function LightTruck() {
  const ref = useRef<HTMLElement>(null);
  const [img, setImg] = useState(lightTruck.image);
  const carY = useParallax(ref, 60);
  const wordX = useParallax(ref, -140);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <motion.div
        style={{ x: wordX }}
        className="text-outline-faint pointer-events-none absolute right-0 bottom-10 font-display text-[clamp(160px,30vw,460px)] leading-none font-extrabold whitespace-nowrap select-none"
      >
        LIGHT TRUCK
      </motion.div>
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Reveal>
            <Eyebrow>Samochód użytkowy</Eyebrow>
          </Reveal>
          <SplitText text="Light Truck" className="mt-4 mb-6 font-display text-[clamp(40px,5.4vw,76px)] leading-none font-extrabold" />
          <Reveal delay={0.1}>
            <p className="mb-8 text-lg text-white/80">
              Nowa generacja konstrukcji w dwóch typach — bezramowej i z ramą. Przestronna kabina, wygodne fotele,
              szerokie pole widzenia i dynamiczna sylwetka. Logiczny układ przyrządów i klasyczna konsola typu „T”.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <SpecGrid specs={lightTruck.specs} />
            <PriceCta label="Light Truck, od" price="89 900" cta="Zapytaj o ofertę" />
          </Reveal>
        </div>
        <div>
          <div className="relative aspect-[4/3]">
            <div className="absolute top-[60%] left-1/2 h-1/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/35 blur-[70px]" />
            <motion.div style={{ y: carY }} className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <Image src={img} alt="BAW Light Truck" fill sizes="(max-width:1024px) 100vw, 55vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="mt-6 grid grid-cols-6 gap-2">
            {lightTruck.gallery.map((g) => (
              <button
                key={g}
                onClick={() => setImg(g)}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition ${
                  img === g ? "border-brand" : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={g} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
