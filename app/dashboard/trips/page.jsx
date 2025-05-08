import DashHeader from "@/components/dash-header";
import Trips from "@/components/TripsPage";
// import TripRequestForm from "@/components/TripRequestForm";
import React from "react";

const TripsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="View Trips" description="😍 More adventure waiting!" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] my-2">
        <Trips />
      </div>
    </div>
  );
};

export default TripsPage;
