import Hero from "@/components/hero";
import ProblemSection from "@/components/problem";
import SolutionSection from "@/components/solution";
import BenefitSection from "@/components/benefit";
import React from "react";
import WhoItsFor from "@/components/who-its-for";
import Process from "@/components/process";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import TravelSmarter from "@/components/travel-smarter";
import StartTrialCta from "@/components/start-trial-cta";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex flex-col">
        <section className="w-full h-full">
          <Hero />
        </section>
        <section>
          <ProblemSection />
        </section>
        <section>
          <SolutionSection />
        </section>
        {/* <section>Services</section> */}
        <section>
          <BenefitSection />
        </section>
        <section>
          <WhoItsFor />
        </section>
        <section>
          <Process />
        </section>
        <section>
          <FAQSection />
        </section>
        {/* <section>Feature</section> */}
        <section>
          <Testimonials />
        </section>
        <section className="container mx-auto px-4 my-12">
          <TravelSmarter />
        </section>
        <section className="">
          <StartTrialCta />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
