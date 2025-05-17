// app/dashboard/trips/[tripId]/edit/page.js
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import EditTripForm from "@/components/edit-trip-form";
import DashHeader from "@/components/dash-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EditTripPage = async ({ params }) => {
  const { tripId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .eq("user_id", user.id)
    .single();

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
