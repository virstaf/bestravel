import { getReservation } from "@/actions/reservations";
import { Button } from "@/components/ui/button";
import Status from "@/components/ui/status";
import { getFormattedDate, getFormattedDateTime } from "@/lib/getFormattedDate";

const ReservationsPage = async ({ params }) => {
  const { res_id } = await params;
  const [reservation] = await getReservation(res_id);
  const type = reservation.type;
  return (
    <div>
      {type === "flight" && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <ReservationHeader reservation={reservation} />
          <FlightRoute reservation={reservation} />
          <FlightDetails reservation={reservation} />
          <SpecialRequests reservation={reservation} />
          <ReservationMeta reservation={reservation} />
          <ActionButtons res_id={reservation.id} />
        </div>
      )}
      {/* <pre>{JSON.stringify(reservation, null, 2)}</pre> */}
    </div>
  );
};

export default ReservationsPage;

const ReservationHeader = ({ reservation: { ref_id, status } }) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Flight Reservation</h1>
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

      <div className="flex-1 mx-4">
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

const ActionButtons = (res_id) => (
  <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
    <Button variant={"outline"}>Modify Reservation</Button>
    <Button variant="destructive">Cancel Flight</Button>
  </div>
);
