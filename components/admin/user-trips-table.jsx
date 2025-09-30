import React from "react";
import Table from "../Table/Table";

const UserTripsTable = ({ trips, title }) => {
  if (!trips || trips.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">No trips available!</p>
        <p>Trips will appear here.</p>
      </div>
    );
  }

  const columns = [
    { key: "srNo", header: "S/N", sortable: true, align: "center" },
    { key: "title", header: "Trip Name", sortable: true },
    { key: "destination", header: "Destination", sortable: true },
    { key: "start_date", header: "Start Date", sortable: true, align: "center" },
    { key: "end_date", header: "End Date", sortable: true, align: "center" },
    { key: "status", header: "Status", align: "center", sortable: true },
  ];
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl text-muted-foreground px-4 font-semibold mb-6">
        {title}
      </h1>

      <Table columns={columns} data={trips} />
    </div>
  );
};

export default UserTripsTable;
