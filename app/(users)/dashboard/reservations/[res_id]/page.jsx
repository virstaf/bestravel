import { getReservation } from "@/actions/reservations";
import CancelReservationBtn from "@/components/CancelReservationBtn";
import { Button } from "@/components/ui/button";
import Status from "@/components/ui/status";
import { getFormattedDate, getFormattedDateTime } from "@/lib/getFormattedDate";
import { getMealsText, getTransferTypeText, getVehicleIcon } from "@/lib/utils";
import Link from "next/link";

const ReservationsPage = async ({ params }) => {
  const { res_id } = await params;
  const [reservation] = await getReservation(res_id);
  const type = reservation.type;
  return (
    <div className="my-8">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <h2 className="text-2xl text-gray-700 capitalize my-6">
          Reservation Detail
        </h2>
        <Button asChild>
          <Link href="/dashboard/reservations">Back</Link>
        </Button>
      </div>
      {type === "flight" && (
        <div className="max-w-4xl mx-auto p-6 bg-white sm:rounded-lg sm:shadow-lg">
          <ReservationHeader reservation={reservation} />
          <FlightRoute reservation={reservation} />
          <FlightDetails reservation={reservation} />
          <SpecialRequests reservation={reservation} />
          <ReservationMeta reservation={reservation} />
          <ActionButtons reservation={reservation} />
        </div>
      )}
      {type === "hotel" && (
        <div className="max-w-4xl mx-auto p-6 bg-white sm:rounded-lg sm:shadow-lg">
          <ReservationHeader reservation={reservation} />
          {/* <FlightRoute reservation={reservation} /> */}
          <HotelStayDuration reservation={reservation} />
          <HotelDetails reservation={reservation} />
          <SpecialRequests reservation={reservation} />
          <ReservationMeta reservation={reservation} />
          <ActionButtons reservation={reservation} />
        </div>
      )}
      {type === "transfer" && (
        <div className="max-w-4xl mx-auto p-6 bg-white sm:rounded-lg sm:shadow-lg">
          <ReservationHeader reservation={reservation} />
          <TransferRoute reservation={reservation} />
          <TransferDetails reservation={reservation} />
          <SpecialRequests reservation={reservation} />
          <ReservationMeta reservation={reservation} />
          <ActionButtons reservation={reservation} />
        </div>
      )}
      {/* <pre>{JSON.stringify(reservation, null, 2)}</pre> */}
    </div>
  );
};

export default ReservationsPage;

const ReservationHeader = ({ reservation: { ref_id, status, type } }) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 capitalize">
        {type} Reservation
      </h1>
      <p className="text-gray-600">Reference: #{ref_id}</p>
    </div>
    <Status value={status} />
  </div>
);

const FlightRoute = ({ reservation: { details } }) => (
  <div className="bg-blue-50 rounded-lg p-6 mb-6">
    <div className="flex items-center justify-between">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">
          {details.departureCity || "TBD"}
        </div>
        <div className="text-sm text-gray-600">Departure</div>
        <div className="text-lg font-semibold mt-2">
          {getFormattedDate(details.departureDate)}
        </div>
      </div>

      <div className="hidden sm:block flex-1 mx-4">
        <div className="flex items-center justify-center">
          <div className="h-0.5 bg-blue-300 flex-1"></div>
          <div className="mx-2 text-blue-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="h-0.5 bg-blue-300 flex-1"></div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-2">Flight</div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">
          {details.arrivalCity}
        </div>
        <div className="text-sm text-gray-600">Arrival</div>
        <div className="text-lg font-semibold mt-2">
          {getFormattedDate(details.returnDate)}
        </div>
      </div>
    </div>
  </div>
);

