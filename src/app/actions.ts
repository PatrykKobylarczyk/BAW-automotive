"use server";

import nodemailer from "nodemailer";
import { company } from "@/lib/content";

export type LeadState = { status: "idle" | "ok" | "error"; message?: string };

/** Fields of both forms: the general enquiry and the dealer application. Anything else is ignored. */
const FIELDS = {
  name: "Imię i nazwisko",
  company: "Firma",
  position: "Stanowisko",
  nip: "NIP",
  address: "Adres siedziby",
  website: "Strona internetowa",
  email: "E-mail",
  phone: "Telefon",
  model: "Temat / model",
  experience: "Doświadczenie w branży",
  vehicles: "Interesujące kategorie",
  region: "Obszar działalności",
  message: "Wiadomość",
} as const;

/** Where the lead came from, filled in by the browser: page, referrer and UTM tags of the first visit. */
const TRACKING = ["page", "landing", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

const clean = (v: FormDataEntryValue | null, max = 2000) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  // Honeypot: real visitors never see or fill this field
  if (clean(form.get("fax"))) return { status: "ok" };
  // Bots submit instantly; people need at least a few seconds
  const started = Number(form.get("started"));
  if (Number.isFinite(started) && started > 0 && Date.now() - started < 3000) return { status: "ok" };

  const kind = clean(form.get("kind"), 40) === "dealer" ? "dealer" : "kontakt";
  const data: [string, string][] = [];
  for (const [key, label] of Object.entries(FIELDS)) {
    const values = form.getAll(key).map((v) => clean(v, key === "message" ? 5000 : 300)).filter(Boolean);
    if (values.length) data.push([label, values.join(", ")]);
  }
  const get = (label: string) => data.find(([l]) => l === label)?.[1] ?? "";

  const name = get(FIELDS.name);
  const email = get(FIELDS.email);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Podaj imię i nazwisko oraz poprawny adres e-mail." };
  }
  if (kind === "dealer" && (!get(FIELDS.company) || !get(FIELDS.phone))) {
    return { status: "error", message: "Podaj nazwę firmy i telefon kontaktowy." };
  }
  if (form.get("consent") !== "on") {
    return { status: "error", message: "Zaznacz zgodę na przetwarzanie danych." };
  }

  const tracking = TRACKING.map((k) => [k, clean(form.get(k), 500)] as [string, string]).filter(([, v]) => v);
  const subject =
    kind === "dealer"
      ? `Zgłoszenie dealerskie: ${get(FIELDS.company)} (${name})`
      : `Zapytanie ze strony: ${get(FIELDS.model) || "kontakt"} (${name})`;
  const rows = [...data, ...tracking.map(([k, v]) => [`[źródło] ${k}`, v] as [string, string])];
  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:14px sans-serif">${rows
    .map(([l, v]) => `<tr><td style="color:#666;vertical-align:top">${escapeHtml(l)}</td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[lead] SMTP is not configured; lead NOT delivered:\n" + subject + "\n" + text);
    return {
      status: "error",
      message: `Formularz chwilowo nie działa. Napisz do nas na ${company.email}.`,
    };
  }

  try {
    const port = Number(SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: { name: "Strona BAW Automotive", address: process.env.LEADS_FROM ?? SMTP_USER },
      to: process.env.LEADS_TO ?? company.email,
      replyTo: { name, address: email },
      subject,
      text,
      html,
    });
    return { status: "ok" };
  } catch (e) {
    console.error("[lead] sending failed", e, "\n" + subject + "\n" + text);
    return { status: "error", message: `Nie udało się wysłać. Spróbuj ponownie albo napisz na ${company.email}.` };
  }
}
