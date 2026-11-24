import type { Metadata } from "next";
import { MiniTruck } from "@/components/Models";
import ModelGallery from "@/components/ModelGallery";
import ModelVersions from "@/components/ModelVersions";
import { Contact } from "@/components/Closing";
import { Breadcrumbs, Faq, Highlights, JsonLd, OtherModels, SpecTable } from "@/components/PageParts";
import { miniTruckGallery, modelBySlug } from "@/lib/content";
import { crumbsOverlay } from "@/lib/styles";
import { pageMetadata, productLd } from "@/lib/seo";

const model = modelBySlug("baw-mini-truck");
export const metadata: Metadata = pageMetadata("baw-mini-truck", model.image);

export default function Page() {
  return (
    <main className="relative">
      <JsonLd data={productLd(model)} />
      <Breadcrumbs page="baw-mini-truck" className={crumbsOverlay} />
      <MiniTruck headingAs="h1" />
      <ModelVersions
        model="baw-mini-truck"
        title="Dwie wersje, zero emisji."
        lead="Box i Cargo z tym samym napędem elektrycznym. Ceny według cennika importera."
      />
      <ModelGallery title="Mini Truck z każdej strony" alt="BAW Mini Truck" images={miniTruckGallery} />
      <Highlights model={model} />
      <SpecTable model={model} />
      <Faq items={model.faq} title="BAW Mini Truck — pytania i odpowiedzi" />
      <OtherModels current={model.slug} />
      <Contact title="Zapytaj o Mini Truck dla swojej firmy." defaultModel="Mini Truck" />
    </main>
  );
}
