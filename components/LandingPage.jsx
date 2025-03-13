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
import ContactForm from "./ui/contactForm";

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
      <div className="w-full container mx-auto grid lg:grid-cols-2">
        <FAQSection />
        <GetInTouch />
      </div>
      <div className="w-full max-w-[450px] mx-auto">
        <ContactForm />
      </div>
      <Newsletter />
    </>
  );
};

export default LandingPage;
