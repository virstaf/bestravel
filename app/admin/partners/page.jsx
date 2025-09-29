import NavSummary from "@/components/NavSummary";
import React from "react";

const AdminPartnersPage = () => {
  const pathname = "/admin/partners";
  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <h1 className="text-2xl font-bold text-muted-foreground hidden">
        All Partners
      </h1>
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        View and Manage all Partners
      </h2>
    </div>
  );
};

export default AdminPartnersPage;
