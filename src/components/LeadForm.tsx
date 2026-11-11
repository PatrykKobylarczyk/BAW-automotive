"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useActionState, useEffect, useState, type ReactNode } from "react";
import { sendLead, type LeadState } from "@/app/actions";
import { prices } from "@/lib/content";

export const field =
  "w-full rounded-xl border border-white/10 bg-ink-3/60 px-4 py-3.5 text-[15px] outline-none transition placeholder:text-muted/70 focus:border-brand focus:bg-ink-3";

const KEY = "baw-attribution";
const TRACKED = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

/**
 * Remembers where the visitor came from (UTM tags, Google Ads click id, external referrer) on the first page
 * of the visit, so the lead e-mail says which campaign or search brought it — even if the form is sent later
 * from another page.
 */
export function rememberAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(location.search);
    const data: Record<string, string> = {};
    for (const k of TRACKED) if (q.get(k)) data[k] = q.get(k)!;
    if (document.referrer && !document.referrer.startsWith(location.origin)) data.referrer = document.referrer;
    data.landing = location.pathname + location.search;
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage blocked: attribution is optional
  }
}

function readAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function LeadForm({
  kind = "kontakt",
  defaultModel = "",
  submitLabel = "Wyślij zapytanie",
  successText = "Otrzymaliśmy Twoją wiadomość. Odezwiemy się najszybciej, jak to możliwe.",
  className = "",
  children,
}: {
  successText?: string;
  /** Extra classes for the form box, e.g. a lighter padding in compact places */
  className?: string;
  kind?: "kontakt" | "dealer";
  defaultModel?: string;
  submitLabel?: string;
  /** Custom fields; when omitted the standard enquiry fields are shown */
  children?: ReactNode;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(sendLead, { status: "idle" });
  const [hidden, setHidden] = useState<Record<string, string>>({});

  useEffect(() => {
    rememberAttribution();
    const a = readAttribution();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only values, read once after mount
    setHidden({ ...a, page: location.pathname, started: String(Date.now()) });
  }, []);

  if (state.status === "ok") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-3xl border border-brand/50 bg-brand-dark/20 p-8 md:p-10">
        <CheckCircle2 className="size-9 text-brand" />
        <p className="font-display text-2xl font-bold">Dziękujemy!</p>
        <p className="text-white/80">{successText}</p>
      </div>
    );
  }

  return (
    <form action={action} className={`relative rounded-3xl border border-white/10 bg-ink-2 p-6 md:p-10 ${className}`}>
      <input type="hidden" name="kind" value={kind} />
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      {/* Honeypot for bots: hidden from people and screen readers */}
      <input type="text" name="fax" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {children ?? (
        <div className="grid gap-4 sm:grid-cols-2">
          <input className={field} name="name" autoComplete="name" aria-label="Imię i nazwisko" placeholder="Imię i nazwisko *" required />
          <input className={field} name="company" autoComplete="organization" aria-label="Firma" placeholder="Firma" />
          <input className={field} name="email" type="email" autoComplete="email" aria-label="E-mail" placeholder="E-mail *" required />
          <input className={field} name="phone" type="tel" autoComplete="tel" aria-label="Telefon" placeholder="Telefon" />
          <select className={`${field} sm:col-span-2`} name="model" aria-label="Temat zapytania" defaultValue={defaultModel}>
            <option value="" disabled>
              Czego dotyczy zapytanie?
            </option>
            {prices.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
            <option>Jazda próbna</option>
            <option>Serwis i części</option>
            <option>Współpraca dealerska</option>
          </select>
          <textarea className={`${field} min-h-32 sm:col-span-2`} name="message" aria-label="Wiadomość" placeholder="Wiadomość" />
        </div>
      )}

      <label className="mt-5 flex gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 accent-brand" />
        <span>
          Wyrażam zgodę na przetwarzanie danych w celu odpowiedzi na zapytanie, zgodnie z{" "}
          <Link href="/polityka-prywatnosci" className="text-white/85 underline underline-offset-4 hover:text-brand">
            polityką prywatności
          </Link>
          . *
        </span>
      </label>
      {state.status === "error" && (
        <p role="alert" className="mt-5 rounded-xl border border-brand/50 bg-brand/10 px-4 py-3 text-sm">
          {state.message}
        </p>
      )}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={pending}
        className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand py-4 font-semibold disabled:opacity-70"
      >
        {pending ? "Wysyłanie…" : submitLabel}
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
      </motion.button>
    </form>
  );
}
