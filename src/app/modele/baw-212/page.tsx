import type { Metadata } from "next";
import ModelGallery from "@/components/ModelGallery";
import { Offroad212 } from "@/components/Models";
import { Contact } from "@/components/Closing";
import { Breadcrumbs, Faq, Highlights, JsonLd, OtherModels, SpecTable } from "@/components/PageParts";
import { gallery212, modelBySlug } from "@/lib/content";
import { pageMetadata, productLd } from "@/lib/seo";

const model = modelBySlug("baw-212");
export const metadata: Metadata = pageMetadata("baw-212", model.image);

export default function Page() {
  return (
    <main>
      <JsonLd data={productLd(model)} />
      <Breadcrumbs page="baw-212" className="relative z-10 -mb-16 pt-28 md:-mb-24 md:pt-32" />
      <Offroad212 headingAs="h1" />
      <ModelGallery title="BAW 212 z każdej strony" alt="BAW 212" images={gallery212} fit="contain" />
      <Highlights model={model} />
      <SpecTable model={model} />
      <Faq items={model.faq} title="BAW 212 — pytania i odpowiedzi" />
      <OtherModels current={model.slug} />
      <Contact title="Umów jazdę próbną BAW 212." defaultModel="212 T01" />
    </main>
  );
}
