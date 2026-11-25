"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { heroSpecs, price, renders } from "@/lib/content212";
import { Eyebrow, MagneticButton, Wordmark, ease } from "./ui";

const TRAIL =
  "M1010,300 C840,330 720,470 640,640 C580,770 500,900 340,890 C170,880 120,760 230,720 C380,668 560,800 720,1010";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const carY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0.4, 0.85], [1, 0]);

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[760px] flex-col overflow-hidden bg-forest md:h-svh">
      {/* Brand poster: white 212 wordmark on forest green */}
      <motion.div
        style={{ y: markY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
        className="absolute inset-x-0 top-[104px] -z-10 mx-auto w-[min(92vw,1180px)] md:top-[12%]"
      >
        <Wordmark className="w-full text-bone" />
      </motion.div>

      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(110px+90vw)] w-full md:h-full" aria-hidden>
        <motion.path
          d={TRAIL}
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth={30}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      <motion.div
        style={{ y: carY, scale: carScale }}
        initial={{ opacity: 0, x: "12%", filter: "blur(10px)" }}
        animate={{ opacity: 1, x: "0%", filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay: 0.25, ease }}
        className="pointer-events-none absolute inset-x-0 top-[calc(104px+22vw)] mx-auto aspect-[1600/919] w-[min(118vw,1080px)] md:top-[24%] md:w-[min(74vw,1080px)]"
      >
        <div className="absolute inset-x-[8%] bottom-[2%] h-[14%] rounded-[50%] bg-deep/70 blur-2xl" />
        <Image src={renders.hero} alt="212 T01 w kolorze Zieleń Medog" fill priority sizes="(max-width:768px) 118vw, 74vw" className="object-contain" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto mt-auto grid w-full max-w-[1320px] gap-8 px-5 pt-[calc(124px+86vw)] pb-10 md:grid-cols-[1fr_auto] md:items-end md:px-8 md:pt-0 md:pb-12"
      >
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
            <Eyebrow>212 T01 · terenowa legenda od 1965</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease }}
            className="mt-4 max-w-[16ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[0.98] font-extrabold tracking-tight"
          >
            Asfalt jest opcjonalny.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 1, ease }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <MagneticButton href="#jazda-probna">Umów jazdę próbną</MagneticButton>
            <MagneticButton href="#konfigurator" variant="ghost">
              Skonfiguruj
            </MagneticButton>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 1, ease }}
          className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-3xl border border-bone/15 bg-deep/45 p-5 backdrop-blur-xl sm:grid-cols-4 md:grid-cols-2 md:p-6"
        >
          {heroSpecs.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[11px] tracking-wider text-moss uppercase">{s.label}</dt>
              <dd className="font-display text-2xl font-extrabold">
                {s.value}
                {s.unit && <span className="ml-1 text-sm font-semibold text-lime">{s.unit}</span>}
              </dd>
            </div>
          ))}
          <div className="col-span-2 border-t border-bone/15 pt-4 sm:col-span-4 md:col-span-2">
            <span className="font-mono text-[11px] tracking-wider text-moss uppercase">{price.version}, od</span>
            <div className="font-display text-3xl font-extrabold text-lime">{price.gross} zł</div>
          </div>
        </motion.dl>
      </motion.div>
    </section>
  );
}
