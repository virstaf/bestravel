// import { createClient } from "@/lib/supabase/server";
import React from "react";
import { Button } from "./ui/button";
import { getUser } from "@/lib/supabase/server";
import Link from "next/link";

const Flights = async ({ myFlights }) => {
  // const user = getUser();

  // let flights = [];
  // if (user.data.user) {
  //   const { data } = await supabase
  //     .from("flights")
  //     .select("*")
  //     .eq("user_id", user.data.user.id)
  //     .order("start_date", { ascending: true });
  //   flights = data || [];
  // }

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
