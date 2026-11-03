import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Closing";
import { PageHeader, Section } from "@/components/PageParts";
import { company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("service");

const services = [
  { title: "Przeglądy okresowe", text: "Obsługa zgodna z zaleceniami producenta, z zachowaniem warunków gwarancji." },
  { title: "Naprawy i diagnostyka", text: "Diagnostyka komputerowa i naprawy mechaniczne pojazdów BAW." },
  { title: "Części oryginalne", text: "Zamówienia części i akcesoriów BAW przez oficjalnego importera." },
  { title: "Pojazdy elektryczne", text: "Obsługa elektrycznego Mini Trucka, w tym układu napędowego i baterii." },
];

export default function Page() {
  return (
    <main>
      <PageHeader
        page="service"
        eyebrow="Dealer / Serwis"
        title="Salony i serwis BAW w Polsce"
        lead={`Sprzedaż, jazdy próbne, przeglądy i oryginalne części BAW. Sieć salonów w Polsce właśnie powstaje, a do tego czasu wszystko załatwisz u oficjalnego importera w Ksawerowie koło Łodzi (${company.note}).`}
      />
      <Section eyebrow="Zakres" title="W czym pomożemy">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="bg-ink p-8 md:p-10">
              <h3 className="mb-3 text-xl font-semibold">{s.title}</h3>
              <p className="text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Punkty sprzedaży" title="Gdzie kupić i serwisować BAW" className="bg-ink-2">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-brand/50 bg-ink p-8 md:p-10">
            <span className="text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">Importer · salon · serwis</span>
            <h3 className="mt-2 mb-4 font-display text-2xl font-bold">BAW Automotive Polska, Ksawerów</h3>
            <address className="space-y-1 text-white/80 not-italic">
              <div>{company.name}</div>
              <div>
                {company.street}, {company.city}
              </div>
              <div className="text-sm text-muted">{company.note}</div>
              <a href={`mailto:${company.email}`} className="mt-3 inline-block text-brand">
                {company.email}
              </a>
            </address>
          </article>
          <article className="rounded-3xl border border-white/10 p-8 md:p-10">
            <span className="text-[11px] font-semibold tracking-[0.15em] text-muted uppercase">Wkrótce</span>
            <h3 className="mt-2 mb-4 font-display text-2xl font-bold">Kolejne salony w Polsce</h3>
            <p className="text-white/75">
              Adresy kolejnych dealerów opublikujemy wkrótce. Prowadzisz salon lub serwis?{" "}
              <Link href="/zostan-dealerem" className="text-brand underline-offset-4 hover:underline">
                Zostań dealerem BAW
              </Link>
              .
            </p>
          </article>
        </div>
      </Section>
      <Contact title="Umów wizytę lub jazdę próbną." defaultModel="Serwis i części" />
    </main>
  );
}
