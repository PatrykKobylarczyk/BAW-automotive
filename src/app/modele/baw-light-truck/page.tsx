import type { Metadata } from "next";
import { LightTruck } from "@/components/Models";
import { Contact } from "@/components/Closing";
import ModelGallery from "@/components/ModelGallery";
import { Breadcrumbs, Faq, Highlights, JsonLd, OtherModels, SpecTable } from "@/components/PageParts";
import { lightTruckGallery, modelBySlug } from "@/lib/content";
import { crumbsOverlay } from "@/lib/styles";
import { pageMetadata, productLd } from "@/lib/seo";

const model = modelBySlug("baw-light-truck");
export const metadata: Metadata = pageMetadata("baw-light-truck", model.image);

export default function Page() {
  return (
    <main className="relative">
      <JsonLd data={productLd(model)} />
      <Breadcrumbs page="baw-light-truck" className={crumbsOverlay} />
      <LightTruck headingAs="h1" />
      <ModelGallery title="Light Truck z każdej strony" alt="BAW Light Truck" images={lightTruckGallery} fit="contain" />
      <Highlights model={model} />
      <SpecTable model={model} />
      <Faq items={model.faq} title="BAW Light Truck — pytania i odpowiedzi" />
      <OtherModels current={model.slug} />
      <Contact title="Zapytaj o Light Truck dla swojej firmy." defaultModel="Light Truck" />
    </main>
  );
}
