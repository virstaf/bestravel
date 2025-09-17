import { getAllReservations } from "@/actions/admin/reservation";
import ReservationTable from "@/components/admin/reservation-table";
import React from "react";

const AdminReservationPage = async () => {
  const reservations = await getAllReservations();

  // console.log(
  //   "Reservations data:::",
  //   (reservations && reservations[0]) || "No reservations found"
  // );
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-muted-foreground hidden">
        All Reservations
      </h1>
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        View and Manage all Trip Requests
      </h2>
      <ReservationTable
        title={"All Reservations"}
        reservations={reservations}
      />
    </div>
  );
};

export default AdminReservationPage;
