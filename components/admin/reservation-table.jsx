"use client";

// pages/index.js
import React from "react";
import Table from "../Table/Table";

const ReservationTable = ({ title }) => {
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

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "inactive",
    },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "active" },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      status: "active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      status: "inactive",
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana@example.com",
      status: "active",
    },
    {
      id: 7,
      name: "Edward Davis",
      email: "edward@example.com",
      status: "inactive",
    },
    {
      id: 8,
      name: "Fiona Miller",
      email: "fiona@example.com",
      status: "active",
    },
  ];

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

export default ReservationTable;
