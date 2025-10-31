import Link from "next/link";
import { Button } from "./ui/button";
import Status from "./ui/status";
import { getFormattedDate } from "@/lib/getFormattedDate";
import CancelReservationBtn from "./CancelReservationBtn";

export const ReservationSummaryCard = ({
  reservation,
  tripName,
  tripId,
  type,
  className,
}) => {
  return (
    // <div className="my-4">
    <div
      className={`bg-white sm:min-w-[400px] max-w-[500px] text-gray-700 tracking-wide p-4 rounded-lg shadow hover:shadow-2xl transition-shadow duration-200 ${type === "flight" ? "border-l-4 border-blue-500" : type === "hotel" ? "border-l-4 border-green-500" : "border-l-4 border-yellow-500"} ${className}`}
    >
      {type === "flight" && (
        <div className="flex flex-col h-full gap-4 justify-between">
          <h3 className="text-lg font-semibold mb-2">
            🛫 Flight Reservation - <span className="">{tripName}</span>
          </h3>
          <div className="relative">
            <p>
              {reservation.details.class.slice(0, 1).toUpperCase() +
                reservation.details.class.slice(1)}{" "}
              Flight
            </p>
            <p>
              Departure: {getFormattedDate(reservation.details.departureDate)}
            </p>
            <p>From: {reservation.details.departureCity}</p>
            <p>To: {reservation.details.arrivalCity}</p>
            <div className="absolute right-0 top-0">
              <Status value={reservation.status} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button asChild variant="outline">
              <Link href={`/dashboard/trips/${tripId}/reserve`}>View</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/dashboard/trips/${tripId}/reserve`}>Edit</Link>
            </Button>
            <CancelReservationBtn resId={reservation.id} />
          </div>
        </div>
      )}
      {type === "hotel" && (
        <div className="sm:min-w-[350px] flex flex-col h-full justify-between">
          <h3 className="text-lg font-semibold mb-2">
            🏠 Hotel Reservation - <span>{tripName}</span>
          </h3>
          <div className="relative">
            {/* <p>
              Room type:{" "}
              {reservation?.details?.roomType?.slice(0, 1)?.toUpperCase() +
                reservation?.details?.roomType?.slice(1)}
            </p> */}
            <p>City: {reservation.details.city}</p>
            <p>Check in: {getFormattedDate(reservation.details.checkIn)}</p>
            <p>Preferred hotel: {reservation.details.preferredHotel}</p>
            <div className="absolute right-0 top-0">
              <Status value={reservation.status} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button asChild variant="outline">
              <Link href={`/dashboard/reservations/${reservation.id}`}>
                View
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/dashboard/reservations/${reservation.id}`}>
                Edit
              </Link>
            </Button>
            <CancelReservationBtn resId={reservation.id} />
          </div>
        </div>
      )}
      {type === "transfer" && (
        <div className="sm:min-w-[350px] flex flex-col h-full justify-between">
          <h3 className="text-lg font-semibold mb-2">
            🚕 Transfer Reservation - <span>{tripName}</span>
          </h3>
          <div className="relative">
            <p>
              Pickup date: {getFormattedDate(reservation.details.pickupDate)}
            </p>
            <p>Pickup Location: {reservation.details.pickupLocation}</p>
            <p>Dropoff Location: {reservation.details.dropoffLocation}</p>
            <p>
              Vehicle Type:{" "}
              {reservation.details.vehicleType.slice(0, 1).toUpperCase() +
                reservation.details.vehicleType.slice(1)}
            </p>
            <div className="absolute right-0 top-0">
              <Status value={reservation.status} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button asChild variant="outline">
              <Link href={`/dashboard/reservations/${reservation.id}`}>
                View
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/dashboard/reservations/${reservation.id}`}>
                Edit
              </Link>
            </Button>
            <CancelReservationBtn resId={reservation.id} />
          </div>
        </div>
      )}
    </div>
  );
};
