import Hero from "@/components/home/Hero";
import VedicIntro from "@/components/home/VedicIntro";
import GuidanceCategories from "@/components/home/GuidanceCategories";
import TraditionalServices from "@/components/home/TraditionalServices";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChoose from "@/components/home/WhyChoose";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <VedicIntro />
      <GuidanceCategories />
      <TraditionalServices />
      <HowItWorks />
      <WhyChoose />
      <Faq />
      <FinalCta />
    </>
  );
}