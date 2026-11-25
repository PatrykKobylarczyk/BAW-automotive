"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** A swipe counts once the finger has travelled far enough or flicked fast enough. */
const swipeDir = (info: PanInfo) =>
  info.offset.x < -50 || info.velocity.x < -400 ? 1 : info.offset.x > 50 || info.velocity.x > 400 ? -1 : 0;

const slide = {
  enter: (dir: number) => ({ x: dir >= 0 ? "16%" : "-16%", opacity: 0, scale: 0.96, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir >= 0 ? "-16%" : "16%", opacity: 0, scale: 0.96, filter: "blur(6px)" }),
};

const fade = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Remembers which way the visitor moved, so the next photo slides in from the right side. */
export function useSwipeIndex(count: number, start = 0) {
  const [state, setState] = useState({ index: start, dir: 1 });
  const go = (to: number, dir?: number) =>
    setState((s) => {
      const index = ((to % count) + count) % count;
      return index === s.index ? s : { index, dir: dir ?? (index > s.index ? 1 : -1) };
    });
  return { index: state.index, dir: state.dir, go };
}

/**
 * The big photo at the top of a model's section. On a phone it follows the finger and a swipe brings the next
 * photo; on a computer it can be dragged with the mouse, switched with the arrows that show on hover, with
 * ← / → once it has focus, or with a sideways swipe on a trackpad. Every photo still has its own button below.
 */
export default function SwipeStage({
  count,
  index,
  dir,
  onChange,
  label,
  itemLabel,
  render,
  slideClassName = "absolute inset-0",
}: {
  count: number;
  index: number;
  dir: number;
  onChange: (to: number, dir: number) => void;
  /** What the photos show, for screen readers, e.g. "Kolory BAW 212" */
  label: string;
  itemLabel: (i: number) => string;
  render: (i: number) => ReactNode;
  slideClassName?: string;
}) {
  const reduce = useReducedMotion();
  const wheelLock = useRef(0);
  const wheelSum = useRef(0);
  const step = (d: number) => onChange(index + d, d);

  return (
    <div
      role="group"
      aria-roledescription="karuzela"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
        else return;
        e.preventDefault();
      }}
      onWheel={(e) => {
        // A sideways two-finger swipe on a trackpad flips the photo, once per gesture
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        const now = performance.now();
        if (now < wheelLock.current) return;
        wheelSum.current += e.deltaX;
        if (Math.abs(wheelSum.current) > 40) {
          step(wheelSum.current > 0 ? 1 : -1);
          wheelSum.current = 0;
          wheelLock.current = now + 700;
        }
      }}
      className="group/stage absolute inset-0 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand/70"
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={index}
          custom={dir}
          variants={reduce ? fade : slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            const d = swipeDir(info);
            if (d) step(d);
          }}
          className={`${slideClassName} cursor-grab touch-pan-y select-none active:cursor-grabbing [&_img]:pointer-events-none`}
        >
          {render(index)}
        </motion.div>
      </AnimatePresence>

      {(["prev", "next"] as const).map((side) => {
        const Icon = side === "prev" ? ChevronLeft : ChevronRight;
        return (
          <button
            key={side}
            type="button"
            tabIndex={-1}
            onClick={() => step(side === "prev" ? -1 : 1)}
            aria-label={side === "prev" ? "Poprzednie zdjęcie" : "Następne zdjęcie"}
            className={`absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/60 text-white/85 backdrop-blur-md transition duration-300 hover:border-brand hover:bg-brand hover:text-white md:size-12 pointer-fine:opacity-0 pointer-fine:group-hover/stage:opacity-100 pointer-fine:group-focus-visible/stage:opacity-100 ${
              side === "prev" ? "left-0 md:left-2" : "right-0 md:right-2"
            }`}
          >
            <Icon className="size-5" />
          </button>
        );
      })}

      <span className="sr-only" aria-live="polite">
        {itemLabel(index)}, {index + 1} z {count}
      </span>
    </div>
  );
}
