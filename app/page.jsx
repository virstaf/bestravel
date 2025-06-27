import Hero from "@/components/hero";
import ProblemSection from "@/components/problem";
import BenefitSection from "@/components/benefit";
import React from "react";
import WhoItsFor from "@/components/who-its-for";
import Process from "@/components/process";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import TravelSmarter from "@/components/travel-smarter";
import StartTrialCta from "@/components/start-trial-cta";
import NavBar from "@/components/nav-bar";
import LandingFooter from "@/components/LandingFooter";
import GetInTouch from "@/components/GetInTouch";
import Newsletter from "@/components/Newsletter";

const HomePage = () => {
  return (
    <div className="w-full bg-white min-h-screen">
      <NavBar />
      <div className="w-full h-full flex flex-col mt-16">
        <section className="w-full h-full">
          <Hero />
        </section>
        <section>
          <ProblemSection />
        </section>
        {/* <section><SolutionSection /></section> */}
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
        <section className="w-full max-w-7xl mx-auto my-8 px-4">
          <FAQSection />
        </section>
        {/* <section>Feature</section> */}
        <section className="w-full bg-gray-50">
          <Testimonials />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 my-12">
          <TravelSmarter />
        </section>
        <section className="">
          <StartTrialCta />
        </section>
        <section className="w-full bg-gray-50">
          <GetInTouch />
        </section>
        <section className="w-full">
          <Newsletter />
        </section>
      </div>
      <LandingFooter />
    </div>
  );
};

export default HomePage;
