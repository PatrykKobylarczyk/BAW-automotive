"use client";

import { motion, useInView, useMotionValue, useSpring, animate, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Fragment, useEffect, useRef, type ReactNode } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/** The 212 wordmark, drawn as solid blocks like the brand logo. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 252 100" className={className} fill="currentColor" role="img" aria-label="212">
      <polygon points="0,0 100,0 100,46 44,72 100,72 100,100 0,100 0,70 72,38 72,28 0,28" />
      <polygon points="108,0 144,0 144,100 116,100 116,28 108,28" />
      <polygon points="152,0 252,0 252,46 196,72 252,72 252,100 152,100 152,70 224,38 224,28 152,28" />
    </svg>
  );
}

/**
 * The lime "trail" from the 212 brand book: one looping stroke that draws itself as the section scrolls.
 * `d` is a path in a 1000×1000 box; the svg stretches over its parent.
 */
export function Trail({
  d,
  className = "",
  width = 34,
  offset = ["start end", "end start"],
  range = [0, 0.75],
}: {
  d: string;
  className?: string;
  width?: number;
  offset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
  range?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const length = useTransform(scrollYProgress, range, [0.08, 1]);
  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden>
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="size-full">
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth={width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: length }}
      />
    </svg>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline revealed word-by-word from behind a mask. */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } };
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1, ease } } }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </MotionTag>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.24em] uppercase ${
        dark ? "text-forest" : "text-lime"
      }`}
    >
      <span className={`size-1.5 rounded-full ${dark ? "bg-forest" : "bg-lime"}`} />
      {children}
    </span>
  );
}

/** Button that follows the cursor slightly. */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const styles = {
    primary: "bg-lime text-deep hover:bg-lime-2 hover:shadow-[0_18px_40px_-14px] hover:shadow-lime/60",
    ghost: "border border-bone/30 text-bone backdrop-blur-md hover:border-lime hover:text-lime",
    dark: "bg-deep text-lime hover:bg-pine",
  }[variant];

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold transition-[background,color,box-shadow,border-color] duration-300 ${styles} ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  );
}

export function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease,
      onUpdate: (v) => (node.textContent = v.toFixed(decimals).replace(".", ",")),
    });
    return () => controls.stop();
  }, [inView, to, decimals]);
  return <span ref={ref}>{to.toFixed(decimals).replace(".", ",")}</span>;
}
