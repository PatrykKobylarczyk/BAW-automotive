import type { Metadata } from "next";
import Link from "next/link";
import { Contact, Pricing } from "@/components/Closing";
import { Breadcrumbs, Faq, Section } from "@/components/PageParts";
import { grossOf, netOf, priceList } from "@/lib/content";
import { crumbsOverlay } from "@/lib/styles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("pricing");

const faq = [
  {
    q: "Czy ceny samochodów BAW zawierają VAT?",
    a: "Tak. Ceny podane w cenniku to ceny brutto z 23% VAT. Obok każdej ceny podajemy też kwotę netto dla firm.",
  },
  {
    q: "Czy samochody BAW można kupić w leasingu?",
    a: "Tak. Zapytaj dealera o finansowanie i leasing dla firm. Przygotujemy ofertę dla wybranego modelu.",
  },
  {
    q: "Który samochód BAW jest najtańszy?",
    a: "Najtańszy jest elektryczny BAW Mini Truck, od 64 900 zł brutto (52 764,23 zł netto).",
  },
];

const zl = (n: number) =>
  n.toLocaleString("pl-PL", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/\u00a0| /g, "\u00a0");

export default function Page() {
  return (
    <main className="relative">
      <Breadcrumbs page="pricing" className={crumbsOverlay} />
      <Pricing headingAs="h1" title="Cennik samochodów BAW 2026" />
      <Section eyebrow="Tabela cen" title="Ceny wszystkich wersji">
        <div className="overflow-x-auto rounded-3xl border border-white/10">
          <table className="w-full min-w-[720px] text-left text-[15px]">
            <caption className="sr-only">Cennik samochodów BAW w Polsce, ceny brutto i netto w złotych</caption>
            <thead className="bg-ink-2 text-xs tracking-[0.15em] text-muted uppercase">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Model</th>
                <th scope="col" className="px-6 py-4 font-semibold">Wersja</th>
                <th scope="col" className="px-6 py-4 font-semibold">Paliwo</th>
                <th scope="col" className="px-6 py-4 text-right font-semibold">Cena brutto</th>
                <th scope="col" className="px-6 py-4 text-right font-semibold">Cena netto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {priceList.map((p) => (
                <tr key={p.model + p.version}>
                  <th scope="row" className="px-6 py-5 font-semibold">
                    {p.href ? (
                      <Link href={p.href} className="transition hover:text-brand">
                        BAW {p.model}
                      </Link>
                    ) : (
                      <>BAW {p.model}</>
                    )}
                  </th>
                  <td className="px-6 py-5 text-white/85">{p.version}</td>
                  <td className="px-6 py-5 text-white/75">{p.fuel}</td>
                  <td className="px-6 py-5 text-right font-display font-bold whitespace-nowrap">{zl(grossOf(p))} zł</td>
                  <td className="px-6 py-5 text-right whitespace-nowrap text-muted">{zl(netOf(p))} zł</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-muted">
          Ceny brutto zawierają 23% VAT. Cennik ma charakter informacyjny i nie stanowi oferty handlowej w rozumieniu
          Kodeksu cywilnego.
        </p>
      </Section>
      <Faq items={faq} title="Ceny i finansowanie — pytania" />
      <Contact title="Poproś o ofertę lub leasing." />
    </main>
  );
}
