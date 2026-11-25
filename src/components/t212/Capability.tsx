"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { capability, driveModes, geometry, marquee, renders } from "@/lib/content212";
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

        <div className="mt-12 overflow-x-auto">
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

export function DriveModes() {
  const [active, setActive] = useState(10);
  return (
    <section className="relative bg-pine py-28 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Tryby jazdy</Eyebrow>
          </Reveal>
          <SplitText
            text="Dwanaście nawierzchni. Jedno pokrętło."
            className="mt-5 max-w-[14ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.02] font-extrabold tracking-tight"
          />
          <div className="mt-10 min-h-[150px] rounded-3xl border border-lime/30 bg-deep/60 p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
              >
                <span className="font-mono text-[11px] tracking-wider text-moss uppercase">
                  Tryb {String(active + 1).padStart(2, "0")} / {driveModes.length}
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-lime">{driveModes[active].name}</h3>
                <p className="mt-2 text-bone/80">{driveModes[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 text-sm text-moss">Dostępność trybów zależy od wersji wyposażenia.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {driveModes.map((m, i) => (
            <button
              key={m.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group relative aspect-[5/4] overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 md:p-5 ${
                active === i ? "border-lime bg-lime text-deep" : "border-bone/10 bg-deep/40 hover:border-bone/30"
              }`}
            >
              <span className={`font-mono text-[11px] ${active === i ? "text-deep/60" : "text-moss"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute bottom-4 left-4 font-display text-lg leading-tight font-extrabold md:bottom-5 md:left-5 md:text-xl">
                {m.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
