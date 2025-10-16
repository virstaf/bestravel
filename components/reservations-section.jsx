import { getProfileAction } from "@/actions/profiles";
import { getUserReservations } from "@/actions/reservations";
import { fetchTrips } from "@/actions/trips";
import React from "react";
import { ReservationSummaryCard } from "./reservation-summary";

const ReservationsSection = async () => {
  const { profile } = await getProfileAction();
  const userId = profile?.id;
  const reservations = await getUserReservations(userId);
  const trips = await fetchTrips(userId);

  const getTripName = (tripId) => {
    const trip = trips.find((trip) => trip.id === tripId);
    return trip ? trip.title : "Unknown Trip";
  };
  return (
    <div className="my-12 max-w-full bg-gradient-to-b from-gray-100 to-white/0 rounded-2xl p-4">
      <h2 className="text-md font-bold uppercase text-primary mb-4">
        Recent Reservations
      </h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {reservations.slice(0, 3).map((reservation) => (
            <ReservationSummaryCard
              key={reservation.id}
              reservation={reservation}
              tripName={getTripName(reservation.trip_id)}
              type={reservation?.type}
              className=""
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsSection;
