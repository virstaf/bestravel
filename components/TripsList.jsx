
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TripSummaryCard from "./TripSummaryCard";

const TripsList = ({ profile, trips, limit }) => {
  // const [tripLink, setTripLink] = useState("/pricing");
  const isSubscribed = profile?.is_subscribed;

  // useEffect(() => {
  //   if (isSubscribed) {
  //     setTripLink("/dashboard/trips/new");
  //   } else {
  //     setTripLink("/dashboard/trips/new");
  //   }
  // }, [isSubscribed]);

  if (!trips || trips.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <h3 className="text-lg font-medium">No trips planned yet</h3>
        <p className="text-muted-foreground">
          Start planning your next adventure
        </p>
        <Link href={"/dashboard/trips/new"}>
          <Button>Create New Trip</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {trips.slice(0, limit ? limit : trips.length).map((trip) => (
        <TripSummaryCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripsList;
