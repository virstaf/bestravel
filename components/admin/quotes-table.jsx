"use client";

import { redirect } from "next/navigation";
import Table from "../Table/Table";

// import { Table } from "../ui/table";

const QuotesTable = ({ quotes = [], title, limit = 10 }) => {
  if (!quotes || quotes.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-500">No quotes available</p>
      </div>
    );
  }


  const columns = [
    { key: "srNo", header: "S/N", sortable: true, align: "center" },
    {
      key: "quote_number",
      header: "QUOTE NO.",
      sortable: true,
      align: "center",
    },
    { key: "trip_name", header: "TRIP NAME", sortable: true, align: "center" },
    {
      key: "total_amount",
      header: "TOTAL AMOUNT",
      sortable: true,
      align: "center",
    },
    { key: "status", header: "STATUS", sortable: true, align: "center" },
    {
      key: "valid_until",
      header: "VALID UNTIL",
      sortable: true,
      align: "center",
    },
    { key: "actions", header: "ACTIONS", align: "center" },
  ];

  const data = quotes.map((quote, index) => ({
    srNo: index + 1,
    quote_number: quote.quote_number,
    trip_name: quote.trip_name,
    total_amount: quote.total_amount,
    status: quote.status,
    valid_until: quote.valid_until || "N/A",
    actions: "View Details",
  }));

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
    // Implement navigation or other actions here
    redirect(`/admin/quotes/${row.quote_number}`); // Example: Navigate to a detail page
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl text-muted-foreground px-4 font-semibold mb-6">
        {title}
      </h1>

      <Table
        columns={columns}
        data={data}
        striped={true}
        hover={true}
        pagination={true}
        pageSize={limit || 10}
        onRowClick={handleRowClick}
        className="mb-8"
      />
    </div>
  );
};

export default QuotesTable;
