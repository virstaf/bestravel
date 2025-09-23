"use client";

// pages/index.js
import React from "react";
import Table from "../Table/Table";
import { getFormattedDateTime } from "@/lib/getFormattedDate";

const PendingRequestsTable = ({ title, reservations }) => {
  const columns = [
    {
      key: "id",
      header: "ID",
      sortable: true,
      align: "center",
    },
    {
      key: "name",
      header: "Name",
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, row) => (
        <div className="flex space-x-2 justify-center">
          <button className="text-blue-600 hover:text-blue-800">Edit</button>
          <button className="text-red-600 hover:text-red-800">Delete</button>
        </div>
      ),
    },
  ];

  const data = reservations.map((res, index) => ({
    srNo: index + 1,
    ref_id: "REQ-00" + res.ref_id,
    user: res.user.name,
    plan: res.user.plan,
    trip: res.trip.name,
    type: res.type,
    submitted: getFormattedDateTime(res.created_at),
    status: res.status,
  }));

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl text-muted-foreground px-4 font-semibold mb-6">
        {title}
      </h1>

      <Table
        columns={columns}
        data={data}
        striped={true}
        hover={true}
        pagination={true}
        pageSize={5}
        onRowClick={handleRowClick}
        className="mb-8"
      />
    </div>
  );
};

export default PendingRequestsTable;
