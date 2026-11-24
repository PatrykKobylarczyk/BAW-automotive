import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Stats, Values } from "@/components/Intro";
import OffroadReveal from "@/components/OffroadReveal";
import { Contact, Dealer } from "@/components/Closing";
import DealerNetwork from "@/components/DealerNetwork";
import Lineup from "@/components/Lineup";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home");

// Order follows the visitor's questions: what do you sell and for how much (the whole range as one lineup) → why BAW → (212 in the field, pinned scroll zoom) → where can I buy → become a dealer → get in touch.
export default function Home() {
  return (
    <main>
      <Hero />
      <Lineup />
      <Stats />
      <Values />
      <OffroadReveal />
      <DealerNetwork />
      <Dealer />
      <Contact />
    </main>
  );
}
