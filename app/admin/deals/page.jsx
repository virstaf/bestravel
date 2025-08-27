import React from "react";
import {
  adminListDealsAction,
  adminPublishDealAction,
  adminDeleteDealAction,
} from "@/actions/admin/deals";
import { Button } from "@/components/ui/button";

export default async function AdminDealsPage({ searchParams }) {
  const q = searchParams?.q || "";
  const status = searchParams?.status || undefined;
  const page = Number(searchParams?.page || 1);
  const size = Number(searchParams?.size || 20);

  const { data: deals } = await adminListDealsAction({ q, status, page, size });

  async function publish(formData) {
    "use server";
    const id = formData.get("id");
    const publish = formData.get("publish") === "true";
    await adminPublishDealAction(id, publish);
  }

  async function remove(formData) {
    "use server";
    const id = formData.get("id");
    await adminDeleteDealAction(id);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Deals</h1>
      <div className="grid gap-3">
        {deals?.map((deal) => (
          <div
            key={deal.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <div className="space-y-1">
              <div className="font-medium">{deal.title}</div>
              <div className="text-xs text-muted-foreground">{deal.status}</div>
            </div>
            <div className="flex items-center gap-2">
              <form action={publish}>
                <input type="hidden" name="id" value={deal.id} />
                <input
                  type="hidden"
                  name="publish"
                  value={deal.status !== "published"}
                />
                <Button variant="outline" size="sm">
                  {deal.status === "published" ? "Unpublish" : "Publish"}
                </Button>
              </form>
              <form action={remove}>
                <input type="hidden" name="id" value={deal.id} />
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
