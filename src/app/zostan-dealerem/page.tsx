import type { Metadata } from "next";
import { Contact, Dealer } from "@/components/Closing";
import { Breadcrumbs, Faq, Section } from "@/components/PageParts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("dealer");

const benefits = [
  { title: "Gama od SUV-a po EV", text: "Terenowy 212 T01, lekki użytkowy Light Truck i elektryczny Mini Truck. Oferta dla klientów indywidualnych i flot." },
  { title: "Marka z historią", text: "Ponad 70 lat w motoryzacji i obecność na ponad 60 rynkach na świecie." },
  { title: "Zaplecze techniczne", text: "Wsparcie importera w szkoleniach, serwisie i dostępie do części." },
  { title: "Wsparcie marketingowe", text: "Materiały, kampanie i zapytania od klientów z Twojego regionu." },
];

const steps = [
  { title: "Zgłoszenie", text: "Wypełnij formularz poniżej i wybierz „Współpraca dealerska”." },
  { title: "Rozmowa", text: "Skontaktujemy się, aby poznać Twoją lokalizację, zaplecze i plany." },
  { title: "Umowa i start", text: "Ustalamy warunki, szkolimy zespół i dostarczamy pojazdy demonstracyjne." },
];

const faq = [
  {
    q: "Kto może zostać dealerem BAW?",
    a: "Firmy z doświadczeniem w sprzedaży lub serwisie samochodów, które chcą rozszerzyć ofertę o SUV-y terenowe, samochody użytkowe i elektryczne.",
  },
  {
    q: "Jak zgłosić chęć współpracy?",
    a: "Wypełnij formularz kontaktowy na tej stronie i wybierz temat „Współpraca dealerska”. Odezwiemy się z informacjami o warunkach.",
  },
];

export default function Page() {
  return (
    <main>
      <Breadcrumbs page="dealer" className="relative z-10 -mb-16 pt-28 md:-mb-20 md:pt-32" />
      <Dealer headingAs="h1" ctaHref="#kontakt" />
      <Section eyebrow="Dlaczego BAW" title="Co zyskujesz jako dealer BAW" className="bg-ink-2">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
          {benefits.map((b, i) => (
            <div key={b.title} className="bg-ink-2 p-8 md:p-10">
              <span className="font-display text-sm text-brand">0{i + 1}</span>
              <h3 className="mt-2 mb-3 text-xl font-semibold">{b.title}</h3>
              <p className="text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Jak zacząć" title="Trzy kroki do współpracy">
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl border border-white/10 p-8">
              <span className="font-display text-4xl font-extrabold text-brand">{i + 1}</span>
              <h3 className="mt-4 mb-2 text-xl font-semibold">{s.title}</h3>
              <p className="text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Faq items={faq} title="Współpraca dealerska — pytania" />
      <Contact title="Porozmawiajmy o współpracy." defaultModel="Współpraca dealerska" />
    </main>
  );
}
