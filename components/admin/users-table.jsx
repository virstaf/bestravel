"use client";

import React from "react";
import Table from "../Table/Table";
import { redirect } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import UserActions from "./user-actions";
import Status from "../ui/status"

const UsersTable = ({ title, users, limit }) => {
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
       <Status value={value} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, row) => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            side="top"
            align="center"
            className="w-48 p-0 bg-transparent shadow-none border-0"
          >
            <UserActions row={row} />
            {/* <div>Just something...</div> */}
          </HoverCardContent>
        </HoverCard>
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
    // redirect(`/admin/users/${row.id}`);
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
        pageSize={limit || 10}
        onRowClick={handleRowClick}
        className="mb-8"
      />
    </div>
  );
};

export default UsersTable;
