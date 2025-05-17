import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import TripDetail from "@/components/trip-detail";
import DashHeader from "@/components/dash-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TripDetailPage = async ({ params }) => {
  const { tripId } = params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
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

  console.log("trip::: ", trip);

  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="View Trip" description="😍 More adventure waiting!" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] my-2">
        <TripDetail trip={trip} />
        <Button asChild className="my-4">
          <Link href="/dashboard/trips">All Trips</Link>
        </Button>
      </div>
    </div>
  );

  //   return <TripDetail trip={trip} />;
};

export default TripDetailPage;
