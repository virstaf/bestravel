import { getReservation } from "@/actions/admin/reservation";
import { getFormattedDate, getFormattedDateTime } from "@/lib/getFormattedDate";
import React from "react";

const ReservationDetailPage = async ({ params }) => {
  const { ref_id } = await params;
  const refId = ref_id.split("REQ-00")[1];
  const data = await getReservation(refId);
  // console.log("res data:", data);

  const reducedData = {
    status: data?.status,
    full_name: data?.user?.name,
    trip_name: data?.trip?.name,
    dates: [data?.start_date, data?.end_date],
    type: data?.type,
  };


  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-4">Reservation Detail Page {ref_id}</h1>
      <div>
        <ReservationCard reservation={reducedData} />
      </div>
      <pre className="mt-20">{JSON.stringify(reducedData, null, 2)}</pre>
      <pre className="mt-20">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ReservationDetailPage;

const ReservationCard = ({
  reservation: { status, full_name, trip_name, dates },
}) => {
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <DataRow label="Status" value={status} />
      <DataRow label="Full Name" value={full_name} />
      <DataRow label="Trip Name" value={trip_name} />
      <DataRow
        label="Dates"
        value={dates.map((date) => getFormattedDate(date)).join(" - ")}
      />
    </div>
  );
};

const HotelDetailCard = ({ hotel }) => {
  const { name, address, checkIn, checkOut } = hotel;
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <DataRow label="Hotel Name" value={name} />
      <DataRow label="Address" value={address} />
      <DataRow label="Check-In" value={getFormattedDate(checkIn)} />
      <DataRow label="Check-Out" value={getFormattedDate(checkOut)} />
    </div>
  );
};

const FlightDetailCard = ({ flight }) => {
  const { airline, flightNumber, departure, arrival } = flight;
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <DataRow label="Airline" value={airline} />
      <DataRow label="Flight Number" value={flightNumber} />
      <DataRow label="Departure" value={getFormattedDateTime(departure)} />
      <DataRow label="Arrival" value={getFormattedDateTime(arrival)} />
    </div>
  );
};

const TransferDetailCard = ({ transfer }) => {
  const { type, pickupLocation, dropoffLocation, pickupTime } = transfer;
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <DataRow label="Transfer Type" value={type} />
      <DataRow label="Pickup Location" value={pickupLocation} />
      <DataRow label="Dropoff Location" value={dropoffLocation} />
      <DataRow label="Pickup Time" value={getFormattedDateTime(pickupTime)} />
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="grid grid-cols-[100px_1fr] gap-4 mb-2">
    <p className="font-semibold">{label}:</p>
    <p>{value}</p>
  </div>
);
