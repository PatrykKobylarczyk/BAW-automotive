"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useState } from "react";

/** Round lime button that appears once the visitor is past the hero and scrolls back to the top. */
export default function BackToTop() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          aria-label="Wróć na górę strony"
          className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-[60] grid size-12 place-items-center rounded-full bg-lime text-deep shadow-[0_10px_30px_rgba(0,0,0,.35)] ring-1 ring-deep/10 transition-colors hover:bg-lime-2 md:right-8 md:bottom-8 md:size-14"
        >
          <ArrowUp className="size-5 md:size-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
