import { getUserReservations } from "@/actions/admin/reservation";
import { getUserTrips } from "@/actions/admin/trips";
import { getUserById } from "@/actions/admin/users";
import UserReservationsTable from "@/components/admin/user-reservations-table";
import UserTripsTable from "@/components/admin/user-trips-table";
import { UserCard } from "@/components/admin/UserCard";
import NavSummary from "@/components/NavSummary";
import NoteTextBox from "@/components/ui/NoteTextBox";
import React from "react";

const UserDetailPage = async ({ params }) => {
  const { customer_id } = await params;
  const pathname = `/admin/users/${customer_id}`;
  const user = await getUserById(customer_id);
  const userId = user?.id;
  const userTrips = await getUserTrips(userId);
  const userReservations = await getUserReservations(userId);

  // console.log("userReservations:::", userReservations);

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8">
      <NavSummary pathname={pathname} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 ">
        <UserCard user={user} />
        <NoteTextBox />
      </div>
      <UserTripsTable trips={userTrips} title="User Trips" />
      <UserReservationsTable
        reservations={userReservations}
        title="User Reservations"
      />
      {/* <pre className="mt-4">{JSON.stringify(userReservations, null, 2)}</pre> */}
    </div>
  );
};

export default UserDetailPage;
