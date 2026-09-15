import Preloader from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustMarquee } from "@/components/TrustMarquee";
import { PregnancyTimeline } from "@/components/PregnancyTimeline";
import { Doctors } from "@/components/Doctors";
import { Packages } from "@/components/Packages";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { DemoDock } from "@/components/demo/DemoDock";

/**
 * Redosled je podešen za sastanak: prvo ono što prodaje (wow sekcija, tim, cene),
 * pa tek onda detalji. Ništa nije izbačeno.
 */
export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <PregnancyTimeline />
        <Doctors />
        <Packages />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <DemoDock />
    </>
  );
}
