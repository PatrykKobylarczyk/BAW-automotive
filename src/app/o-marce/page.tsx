import type { Metadata } from "next";
import { Contact } from "@/components/Closing";
import { Marquee, Stats, Values } from "@/components/Intro";
import { ModelCard, PageHeader, Prose, Section } from "@/components/PageParts";
import { company, models } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about");

export default function Page() {
  return (
    <main>
      <PageHeader
        page="about"
        eyebrow="O marce"
        title="BAW: 70 lat w motoryzacji, teraz także w Polsce"
        lead="BAW to globalna marka obecna na ponad 60 rynkach. Łączy trwałość, nowoczesną technologię i jakość wykonania z cenami dostępnymi dla każdego przedsiębiorcy."
      />
      <Stats />
      <Values />
      <Marquee />
      <Section eyebrow="Importer" title="BAW Automotive Polska">
        <Prose>
          <p>
            Oficjalnym importerem samochodów BAW w Polsce jest {company.name} z siedzibą w Ksawerowie ({company.street},{" "}
            {company.city}), {company.note}. Sprzedajemy pojazdy, prowadzimy jazdy próbne i budujemy sieć autoryzowanych
            dealerów w całym kraju.
          </p>
          <p>
            W ofercie są trzy linie modelowe: terenowy SUV 212 T01, lekki samochód użytkowy Light Truck oraz w pełni
            elektryczny Mini Truck do miejskiej logistyki.
          </p>
        </Prose>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {models.map((m) => (
            <ModelCard key={m.slug} model={m} headingAs="h3" />
          ))}
        </div>
      </Section>
      <Contact />
    </main>
  );
}
