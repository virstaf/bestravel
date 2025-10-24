"use client";

import React from "react";
import { getFormattedDateTime } from "@/lib/getFormattedDate";
import Table from "@/components/Table/Table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import UserActions from "@/components/admin/user-actions";
import AuthUserActions from "@/components/admin/auth-user-actions";

const UnverifiedUsersTable = ({ title, users, limit = 50 }) => {
  // const users = await getAuthUsers();
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
    { key: "name", header: "Name", sortable: true, align: "left" },
    { key: "email", header: "Email", sortable: true, align: "left" },
    { key: "created_at", header: "Created at", sortable: true, align: "left" },
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
            <AuthUserActions row={row} />
          </HoverCardContent>
        </HoverCard>
      ),
    },
  ];

  const unverifiedUsers = users.filter(
    (user) => user.user_metadata && user.user_metadata.email_verified === false
  );

  const verifiedUsers = users.filter(
    (user) => user.user_metadata && user.user_metadata.email_verified === true
  );

  const data = unverifiedUsers.map((user, index) => ({
    srNo: index + 1,
    id: user.id,
    name: user.user_metadata.full_name,
    email: user.email,
    created_at: getFormattedDateTime(user.created_at),
  }));

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
        // onRowClick={handleRowClick}
        className="mb-8"
      />
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
    </div>
  );
};
export default UnverifiedUsersTable;
