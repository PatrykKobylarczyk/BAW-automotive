"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { company, media, models, nav, prices } from "@/lib/content";
import { LeadForm } from "./LeadForm";
import { Logo } from "./Navbar";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";

function PriceCard({ p, i, as: H = "h3" }: { p: (typeof prices)[number]; i: number; as?: "h2" | "h3" }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(200,16,63,.22), transparent 60%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 14);
    mx.set(px * 100);
    my.set(py * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry }}
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-colors ${
          p.featured ? "border-brand/60 bg-brand-dark/25" : "border-white/10 bg-ink hover:border-white/25"
        }`}
      >
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0" />
        {p.featured && (
          <span className="absolute top-4 right-4 rounded-full bg-brand px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            Flagowy
          </span>
        )}
        <div className="relative mb-5 aspect-[16/10]">
          <div className="absolute inset-x-4 bottom-0 h-1/3 rounded-full bg-white/10 blur-2xl" />
          <Image src={p.img} alt={p.name} fill sizes="300px" className="object-contain" />
        </div>
        <span className="text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">{p.fuel}</span>
        <H className="mt-1.5 mb-6 text-lg leading-tight font-semibold">
          <Link href={p.href} className="after:absolute after:inset-0">
            BAW {p.name}
          </Link>
        </H>
        <div className="mt-auto">
          <div className="font-display text-2xl font-bold">{p.gross} zł</div>
          <div className="text-[13px] text-muted">{p.net} zł netto</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Pricing({
  headingAs = "h2",
  title = "Wybierz pojazd dla swojej firmy.",
}: {
  headingAs?: "h1" | "h2";
  title?: string;
}) {
  return (
    <section id="cennik" className={`bg-ink-2 ${headingAs === "h1" ? "pt-40 pb-28 md:pt-48 md:pb-40" : "py-28 md:py-40"}`}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Cennik</Eyebrow>
            </Reveal>
            <SplitText
              as={headingAs}
              text={title}
              className="mt-5 max-w-[16ch] font-display text-[clamp(34px,4.6vw,64px)] leading-[1.02] font-bold tracking-tight"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-[36ch] text-muted">Ceny brutto z VAT. Zapytaj dealera o finansowanie i leasing dla firm.</p>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {prices.map((p, i) => (
            <PriceCard key={p.name} p={p} i={i} as={headingAs === "h1" ? "h2" : "h3"} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Dealer({ headingAs = "h2", ctaHref = "/zostan-dealerem" }: { headingAs?: "h1" | "h2"; ctaHref?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [64, 32]);

  return (
    <section ref={ref} id="dealer" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative flex min-h-[560px] items-center overflow-hidden p-8 md:p-20"
        >
          <motion.div style={{ y: bgY }} className="absolute -inset-y-[20%] inset-x-0">
            <Image src={media.dealerBg} alt="" fill sizes="100vw" className="object-cover grayscale" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-ink/70" />
          <div className="relative z-10 max-w-[620px]">
            <Reveal>
              <Eyebrow light>Współpraca</Eyebrow>
            </Reveal>
            <SplitText
              as={headingAs}
              text="Zostań dealerem marki BAW"
              className="mt-5 mb-6 font-display text-[clamp(34px,4.8vw,66px)] leading-[1.02] font-extrabold tracking-tight"
            />
            <Reveal delay={0.15}>
              <p className="mb-4 text-lg text-white/85">
                Dołącz do sieci dealerów BAW i zostań częścią marki z ponad 70-letnią historią w motoryzacji. Nowoczesna
                gama pojazdów — od terenowych SUV-ów po samochody użytkowe i elektryczne — wsparta solidnym zapleczem
                technicznym oraz marketingowym.
              </p>
              <p className="mb-9 text-white/85">
                Wspólnie budujemy przyszłość marki BAW w Polsce — zaufanie, jakość i zysk idą tu w parze.
              </p>
              <MagneticButton href={ctaHref} variant="light">
                Zostań dealerem
              </MagneticButton>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Contact({
  headingAs = "h2",
  title = "Porozmawiajmy o Twojej flocie.",
  defaultModel = "",
}: {
  headingAs?: "h1" | "h2";
  title?: string;
  /** Pre-selected option in the "model" select, e.g. on a model page */
  defaultModel?: string;
}) {
  return (
    <section id="kontakt" className={`relative overflow-hidden border-t border-white/10 ${headingAs === "h1" ? "pt-40 md:pt-48" : "pt-28 md:pt-36"} pb-28 md:pb-36`}>
      <div className="mx-auto grid max-w-[1280px] gap-16 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>Kontakt</Eyebrow>
          </Reveal>
          <SplitText
            as={headingAs}
            text={title}
            className="mt-5 mb-10 max-w-[14ch] font-display text-[clamp(34px,4vw,56px)] leading-[1.02] font-bold tracking-tight"
          />
          <Reveal delay={0.1} className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-brand" />
              <div>
                <div className="font-semibold">{company.name}</div>
                <div className="text-white/80">
                  {company.street}, {company.city}
                </div>
                <div className="text-sm text-muted">{company.note}</div>
              </div>
            </div>
            <a href={`mailto:${company.email}`} className="flex gap-4 transition hover:text-brand">
              <Mail className="mt-0.5 size-5 shrink-0 text-brand" />
              {company.email}
            </a>
            <div className="text-sm text-muted">
              NIP {company.nip} · REGON {company.regon}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <LeadForm defaultModel={defaultModel} />
        </Reveal>
      </div>

    </section>
  );
}

const footerColumns = [
  { title: "Pojazdy", links: models.map((m) => ({ label: m.name, href: `/modele/${m.slug}` })) },
  {
    title: "Oferta",
    links: [
      { label: "Wszystkie modele", href: "/modele" },
      { label: "Cennik", href: "/cennik" },
      { label: "Salony i serwis", href: "/serwis" },
      { label: "Zostań dealerem", href: "/zostan-dealerem" },
    ],
  },
  {
    title: "BAW Polska",
    links: [...nav.filter((n) => ["/o-marce", "/kontakt"].includes(n.href)), { label: "Polityka prywatności", href: "/polityka-prywatnosci" }],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-20">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[34ch] text-sm text-muted">
            Oficjalny importer samochodów BAW w Polsce. {company.name}, {company.street}, {company.city}.
          </p>
          <a href={`mailto:${company.email}`} className="mt-4 inline-block text-sm text-white/80 transition hover:text-brand">
            {company.email}
          </a>
        </div>
        {footerColumns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">{c.title}</h2>
            <ul className="space-y-2.5 text-[15px]">
              {c.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-white/80 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-[1280px] px-5 md:px-8">
        <motion.div
          aria-hidden
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[26vw] leading-[0.8] font-extrabold tracking-tighter text-white/[0.04] select-none lg:text-[22vw] xl:text-[300px]"
        >
          BAW
        </motion.div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-muted">
          <span>© 2026 BAW Automotive Polska</span>
          <span>
            NIP {company.nip} · REGON {company.regon}
          </span>
        </div>
      </div>
    </footer>
  );
}
