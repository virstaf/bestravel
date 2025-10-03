import NavSummary from "@/components/NavSummary";
import React from "react";

const AdminQuotesPage = () => {
  const pathname = "/admin/quotes";
  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <h1 className="text-2xl font-bold text-muted-foreground hidden">
        All Quotes
      </h1>
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        View and Manage all Quotes
      </h2>
    </div>
  );
};

export default AdminQuotesPage;
