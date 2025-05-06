// app/dashboard/trips/[tripId]/edit/page.js
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import EditTripForm from "@/components/edit-trip-form";

const EditTripPage = async ({ params }) => {
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
    .eq("id", params.tripId)
    .eq("user_id", user.id)
    .single();

  if (!trip) {
    notFound();
  }

  return <EditTripForm trip={trip} />;
};

export default EditTripPage;
