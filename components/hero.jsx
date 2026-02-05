import React from "react";
import { HeroForm } from "./hero-form";

const Hero = () => {
  return (
    <section className="relative w-full text-white min-h-[600px] flex flex-col justify-center hero-bg-custom">
      {/* Overlay for readability - using absolute div to ensure z-index handling */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Travel smarter. Save more. Explore freely.
        </h1>

        <p className="mt-4 text-lg text-white/90">
          Unlock exclusive flight and hotel deals with your Virstravel
          membership.
        </p>

        {/* Form Card - Extracted to Client Component */}
        <HeroForm />
      </div>
    </section>
  );
};

export default Hero;
