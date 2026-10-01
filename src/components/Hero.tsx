"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/content";
import { Eyebrow, MagneticButton, SplitText } from "./ui";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="grain relative flex h-svh min-h-[680px] items-end overflow-hidden">
      <motion.div style={{ y: videoY, scale: videoScale }} className="absolute inset-0">
        <video
          className="size-full object-cover"
          src={media.heroVideo}
          poster={media.heroPoster}
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-24 md:px-8 md:pb-32"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
          <Eyebrow light>Oficjalny importer BAW w Polsce</Eyebrow>
        </motion.div>
        <SplitText
          as="h1"
          animateOnMount
          delay={0.35}
          text="Moc w każdej klasie. Niezawodność w każdej trasie."
          className="mt-6 mb-8 max-w-[17ch] font-display text-[clamp(34px,6.2vw,96px)] leading-[0.98] font-extrabold tracking-tight"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-[52ch] text-[clamp(16px,1.35vw,19px)] text-white/80"
        >
          Globalna marka obecna na ponad 60 rynkach — teraz także w Polsce. Od terenowego 212 po elektryczne Mini
          Trucki do miejskiej logistyki.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4"
        >
          <MagneticButton href="#modele">Poznaj modele</MagneticButton>
          <MagneticButton href="#cennik" variant="ghost">
            Zobacz cennik
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute right-8 bottom-10 z-10 hidden flex-col items-center gap-4 md:flex"
      >
        <span className="text-[11px] tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl]">Przewiń</span>
        <div className="relative h-16 w-px overflow-hidden bg-white/15">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-brand"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
