// app/dashboard/trips/page.js
import { Button } from "@/components/ui/button";
import TripsList from "@/components/TripsList";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Trips() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  let trips = [];
  if (user.data.user) {
    const { data } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", user.data.user.id)
      .order("start_date", { ascending: true });
    trips = data || [];
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Trips</h1>
        <Link href="/dashboard/trips/new">
          <Button>New Trip</Button>
        </Link>
      </div>
      <TripsList initialTrips={trips} />
    </div>
  );
}
