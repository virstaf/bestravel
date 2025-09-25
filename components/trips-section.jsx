import React from "react";
import TripsList from "./TripsList";
import { getProfileAction } from "@/actions/profiles";
import { fetchTrips } from "@/actions/trips";

const TripsSection = async () => {
  const { profile } = await getProfileAction();
  const trips = await fetchTrips(profile?.id); // await fetchTrips(); // Fetch trips if needed
  return (
    <div>
      <h2 className="text-md font-bold uppercase text-primary mb-4">
        Your Upcoming Trips
      </h2>
      {/* <DealsList limit={3} /> */}
      <TripsList trips={trips} profile={profile} limit={3} />
    </div>
  );
};

export default TripsSection;
