"use client";

import Table from "../Table/Table";
import { getFormattedDateTime } from "@/lib/getFormattedDate";
import { redirect } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent } from "../ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import ReservationActions from "./reservation-actions";

const ReservationTable = ({ title, reservations, limit }) => {
  if (!reservations || reservations.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">No reservations available!</p>
        <p>Reservations will appear here.</p>
      </div>
    );
  }

  const columns = [
    { key: "srNo", header: "S/N", sortable: true, align: "center" },
    { key: "ref_id", header: "REF ID", sortable: true, align: "center" },
    { key: "user", header: "User", sortable: true },
    { key: "plan", header: "Plan", sortable: true, align: "center" },
    { key: "trip", header: "Trip", sortable: true },
    { key: "type", header: "Type", sortable: true },
    { key: "submitted", header: "Submitted", sortable: true },
    // { key: "dates", header: "Dates", align: "center", sortable: true },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "confirmed"
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
        <HoverCard row={row}>
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
            <ReservationActions row={row} setData={() => {}} />
          </HoverCardContent>
        </HoverCard>
      ),
    },
  ];

  const data = reservations.map((res) => ({
    srNo: reservations.indexOf(res) + 1,
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
    // redirect(`/admin/reservations/${row.ref_id}`);
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
        pageSize={limit ||10}
        onRowClick={handleRowClick}
        className="mb-8"
      />
    </div>
  );
};

export default ReservationTable;
