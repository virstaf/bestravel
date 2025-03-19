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
import NavSection from "./NavSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <NavSection />
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
      <Footer />
    </>
  );
};

export default LandingPage;
