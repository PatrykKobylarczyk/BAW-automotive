"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/content212";
import Image from "next/image";

/** Pinned section: the terrain footage expands from a rounded card to full-bleed while the headline slides in. */
export default function Terrain() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const inset = useTransform(scrollYProgress, [0, 0.45], ["14% 20% 14% 20%", "0% 0% 0% 0%"]);
  const clipPath = useTransform(inset, (v) => `inset(${v} round ${v === "0% 0% 0% 0%" ? 0 : 36}px)`);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  const leftX = useTransform(scrollYProgress, [0, 0.45], ["-35%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.45], ["35%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.3, 0.85, 0.98], [0, 1, 1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.45, 0.6], [30, 0]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-deep">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,var(--color-forest-2),var(--color-pine)_70%)]">
          <motion.div style={{ scale: mediaScale }} className="absolute inset-0">
            <Image
              src={media.terrainPhoto}
              alt="212 T01 w terenie"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <video
              className="absolute inset-0 size-full object-cover"
              src={media.terrainVideo}
              autoPlay
              muted
              loop
              playsInline
              onError={(e) => e.currentTarget.remove()}
            />
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,29,21,.25),rgba(11,29,21,.85))]" />
        </motion.div>

        <motion.div style={{ opacity: titleOpacity }} className="relative z-10 px-5 text-center">
          <h2 className="font-display text-[clamp(40px,8.5vw,140px)] leading-[0.92] font-extrabold tracking-tight">
            <motion.span style={{ x: leftX }} className="block">
              Tam, gdzie
            </motion.span>
            <motion.span style={{ x: rightX }} className="block text-lime">
              kończy się droga.
            </motion.span>
          </h2>
          <motion.p style={{ opacity: subOpacity, y: subY }} className="mx-auto mt-8 max-w-[46ch] text-lg text-bone/85 md:text-xl">
            Napęd 4×4 part-time z reduktorem i trzema blokadami. T01 jedzie dalej, kiedy inne SUV-y zawracają.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
