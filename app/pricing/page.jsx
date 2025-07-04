import { StripePricingTable } from "@/components/StripePricingTable";
import Pricing from "@/components/ui/pricing";
import Image from "next/image";

const PricingPage = () => {
  return (
    <div className="h-full md:py-12">
      <section className="w-full container h-full mx-auto">
        <div className="relative h-96 bg-gray-900 rounded overflow-hidden">
          <Image
            src="/images/desk_passport.jpg"
            alt="Our team"
            fill
            className="object-cover opacity-70 rounded"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center  px-4">
            {/* <h2 className="text-2xl font-bold text-primary/">About Us</h2> */}
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
        <Pricing />
      </section>
    </div>
  );
};

export default PricingPage;
