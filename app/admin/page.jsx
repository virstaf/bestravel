import { getAllReservations } from "@/actions/admin/reservation";
import { getAllUsers } from "@/actions/admin/users";
import MetricList from "@/components/admin/metric-list";
import ReservationTable from "@/components/admin/reservation-table";
import UsersTable from "@/components/admin/users-table";
import { summaryMetrics } from "@/lib/admin/dummy-data";
import React from "react";

const AdminHome = async () => {
  const reservations = await getAllReservations();
  const users = await getAllUsers();
  return (
    <div className="p-4 md:p-8">
      <MetricList metrics={summaryMetrics} />

      <section className="">
        <h2 className=" text-sm uppercase font-bold text-gray-500 ">
          Requires Attention
        </h2>
        <div className="">
          <ReservationTable
            title={"Recent Reservations"}
            reservations={reservations}
            limit={5}
          />
          <UsersTable title={"Recent Users"} users={users} limit={5} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-sm uppercase font-bold text-gray-500">
          Recent Activity
        </h2>
        {/* Future component for recent activity can be placed here */}
      </section>
    </div>
  );
};

export default AdminHome;
