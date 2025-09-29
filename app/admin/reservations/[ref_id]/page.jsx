import { getReservation } from "@/actions/admin/reservation";
import NavSummary from "@/components/NavSummary";
import { getFormattedDate, getFormattedDateTime } from "@/lib/getFormattedDate";

const ReservationDetailPage = async ({ params }) => {
  const { ref_id } = await params;
  const refId = ref_id.split("REQ-00")[1];
  const data = await getReservation(refId);
  const pathname = `/admin/reservations/${ref_id}`;

  const reducedData = {
    status: data?.status,
    full_name: data?.user?.name,
    trip_name: data?.trip?.name,
    dates: [data?.start_date, data?.end_date],
    type: data?.type,
    details: data?.details,
  };

  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <div>
        <ReservationCard reservation={reducedData} />
      </div>

      {reducedData.type === "hotel" && (
        <div className="mt-8">
          <HotelDetailCard hotel={reducedData.details} />
        </div>
      )}
      {reducedData.type === "flight" && (
        <div className="mt-8">
          <FlightDetailCard flight={reducedData.details} />
        </div>
      )}
      {reducedData.type === "transfer" && (
        <div className="mt-8">
          <TransferDetailCard transfer={reducedData.details} />
        </div>
      )}

      {/* <pre className="mt-20">{JSON.stringify(reducedData, null, 2)}</pre> */}
      {/* <pre className="mt-20">{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default ReservationDetailPage;

const ReservationCard = ({
  reservation: { status, full_name, trip_name, dates, type },
}) => {
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <h2 className="text-lg font-semibold text-primary mb-4">Trip Details</h2>
      <DataRow label="Status" value={status} />
      <DataRow label="Full Name" value={full_name} />
      <DataRow label="Trip Name" value={trip_name} />
      <DataRow
        label="Dates"
        value={dates.map((date) => getFormattedDate(date)).join(" - ")}
      />
      <DataRow label="Type" value={type} />
    </div>
  );
};

const HotelDetailCard = ({ hotel }) => {
  const {
    city,
    meals,
    rooms,
    checkIn,
    checkOut,
    starRating,
    preferredHotel,
    preferredLocation,
    specialRequests,
  } = hotel;
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <h2 className="text-lg font-semibold text-primary mb-4">Hotel Details</h2>
      <DataRow label="City" value={city} />
      <DataRow label="Meals" value={meals} />
      <DataRow label="Rooms" value={rooms} />
      <DataRow label="Star Rating" value={starRating} />
      <DataRow label="Check-In" value={getFormattedDate(checkIn)} />
      <DataRow label="Check-Out" value={getFormattedDate(checkOut)} />
      <DataRow label="Chosen Location" value={preferredLocation} />
      <DataRow label="Chosen Hotel" value={preferredHotel} />
      <DataRow label="Special Requests" value={specialRequests || "N/A"} />
    </div>
  );
};

const FlightDetailCard = ({ flight }) => {
  const {
    class: flightClass,
    adults,
    children,
    checkInBag,
    returnDate,
    arrivalCity,
    departureCity,
    departureDate,
    specialRequests,
    airlinePreference,
  } = flight;
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Flight Details
      </h2>
      <DataRow label="Class" value={flightClass} />
      <DataRow label="Adults" value={adults} />
      <DataRow label="Children" value={children} />
      <DataRow label="Checked-in Bag" value={checkInBag ? "Yes" : "No"} />
      <DataRow label="Return Date" value={getFormattedDate(returnDate)} />
      <DataRow label="Arrival City" value={arrivalCity} />
      <DataRow label="Departure City" value={departureCity} />
      <DataRow label="Departure Date" value={getFormattedDate(departureDate)} />
      <DataRow label="Special Requests" value={specialRequests || "N/A"} />
      <DataRow label="Airline Preference" value={airlinePreference || "N/A"} />
    </div>
  );
};

const TransferDetailCard = ({ transfer }) => {
  const {
    passengers,
    pickupDate,
    pickupTime,
    vehicleType,
    transferType,
    pickupLocation,
    returnTransfer,
    dropoffLocation,
    specialRequests,
    returnPickupDate,
    returnPickupTime,
  } = transfer;
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Transfer Details
      </h2>
      <DataRow label="Passengers" value={passengers} />
      <DataRow label="Pickup Date" value={getFormattedDate(pickupDate)} />
      <DataRow label="Pickup Time" value={pickupTime} />
      <DataRow label="Vehicle Type" value={vehicleType} />
      <DataRow label="Transfer Type" value={transferType} />
      <DataRow label="Pickup Location" value={pickupLocation} />
      <DataRow label="Dropoff Location" value={dropoffLocation} />
      <DataRow label="Return Transfer" value={returnTransfer ? "Yes" : "No"} />
      {returnTransfer && (
        <>
          <DataRow
            label="Return Pickup Date"
            value={getFormattedDate(returnPickupDate)}
          />
          <DataRow label="Return Pickup Time" value={returnPickupTime} />
        </>
      )}
      <DataRow label="Special Requests" value={specialRequests || "N/A"} />
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="grid grid-cols-[120px_1fr] gap-4 mb-2">
    <p className="font-semibold">{label}:</p>
    <p>{value}</p>
  </div>
);
