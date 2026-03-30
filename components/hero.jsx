import React from "react";
import Image from "next/image";
import { HeroForm } from "./hero-form";

const Hero = () => {
  return (
    <section className="relative w-full text-white min-h-[600px] flex flex-col justify-center overflow-hidden">
      {/*
          ⚡ Performance Optimization: Using Next.js Image with priority prop instead of CSS background-image.
          This ensures the hero image is discovered by the preloader early and optimized by Next.js,
          significantly improving Largest Contentful Paint (LCP).
      */}
      <Image
        src="/images/hero_background.png"
        alt="Travel background"
        fill
        priority
        className="object-cover z-0"
        sizes="100vw"
      />

      {/* Overlay for readability - using absolute div to ensure z-index handling */}
      <div className="absolute inset-0 bg-black/40 z-1" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Travel smarter. Save more. Explore freely.
        </h1>

        <p className="mt-4 text-lg text-white/90">
          Tell us your travel plans let&apos;s find you the best member-only
          deals.
        </p>

        {/* Form Card - Extracted to Client Component */}
        <HeroForm />
      </div>
    </section>
  );
};

export default Hero;
