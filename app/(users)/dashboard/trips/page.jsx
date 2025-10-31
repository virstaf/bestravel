import { getProfileAction } from "@/actions/profiles";
import { fetchTrips } from "@/actions/trips";
import DashHeader from "@/components/dash-header";
import Trips from "@/components/TripsPage";

export const dynamic = "force-dynamic";

const TripsPage = async () => {
  const { profile } = await getProfileAction();
  const trips = await fetchTrips(profile?.id);
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="View Trips" description="😍 More adventure waiting!" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] my-2">
        <Trips trips={trips} profile={profile} />
      </div>
    </div>
  );
};

export default TripsPage;
