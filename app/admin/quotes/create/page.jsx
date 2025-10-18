import { getReservationsByTrip } from "@/actions/admin/reservation";
import { getTripById } from "@/actions/admin/trips";
import NavSummary from "@/components/NavSummary";
import QuoteBuilder from "@/components/QuoteBuilder";
import { getUser } from "@/lib/supabase/server";

const CreateQuotePage = async ({ searchParams }) => {
  const search_params = await searchParams;
  const tripId = search_params.trip_id;

  const tripData = await getTripById(tripId); // Fetch trip data using the tripId
  const reservationData = await getReservationsByTrip(tripId);
  const user = await getUser();
  const pathname = "/admin/quotes/create";

//   console.log("reservationData:::", reservationData);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <NavSummary pathname={pathname} />
      <h1 className="text-2xl font-bold text-muted-foreground">
        {tripData?.title || "Unknown Destination"} Trip
      </h1>
      <div>
        <QuoteBuilder
          trip={tripData}
          reservations={reservationData.splice(0, 3)}
          userId={user?.id}
          tripId={tripId}
          //   onQuoteCreated={onQuoteCreated}
        />
      </div>
      {/* <pre>{JSON.stringify(tripData, null, 2)}</pre>
      <pre>{JSON.stringify(reservationData.splice(0, 3), null, 2)}</pre> */}
    </div>
  );
};

export default CreateQuotePage;
