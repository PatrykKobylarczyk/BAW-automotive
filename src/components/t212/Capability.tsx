"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { capability, geometry, marquee, renders } from "@/lib/content212";
import { Eyebrow, Reveal, SplitText, Trail, ease } from "./ui";

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden bg-lime py-4 text-deep">
      <div className="animate-marquee flex w-max gap-10">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-extrabold whitespace-nowrap uppercase md:text-2xl">
            {t}
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
              <path d="M2 18 L10 2 L18 18" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Manifesto() {
  return (
    <section className="topo relative overflow-hidden py-28 md:py-40">
      <Trail
        d="M1020,40 C860,60 820,200 900,300 C980,400 860,470 760,420 C640,360 700,240 800,280 C900,320 760,520 560,560 C380,595 160,560 -20,600"
        className="absolute inset-x-0 top-0 h-[55%] w-full opacity-80"
        width={12}
      />
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <Eyebrow>Konstrukcja</Eyebrow>
        </Reveal>
        <SplitText
          text="Prawdziwa terenówka. Rama, dwa sztywne mosty i reduktor, jak w 1965 roku. Tylko lepiej."
          className="mt-6 max-w-[22ch] font-display text-[clamp(30px,4.4vw,64px)] leading-[1.02] font-extrabold tracking-tight"
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {capability.map((c, i) => (
            <motion.div
              key={c.value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.08, duration: 0.9, ease }}
              className="group relative bg-deep p-7 transition-colors duration-500 hover:bg-forest md:p-8"
            >
              <span className="font-mono text-[11px] text-moss">0{i + 1}</span>
              <b className="mt-8 block font-display text-3xl font-extrabold text-lime">{c.value}</b>
              <p className="mt-2 text-[15px] text-bone/75">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Side profile of the T01 with its real off-road geometry drawn over it. Coordinates match the 964×434 render. */
export function Geometry() {
  const [wading, setWading] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(1);
  const GROUND = 412;
  const WATER = 240; // 850 mm at the render's scale (1936 mm body height ≈ 392 px, ground at 412)

  return (
    <section id="teren" className="relative overflow-hidden bg-bone py-28 text-deep md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Eyebrow dark>Geometria terenowa</Eyebrow>
            </Reveal>
            <SplitText
              text="Liczby, które czuć pod kołami."
              className="mt-5 max-w-[14ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.02] font-extrabold tracking-tight"
            />
          </div>
          <div className="flex rounded-full bg-deep/5 p-1 font-mono text-xs tracking-wider uppercase">
            {[
              ["Kąty i prześwit", false],
              ["Brodzenie", true],
            ].map(([label, w]) => (
              <button
                key={String(label)}
                onClick={() => setWading(w as boolean)}
                className={`relative rounded-full px-4 py-2.5 transition-colors ${wading === w ? "text-lime" : "text-deep/60 hover:text-deep"}`}
              >
                {wading === w && <motion.span layoutId="geo-tab" className="absolute inset-0 rounded-full bg-deep" />}
                <span className="relative">{label as string}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={(el) => {
            if (el) setVisible(Math.min(1, el.clientWidth / el.scrollWidth));
          }}
          className="mt-12 overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            setSwiped(el.scrollLeft > 16);
            setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
          }}
        >
          <svg viewBox="-70 -30 1110 500" className="w-full min-w-[640px]" role="img" aria-label="Profil 212 T01 z kątami natarcia i zejścia, prześwitem oraz głębokością brodzenia">
            <defs>
              <clipPath id="water-clip">
                <rect x="-70" y="-30" width="1110" height="500" />
              </clipPath>
            </defs>
            <image href={renders.side} x="0" y="0" width="964" height="434" />

            {/* water */}
            <AnimatePresence>
              {wading && (
                <motion.g
                  key="water"
                  clipPath="url(#water-clip)"
                  initial={{ y: 160 }}
                  animate={{ y: 0 }}
                  exit={{ y: 160 }}
                  transition={{ duration: 1.1, ease }}
                >
                  <motion.path
                    d={`M-140,${WATER} q35,-10 70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 t70,0 V470 H-140 Z`}
                    fill="#22543f"
                    fillOpacity="0.55"
                    animate={{ x: [0, 70] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />
                  <line x1="-70" x2="1040" y1={WATER} y2={WATER} stroke="#c8dc48" strokeWidth="3" strokeDasharray="10 8" />
                  <text x="1030" y={WATER - 14} textAnchor="end" className="fill-deep font-mono text-[22px] font-semibold">
                    {geometry.wading}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* ground */}
            <line x1="-70" x2="1040" y1={GROUND} y2={GROUND} stroke="#0b1d15" strokeWidth="2" />

            <AnimatePresence>
              {!wading && (
                <motion.g key="angles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  {/* approach */}
                  <motion.path
                    d={`M118,${GROUND} L-50,215`}
                    stroke="#22543f"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease }}
                  />
                  <path d={`M38,${GROUND} A80,80 0 0 1 67,353`} fill="none" stroke="#22543f" strokeWidth="3" />
                  <text x="-60" y="460" className="fill-deep font-mono text-[22px] font-semibold">
                    natarcie {geometry.approach}
                  </text>

                  {/* departure */}
                  <motion.path
                    d={`M800,${GROUND} L1010,240`}
                    stroke="#22543f"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2, ease }}
                  />
                  <path d={`M880,${GROUND} A80,80 0 0 0 860,362`} fill="none" stroke="#22543f" strokeWidth="3" />
                  <text x="1030" y="460" textAnchor="end" className="fill-deep font-mono text-[22px] font-semibold">
                    zejście {geometry.departure}
                  </text>

                  {/* clearance */}
                  <line x1="450" x2="450" y1="340" y2={GROUND - 3} stroke="#c8dc48" strokeWidth="10" strokeLinecap="round" />
                  <line x1="450" x2="450" y1="340" y2={GROUND - 3} stroke="#0b1d15" strokeWidth="3" />
                  <text x="450" y="460" textAnchor="middle" className="fill-deep font-mono text-[22px] font-semibold">
                    prześwit {geometry.clearance}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>
        {/* mobile only: the diagram is wider than the screen; a track under it shows that it scrolls sideways */}
        <div aria-hidden className="mt-4 flex items-center gap-4 md:hidden">
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-deep/10">
            <div
              className="absolute inset-y-0 rounded-full bg-deep transition-[left] duration-150"
              style={{ width: `${visible * 100}%`, left: `${progress * (1 - visible) * 100}%` }}
            />
          </div>
          <span className={`flex shrink-0 items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors ${swiped ? "text-deep/40" : "text-forest"}`}>
            Przesuń
            <motion.span
              animate={swiped ? { x: 0 } : { x: [0, 5, 0] }}
              transition={swiped ? { duration: 0.2 } : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="grid size-6 place-items-center rounded-full bg-lime text-deep"
            >
              <ArrowRight className="size-3.5" strokeWidth={2.5} />
            </motion.span>
          </span>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-deep/15 pt-8 md:grid-cols-5">
          {[
            [geometry.approach, "kąt natarcia"],
            [geometry.departure, "kąt zejścia"],
            [geometry.clearance, "prześwit"],
            [geometry.wading, "głębokość brodzenia"],
            [geometry.climb, "maks. nachylenie podjazdu"],
          ].map(([v, l]) => (
            <div key={l} className="flex flex-col-reverse">
              <dt className="font-mono text-[11px] tracking-wider text-deep/60 uppercase">{l}</dt>
              <dd className="font-display text-[clamp(26px,2.6vw,38px)] font-extrabold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
