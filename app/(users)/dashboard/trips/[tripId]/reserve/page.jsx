import DashHeader from "@/components/dash-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ReservationWizard from "@/components/reservation-wizard";
import { getUser } from "@/lib/supabase/server";
import { fetchTrip } from "@/actions/trips";

const page = async ({ params }) => {
  const { tripId } = await params;

  const user = await getUser();
  if (!user) redirect("/auth/login");

  const { data: trip, error } = await fetchTrip(tripId, user.id);

  if (error) {
    console.error("Error fetching trip:", error);
    notFound();
  }

  // if (!trip) notFound();

  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="Reserve for Trip"
        description="😍 Get Resources for your Trip!"
      />
      <div className="content min-w-full min-h-[calc(100vh-180px)] my-2">
        <ReservationWizard trip={trip} userId={user.id} />
        {/* <div className="divider my-4" /> */}
        <div className="w-full flex justify-end">
          <Button
            asChild
            className="my-4 bg-white text-primary shadow-sm hover:bg-gray-100"
          >
            <Link href="/dashboard/trips">All Trips</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
