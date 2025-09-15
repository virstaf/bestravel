"use client";

import React from "react";
import Table from "../Table/Table";
import { redirect } from "next/navigation";

const UsersTable = ({ title, users }) => {
  if (!users || users.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">No users available!</p>
        <p>Users will appear here.</p>
      </div>
    );
  }

  const columns = [
    { key: "srNo", header: "S/N", sortable: true, align: "center" },
    { key: "id", header: "Member ID", sortable: true, align: "center" },
    { key: "name", header: "Name", sortable: true },
    { key: "plan", header: "Plan", sortable: true },
    { key: "last-active", header: "Last active", sortable: true },
    { key: "email", header: "Email", sortable: true },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : value === "pending"
                ? "bg-orange-100 text-orange-800"
                : value === "rejected"
                  ? "bg-red-100 text-red-800"
                  : value === "cancelled"
                    ? "bg-gray-100 text-gray-800"
                    : value === "in review"
                      ? "bg-blue-100 text-blue-800"
                      : value === "expired"
                        ? "bg-yellow-100 text-yellow-800"
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

  const data = users.map((user, index) => ({
    srNo: index + 1,
    id: user.customer_id,
    name: user.full_name,
    plan: user.subscription_plan || "Free",
    // "last-active":
    //   new Date(user.last_active).toLocaleDateString() || "N/A",
    email: user.email,
    status: user.status || "active",
  }));

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
    redirect(`/admin/users/${row.id}`);
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
        pageSize={10}
        onRowClick={handleRowClick}
        className="mb-8"
      />
    </div>
  );
};

export default UsersTable;
