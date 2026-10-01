import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Marquee, Stats, Values } from "@/components/Intro";
import OffroadReveal from "@/components/OffroadReveal";
import { LightTruck, MiniTruck, Offroad212 } from "@/components/Models";
import { Contact, Dealer, Pricing } from "@/components/Closing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Values />
        <OffroadReveal />
        <Offroad212 />
        <MiniTruck />
        <LightTruck />
        <Pricing />
        <Dealer />
      </main>
      <Contact />
    </>
  );
}
