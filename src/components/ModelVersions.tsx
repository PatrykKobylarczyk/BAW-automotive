"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Images, Info } from "lucide-react";
import { useLenis } from "lenis/react";
import { useState } from "react";
import Link from "next/link";
import { grossOf, modelVersions, netOf, priceList, versionHref, zl, type ModelVersion } from "@/lib/content";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";
import { GALLERY_EVENT } from "./ModelGallery";

function Price({ v }: { v: ModelVersion }) {
  const row = priceList.find((p) => p.model === v.price.model && p.version === v.price.version);
  if (!row) return null;
  return (
    <div>
      <small className="block text-[13px] text-muted">Cena od</small>
      <strong className="font-display text-3xl font-bold md:text-4xl">{zl(grossOf(row))} zł</strong>
      <span className="ml-2 text-sm text-muted">brutto</span>
      <span className="block text-[13px] text-muted">{zl(netOf(row))} zł netto</span>
    </div>
  );
}

function Photo({ v }: { v: ModelVersion }) {
  if (!v.img)
    return (
      <div className="absolute inset-[6%] grid place-items-center rounded-3xl border border-dashed border-white/15">
        <div className="text-center">
          <span className="text-outline-faint block font-display text-[clamp(56px,9vw,120px)] leading-none font-extrabold">
            {v.name.split(" ").pop()}
          </span>
          <span className="mt-3 inline-block rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/60">
            Zdjęcia wkrótce
          </span>
        </div>
      </div>
    );
  return (
    <Image
      src={v.img}
      alt={`BAW ${v.name}`}
      fill
      sizes="(max-width:1024px) 100vw, 640px"
      className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,.55)]"
    />
  );
}

/** Tabs with every version of a model: photo, what sets it apart and its price from the importer's list. */
export default function ModelVersions({
  model,
  title,
  lead,
}: {
  model: keyof typeof modelVersions;
  title: string;
  lead?: string;
}) {
  const versions = modelVersions[model];
  const [i, setI] = useState(0);
  const v = versions[i];
  const lenis = useLenis();

  const showPhotos = (tag: string) => {
    window.dispatchEvent(new CustomEvent(GALLERY_EVENT, { detail: tag }));
    if (lenis) lenis.scrollTo("#galeria", { offset: -40 });
    else document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="wersje" className="relative overflow-hidden border-t border-white/10 bg-ink-2 py-24 md:py-32">
      <div className="pointer-events-none absolute -top-40 -left-40 size-[520px] rounded-full bg-[radial-gradient(var(--color-brand),transparent_70%)] opacity-10" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <Eyebrow>Wersje i ceny</Eyebrow>
        </Reveal>
        <SplitText text={title} className="mt-4 font-display text-[clamp(32px,4.2vw,56px)] leading-[1.05] font-extrabold" />
        {lead && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[60ch] text-lg text-white/70">{lead}</p>
          </Reveal>
        )}

        <div
          role="tablist"
          aria-label="Wersje"
          data-lenis-prevent
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {versions.map((x, n) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                n === i ? "border-brand text-white" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {n === i && (
                <motion.span layoutId={`ver-pill-${model}`} className="absolute inset-0 -z-0 rounded-full bg-brand" />
              )}
              <span className="relative">{x.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={v.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
          >
            <div className="relative aspect-[16/10]">
              <div className="absolute top-[62%] left-1/2 h-1/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[70px]" />
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="absolute inset-0"
              >
                <Photo v={v} />
              </motion.div>
            </div>

            <div>
              <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-semibold tracking-wider text-white/70 uppercase">
                {v.badge}
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">BAW {v.name}</h3>
              <p className="mt-4 text-white/75">{v.lead}</p>
              <ul className="mt-6 space-y-3">
                {v.points.map((p) => (
                  <li key={p} className="flex gap-3 text-white/85">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand" /> {p}
                  </li>
                ))}
              </ul>
              {v.note && (
                <p className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
                  <Info className="mt-0.5 size-4 shrink-0 text-brand" /> {v.note}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
                <Price v={v} />
                <MagneticButton href="#kontakt">Zapytaj o tę wersję</MagneticButton>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              {v.slug && (
                <Link
                  href={versionHref(model, v)}
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white transition hover:text-brand"
                >
                  Strona wersji {v.name.replace(/^(212 T01|Light Truck|Mini Truck) /, "")}
                  <ArrowRight className="size-4 text-brand transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
              {v.galleryTag && (
                <button
                  onClick={() => showPhotos(v.galleryTag!)}
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white/80 transition hover:text-white"
                >
                  <Images className="size-4 text-brand" /> Zobacz zdjęcia tej wersji
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
