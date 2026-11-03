import type { Metadata } from "next";
import { Contact } from "@/components/Closing";
import { JsonLd, ModelCard, PageHeader } from "@/components/PageParts";
import { models } from "@/lib/content";
import { pageMetadata, url } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("models");

export default function Page() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: models.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.name, url: url(`/modele/${m.slug}`) })),
        }}
      />
      <PageHeader
        page="models"
        eyebrow="Gama BAW w Polsce"
        title="Samochody BAW: terenowe, użytkowe i elektryczne"
        lead="Trzy linie modelowe dla firm i kierowców, którzy potrzebują niezawodności: terenowy SUV 212 T01, lekki użytkowy Light Truck i w pełni elektryczny Mini Truck do miejskiej logistyki."
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-5 md:grid-cols-3 md:px-8">
          {models.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>
      <Contact title="Nie wiesz, który model wybrać?" />
    </main>
  );
}
