import {
  getAllReservations,
  pendingRequestsCount,
  reservationsThisMonthCount,
} from "@/actions/admin/reservation";
import { getAllUsers, newUsersCount } from "@/actions/admin/users";
import MetricList from "@/components/admin/metric-list";
import ReservationTable from "@/components/admin/reservation-table";
import UsersTable from "@/components/admin/users-table";
import { Users } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";

const AdminHome = async () => {
  const reservations = await getAllReservations();
  const users = await getAllUsers();
  const pendingRequests = await pendingRequestsCount();
  const reservationsThisMonth = await reservationsThisMonthCount();
  const newUsers = await newUsersCount();

  const summaryMetrics = [
    {
      title: "Total Pending Requests",
      value: pendingRequests,
      description: "Requests that are pending approval",
      icon: Clock,
      status: "warning",
    },
    {
      title: "Reservations this Month",
      value: reservationsThisMonth,
      description: "Total reservations made this month",
      icon: Calendar,
      status: "success",
    },
    {
      title: "New Users this Week",
      value: newUsers,
      description: "Total new users registered this week",
      icon: Users,
      status: "success",
    },
    {
      title: "Average Response Time",
      value: "4h 30m",
      description: "Current average response time",
      icon: MessageSquare,
      status: "error",
    },
  ];

  console.log("pending:: ", pendingRequests);
  console.log("this month:: ", reservationsThisMonth);
  console.log("new users:: ", newUsers);

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
