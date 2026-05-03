import { getProfileAction } from "@/actions/profiles";
import { getUserReservations } from "@/actions/reservations";
import { fetchTrips } from "@/actions/trips";
import { ReservationSummaryCard } from "./reservation-summary";
import Link from "next/link";
import { Button } from "./ui/button";

const ReservationsSection = async () => {
  const { profile } = await getProfileAction();
  const userId = profile?.id;
  const { success, data: reservations, error } = await getUserReservations(userId);
  const { success: tripsSuccess, data: trips } = await fetchTrips(userId);

  const getTripName = (tripId) => {
    const trip = (trips || []).find((trip) => trip.id === tripId);
    return trip ? trip.title : "Unknown Trip";
  };

  return (
    <div className="w-full bg-gradient-to-b from-green-500/5 to-gray-white py-8 px-4 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold uppercase text-primary">
          Recent Reservations
        </h2>
        {error && (
          <span className="text-xs text-red-500 font-medium">
            (Offline: Data may be outdated)
          </span>
        )}
      </div>

      {!success && (reservations?.length === 0 || !reservations) ? (
        <div className="bg-white/50 border border-dashed border-gray-200 rounded-xl p-12 text-center my-4">
          <p className="text-muted-foreground">Unable to fetch your reservations at this time.</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <h3 className="text-lg font-medium">No reservations found</h3>
          <p className="text-muted-foreground tracking-wide">
            Start planning your next adventure
          </p>
          <Link href={"/dashboard/reservations"}>
            <Button variant="outline">Add a reservation</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 ">
          {reservations.slice(0, 3).map((reservation) => (
            <ReservationSummaryCard
              key={reservation.id}
              reservation={reservation}
              tripName={getTripName(reservation.trip_id)}
              tripId={reservation.trip_id}
              type={reservation?.type}
              className=""
            />
          ))}
        </div>
      )}
      <div className="w-full flex justify-end gap-4 my-4">
        <Link href="/dashboard/reservations">
          <Button variant="outline" size="sm">
            View More
          </Button>
        </Link>
        <Link href="/dashboard/reservations">
          <Button size="sm">Add New</Button>
        </Link>
      </div>
    </div>
  );
};

export default ReservationsSection;
