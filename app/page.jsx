import NavBar from "@/components/nav-bar";
import LandingFooter from "@/components/LandingFooter";
import ClubHero from "@/components/club/ClubHero";
import TrustBar from "@/components/club/TrustBar";
import ProblemSection from "@/components/club/ProblemSection";
import SolutionGrid from "@/components/club/SolutionGrid";
import MembershipHighlights from "@/components/club/MembershipHighlights";
import HowItWorksSteps from "@/components/club/HowItWorksSteps";
import InspirationSection from "@/components/club/InspirationSection";
import TravelInsights from "@/components/club/TravelInsights";
import TestimonialSection from "@/components/club/TestimonialSection";
import FinalCTA from "@/components/club/FinalCTA";

const HomePage = () => {
  return (
    <main className="w-full bg-white min-h-screen">
      <NavBar />
      <div className="w-full flex flex-col">
        <ClubHero />
        <TrustBar />
        <ProblemSection />
        <SolutionGrid />
        <MembershipHighlights />
        <HowItWorksSteps />
        <InspirationSection />
        <TravelInsights />
        <TestimonialSection />
        <FinalCTA />
      </div>
      <LandingFooter />
    </main>
  );
};

export default HomePage;
