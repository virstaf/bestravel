import React from "react";
import TripsList from "./TripsList";
import { getProfileAction } from "@/actions/profiles";
import { fetchTrips } from "@/actions/trips";
import Link from "next/link";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";

const TripsSection = async () => {
  const { profile } = await getProfileAction();
  const trips = await fetchTrips(profile?.id); // await fetchTrips(); // Fetch trips if needed

  return (
    <div className="bg-gradient-to-b from-primary/5 to-gray-white py-8 px-4 rounded-2xl">
      <div className="flex justify-between gap-4">
        <h2 className="text-md font-bold uppercase text-primary mb-4">
          Your Upcoming Trips
        </h2>
        <div className="flex gap-2">
          <Link href="/dashboard/trips" className="text-primary">
            <Button>
              <EyeIcon className="h-4 w-4" /> View All Trips
            </Button>
          </Link>
          <Link href="/dashboard/trips/new" className="text-primary">
            <Button variant="outline">
              <PlusIcon className="h-4 w-4" /> Add New Trip
            </Button>
          </Link>
        </div>
      </div>
      <TripsList trips={trips} profile={profile} limit={3} />
    </div>
  );
};

export default TripsSection;
