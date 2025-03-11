import React from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from "./LimitedTimeSection";
import LimitedTimeSection from "./LimitedTimeSection";
import WhyJoin from "./WhyJoin";
import WelcomePackages from "./WelcomePackages";
import HowItWorks from "./HowItWorks";
import FeaturedDestinations from "./FeaturedDestinations";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <LimitedTimeSection />
      <WhyJoin />
      <WelcomePackages />
      <HowItWorks />
      <FeaturedDestinations />
      <Testimonials />
      <FAQSection />
    </>
  );
};

export default LandingPage;
