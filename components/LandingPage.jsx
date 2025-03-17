import React from "react";
import HeroSection from "./HeroSection";
import LimitedTimeSection from "./LimitedTimeSection";
import WhyJoin from "./WhyJoin";
import WelcomePackages from "./WelcomePackages";
import HowItWorks from "./HowItWorks";
import FeaturedDestinations from "./FeaturedDestinations";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import GetInTouch from "./GetInTouch";
import Newsletter from "./Newsletter";

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
      <GetInTouch />
      <Newsletter />
    </>
  );
};

export default LandingPage;
