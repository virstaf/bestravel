import Hero from "@/components/hero";
import ProblemSection from "@/components/problem";
import React from "react";

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
        <section>Solution</section>
        <section>Services</section>
        <section>Benefit</section>
        <section>Process</section>
        <section>Testimonial</section>
        <section>Feature</section>
        <section>FAQ</section>
        <section>Call to action</section>
      </div>
    </div>
  );
};

export default HomePage;
