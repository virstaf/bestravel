import DashHeader from "@/components/dash-header";
import DealsSection from "@/components/deals-section";
import TripsSection from "@/components/trips-section";
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
 * DashboardPage component optimized for performance.
 * Hoists data fetching to the page level and uses Promise.all to fetch data in parallel,
 * eliminating the previous request waterfall and significantly improving TTFB.
 */
const DashboardPage = async () => {
  // Parallelize the initial profile fetch and featured deals (since it doesn't depend on profile)
  const [profileResult, featuredDeals] = await Promise.all([
    getProfileAction(),
    getFeaturedDealsAction({ limit: 3 }),
  ]);

  const { profile } = profileResult;

  let trips = [];
  let reservations = [];

  // If profile exists, fetch dependent data in parallel
  if (profile?.id) {
    [trips, reservations] = await Promise.all([
      fetchTrips(profile.id),
      getUserReservations(profile.id),
    ]);
  }

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
      </div>
    </div>
  );
};

export default DashboardPage;
