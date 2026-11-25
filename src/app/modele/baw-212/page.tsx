import type { Metadata } from "next";
import ModelGallery from "@/components/ModelGallery";
import ModelVersions from "@/components/ModelVersions";
import { Offroad212 } from "@/components/Models";
import { Contact } from "@/components/Closing";
import { Breadcrumbs, Faq, Highlights, JsonLd, OtherModels, SpecTable } from "@/components/PageParts";
import { gallery212, modelBySlug } from "@/lib/content";
import { crumbsOverlay } from "@/lib/styles";
import { pageMetadata, productLd } from "@/lib/seo";

const model = modelBySlug("baw-212");
export const metadata: Metadata = pageMetadata("baw-212", model.image);

export default function Page() {
  return (
    <main className="relative">
      <JsonLd data={productLd(model)} />
      <Breadcrumbs page="baw-212" className={crumbsOverlay} />
      <Offroad212 headingAs="h1" />
      <ModelVersions
        model="baw-212"
        title="212 w trzech wersjach."
        lead="Terenowy SUV z dieslem, pick-up z otwartą skrzynią i benzynowe Mavero. Ceny według cennika importera."
      />
      <ModelGallery title="BAW 212 z każdej strony" alt="BAW 212" images={gallery212} fit="contain" />
      <Highlights model={model} />
      <SpecTable model={model} />
      <Faq items={model.faq} title="BAW 212 — pytania i odpowiedzi" />
      <OtherModels current={model.slug} />
      <Contact title="Umów jazdę próbną BAW 212." defaultModel="212 T01" />
    </main>
  );
}
