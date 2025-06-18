import React from "react";
import TripsList from "./TripsList";

const TripsSection = () => {
  return (
    <div>
      <h2 className="text-md font-bold uppercase text-primary mb-4">
        Your Upcoming Trips
      </h2>
      {/* <DealsList limit={3} /> */}
      <TripsList limit={3} />
    </div>
  );
};

export default TripsSection;
