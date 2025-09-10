import MetricList from "@/components/admin/metric-list";
import { summaryMetrics } from "@/lib/admin/dummy-data";
import React from "react";

const AdminHome = () => {
  return (
    <div className="p-4 md:p-8">
      <MetricList metrics={summaryMetrics} />
    </div>
  );
};

export default AdminHome;