const FlightDetails = ({ reservation: { details } }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Passenger Details</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Adults:</span>
          <span className="font-medium">{details.adults}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Children:</span>
          <span className="font-medium">{details.children}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Passengers:</span>
          <span className="font-medium">
            {parseInt(details.adults) + parseInt(details.children)}
          </span>
        </div>
      </div>
    </div>

    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Flight Preferences</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Class:</span>
          <span className="font-medium capitalize">{details.class}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Check-in Baggage:</span>
          <span className="font-medium">
            {details.checkInBag ? "Included" : "Not Included"}
          </span>
        </div>
        {details.airlinePreference && (
          <div className="flex justify-between">
            <span className="text-gray-600">Airline Preference:</span>
            <span className="font-medium">{details.airlinePreference}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const SpecialRequests = ({ reservation: { details } }) => {
  {
    details.specialRequests && (
      <div className="bg-yellow-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
        <p className="text-gray-700">{details.specialRequests}</p>
      </div>
    );
  }
};

const ReservationMeta = ({ reservation }) => (
  <div className="border-t pt-4">
    <div className="flex justify-between gap-4 text-sm text-gray-600">
      <div>
        <span className="font-medium">Reservation Created:</span>
        <br />
        {getFormattedDateTime(reservation.created_at)}
      </div>
      <div>
        <span className="font-medium">Last Updated:</span>
        <br />
        {getFormattedDateTime(reservation.updated_at)}
      </div>
      {/* <div>
        <span className="font-medium">Reservation ID:</span>
        <br />
        {reservation.id}
      </div> */}
    </div>
  </div>
);

const ActionButtons = ({ reservation }) => {
  return (
    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
      <Button variant={"outline"}>Modify Reservation</Button>
      <CancelReservationBtn resId={reservation.id} />
    </div>
  );
};

const HotelPreference = ({ details }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <h3 className="font-semibold text-gray-900 mb-3">Hotel Preferences</h3>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">Star Rating:</span>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < details.starRating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 font-medium">{details.starRating} Star</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Hotel Preference:</span>
        <span className="font-medium capitalize">{details.preferredHotel}</span>
      </div>
      {details.preferredLocation && (
        <div className="flex justify-between">
          <span className="text-gray-600">Preferred Area:</span>
          <span className="font-medium">{details.preferredLocation}</span>
        </div>
      )}
    </div>
  </div>
);

const HotelDetails = ({ reservation: { details } }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    {/* Room Configuration */}
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Room Configuration</h3>
      <div className="space-y-3">
        {/* rooms and meals */}
        {Object.entries(details.rooms).map(([roomType, roomConfig]) => (
          <div
            key={roomType}
            className="border-b pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex justify-between w-full">
                <span className="font-medium capitalize">{roomType} Room</span>
                <span className="text-gray-600 ml-2">× {roomConfig.count}</span>
              </div>
            </div>
            <div className="flex justify-between w-full text-sm text-gray-600 mt-1">
              <span>Meals: </span>
              <span className="capitalize">
                {getMealsText(roomConfig.meals)}
              </span>
            </div>
          </div>
        ))}
        <div className="flex justify-between pt-2 border-t">
          <span className="text-gray-600">Total Rooms:</span>
          <span className="font-medium">
            {Object.values(details.rooms).reduce(
              (total, room) => total + room.count,
              0
            )}
          </span>
        </div>
      </div>
    </div>
    <HotelPreference details={details} />
  </div>
);

const HotelStayDuration = ({ reservation: { details } }) => {
  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(details.checkIn, details.checkOut);

  return (
    <div className="bg-green-50 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">Check-in</div>
          <div className="text-lg font-semibold mt-2">
            {getFormattedDateTime(details.checkIn)}
          </div>
          <div className="text-sm text-gray-600 mt-1">Arrival</div>
        </div>

        <div className="hidden sm:block flex-1 mx-4">
          <div className="flex items-center justify-center">
            <div className="h-0.5 bg-green-300 flex-1"></div>
            <div className="mx-4 text-center">
              <div className="text-3xl font-bold text-green-600">{nights}</div>
              <div className="text-sm text-green-600 font-medium">
                Night{nights !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="h-0.5 bg-green-300 flex-1"></div>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Hotel Stay
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">Check-out</div>
          <div className="text-lg font-semibold mt-2">
            {getFormattedDateTime(details.checkOut)}
          </div>
          <div className="text-sm text-gray-600 mt-1">Departure</div>
        </div>
      </div>

      {/* Location */}
      <div className="text-center mt-4 pt-4 border-t border-green-200">
        <div className="flex items-center justify-center text-gray-700">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-medium">{details.city}</span>
        </div>
      </div>
    </div>
  );
};

const TransferRoute = ({ reservation: { details } }) => (
  <div className="bg-purple-50 rounded-lg p-6 mb-6">
    <div className="flex items-center justify-between">
      <div className="text-center flex-1">
        <div className="text-2xl font-bold text-gray-900">
          {details.pickupLocation}
        </div>
        <div className="text-sm text-gray-600">Pickup Location</div>
        <div className="text-lg font-semibold mt-2">
          {getFormattedDate(details.pickupDate)}
        </div>
        <div className="text-md text-gray-700 mt-1">{details.pickupTime}</div>
      </div>

      <div className="hidden sm:block flex-1 mx-4">
        <div className="flex items-center justify-center">
          <div className="h-0.5 bg-purple-300 flex-1"></div>
          <div className="mx-4 text-center">
            <div className="text-3xl">
              {getVehicleIcon(details.vehicleType)}
            </div>
            <div className="text-sm text-purple-600 font-medium capitalize mt-1">
              {details.vehicleType}
            </div>
          </div>
          <div className="h-0.5 bg-purple-300 flex-1"></div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-2">
          {getTransferTypeText(details.transferType)}
        </div>
      </div>

      <div className="text-center flex-1">
        <div className="text-2xl font-bold text-gray-900">
          {details.dropoffLocation}
        </div>
        <div className="text-sm text-gray-600">Drop-off Location</div>
        <div className="text-lg font-semibold mt-2">
          {details.returnTransfer
            ? getFormattedDate(details.returnPickupDate)
            : "One Way"}
        </div>
        {details.returnTransfer && (
          <div className="text-md text-gray-700 mt-1">
            {details.returnPickupTime}
          </div>
        )}
      </div>
    </div>
    {/* Return Transfer Info */}
    {details.returnTransfer && (
      <div className="mt-6 pt-4 border-t border-purple-200">
        <div className="text-center">
          <div className="inline-flex items-center bg-purple-100 px-3 py-1 rounded-full">
            <svg
              className="w-4 h-4 mr-2 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span className="text-sm font-medium text-purple-700">
              Round Trip Transfer Included
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Return pickup: {formatDate(details.returnPickupDate)} at{" "}
            {details.returnPickupTime}
          </div>
        </div>
      </div>
    )}
  </div>
);

const TransferDetails = ({ reservation: { details } }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Passenger & Vehicle Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Transfer Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Passengers:</span>
            <div className="flex items-center">
              <span className="font-medium text-lg mr-2">
                {details.passengers}
              </span>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Vehicle Type:</span>
            <div className="flex items-center">
              <span className="text-2xl mr-2">
                {getVehicleIcon(details.vehicleType)}
              </span>
              <span className="font-medium capitalize">
                {details.vehicleType}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transfer Type:</span>
            <span className="font-medium">
              {getTransferTypeText(details.transferType)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Trip Type:</span>
            <span className="font-medium">
              {details.returnTransfer ? "Round Trip" : "One Way"}
            </span>
          </div>
        </div>
      </div>

      {/* Schedule Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-gray-600 mb-1">Outbound Transfer</div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {getFormattedDate(details.pickupDate)}
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                {details.pickupTime}
              </span>
            </div>
          </div>

          {details.returnTransfer && (
            <div>
              <div className="text-sm text-gray-600 mb-1">Return Transfer</div>
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {getFormattedDate(details.returnPickupDate)}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  {details.returnPickupTime}
                </span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Transfers:</span>
              <span className="font-medium">
                {details.returnTransfer ? "2" : "1"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
