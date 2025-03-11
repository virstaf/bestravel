import React from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from "./LimitedTimeSection";
import LimitedTimeSection from "./LimitedTimeSection";
import WhyJoin from "./WhyJoin";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <LimitedTimeSection />
      <WhyJoin />
      {/* <BenefitsSection /> */}
    </>
  );
};

export default LandingPage;
