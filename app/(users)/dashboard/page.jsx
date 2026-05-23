import DashHeader from "@/components/dash-header";
import DealsSection from "@/components/deals-section";
import HotelCard from "@/components/ui/hotelCard";
import TripsSection from "@/components/trips-section";

import { hotels } from "@/lib/data";
import ReservationsSection from "@/components/reservations-section";
import WelcomeSection from "@/components/welcome-section";
import HolidayDestinationsSection from "@/components/holiday-destinations-section";
import SubscriptionPrompt from "@/components/subscription-prompt";
import { getProfileAction } from "@/actions/profiles";
import { fetchTrips } from "@/actions/trips";
import { getUserReservations } from "@/actions/reservations";

export const dynamic = "force-dynamic";

/**
 * DashboardPage component optimized for performance.
 * Hoists data fetching to the parent level to eliminate redundant queries
 * in child server components (WelcomeSection, TripsSection, ReservationsSection).
 */
const DashboardPage = async () => {
  const { profile } = await getProfileAction();
  const userId = profile?.id;

  // Fetch trips and reservations in parallel to avoid waterfalls
  const [trips, reservations] = await Promise.all([
    userId ? fetchTrips(userId) : Promise.resolve([]),
    userId ? getUserReservations(userId) : Promise.resolve([]),
  ]);

  return (
    <div className="px-4 h-full w-full sm:w-[calc(100%-100px)]">
      <DashHeader
        page="Overview"
        description="🌴 Ready for your next adventure?"
        className="w-full mx-auto"
      />
      <div className="w-full min-h-[calc(100vh-180px)]">
        {profile && <SubscriptionPrompt profile={profile} />}

        <section className="my-12">
          <WelcomeSection profile={profile} />
        </section>

        <section className="my-12">
          <TripsSection profile={profile} trips={trips} />
        </section>

        <section className="my-12">
          <DealsSection />
        </section>

        <section className="my-12">
          <ReservationsSection
            profile={profile}
            reservations={reservations}
            trips={trips}
          />
        </section>

        <div className="my-12">
          <HolidayDestinationsSection />
        </div>

        {/* <section className="my-12 max-w-full bg-gray-100 rounded-2xl p-4">
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
        </section> */}
      </div>
    </div>
  );
};

export default DashboardPage;
