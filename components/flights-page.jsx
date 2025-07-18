import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Flights = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-md font-bold uppercase text-primary">
          No flights found
        </h1>
        <p className="text-muted-foreground">
          View and manage your flight bookings
        </p>
        <div className="w-full flex flex-col items-center justify-center p-4 border border-dashed rounded-lg bg-muted">
          <span>Add Trips and see Flights here</span>
          <Link href="/dashboard/trips/new" className="text-white">
            <Button asChild>Add Trip</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Flights;
