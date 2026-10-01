"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav } from "@/lib/content";

export function Logo() {
  return (
    <a href="#" className="flex items-baseline gap-2">
      <span className="font-display text-[26px] font-extrabold tracking-tight text-brand">BAW</span>
      <span className="text-[10px] font-medium tracking-[0.32em] text-muted">AUTOMOTIVE POLSKA</span>
    </a>
  );
}

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-white/10 bg-ink/75 backdrop-blur-xl" : ""
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between px-5 transition-[height] duration-500 md:px-8 ${
            scrolled ? "h-[68px]" : "h-[88px]"
          }`}
        >
          <Logo />
          <nav className="hidden gap-9 text-sm font-medium lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="group relative text-white/75 transition-colors hover:text-white">
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#dealer"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e2124a] lg:inline-block"
          >
            Zostań dealerem
          </a>
          <button onClick={() => setOpen(true)} className="p-2 lg:hidden" aria-label="Otwórz menu">
            <Menu />
          </button>
        </div>
        <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-brand-dark px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold">BAW</span>
              <button onClick={() => setOpen(false)} className="p-2" aria-label="Zamknij menu">
                <X />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-4">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl font-bold"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
