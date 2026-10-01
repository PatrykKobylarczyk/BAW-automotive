"use client";

import { motion } from "motion/react";
import { Award, Globe, Zap } from "lucide-react";
import { stats, values } from "@/lib/content";
import { Counter, Eyebrow, Reveal, SplitText } from "./ui";

const icons = { globe: Globe, award: Award, zap: Zap };

export function Marquee() {
  const items = ["212 Off-Road", "Light Truck", "Mini Truck EV", "Light Truck Cargo", "Mini Truck Cargo"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-brand-dark py-5">
      <div className="animate-marquee flex w-max gap-12">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-bold whitespace-nowrap uppercase md:text-3xl">
            {t}
            <span className="size-2.5 rotate-45 bg-white/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <div className="border-b border-white/10 bg-ink-2">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.1}
            className={`px-5 py-10 md:px-8 md:py-12 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${
              i === 2 ? "md:border-l" : ""
            } border-white/10`}
          >
            <div className="font-display text-[clamp(32px,3.8vw,52px)] font-bold">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm text-muted">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Values() {
  return (
    <section id="dlaczego" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-5 md:px-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Dlaczego BAW</Eyebrow>
          </Reveal>
          <SplitText
            text="Globalna marka, lokalne wsparcie."
            className="mt-5 font-display text-[clamp(34px,4.6vw,64px)] leading-[1.02] font-bold tracking-tight"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[42ch] text-lg text-muted">
              Dzięki sieci autoryzowanych dealerów oferujemy niezawodne pojazdy dostosowane do lokalnych potrzeb i
              warunków.
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col gap-5">
          {values.map((v, i) => {
            const Icon = icons[v.icon];
            return (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 60, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-2 p-8 [transform-perspective:1000px] md:p-10"
              >
                <div className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-[radial-gradient(var(--color-brand),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-30" />
                <div className="flex items-start gap-6">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand/12 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <span className="font-display text-sm text-muted">0{i + 1}</span>
                    <h3 className="mt-1 mb-3 text-xl leading-snug font-semibold md:text-2xl">{v.title}</h3>
                    <p className="text-muted">{v.text}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
