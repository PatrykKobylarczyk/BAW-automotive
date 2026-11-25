"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { zl } from "@/lib/content";
import { range212 } from "@/lib/content212";
import { Eyebrow, Reveal, SplitText, ease } from "./ui";

/** The 212 range in Poland: one card per version with its price, each opening the version's page. */
export default function Range() {
  return (
    <section id="gama" className="relative bg-deep py-28 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <Eyebrow>Gama 212 w Polsce</Eyebrow>
        </Reveal>
        <SplitText
          text="Wybierz swoją 212."
          className="mt-5 max-w-[16ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.02] font-extrabold tracking-tight"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {range212.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.1, duration: 0.9, ease }}
            >
              <Link
                href={v.href}
                className="group flex h-full flex-col rounded-3xl border border-bone/10 bg-pine/50 p-6 transition hover:border-lime/60 md:p-7"
              >
                <div className="relative aspect-[16/10]">
                  {v.img ? (
                    <Image
                      src={v.img}
                      alt={v.name}
                      fill
                      sizes="(max-width:768px) 90vw, 30vw"
                      className="object-contain transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                  ) : (
                    // No photo yet (Mavero): the 212 side profile as a quiet silhouette
                    <div className="grid size-full place-items-center">
                      <Image src="/gallery/212/side.webp" alt="" fill sizes="30vw" className="object-contain opacity-15 brightness-0 invert" />
                      <span className="relative rounded-full border border-lime/40 px-3 py-1 font-mono text-[11px] tracking-wider text-lime uppercase">
                        Zdjęcia wkrótce
                      </span>
                    </div>
                  )}
                </div>
                <span className="mt-5 font-mono text-[11px] tracking-wider text-moss uppercase">{v.badge}</span>
                <h3 className="mt-1 font-display text-2xl font-extrabold">{v.name}</h3>
                <p className="mt-2 flex-1 text-[15px] text-bone/70">{v.lead}</p>
                <div className="mt-6 flex items-end justify-between gap-4 border-t border-bone/10 pt-5">
                  {v.gross ? (
                    <div>
                      <span className="font-mono text-[11px] tracking-wider text-moss uppercase">od, brutto</span>
                      <div className="font-display text-2xl font-extrabold text-lime">{zl(v.gross)} zł</div>
                    </div>
                  ) : (
                    <span className="text-sm text-moss">Cena u dealera</span>
                  )}
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-bone/20 transition group-hover:border-lime group-hover:bg-lime group-hover:text-deep">
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
