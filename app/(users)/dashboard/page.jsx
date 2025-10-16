import DashHeader from "@/components/dash-header";
import DealsSection from "@/components/deals-section";
import HotelCard from "@/components/ui/hotelCard";
import TripsSection from "@/components/trips-section";
import WelcomeCard from "@/components/welcome-card";
import { hotels } from "@/lib/data";
import ReservationsSection from "@/components/reservations-section";

const page = () => {
  return (
    <div className="px-4 h-full w-full sm:w-[calc(100%-100px)]">
      <DashHeader
        page="Overview"
        description="🌴 Ready for your next adventure?"
        className="w-full mx-auto"
      />
      <div className="w-full min-h-[calc(100vh-180px)]">
        <section className="my-12">
          <WelcomeCard />
        </section>

        <section className="my-12">
          <TripsSection />
        </section>

        <section className="my-12">
          <DealsSection />
        </section>

        <section className="my-12">
          <ReservationsSection />
        </section>

        <section className="my-12 max-w-full bg-gray-100 rounded-2xl p-4">
          <h2 className="text-md font-bold uppercase text-primary mb-4">
            Hotel Recommendations for You
          </h2>
          <div className="overflow-x-auto hide-scrollbar w-full px-4">
            <div className="flex gap-6 snap-x snap-mandatory">
              {hotels.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
