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
import { getFeaturedDealsAction } from "@/actions/deals";

export const dynamic = "force-dynamic";

/**
 * Optimized DashboardPage.
 * Performance: Hoists data fetching for all sections to the top level.
 * Using Promise.all parallelizes independent database requests, reducing TTFB.
 */
const DashboardPage = async () => {
  const { profile } = await getProfileAction();
  const userId = profile?.id;

  // Parallelize fetching of trips, reservations, and deals to avoid a waterfall
  const [trips, reservations, featuredDeals] = await Promise.all([
    userId ? fetchTrips(userId) : Promise.resolve([]),
    userId ? getUserReservations(userId) : Promise.resolve([]),
    getFeaturedDealsAction({ limit: 3 }),
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
          <DealsSection featuredDeals={featuredDeals} />
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
