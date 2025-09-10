import MetricList from "@/components/admin/metric-list";
import PendingRequestsTable from "@/components/admin/pending-requests-table";
import { summaryMetrics } from "@/lib/admin/dummy-data";
import React from "react";

const AdminHome = () => {
  return (
    <div className="p-4 md:p-8">
      <MetricList metrics={summaryMetrics} />

      <section className="">
        <h2 className=" text-sm uppercase font-bold text-gray-500 ">
          Requires Attention
        </h2>
        <PendingRequestsTable title={"Pending Requests"} />
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
