"use client";

import { LeadForm, field } from "./LeadForm";

const categories = ["SUV / terenowe", "Samochody użytkowe", "Elektryczne (EV)", "Wszystkie kategorie"];

/** Dealer application with the same fields as the form on the previous WordPress site. */
export default function DealerForm() {
  return (
    <LeadForm kind="dealer" submitLabel="Wyślij zgłoszenie">
      <input type="hidden" name="model" value="Współpraca dealerska" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={field} name="name" autoComplete="name" aria-label="Imię i nazwisko" placeholder="Imię i nazwisko *" required />
        <input className={field} name="position" autoComplete="organization-title" aria-label="Stanowisko w firmie" placeholder="Stanowisko w firmie" />
        <input className={field} name="company" autoComplete="organization" aria-label="Nazwa firmy" placeholder="Nazwa firmy *" required />
        <input className={field} name="nip" inputMode="numeric" aria-label="NIP" placeholder="NIP" />
        <input className={`${field} sm:col-span-2`} name="address" autoComplete="street-address" aria-label="Adres siedziby" placeholder="Adres siedziby" />
        <input className={field} name="website" type="url" autoComplete="url" aria-label="Strona internetowa" placeholder="Strona internetowa" />
        <input className={field} name="region" aria-label="Obszar działalności" placeholder="Obszar działalności (województwo, region)" />
        <input className={field} name="phone" type="tel" autoComplete="tel" aria-label="Telefon kontaktowy" placeholder="Telefon kontaktowy *" required />
        <input className={field} name="email" type="email" autoComplete="email" aria-label="Adres e-mail" placeholder="Adres e-mail *" required />
        <textarea className={`${field} min-h-24 sm:col-span-2`} name="experience" aria-label="Doświadczenie w branży" placeholder="Doświadczenie w branży (marki, lata, salon, serwis)" />
        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-sm text-muted">Jakie pojazdy chcesz sprzedawać?</legend>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c} className="cursor-pointer">
                <input type="checkbox" name="vehicles" value={c} className="peer sr-only" />
                <span className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm transition peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-white">
                  {c}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <textarea className={`${field} min-h-28 sm:col-span-2`} name="message" aria-label="Wiadomość" placeholder="Wiadomość / dodatkowe informacje" />
      </div>
    </LeadForm>
  );
}
