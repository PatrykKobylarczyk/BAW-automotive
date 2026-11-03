import type { Metadata } from "next";
import { Contact } from "@/components/Closing";
import { Breadcrumbs } from "@/components/PageParts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("contact");

export default function Page() {
  return (
    <main>
      <Breadcrumbs page="contact" className="relative z-10 -mb-32 pt-28 md:-mb-40 md:pt-32" />
      <Contact headingAs="h1" title="Kontakt z BAW Automotive Polska" />
    </main>
  );
}
