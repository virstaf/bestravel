import React from "react";
import DashHeader from "@/components/dash-header";
import { getProfileAction } from "@/actions/profiles";
import { getUserReservations } from "@/actions/reservations";
import { getFormattedDate } from "@/lib/getFormattedDate";

const ReservationsPage = async () => {
  const { profile } = await getProfileAction();
  const userId = profile?.id;
  const reservations = await getUserReservations(userId);

  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="My Reservations"
        description="😎 Manage all your reservations"
      />
      <div className="w-full min-h-[calc(100vh-180px)] mx-auto flex flex-col justify-center">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Your Reservations</h2>
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  type={reservation?.type}
                  className="mt-2 h-full"
                />
              ))}
            </ul>
          )}
        </div>
        {/* <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(reservations, null, 2)}
        </pre> */}
      </div>
    </div>
  );
};

export default ReservationsPage;

const ReservationCard = ({ reservation, type, className }) => {
  return (
    <li className={`bg-white p-4 rounded-lg shadow mb-4 ${className}`}>
      {type === "flight" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Flight Reservation</h3>
          <div className="">
          <p>
            {reservation.details.class.slice(0, 1).toUpperCase() +
              reservation.details.class.slice(1)}{" "}
            Flight
          </p>
          <p>From: {reservation.details.departureCity}</p>
          <p>To: {reservation.details.arrivalCity}</p>
          <p>
            Departure: {getFormattedDate(reservation.details.departureDate)}
          </p></div>
          {/* <p>{JSON.stringify(reservation.details, null, 2)}</p> */}
        </div>
      )}
      {type === "hotel" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Hotel Reservation</h3>
          <p>
            Room type:{" "}
            {reservation.details.roomType.slice(0, 1).toUpperCase() +
              reservation.details.roomType.slice(1)}
          </p>
          <p>City: {reservation.details.city}</p>
          <p>Check in: {getFormattedDate(reservation.details.checkIn)}</p>
          <p>Preferred hotel: {reservation.details.preferredHotel}</p>
          {/* <p>{JSON.stringify(reservation.details, null, 2)}</p> */}
        </div>
      )}
      {type === "transfer" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Transfer Reservation</h3>
          <p>Pickup date: {getFormattedDate(reservation.details.pickupDate)}</p>
          <p>Pickup Location: {reservation.details.pickupLocation}</p>
          <p>Dropoff Location: {reservation.details.dropoffLocation}</p>
          <p>
            Vehicle Type:{" "}
            {reservation.details.vehicleType.slice(0, 1).toUpperCase() +
              reservation.details.vehicleType.slice(1)}
          </p>
          {/* <p>{JSON.stringify(reservation.details, null, 2)}</p> */}
        </div>
      )}
    </li>
  );
};
