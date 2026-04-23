// app/dashboard/trips/[tripId]/edit/page.js
import { getProfileAction } from "@/actions/profiles";
import { fetchTrip } from "@/actions/trips";
import { notFound, redirect } from "next/navigation";
import EditTripForm from "@/components/edit-trip-form";
import DashHeader from "@/components/dash-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EditTripPage = async ({ params }) => {
  const { tripId } = await params;
  const { profile } = await getProfileAction();

  if (!profile) {
    redirect("/auth/login");
  }

  const { data: trip } = await fetchTrip(tripId);
  // Optional: check if trip belongs to user, but backend should ideally enforce this
  // if (trip && trip.user_id !== profile.id) notFound();

  if (!trip) {
    notFound();
  }

  return (
    // <div className="flex p-4">
    //   <EditTripForm trip={trip} />
    // </div>

    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="Edit Trip" description="Update your trip details" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] p-4">
        <EditTripForm trip={trip} />
        <Link href={`/dashboard/trips/${tripId}`}>
          <Button asChild className="">
            Back to Trip Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditTripPage;
