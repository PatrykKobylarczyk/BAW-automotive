"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { driveModes, terrainScenes } from "@/lib/content212";
import Image from "next/image";
import { Eyebrow, ease } from "./ui";

const STEP = 360 / driveModes.length;
const R_LABEL = 212;

/** One mode name on the dial; counter-rotates so it always reads upright. */
function DialLabel({ i, rotate, active }: { i: number; rotate: MotionValue<number>; active: boolean }) {
  const angle = i * STEP;
  const upright = useTransform(rotate, (r) => -r);
  const rad = (angle * Math.PI) / 180;
  return (
    <g transform={`translate(${(Math.cos(rad) * R_LABEL).toFixed(2)} ${(Math.sin(rad) * R_LABEL).toFixed(2)})`}>
      <motion.text
        style={{ rotate: upright }}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`font-mono text-[15px] font-semibold tracking-wider uppercase transition-[fill,opacity] duration-300 ${
          active ? "fill-lime" : "fill-bone opacity-45"
        }`}
      >
        {driveModes[i].name}
      </motion.text>
    </g>
  );
}

/** The terrain selector as a physical knob: scrolling turns it, the mode at the lime pointer is active. */
function Dial({ rotate, active }: { rotate: MotionValue<number>; active: number }) {
  return (
    <svg viewBox="-300 -300 600 600" className="size-full overflow-visible" aria-hidden>
      <circle r="292" fill="rgb(11 29 21 / .55)" stroke="rgb(241 244 232 / .18)" strokeWidth="2" />
      <motion.g style={{ rotate }}>
        {Array.from({ length: 60 }, (_, k) => {
          const a = (k * 6 * Math.PI) / 180;
          const major = k % 5 === 0;
          const r1 = major ? 258 : 266;
          return (
            <line
              key={k}
              x1={+(Math.cos(a) * r1).toFixed(2)}
              y1={+(Math.sin(a) * r1).toFixed(2)}
              x2={+(Math.cos(a) * 280).toFixed(2)}
              y2={+(Math.sin(a) * 280).toFixed(2)}
              stroke="rgb(241 244 232 / .5)"
              strokeWidth={major ? 3 : 1.5}
            />
          );
        })}
        {driveModes.map((_, i) => (
          <DialLabel key={i} i={i} rotate={rotate} active={i === active} />
        ))}
      </motion.g>
      {/* knob */}
      <circle r="150" fill="#12301f" stroke="rgb(241 244 232 / .12)" strokeWidth="2" />
      <circle r="118" fill="none" stroke="rgb(200 220 72 / .35)" strokeWidth="1.5" strokeDasharray="2 7" />
      <text textAnchor="middle" y="-14" className="fill-moss font-mono text-[14px] tracking-[0.3em] uppercase">
        Tryb
      </text>
      <text textAnchor="middle" y="44" className="fill-bone font-display text-[64px] font-extrabold">
        {String(active + 1).padStart(2, "0")}
      </text>
      {/* pointer at 9 o'clock, facing the copy */}
      <path d="M-300,0 L-270,-14 L-270,14 Z" fill="#c8dc48" />
    </svg>
  );
}

export default function DriveModes() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const last = driveModes.length - 1;
  // Mode i sits at angle i·STEP; turning by 180 − i·STEP brings it to the pointer on the left
  const rotate = useTransform(scrollYProgress, [0.04, 0.96], [180, 180 - last * STEP], { clamp: true });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(last, Math.max(0, Math.round(((p - 0.04) / 0.92) * last))));
  });
  const mode = driveModes[active];
  const scene = terrainScenes[mode.scene];

  return (
    <section ref={ref} className="relative h-[460vh] bg-deep">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* terrain photo per scene */}
        <AnimatePresence initial={false}>
          <motion.div
            key={mode.scene}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_60%,var(--color-forest-2),var(--color-deep)_75%)]"
          >
            <Image
              src={scene.photo}
              alt={`212 T01: ${scene.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/80 to-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-transparent to-deep/50" />

        {/* dial, half outside the right edge */}
        <div className="absolute top-[6%] right-[-22vw] aspect-square w-[84vw] md:top-1/2 md:right-[-14vw] md:w-[min(64vw,86vh)] md:-translate-y-1/2">
          <Dial rotate={rotate} active={active} />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-12 md:justify-center md:px-8 md:pb-0">
          <Eyebrow>Tryby jazdy</Eyebrow>
          <div className="mt-6 font-mono text-xs tracking-[0.2em] text-moss uppercase">
            Teren {String(mode.scene + 1).padStart(2, "0")} / {terrainScenes.length} · {scene.name}
          </div>
          <div className="relative mt-3 h-[clamp(52px,8vw,128px)] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.h2
                key={active}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.55, ease }}
                className="font-display text-[8.4vw] leading-none font-extrabold tracking-tight whitespace-nowrap md:text-[clamp(44px,7.4vw,118px)]"
              >
                {mode.name}
              </motion.h2>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="mt-5 min-h-[3lh] max-w-[40ch] text-lg text-bone/85 md:text-xl"
            >
              {mode.text}
            </motion.p>
          </AnimatePresence>

          {/* scene progress */}
          <ol className="mt-8 grid max-w-[560px] grid-cols-4 gap-3">
            {terrainScenes.map((s, si) => (
              <li key={s.name}>
                <div className="flex gap-1">
                  {s.modes.map((m, mi) => {
                    const idx = si * 3 + mi;
                    return (
                      <span
                        key={m.name}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          idx < active ? "bg-lime/60" : idx === active ? "bg-lime" : "bg-bone/15"
                        }`}
                      />
                    );
                  })}
                </div>
                <span className={`mt-2 block text-xs transition-colors ${si === mode.scene ? "text-bone" : "text-bone/45"}`}>{s.name}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-moss">Dostępność trybów zależy od wersji wyposażenia.</p>
        </div>
      </div>
    </section>
  );
}
