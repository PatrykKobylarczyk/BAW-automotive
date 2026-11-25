"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { sendLead, type LeadState } from "@/app/actions";
import { readAttribution, rememberAttribution } from "@/components/LeadForm";
import { company, ownership } from "@/lib/content212";
import { Eyebrow, Reveal, SplitText, Trail, ease } from "./ui";

const steps = ["Cel", "Termin", "Kontakt"] as const;
const purposes = ["Jazda próbna", "Oferta i finansowanie", "Flota firmowa", "Akcesoria terenowe"];
const slots = ["Ten tydzień", "Przyszły tydzień", "Weekend", "Zadzwońcie do mnie"];

export function Ownership() {
  return (
    <section className="bg-deep px-5 pb-8 md:px-8">
      <div className="mx-auto grid max-w-[1320px] gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
        {ownership.map((o, i) => (
          <Reveal key={o.title} delay={i * 0.06} className="bg-deep p-7 md:p-8">
            <Check className="size-5 text-lime" />
            <h3 className="mt-6 font-display text-lg font-extrabold">{o.title}</h3>
            <p className="mt-2 text-[15px] text-bone/70">{o.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Choice({ items, value, onPick }: { items: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <button
          type="button"
          key={it}
          onClick={() => onPick(it)}
          className={`rounded-2xl border px-5 py-4 text-left font-semibold transition ${
            value === it ? "border-forest bg-forest text-bone" : "border-deep/15 bg-white/60 text-deep hover:border-forest"
          }`}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

export function TestDrive() {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState(purposes[0]);
  const [slot, setSlot] = useState(slots[0]);
  const [state, action, pending] = useActionState<LeadState, FormData>(sendLead, { status: "idle" });
  const sent = state.status === "ok";
  // Where the visitor came from (UTM, referrer), the page and the start time for the anti-spam check
  const [hidden, setHidden] = useState<Record<string, string>>({});
  useEffect(() => {
    rememberAttribution();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only values, read once after mount
    setHidden({ ...readAttribution(), page: location.pathname, started: String(Date.now()) });
  }, []);
  const field =
    "w-full rounded-xl border border-deep/15 bg-white/70 px-4 py-3.5 text-[15px] text-deep outline-none transition placeholder:text-deep/45 focus:border-forest focus:bg-white";

  return (
    <section id="jazda-probna" className="relative overflow-hidden bg-lime py-28 text-deep md:py-36">
      <Trail
        d="M1020,80 C820,60 700,220 760,380 C810,510 960,480 930,370 C890,230 600,300 480,520 C380,700 200,820 -20,900"
        className="absolute inset-0 size-full opacity-50 mix-blend-multiply"
        width={22}
      />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Reveal>
            <Eyebrow dark>Jazda próbna</Eyebrow>
          </Reveal>
          <SplitText
            text="Sprawdź go w terenie, nie w katalogu."
            className="mt-5 max-w-[13ch] font-display text-[clamp(32px,4.4vw,64px)] leading-[1.0] font-extrabold tracking-tight"
          />
          <Reveal delay={0.1} className="mt-10 space-y-5 text-[15px]">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0" />
              <div>
                <div className="font-semibold">
                  {company.brand} · {company.name}
                </div>
                <div>
                  {company.street}, {company.city}
                </div>
                <div className="text-deep/65">{company.note}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-0.5 size-5 shrink-0" />
              <span className="select-all">{company.email}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            action={action}
            className="relative rounded-[28px] bg-bone p-6 shadow-[0_40px_80px_-40px_rgba(11,29,21,.55)] md:p-9"
          >
            <input type="hidden" name="kind" value="kontakt" />
            <input type="hidden" name="model" value={`212 T01: ${purpose}`} />
            <input type="hidden" name="message" value={`Preferowany termin: ${slot}`} />
            {Object.entries(hidden).map(([k, v]) => (
              <input key={k} type="hidden" name={k} value={v} />
            ))}
            {/* Honeypot: hidden from people, bots fill it in */}
            <input type="text" name="fax" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <ol className="mb-8 flex gap-2">
              {steps.map((s, i) => (
                <li key={s} className="flex-1">
                  <button
                    type="button"
                    disabled={i > step || sent}
                    onClick={() => setStep(i)}
                    className="w-full text-left disabled:cursor-default"
                  >
                    <div className="h-1 overflow-hidden rounded-full bg-deep/10">
                      <motion.div
                        className="h-full bg-forest"
                        animate={{ width: i <= step ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease }}
                      />
                    </div>
                    <span className={`mt-2 block font-mono text-[11px] tracking-wider uppercase ${i <= step ? "text-deep" : "text-deep/40"}`}>
                      {String(i + 1).padStart(2, "0")} {s}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <AnimatePresence mode="wait">
              <motion.div
                key={sent ? "sent" : step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease }}
                className="min-h-[300px]"
              >
                {sent ? (
                  <div className="flex min-h-[300px] flex-col items-start justify-center">
                    <span className="grid size-14 place-items-center rounded-full bg-forest text-lime">
                      <Check />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-extrabold">Zgłoszenie przyjęte.</h3>
                    <p className="mt-2 max-w-[38ch] text-deep/70">
                      {purpose}, termin: {slot.toLowerCase()}. Doradca oddzwoni, żeby potwierdzić szczegóły.
                    </p>
                  </div>
                ) : step === 0 ? (
                  <>
                    <h3 className="mb-5 font-display text-xl font-extrabold">W czym możemy pomóc?</h3>
                    <Choice items={purposes} value={purpose} onPick={(v) => {
                      setPurpose(v);
                      setStep(1);
                    }} />
                  </>
                ) : step === 1 ? (
                  <>
                    <h3 className="mb-5 font-display text-xl font-extrabold">Kiedy Ci pasuje?</h3>
                    <Choice items={slots} value={slot} onPick={(v) => {
                      setSlot(v);
                      setStep(2);
                    }} />
                  </>
                ) : (
                  <>
                    <h3 className="mb-5 font-display text-xl font-extrabold">Jak się z Tobą skontaktować?</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input name="name" aria-label="Imię i nazwisko" className={field} placeholder="Imię i nazwisko" required autoComplete="name" />
                      <input name="phone" aria-label="Telefon" className={field} type="tel" placeholder="Telefon" required autoComplete="tel" />
                      <input name="email" aria-label="E-mail" className={`${field} sm:col-span-2`} type="email" placeholder="E-mail (opcjonalnie)" autoComplete="email" />
                    </div>
                    <label className="mt-4 flex gap-3 text-sm text-deep/70">
                      <input name="consent" type="checkbox" required className="mt-1 accent-[#22543f]" />
                      <span>
                        Wyrażam zgodę na kontakt w sprawie jazdy próbnej i przetwarzanie danych zgodnie z{" "}
                        <Link href="/polityka-prywatnosci" className="underline underline-offset-4 hover:text-forest">
                          polityką prywatności
                        </Link>
                        .
                      </span>
                    </label>
                    {state.status === "error" && (
                      <p role="alert" className="mt-4 text-sm font-semibold text-[#9b1c1c]">
                        {state.message}
                      </p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={pending}
                      className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-deep py-4 font-semibold text-lime disabled:opacity-70"
                    >
                      {pending ? (
                        <>
                          Wysyłanie <Loader2 className="size-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Wyślij zgłoszenie <Send className="size-4" />
                        </>
                      )}
                    </motion.button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
