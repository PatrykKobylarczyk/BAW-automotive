import type { Metadata } from "next";
import { JsonLd } from "@/components/PageParts";
import Hero from "@/components/t212/Hero";
import { DriveModes, Geometry, Manifesto, Marquee } from "@/components/t212/Capability";
import Terrain from "@/components/t212/Terrain";
import Configurator from "@/components/t212/Configurator";
import Range from "@/components/t212/Range";
import { Gallery, History, Specs } from "@/components/t212/Details";
import { Ownership, TestDrive } from "@/components/t212/TestDrive";
import { modelBySlug } from "@/lib/content";
import { breadcrumbLd, pageMetadata, productLd, url } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("212", "/gallery/212/34-front.webp");

const t01 = modelBySlug("baw-212");

/** Landing page of the 212 brand: one page about the T01, in the green 212 identity. */
export default function Page() {
  return (
    <main>
      <JsonLd data={{ ...productLd({ ...t01, image: url("/gallery/212/34-front.webp") }), url: url("/212") }} />
      <JsonLd data={breadcrumbLd("212")} />
      <Hero />
      <Marquee />
      <Manifesto />
      <Terrain />
      <Geometry />
      <DriveModes />
      <Configurator />
      <Range />
      <Specs />
      <Gallery />
      <History />
      <Ownership />
      <TestDrive />
    </main>
  );
}
