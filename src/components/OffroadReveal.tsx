"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/content";

/** Pinned section: the photo expands from a rounded card to full-bleed while the headline zooms through. */
export default function OffroadReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const inset = useTransform(scrollYProgress, [0, 0.45], ["12% 18% 12% 18%", "0% 0% 0% 0%"]);
  const clipPath = useTransform(inset, (v) => `inset(${v} round ${v === "0% 0% 0% 0%" ? 0 : 32}px)`);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const leftX = useTransform(scrollYProgress, [0, 0.45], ["-30%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.45], ["30%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.8, 0.95], [0, 1, 1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.45, 0.6], [30, 0]);

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
            <Image src={media.offroad} alt="BAW 212 w terenie" fill sizes="100vw" className="object-cover" quality={90} />
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,11,14,.3),rgba(10,11,14,.85))]" />
        </motion.div>

        <motion.div style={{ opacity: titleOpacity }} className="relative z-10 px-5 text-center">
          <h2 className="font-display text-[clamp(44px,9vw,150px)] leading-[0.92] font-extrabold tracking-tight">
            <motion.span style={{ x: leftX }} className="block">
              Bez <span className="text-brand">kompromisów.</span>
            </motion.span>
            <motion.span style={{ x: rightX }} className="block text-white/90">
              W każdym terenie.
            </motion.span>
          </h2>
          <motion.p style={{ opacity: subOpacity, y: subY }} className="mt-8 text-lg text-white/80 md:text-xl">
            BAW 212 Off-Road · 2.0 T GDI · napęd 4WD z blokadami dyferencjałów
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
