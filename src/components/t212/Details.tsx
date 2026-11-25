"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { gallery, renders, specs, timeline } from "@/lib/content212";
import { Eyebrow, Reveal, SplitText, ease } from "./ui";
import Image from "next/image";
import Link from "next/link";

export function Specs() {
  return (
    <section id="dane" className="relative bg-deep py-28 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <Eyebrow>Dane techniczne</Eyebrow>
            </Reveal>
            <SplitText
              text="212 T01 Diesel w liczbach."
              className="mt-5 max-w-[14ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.02] font-extrabold tracking-tight"
            />
          </div>
          <Reveal delay={0.1} className="relative aspect-[886/798] max-h-[340px] justify-self-end">
            <Image src={renders.top} alt="212 T01 widok z góry" width={886} height={798} className="h-full w-auto object-contain" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {specs.map((g, gi) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: gi * 0.1, duration: 0.9, ease }}
              className="rounded-3xl border border-bone/10 bg-pine/50 p-6 md:p-7"
            >
              <h3 className="mb-4 font-mono text-[11px] tracking-[0.24em] text-lime uppercase">{g.group}</h3>
              <dl className="divide-y divide-bone/10">
                {g.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-moss">{k}</dt>
                    <dd className="text-right font-mono text-[15px] text-bone tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-sm text-moss">
          Dane według specyfikacji importera dla wersji SUV z silnikiem Diesla.{" "}
          <Link href="/modele/baw-212" className="text-bone underline underline-offset-4 transition hover:text-lime">
            Pełna karta techniczna
          </Link>
        </p>
      </div>
    </section>
  );
}

export function Gallery() {
  const pin = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="galeria" ref={pin} className="relative h-[320vh] bg-bone text-deep">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[1320px] items-end justify-between gap-6 px-5 md:px-8">
          <div>
            <Eyebrow dark>Galeria</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,48px)] leading-none font-extrabold">Z każdej strony.</h2>
          </div>
          <div className="hidden h-1 w-52 overflow-hidden rounded-full bg-deep/10 md:block">
            <motion.div style={{ width: bar }} className="h-full bg-forest" />
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-5 pl-5 md:pl-[max(2rem,calc((100vw-1320px)/2+2rem))]">
          {gallery.map((g, i) => (
            <figure
              key={g.src}
              className={`group relative shrink-0 overflow-hidden rounded-3xl bg-white ${
                i % 3 === 1 ? "aspect-[3/4] h-[min(56vh,480px)]" : "aspect-[16/10] h-[min(56vh,480px)]"
              }`}
            >
              <Image
                src={g.src}
                alt={`212: ${g.caption}`}
                fill
                sizes="(max-width:768px) 90vw, 50vw"
                className="object-contain p-[6%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
              />
              <figcaption className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-deep/70 px-4 py-2 text-sm text-bone backdrop-blur-md">
                <span className="font-mono text-[11px] text-lime">{String(i + 1).padStart(2, "0")}</span>
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function History() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="historia" ref={ref} className="topo relative overflow-hidden bg-deep py-28 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <Eyebrow>Historia</Eyebrow>
        </Reveal>
        <SplitText
          text="Sześć dekad w terenie."
          className="mt-5 max-w-[14ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.02] font-extrabold tracking-tight"
        />

        <div className="relative mt-16">
          <div className="absolute top-[9px] left-0 hidden h-1 w-full rounded-full bg-bone/10 md:block">
            <motion.div style={{ width: line }} className="h-full rounded-full bg-lime" />
          </div>
          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.12, duration: 0.9, ease }}
                className="relative border-l-2 border-bone/10 pl-6 md:border-0 md:pl-0"
              >
                <span className="absolute top-1 -left-[9px] size-4 rounded-full border-4 border-deep bg-lime md:static md:block md:size-[22px]" />
                <div className="font-display text-[clamp(34px,3.4vw,52px)] font-extrabold text-bone md:mt-6">{t.year}</div>
                <h3 className="mt-1 font-semibold text-lime">{t.title}</h3>
                <p className="mt-2 text-[15px] text-bone/70">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
