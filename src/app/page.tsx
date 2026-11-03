import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Marquee, Stats, Values } from "@/components/Intro";
import OffroadReveal from "@/components/OffroadReveal";
import { LightTruck, MiniTruck, Offroad212 } from "@/components/Models";
import { Contact, Dealer, Pricing } from "@/components/Closing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Stats />
      <Values />
      <OffroadReveal />
      <Offroad212 detailsHref="/modele/baw-212" />
      <MiniTruck detailsHref="/modele/baw-mini-truck" />
      <LightTruck detailsHref="/modele/baw-light-truck" />
      <Pricing />
      <Dealer />
      <Contact />
    </main>
  );
}
