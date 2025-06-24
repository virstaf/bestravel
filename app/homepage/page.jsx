import Hero from "@/components/hero";
import ProblemSection from "@/components/problem";
import SolutionSection from "@/components/solution";
import BenefitSection from "@/components/benefit";
import React from "react";
import WhoItsFor from "@/components/who-its-for";
import Process from "@/components/process";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex flex-col gap-8">
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
        <section>Testimonial</section>
        <section>Feature</section>
        <section>FAQ</section>
        <section>Call to action</section>
      </div>
    </div>
  );
};

export default HomePage;
