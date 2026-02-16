import {
  getAllReservations,
  pendingRequestsCount,
  reservationsThisMonthCount,
} from "@/actions/admin/reservation";
import { getAllUsers, newUsersCount } from "@/actions/admin/users";
import MetricList from "@/components/admin/metric-list";
import ReservationTable from "@/components/admin/reservation-table";
import UsersTable from "@/components/admin/users-table";
import { BookOpenTextIcon } from "@/components/ui/BookOpenTextIcon";
import { FolderIcon } from "@/components/ui/FolderIcon";
import { MessageCircleIcon } from "@/components/ui/MessageCircleIcon";
import { UsersRoundIcon } from "@/components/ui/UsersRoundIcon";
import AnalyticsDashboard from "@/components/admin/analytics-dashboard";

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
      icon: BookOpenTextIcon,
      status: "warning",
      link: "/admin/reservations",
    },
    {
      title: "Reservations this Month",
      value: reservationsThisMonth,
      description: "Total reservations made this month",
      icon: FolderIcon,
      status: "success",
      link: "/admin/reservations",
    },
    {
      title: "New Users this Week",
      value: newUsers,
      description: "Total new users registered this week",
      icon: UsersRoundIcon,
      status: "success",
      link: "/admin/users",
    },
    {
      title: "Average Response Time",
      value: "4h 30m",
      description: "Current average response time",
      icon: MessageCircleIcon,
      status: "error",
      link: "/admin/users",
    },
  ];

  // console.log("pending:: ", pendingRequests);
  // console.log("this month:: ", reservationsThisMonth);
  // console.log("new users:: ", newUsers);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Subscription Analytics</h2>
        <AnalyticsDashboard />
      </div>

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
