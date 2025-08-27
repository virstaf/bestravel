import React from "react";
import {
  adminListReservationsAction,
  adminUpdateReservationStatusAction,
  adminDeleteReservationAction,
} from "@/actions/admin/reservations";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function AdminReservationPage({ searchParams }) {
  const q = searchParams?.q || "";
  const status = searchParams?.status || undefined;
  const type = searchParams?.type || undefined;
  const page = Number(searchParams?.page || 1);
  const size = Number(searchParams?.size || 20);

  const { data: reservations } = await adminListReservationsAction({
    q,
    status,
    type,
    page,
    size,
  });

  async function updateStatus(formData) {
    "use server";
    const id = formData.get("id");
    const status = formData.get("status");
    await adminUpdateReservationStatusAction(id, status);
  }

  async function remove(formData) {
    "use server";
    const id = formData.get("id");
    await adminDeleteReservationAction(id);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Reservations</h1>
      <div className="grid gap-3">
        {reservations?.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <div className="space-y-1">
              <div className="font-medium">{r.fullname || r.email}</div>
              <div className="text-xs text-muted-foreground">
                {r.type} • {r.status}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <form action={updateStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={r.id} />
                <Select name="status" defaultValue={r.status || "pending"}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="confirmed">confirmed</SelectItem>
                    <SelectItem value="completed">completed</SelectItem>
                    <SelectItem value="cancelled">cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </form>
              <form action={remove}>
                <input type="hidden" name="id" value={r.id} />
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
