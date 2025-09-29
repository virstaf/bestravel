import { getAllUsers } from "@/actions/admin/users";
import UsersTable from "@/components/admin/users-table";
import NavSummary from "@/components/NavSummary";
import React from "react";

const UsersPage = async () => {
  const users = await getAllUsers();
  const pathname = "/admin/users";

  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <h1 className="text-2xl font-bold text-muted-foreground hidden">
        All Users
      </h1>
      <h2 className="text-lg font-semibold text-center text-gray-500 mb-4">
        View and Manage all Users
      </h2>
      <UsersTable title={"All Users"} users={users} />
    </div>
  );
};

export default UsersPage;
