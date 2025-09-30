import { getAllReservations } from "@/actions/admin/reservation";
import ReservationTable from "@/components/admin/reservation-table";
import NavSummary from "@/components/NavSummary";
import React from "react";

const AdminReservationPage = async () => {
  const reservations = await getAllReservations();
  const pathname = "/admin/reservations";

  return (
    <div className="p-4 md:p-8">
      {/* <div className="flex justify-between items-center"> */}
      <NavSummary pathname={pathname} />
      <h2 className="text-lg text-center font-semibold text-gray-500 mb-4">
        View and Manage all Trip Requests
      </h2>
      {/* </div> */}
      <h1 className="text-2xl font-bold text-muted-foreground hidden">
        All Reservations
      </h1>
      <ReservationTable
        title={"All Reservations"}
        reservations={reservations}
      />
    </div>
  );
};

export default AdminReservationPage;
