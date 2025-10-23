import {getAllUsers, getAuthUsers} from "@/actions/admin/users";
import UsersTable from "@/components/admin/users-table";
import NavSummary from "@/components/NavSummary";
import React from "react";
import UnverifiedUsersTable from "@/components/admin/UnverifiedUsersTable";

const UsersPage = async () => {
  const users = await getAllUsers();
    const authUsers = await getAuthUsers();
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
        <div className="">
            <h2 className="text-lg font-semibold text-center text-gray-500 mb-4">
                View and Unverified Users
            </h2>
            <UnverifiedUsersTable title={"Users Awaiting Verification"} users={authUsers} />
        </div>
    </div>
  );
};

export default UsersPage;
