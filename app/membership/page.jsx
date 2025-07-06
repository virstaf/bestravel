import MembershipTiers from "@/components/membership-tiers";
import StartTrialCta from "@/components/start-trial-cta";
import Testimonials from "@/components/Testimonials";
import TravelSmarter from "@/components/travel-smarter";
import { Button } from "@/components/ui/button";
import { membershipBenefits } from "@/lib/data";
import { Check } from "lucide-react";
import Image from "next/image";

const MembershipPage = () => {
  return (
    <div className="max-w-7xl h-full flex flex-col gap-8 mx-auto mt-16 px-4 my-12">
      <h1 className="text-4xl font-bold text-primary text-center my-12">
        Virstravel Club Membership
      </h1>

      <section className="bg-white container mx-auto py-1 mb-4 px-4 sm:px-6 lg:px-8">
        <div className="relative h-96 bg-gray-900">
          <Image
            src="/images/lady_beach.jpg"
            alt="Membership Background"
            fill
            style={{ objectFit: "cover", opacity: 0.7 }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-white text-center">
            Why Become a Member?
          </h2>
        </div>
        <p className="text-gray-600 text-lg mt-8 mb-4">
          At Virstravel Club, we believe travel should be rewarding, effortless,
          and cost-effective—no matter your budget or how often you fly. With
          our tiered membership options, you gain access to real value and
          unforgettable experiences. Whether you're a frequent flyer or planning
          one dream trip a year, there's a plan that suits your lifestyle.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <h2 className="max-w-7xl mx-auto mb-2 text-primary font-semibold text-xl">
          Memberships include the following depending on tier:
        </h2>
        <div className="flex w-full h-full items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center my-6 gap-4">
            {membershipBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start justify-between flex-col gap-3 w-full min-h-[308px] max-w-[430px] min-w-[250px] bg-white p-4 rounded-2xl shadow-lg"
              >
                <span className="mr-2 text-secondary w-full h-10 flex items-center justify-center">
                  {<benefit.icon className="w-10 h-10" />}
                </span>
                <h3 className="w-full font-semibold text-center text-primary">
                  {benefit.title}
                </h3>
                <div className="">
                  <ul className="pl-1 mb-2">
                    {benefit.packages.map((pkg, pkgIndex) => (
                      <div
                        key={pkgIndex}
                        className="flex gap-2 text-sm text-muted-foreground mb-2"
                      >
                        <span>
                          <Check className="w-6 text-muted-foreground" />
                        </span>
                        <li>{pkg}</li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MembershipTiers />

      <section className="">
        <div className="w-full">
          <h2 className="mb-2 text-primary font-semibold text-xl">
            Need Help Choosing?
          </h2>
          <p>Here's a quick guide:</p>
          <ul className=" pl-6 my-4">
            <li>
              <strong>🧳 Silver:</strong> Ideal for casual travelers or those
              planning 1–2 trips per year
            </li>
            <li>
              <strong>🌍 Gold:</strong> Perfect for families or professionals
              who travel regularly
            </li>
            <li>
              <strong>🛫 Platinum:</strong> Built for frequent flyers, luxury
              lovers, and business travelers
            </li>
          </ul>
          <p>More benefits added regularly just for your convenience.</p>
        </div>
      </section>

      <section className="rounded-lg overflow-hidden shadow-lg">
        <Testimonials />
      </section>

      <section>
        <TravelSmarter />
      </section>

      <section className="rounded-lg overflow-hidden">
        <StartTrialCta />
      </section>
    </div>
  );
};

export default MembershipPage;
