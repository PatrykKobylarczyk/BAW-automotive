"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  /** Model name used in alt texts, e.g. "BAW 212". */
  alt: string;
  images: string[];
  /** "cover" for photos, "contain" for cut-out renders on a transparent background. */
  fit?: "cover" | "contain";
};

/** Pinned section: the photo strip scrolls sideways while the page scrolls down. Same on every model page. */
export default function ModelGallery({ title, alt, images, fit = "cover" }: Props) {
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
    <section ref={pin} className="relative h-[300vh] bg-[#eef0f3] text-ink">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[1280px] items-end justify-between px-5 md:px-8">
          <div>
            <span className="mb-3 block text-xs font-semibold tracking-[0.22em] text-brand uppercase">Galeria</span>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-bold">{title}</h2>
          </div>
          <div className="hidden h-0.5 w-48 bg-ink/10 md:block">
            <motion.div style={{ width: bar }} className="h-full bg-brand" />
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 md:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
          {images.map((src, i) => (
            <div
              key={src}
              className="group relative aspect-[1630/860] w-[82vw] shrink-0 overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-30px_rgba(10,11,14,.35)] md:h-[min(52vh,440px)] md:w-auto"
            >
              <Image
                src={src}
                alt={`${alt} — zdjęcie ${i + 1}`}
                fill
                sizes="60vw"
                className={`transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105 ${
                  fit === "contain" ? "object-contain p-[6%]" : "object-cover"
                }`}
              />
              <span className="absolute bottom-4 left-5 font-display text-sm text-ink/50">
                {String(i + 1).padStart(2, "0")} / {images.length}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
