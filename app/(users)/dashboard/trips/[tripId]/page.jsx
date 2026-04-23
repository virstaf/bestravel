import { getProfileAction } from "@/actions/profiles";
import { notFound, redirect } from "next/navigation";
import TripDetail from "@/components/trip-detail";
import DashHeader from "@/components/dash-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchTrip } from "@/actions/trips";

const TripDetailPage = async ({ params }) => {
  const { tripId } = await params;

  const { profile } = await getProfileAction();
  const { data: trip } = await fetchTrip(tripId);

  if (!profile) {
    redirect("/auth/login");
  }

  if (!trip) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="View Trip" description="😍 More adventure waiting!" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] my-2">
        <div className="flex items-center justify-between gap-4 my-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/trips">All Trips</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/trips/new">Add New</Link>
          </Button>
        </div>
        <TripDetail trip={trip} />
      </div>
    </div>
  );

  //   return <TripDetail trip={trip} />;
};

export default TripDetailPage;
