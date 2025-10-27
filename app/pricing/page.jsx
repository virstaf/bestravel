import ChoosingHelp from "@/components/choosing-help";
import { StripePricingTable } from "@/components/StripePricingTable";
import TrialCTA from "@/components/trial-cta";
import Pricing from "@/components/ui/pricing";
import Image from "next/image";

const PricingPage = async () => {
  return (
    <div className="h-full md:py-12">
      <section className="w-full container h-full mx-auto">
        <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
          <Image
            src="/images/desk_passport.jpg"
            alt="Our team"
            fill
            className="object-cover opacity-70 rounded"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center  px-4">
            <h1 className="text-4xl font-bold text-white p-3 bg-black/20 rounded-lg ">
              Pricing Plans{" "}
              <span className="text-secondary"> for Every Traveler</span>
            </h1>
          </div>
        </div>
        <div className="text-center my-12">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Choose the Perfect Plan for Your Travel Needs
          </h2>
          <p className="text-lg text-gray-600">
            Whether you're a frequent flyer or an occasional traveler, we have
            the right membership for you.
          </p>
        </div>
      </section>
      {/* <StripePricingTable /> */}
      <section className="w-full container mx-auto my-12">
        <Pricing className="max-w-7xl mx-auto px-4 py-8 bg-white rounded-lg shadow-xl" />
        <section className="w-full container mx-auto pb-8 px-4">
          <TrialCTA />
        </section>
        <section className="max-w-7xl mx-auto px-4 my-8">
          <ChoosingHelp />
        </section>
      </section>
    </div>
  );
};

export default PricingPage;
