import React from "react";
import DashHeader from "@/components/dash-header";
import { getProfileAction } from "@/actions/profiles";
import { getUserReservations } from "@/actions/reservations";
import { ReservationSummaryCard } from "@/components/reservation-summary";
import { fetchTrips } from "@/actions/trips";

const ReservationsPage = async () => {
  const { profile } = await getProfileAction();
  const userId = profile?.id;
  const reservations = await getUserReservations(userId);
  const trips = await fetchTrips(userId);

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
      <div className="w-full min-h-[calc(100vh-180px)] mt-4 mb-16  mx-auto flex flex-col justify-center">
        <div className="mb-6">
          <h2 className="text-lg font-semibold ml-6">All Reservations</h2>
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-gray-700 tracking-wide">
              {reservations.map((reservation) => (
                <ReservationSummaryCard
                  key={reservation.id}
                  reservation={reservation}
                  tripName={getTripName(reservation.trip_id)}
                  type={reservation?.type}
                  className="my-8 h-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;
