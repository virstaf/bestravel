// app/dashboard/trips/page.js
import { Button } from "@/components/ui/button";
import TripsList from "@/components/TripsList";
import Link from "next/link";

export default async function Trips({ trips, profile }) {
  const isSubscribed = profile?.is_subscribed;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-md font-bold uppercase text-primary">My Trips</h1>
        <Link href={"/dashboard/trips/new"}>
          <Button>New Trip</Button>
        </Link>
      </div>
      <TripsList trips={trips} profile={profile} />
    </div>
  );
}
