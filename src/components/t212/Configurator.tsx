"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Box, ImageIcon, Loader2, Rotate3d } from "lucide-react";
import { useState } from "react";
import { colors212, paints212, price } from "@/lib/content212";
import Image from "next/image";
import { Eyebrow, MagneticButton, Reveal, SplitText, Wordmark, ease } from "./ui";

const Car3D = dynamic(() => import("@/components/Car3D"), { ssr: false });

export default function Configurator() {
  const [mode, setMode] = useState<"photo" | "3d">("photo");
  const [photoIdx, setPhotoIdx] = useState(0);
  const [paintIdx, setPaintIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const is3d = mode === "3d";
  const swatches = is3d ? paints212 : colors212;
  const active = is3d ? paintIdx : photoIdx;
  const setActive = is3d ? setPaintIdx : setPhotoIdx;

  return (
    <section id="konfigurator" className="relative overflow-hidden bg-forest py-28 md:py-36">
      <Wordmark className="pointer-events-none absolute top-1/2 left-1/2 w-[130vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-pine/60" />

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Konfigurator</Eyebrow>
            </Reveal>
            <SplitText
              text="Twój 212. Obróć go, zmień kolor."
              className="mt-5 max-w-[16ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.02] font-extrabold tracking-tight"
            />
          </div>
          <button
            onClick={() => {
              setMode(is3d ? "photo" : "3d");
              if (is3d) setReady(false);
            }}
            onMouseEnter={() => void import("@/components/Car3D")}
            className="group flex items-center gap-2 rounded-full border border-bone/20 bg-deep/50 px-5 py-3 text-sm font-semibold backdrop-blur-md transition hover:border-lime hover:bg-lime hover:text-deep"
          >
            {is3d ? <ImageIcon className="size-4" /> : <Box className="size-4 text-lime transition group-hover:text-deep" />}
            {is3d ? "Wróć do zdjęć" : "Otwórz model 3D"}
          </button>
        </div>

        <div className="relative mt-6 aspect-[4/3] md:aspect-[16/8]">
          <div className="absolute top-[70%] left-1/2 h-1/4 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-deep/70 blur-3xl" />
          <AnimatePresence mode="wait">
            {!(is3d && ready) && (
              <motion.div
                key={is3d ? "loading" : photoIdx}
                initial={{ opacity: 0, x: 80, filter: "blur(8px)" }}
                animate={{ opacity: is3d ? 0.35 : 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: is3d ? 0 : -80, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease }}
                className="absolute inset-[4%]"
              >
                <Image
                  src={colors212[photoIdx].src}
                  alt={`212 T01, kolor ${colors212[photoIdx].name}`}
                  fill
                  sizes="(max-width:1024px) 100vw, 80vw"
                  className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,.45)]"
                  quality={90}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {is3d && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Car3D paint={paints212[paintIdx].hex} onReady={() => setReady(true)} />
            </motion.div>
          )}
          {is3d && !ready && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="flex items-center gap-3 rounded-full border border-bone/10 bg-deep/70 px-4 py-2 text-sm text-bone/80 backdrop-blur-md">
                <Loader2 className="size-4 animate-spin text-lime" /> Ładowanie modelu 3D…
              </span>
            </div>
          )}
          <AnimatePresence>
            {is3d && ready && (
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="pointer-events-none absolute top-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-bone/10 bg-deep/60 px-3 py-1.5 text-xs text-bone/70 backdrop-blur-md"
              >
                <Rotate3d className="size-3.5 text-lime" /> Przeciągnij, aby obrócić
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-bone/15 bg-deep/55 p-4 backdrop-blur-xl md:p-5">
          <div className="flex items-center gap-3">
            {swatches.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                aria-label={c.name}
                aria-pressed={active === i}
                className="relative size-8 rounded-full ring-1 ring-bone/25"
                style={{ background: c.hex }}
              >
                {active === i && <motion.span layoutId="swatch-ring" className="absolute -inset-1.5 rounded-full border-2 border-lime" />}
              </button>
            ))}
            <AnimatePresence mode="wait">
              <motion.span
                key={mode + active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="ml-3 hidden w-40 text-sm text-bone/80 sm:block"
              >
                {swatches[active].name}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <small className="block font-mono text-[11px] tracking-wider text-moss uppercase">{price.version}, od</small>
              <strong className="font-display text-2xl font-extrabold md:text-3xl">{price.gross} zł</strong>
              <small className="ml-2 text-sm text-moss">{price.net} zł netto</small>
            </div>
            <MagneticButton href="#jazda-probna">Zapytaj o ofertę</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
