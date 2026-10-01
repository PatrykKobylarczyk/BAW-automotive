"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { Mail, MapPin, Send } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { company, media, prices } from "@/lib/content";
import { Logo } from "./Navbar";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";

function PriceCard({ p, i }: { p: (typeof prices)[number]; i: number }) {
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
        <h3 className="mt-1.5 mb-6 text-lg leading-tight font-semibold">{p.name}</h3>
        <div className="mt-auto">
          <div className="font-display text-2xl font-bold">{p.gross} zł</div>
          <div className="text-[13px] text-muted">{p.net} zł netto</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section id="cennik" className="bg-ink-2 py-28 md:py-40">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Cennik</Eyebrow>
            </Reveal>
            <SplitText
              text="Wybierz pojazd dla swojej firmy."
              className="mt-5 max-w-[16ch] font-display text-[clamp(34px,4.6vw,64px)] leading-[1.02] font-bold tracking-tight"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-[36ch] text-muted">Ceny brutto z VAT. Zapytaj dealera o finansowanie i leasing dla firm.</p>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {prices.map((p, i) => (
            <PriceCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Dealer() {
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
              <MagneticButton href="#kontakt" variant="light">
                Zostań dealerem
              </MagneticButton>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const field =
    "w-full rounded-xl border border-white/10 bg-ink-3/60 px-4 py-3.5 text-[15px] outline-none transition placeholder:text-muted/70 focus:border-brand focus:bg-ink-3";

  return (
    <footer id="kontakt" className="relative overflow-hidden border-t border-white/10 pt-28 md:pt-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>Kontakt</Eyebrow>
          </Reveal>
          <SplitText
            text="Porozmawiajmy o Twojej flocie."
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="relative rounded-3xl border border-white/10 bg-ink-2 p-6 md:p-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} placeholder="Imię i nazwisko" required />
              <input className={field} placeholder="Firma" />
              <input className={field} type="email" placeholder="E-mail" required />
              <input className={field} type="tel" placeholder="Telefon" />
              <select className={`${field} sm:col-span-2`} defaultValue="">
                <option value="" disabled>
                  Interesujący model
                </option>
                {prices.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
                <option>Współpraca dealerska</option>
              </select>
              <textarea className={`${field} min-h-32 sm:col-span-2`} placeholder="Wiadomość" />
            </div>
            <label className="mt-5 flex gap-3 text-sm text-muted">
              <input type="checkbox" required className="mt-1 accent-brand" />
              Wyrażam zgodę na przetwarzanie danych zgodnie z polityką prywatności.
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand py-4 font-semibold"
            >
              {sent ? "Dziękujemy! Odezwiemy się wkrótce." : "Wyślij zapytanie"}
              {!sent && <Send className="size-4" />}
            </motion.button>
          </form>
        </Reveal>
      </div>

      <div className="mx-auto mt-28 max-w-[1280px] px-5 md:px-8">
        <motion.div
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[26vw] leading-[0.8] font-extrabold tracking-tighter text-white/[0.04] select-none lg:text-[22vw] xl:text-[300px]"
        >
          BAW
        </motion.div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-muted">
          <Logo />
          <span>© 2026 BAW Automotive Polska · Polityka prywatności</span>
        </div>
      </div>
    </footer>
  );
}

