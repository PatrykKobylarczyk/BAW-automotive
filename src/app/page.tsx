import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Stats, Values } from "@/components/Intro";
import { Contact, Dealer, Pricing } from "@/components/Closing";
import DealerNetwork from "@/components/DealerNetwork";
import { ModelCard, Section } from "@/components/PageParts";
import { models } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home");

// Order follows the visitor's questions: what do you sell → why BAW → how much → where can I buy → become a dealer → get in touch.
export default function Home() {
  return (
    <main>
      <Hero />
      <Section id="modele" eyebrow="Gama BAW" title="Od terenu po miejską logistykę.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          {models.map((m) => (
            <div key={m.slug} className={m.slug === "baw-212" ? "md:col-span-2 lg:col-span-1" : ""}>
              <ModelCard model={m} headingAs="h3" featured={m.slug === "baw-212"} />
            </div>
          ))}
        </div>
      </Section>
      <Stats />
      <Values />
      <Pricing title="Ceny wszystkich modeli BAW." moreHref="/cennik" />
      <DealerNetwork />
      <Dealer />
      <Contact />
    </main>
  );
}
