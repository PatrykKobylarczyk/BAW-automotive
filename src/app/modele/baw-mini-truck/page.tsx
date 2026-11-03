import type { Metadata } from "next";
import { MiniTruck } from "@/components/Models";
import { Contact } from "@/components/Closing";
import { Breadcrumbs, Faq, Highlights, JsonLd, OtherModels, SpecTable } from "@/components/PageParts";
import { modelBySlug } from "@/lib/content";
import { pageMetadata, productLd } from "@/lib/seo";

const model = modelBySlug("baw-mini-truck");
export const metadata: Metadata = pageMetadata("baw-mini-truck", model.image);

export default function Page() {
  return (
    <main>
      <JsonLd data={productLd(model)} />
      <Breadcrumbs page="baw-mini-truck" className="relative z-10 -mb-16 pt-28 md:-mb-24 md:pt-32" />
      <MiniTruck headingAs="h1" />
      <Highlights model={model} />
      <SpecTable model={model} />
      <Faq items={model.faq} title="BAW Mini Truck — pytania i odpowiedzi" />
      <OtherModels current={model.slug} />
      <Contact title="Zapytaj o Mini Truck dla swojej firmy." defaultModel="Mini Truck" />
    </main>
  );
}
