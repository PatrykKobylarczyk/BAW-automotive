import type { Metadata } from "next";
import { Contact } from "@/components/Closing";
import Link from "next/link";
import { Breadcrumbs, Section } from "@/components/PageParts";
import { crumbsOverlay } from "@/lib/styles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("contact");

const topics = [
  { title: "Jazda próbna", text: "Sprawdź BAW 212 T01 w terenie albo Mini Trucka na miejskiej trasie.", href: "/modele/baw-212" },
  { title: "Oferta dla firm i leasing", text: "Ceny brutto i netto wszystkich wersji, finansowanie dla flot.", href: "/cennik" },
  { title: "Współpraca dealerska", text: "Dołącz do sieci salonów i serwisów BAW w Polsce.", href: "/zostan-dealerem" },
];

export default function Page() {
  return (
    <main className="relative">
      <Breadcrumbs page="contact" className={crumbsOverlay} />
      <Contact headingAs="h1" title="Kontakt z BAW Automotive Polska" />
      <Section eyebrow="W czym pomożemy" title="Najczęstsze sprawy" className="bg-ink-2">
        <div className="grid gap-5 md:grid-cols-3">
          {topics.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-3xl border border-white/10 bg-ink p-8 transition hover:border-brand/60">
              <h3 className="mb-3 text-xl font-semibold">{t.title}</h3>
              <p className="text-muted">{t.text}</p>
            </Link>
          ))}
        </div>
        <p className="mt-12 max-w-[70ch] text-white/75">
          Siedziba importera BAW mieści się przy ul. Łódzkiej 114 w Ksawerowie, około 3 km od Port Łódź i sklepu IKEA,
          z dogodnym dojazdem z Łodzi, Pabianic i trasy S14.
        </p>
      </Section>
    </main>
  );
}
