import React from "react";
import DashHeader from "@/components/dash-header";
import { getProfileAction } from "@/actions/profiles";
import { getUserReservations } from "@/actions/reservations";
import { ReservationSummaryCard } from "@/components/reservation-summary";
import { fetchTrips } from "@/actions/trips";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TripSummaryCard from "@/components/TripSummaryCard";

export const dynamic = "force-dynamic";

const ReservationsPage = async () => {
  const { profile } = await getProfileAction();
  const userId = profile?.id;
  const allReservations = await getUserReservations(userId);
  const reservations = allReservations.filter(
    (res) => res.status !== "cancelled"
  );
  const trips = await fetchTrips(userId);
  const tripLink = profile?.is_subscribed ? "/dashboard/trips/new" : "/pricing";

  const getTripName = (tripId) => {
    const trip = trips.find((trip) => trip.id === tripId);
    return trip ? trip.title : "Unknown Trip";
  };

  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="My Reservations"
        description="😎 Manage all your reservations"
      />
      <div className="w-full min-h-[calc(100vh-180px)] mt-4 mx-auto my-12 flex flex-col">
        {/* <div className="data">
          <pre>{JSON.stringify(reducedReservations, null, 2)}</pre>
        </div> */}
        <div className="">
          <h2 className="text-lg font-semibold ml-6">All Reservations</h2>
          {reservations.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <h3 className="text-lg font-medium">No reservations found</h3>
              <p className="text-muted-foreground tracking-wide">
                Start planning your next adventure
              </p>
              <Link href={"/dashboard/trips"}>
                <Button variant="outline">Add a reservation</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
              {reservations.map((reservation) => (
                <ReservationSummaryCard
                  key={reservation.id}
                  reservation={reservation}
                  tripName={getTripName(reservation.trip_id)}
                  tripId={reservation.trip_id}
                  type={reservation?.type}
                  className="my-3"
                />
              ))}
            </div>
          )}
        </div>
        <div className="trips my-12">
          <h2 className="text-lg font-semibold ml-6 my-4">Your Trips</h2>
          {trips.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <h3 className="text-lg font-medium">No trips planned yet</h3>
              <p className="text-muted-foreground tracking-wide">
                Plan a trip to Add a reservation
              </p>
              <Link href={tripLink}>
                <Button>Create New Trip</Button>
              </Link>
            </div>
          )}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {trips.length !== 0 &&
              trips.map((trip, index) => (
                <TripSummaryCard key={index} trip={trip} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;
