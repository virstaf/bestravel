import TripsList from "./TripsList";
import { getProfileAction } from "@/actions/profiles";
import { fetchTrips } from "@/actions/trips";
import Link from "next/link";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";

const TripsSection = async () => {
  const { profile } = await getProfileAction();
  const { success, data: trips, error } = await fetchTrips(profile?.id);

  return (
    <div className="bg-gradient-to-b from-primary/5 to-gray-white py-8 px-4 rounded-2xl">
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-bold uppercase text-primary">
            Your Upcoming Trips
          </h2>
          {error && (
            <span className="text-xs text-red-500 font-medium">
              (Offline: Connection issues)
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/trips" className="text-primary">
            <Button size="sm">
              <EyeIcon className="h-4 w-4" /> View All Trips
            </Button>
          </Link>
          <Link href="/dashboard/trips/new" className="text-primary">
            <Button variant="outline" size="sm">
              <PlusIcon className="h-4 w-4" /> Add New Trip
            </Button>
          </Link>
        </div>
      </div>

      {!success && trips.length === 0 ? (
        <div className="bg-white/50 border border-dashed border-gray-200 rounded-xl p-8 text-center my-4">
          <p className="text-muted-foreground">We couldn&apos;t load your trips. Please check your connection or try again shortly.</p>
        </div>
      ) : (
        <TripsList trips={trips} profile={profile} limit={3} />
      )}
    </div>
  );
};

export default TripsSection;
