"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/lib/content";

type Props = {
  title: string;
  /** Model name used in alt texts, e.g. "BAW 212". */
  alt: string;
  images: GalleryImage[];
  /** "cover" for photos, "contain" for cut-out renders and photos on a white background. */
  fit?: "cover" | "contain";
};

type Item = { src: string; label?: string; tag?: string };
/** Sent by the versions section ("Zobacz zdjęcia tej wersji") with the version's tag, to filter the gallery. */
export const GALLERY_EVENT = "baw:gallery-filter";

const toItem = (g: GalleryImage): Item => (typeof g === "string" ? { src: g } : g);
const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.16, 1, 0.3, 1] as const;

/** A swipe counts once the finger has travelled far enough or flicked fast enough. */
const swipeDir = (info: PanInfo) =>
  info.offset.x < -60 || info.velocity.x < -400 ? 1 : info.offset.x > 60 || info.velocity.x > 400 ? -1 : 0;

const slide = {
  enter: (dir: number) => ({ x: dir >= 0 ? "18%" : "-18%", opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-18%" : "18%", opacity: 0, scale: 0.96 }),
};

/** One photo that can be swiped sideways; a tap (not a drag) calls `onTap`. */
function Slide({
  item,
  dir,
  alt,
  fit,
  sizes,
  priority,
  onSwipe,
  onTap,
}: {
  item: Item;
  dir: number;
  alt: string;
  /** "cover-in-box": a real photo shown whole on a dark backdrop (lightbox) */
  fit: "cover" | "contain" | "cover-in-box";
  sizes: string;
  priority?: boolean;
  onSwipe: (dir: number) => void;
  onTap?: () => void;
}) {
  const dragged = useRef(false);
  return (
    <AnimatePresence initial={false} custom={dir} mode="popLayout">
      <motion.div
        key={item.src}
        custom={dir}
        variants={slide}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.55, ease }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.35}
        onDragStart={() => (dragged.current = true)}
        onDragEnd={(_, info) => {
          const d = swipeDir(info);
          if (d) onSwipe(d);
          // Let the click that ends the drag pass before taps count again
          setTimeout(() => (dragged.current = false), 0);
        }}
        onClick={() => !dragged.current && onTap?.()}
        className={`absolute inset-0 touch-pan-y select-none ${onTap ? "cursor-zoom-in" : "cursor-grab active:cursor-grabbing"}`}
      >
        <Image
          src={item.src}
          alt={item.label ? `${alt} — ${item.label}` : alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className={`pointer-events-none ${
            fit === "contain" ? "object-contain p-[5%] mix-blend-multiply" : fit === "cover-in-box" ? "object-contain p-2 md:p-6" : "object-cover"
          }`}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function Arrow({ side, onClick, className = "" }: { side: "prev" | "next"; onClick: () => void; className?: string }) {
  const Icon = side === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={side === "prev" ? "Poprzednie zdjęcie" : "Następne zdjęcie"}
      className={`grid size-11 place-items-center rounded-full border backdrop-blur-md transition hover:border-brand hover:bg-brand hover:text-white md:size-12 ${className}`}
    >
      <Icon className="size-5" />
    </button>
  );
}

/** Row of thumbnails that keeps the active one in view without moving the page. */
function Thumbs({
  items,
  index,
  onPick,
  dark,
}: {
  items: Item[];
  index: number;
  onPick: (i: number) => void;
  dark?: boolean;
}) {
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = row.current;
    const t = el?.children[index] as HTMLElement | undefined;
    if (!el || !t) return;
    el.scrollTo({ left: t.offsetLeft - el.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" });
  }, [index]);
  return (
    <div
      ref={row}
      data-lenis-prevent
      className="flex gap-2.5 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] md:gap-3 [&::-webkit-scrollbar]:hidden"
    >
      {items.map((it, i) => (
        <button
          key={it.src}
          onClick={() => onPick(i)}
          aria-label={`Zdjęcie ${i + 1}${it.label ? `: ${it.label}` : ""}`}
          aria-current={i === index}
          className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border-2 transition md:w-28 ${
            dark ? "bg-white/5" : "bg-white"
          } ${i === index ? "border-brand opacity-100" : `border-transparent opacity-55 hover:opacity-100`}`}
        >
          <Image src={it.src} alt="" fill sizes="112px" className={`p-1 ${dark ? "object-cover p-0" : "object-contain mix-blend-multiply"}`} draggable={false} />
        </button>
      ))}
    </div>
  );
}

/** Fullscreen view: swipe, arrows, keyboard and thumbnails. Rendered into <body> so no parent can clip it. */
function Lightbox({
  items,
  index,
  dir,
  alt,
  fit,
  go,
  pick,
  onClose,
}: {
  items: Item[];
  index: number;
  dir: number;
  alt: string;
  fit: "cover" | "contain";
  go: (d: number) => void;
  pick: (i: number) => void;
  onClose: () => void;
}) {
  const lenis = useLenis();
  // Renders on photos with a transparent or white background sit on a light backdrop, real photos on a dark one
  const dark = fit === "cover";
  useEffect(() => {
    lenis?.stop();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
      lenis?.start();
    };
  }, [lenis, go, onClose]);
  const item = items[index];

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — galeria`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-[100] flex flex-col ${dark ? "bg-ink/97 text-white" : "bg-[#f3f4f6]/98 text-ink"} backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between gap-4 px-5 pt-5 md:px-8 md:pt-6">
        <div className="min-w-0">
          <span className="font-display text-sm font-bold tabular-nums">
            {pad(index + 1)} <span className="opacity-40">/ {pad(items.length)}</span>
          </span>
          {item.label && <span className="ml-3 truncate text-sm opacity-60">{item.label}</span>}
        </div>
        <button
          onClick={onClose}
          aria-label="Zamknij galerię"
          className={`grid size-11 place-items-center rounded-full border transition hover:border-brand hover:bg-brand hover:text-white ${
            dark ? "border-white/15" : "border-ink/15"
          }`}
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Slide item={item} dir={dir} alt={alt} fit={dark ? "cover-in-box" : "contain"} sizes="100vw" onSwipe={go} />
        <Arrow
          side="prev"
          onClick={() => go(-1)}
          className={`absolute top-1/2 left-4 hidden -translate-y-1/2 md:left-8 md:grid ${dark ? "border-white/15 bg-white/5" : "border-ink/10 bg-white/70"}`}
        />
        <Arrow
          side="next"
          onClick={() => go(1)}
          className={`absolute top-1/2 right-4 hidden -translate-y-1/2 md:right-8 md:grid ${dark ? "border-white/15 bg-white/5" : "border-ink/10 bg-white/70"}`}
        />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 pt-3 pb-5 md:px-8 md:pb-7">
        <p className="mb-3 text-center text-xs opacity-50 md:hidden">Przesuń palcem, aby zobaczyć kolejne</p>
        <Thumbs items={items} index={index} onPick={pick} dark={dark} />
      </div>
    </motion.div>,
    document.body,
  );
}

/**
 * Model gallery: a large photo you can swipe or click through, a row of thumbnails, optional filters (one per
 * version, from each image's `tag`) and a fullscreen view with swipe, arrows and keyboard. Same on every model page.
 */
export default function ModelGallery({ title, alt, images, fit = "cover" }: Props) {
  const all = useMemo(() => images.map(toItem), [images]);
  const tags = useMemo(() => [...new Set(all.map((i) => i.tag).filter(Boolean))] as string[], [all]);
  const [tag, setTag] = useState<string | null>(null);
  const items = useMemo(() => (tag ? all.filter((i) => i.tag === tag) : all), [all, tag]);
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
  const [open, setOpen] = useState(false);

  const go = useCallback(
    (d: number) => setPage(([i]) => [(i + d + items.length) % items.length, d]),
    [items.length],
  );
  const pick = useCallback((i: number) => setPage(([cur]) => [i, i >= cur ? 1 : -1]), []);
  const close = useCallback(() => setOpen(false), []);
  const item = items[Math.min(index, items.length - 1)];

  useEffect(() => {
    const onFilter = (e: Event) => {
      const t = (e as CustomEvent<string>).detail;
      if (tags.includes(t)) {
        setTag(t);
        setPage([0, 0]);
      }
    };
    window.addEventListener(GALLERY_EVENT, onFilter);
    return () => window.removeEventListener(GALLERY_EVENT, onFilter);
  }, [tags]);

  return (
    <section id="galeria" className="relative scroll-mt-10 overflow-hidden bg-[#eef0f3] py-20 text-ink md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block text-xs font-semibold tracking-[0.22em] text-brand uppercase">Galeria</span>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-bold">{title}</h2>
          </div>
          {tags.length > 1 && (
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pokaż zdjęcia wersji">
              {[null, ...tags].map((t) => {
                const n = t ? all.filter((i) => i.tag === t).length : all.length;
                const on = tag === t;
                return (
                  <button
                    key={t ?? "all"}
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setTag(t);
                      setPage([0, 0]);
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      on ? "border-ink bg-ink text-white" : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {t ?? "Wszystkie"} <span className="ml-1 opacity-50">{n}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main photo */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-40px_rgba(10,11,14,.35)] md:aspect-auto md:h-[min(62vh,640px)]">
          <Slide
            item={item}
            dir={dir}
            alt={alt}
            fit={fit}
            sizes="(max-width:1280px) 100vw, 1216px"
            onSwipe={go}
            onTap={() => setOpen(true)}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="rounded-full bg-white/85 px-4 py-2 text-sm backdrop-blur-md"
              >
                <b className="font-display tabular-nums">{pad(Math.min(index, items.length - 1) + 1)}</b>
                <span className="text-ink/45"> / {pad(items.length)}</span>
                {item.label && <span className="ml-2 text-ink/70">{item.label}</span>}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={() => setOpen(true)}
            aria-label="Otwórz na pełnym ekranie"
            className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-ink/10 bg-white/85 px-4 py-2 text-sm font-semibold backdrop-blur-md transition hover:border-brand hover:bg-brand hover:text-white md:top-6 md:right-6"
          >
            <Expand className="size-4" /> <span className="hidden sm:inline">Pełny ekran</span>
          </button>
          <Arrow
            side="prev"
            onClick={() => go(-1)}
            className="absolute top-1/2 left-3 -translate-y-1/2 border-ink/10 bg-white/80 md:left-6"
          />
          <Arrow
            side="next"
            onClick={() => go(1)}
            className="absolute top-1/2 right-3 -translate-y-1/2 border-ink/10 bg-white/80 md:right-6"
          />
        </div>

        <div className="mt-5 md:mt-6">
          <Thumbs items={items} index={Math.min(index, items.length - 1)} onPick={pick} />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Lightbox
            items={items}
            index={Math.min(index, items.length - 1)}
            dir={dir}
            alt={alt}
            fit={fit}
            go={go}
            pick={pick}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
