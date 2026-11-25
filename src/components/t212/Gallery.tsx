"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { galleryTabs } from "@/lib/content212";
import Image from "next/image";
import { Eyebrow, Reveal, SplitText, ease } from "./ui";

// Mosaic slots for five photos: one hero tile and four around it
const slots = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

function Lightbox({ tab, index, onClose, onIndex }: { tab: number; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const photos = galleryTabs[tab].photos;
  const go = useCallback((d: number) => onIndex((index + d + photos.length) % photos.length), [index, onIndex, photos.length]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);
  const p = photos[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col bg-deep/95 backdrop-blur-xl"
      role="dialog"
      aria-modal
      aria-label={`Galeria ${galleryTabs[tab].name}`}
      data-lenis-prevent
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <span className="font-mono text-xs tracking-[0.2em] text-moss uppercase">
          212 {galleryTabs[tab].name} · {String(index + 1).padStart(2, "0")} / {photos.length}
        </span>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-bone/10" aria-label="Zamknij galerię">
          <X />
        </button>
      </div>
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-x-5 inset-y-0 md:inset-x-24"
          >
            <Image src={p.src} alt={`212 ${galleryTabs[tab].name}, zdjęcie ${index + 1}`} fill sizes="100vw" className="object-contain" />
          </motion.div>
        </AnimatePresence>
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={() => go(d)}
            aria-label={d < 0 ? "Poprzednie zdjęcie" : "Następne zdjęcie"}
            className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-bone/10 backdrop-blur-md transition hover:bg-lime hover:text-deep ${
              d < 0 ? "left-4 md:left-8" : "right-4 md:right-8"
            }`}
          >
            {d < 0 ? <ChevronLeft /> : <ChevronRight />}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2 px-5 py-5">
        {photos.map((ph, i) => (
          <button
            key={ph.src}
            onClick={() => onIndex(i)}
            aria-label={`Zdjęcie ${i + 1}`}
            className={`relative h-14 w-20 overflow-hidden rounded-lg transition md:h-16 md:w-24 ${galleryTabs[tab].studio ? "bg-white" : "bg-forest"} ${i === index ? "ring-2 ring-lime" : "opacity-50 hover:opacity-100"}`}
          >
            <Image src={ph.src} alt="" fill sizes="96px" className="object-contain p-1" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/** Gallery as a mosaic per version (T01 SUV, T01 Pick-up, 3D renders) with a full-screen viewer. */
export default function Gallery() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-bone py-28 text-deep md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Eyebrow dark>Galeria</Eyebrow>
            </Reveal>
            <SplitText
              text="SUV i pick-up. Jedna rama."
              className="mt-5 max-w-[14ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.02] font-extrabold tracking-tight"
            />
          </div>
          <div className="flex max-w-full overflow-x-auto rounded-full bg-deep/5 p-1 text-sm font-semibold whitespace-nowrap" role="tablist">
            {galleryTabs.map((t, i) => (
              <button
                key={t.name}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`relative rounded-full px-4 py-2.5 transition-colors md:px-5 ${tab === i ? "text-lime" : "text-deep/60 hover:text-deep"}`}
              >
                {tab === i && <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-full bg-deep" />}
                <span className="relative">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[38vw] grid-cols-2 gap-3 md:auto-rows-[min(19vw,250px)] md:grid-cols-4 md:gap-4">
          {galleryTabs[tab].photos.map((p, i) => (
            <motion.button
              key={`${tab}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease }}
              onClick={() => setOpen(i)}
              aria-label={`Powiększ zdjęcie ${i + 1}: ${galleryTabs[tab].name}`}
              className={`group relative overflow-hidden rounded-2xl md:rounded-3xl ${galleryTabs[tab].studio ? "bg-white" : "bg-forest"} ${slots[i]}`}
            >
              <Image
                src={p.src}
                alt=""
                fill
                sizes={i === 0 ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                className="object-contain p-[6%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-deep/0 transition-colors duration-500 group-hover:bg-deep/25" />
              <span className="absolute right-3 bottom-3 grid size-10 scale-75 place-items-center rounded-full bg-lime text-deep opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox tab={tab} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
      </AnimatePresence>
    </section>
  );
}
