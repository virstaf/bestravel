import React from "react";
import {
  adminListUsersAction,
  adminUpdateUserRoleAction,
  adminDeactivateUserAction,
} from "@/actions/admin/users";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function UsersPage({ searchParams }) {
  const q = searchParams?.q || "";
  const role = searchParams?.role || undefined;
  const page = Number(searchParams?.page || 1);
  const size = Number(searchParams?.size || 20);

  const { data: users } = await adminListUsersAction({ q, role, page, size });

  async function updateRole(formData) {
    "use server";
    const id = formData.get("id");
    const role = formData.get("role");
    await adminUpdateUserRoleAction(id, role);
  }

  async function toggleActive(formData) {
    "use server";
    const id = formData.get("id");
    const deactivate = formData.get("deactivate") === "true";
    await adminDeactivateUserAction(id, deactivate);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Users</h1>
      <div className="grid gap-3">
        {users?.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <div className="space-y-1">
              <div className="font-medium">{u.full_name || u.email}</div>
              <div className="text-xs text-muted-foreground">{u.email}</div>
            </div>
            <div className="flex items-center gap-2">
              <form action={updateRole} className="flex items-center gap-2">
                <input type="hidden" name="id" value={u.id} />
                <Select name="role" defaultValue={u.role || "USER"}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="MANAGER">MANAGER</SelectItem>
                    <SelectItem value="SUPPORT">SUPPORT</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </form>
              <form action={toggleActive}>
                <input type="hidden" name="id" value={u.id} />
                <input
                  type="hidden"
                  name="deactivate"
                  value={u.is_active !== false}
                />
                <Button variant="destructive" size="sm">
                  {u.is_active === false ? "Activate" : "Deactivate"}
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
