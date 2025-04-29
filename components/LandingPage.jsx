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
import CtaBanner from "./CTA-Banner";
import LandingFooter from "./LandingFooter";

const LandingPage = () => {
  return (
    <>
      <NavSection />
      <div className="heroBg">
        <HeroSection />
      </div>
      <LimitedTimeSection />
      <WhyJoin />
      <WelcomePackages />
      <HowItWorks />
      <FeaturedDestinations />
      <Testimonials />
      <FAQSection />
      <CtaBanner />
      <GetInTouch />
      <Newsletter />
      <LandingFooter />
      {/* <Footer /> */}
    </>
  );
};

export default LandingPage;
