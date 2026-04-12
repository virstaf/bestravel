import React from "react";
import { HeroForm } from "./hero-form";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full text-white min-h-[600px] flex flex-col justify-center">
      {/*
        ⚡ BOLT OPTIMIZATION:
        Using next/image with 'priority' and 'fill' instead of CSS background-image.
        This improves LCP (Largest Contentful Paint) by allowing the browser to
        preload the image and Next.js to serve it in optimized formats/sizes.
      */}
      <Image
        src="/images/hero_background.png"
        alt="Hero background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Overlay for readability - z-10 ensures it's above the image */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content - z-20 ensures it's above the overlay */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 py-20 text-center">
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
