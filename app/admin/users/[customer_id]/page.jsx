import { getUserTrips } from "@/actions/admin/trips";
import { getUserById } from "@/actions/admin/users";
import UserTripsTable from "@/components/admin/user-trips-table";
import { UserCard } from "@/components/admin/UserCard";
import NavSummary from "@/components/NavSummary";
import React from "react";

const UserDetailPage = async ({ params }) => {
  const { customer_id } = await params;
  const pathname = `/admin/users/${customer_id}`;
  const user = await getUserById(customer_id);
  const userId = user?.id;
  const userTrips = await getUserTrips(userId);

  // console.log("userTrips:::", userTrips);

  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <UserCard user={user} />
      <UserTripsTable trips={userTrips} title="User Trips" />
      {/* <pre className="mt-4">{JSON.stringify(userTrips, null, 2)}</pre> */}
    </div>
  );
};

export default UserDetailPage;
