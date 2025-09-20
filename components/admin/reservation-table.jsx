"use client";

// pages/index.js
import { useState, useMemo } from "react";
import Table from "../Table/Table";
import { getFormattedDateTime } from "@/lib/getFormattedDate";
import { redirect } from "next/navigation";
import { List } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { UserCheck } from "lucide-react";
import { Eye } from "lucide-react";
import { Mail } from "lucide-react";
import { Trash2 } from "lucide-react";
import { set } from "date-fns";

const ReservationTable = ({ title, reservations }) => {
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
      render: (_, row) => {
        // State to track which row's menu is open
        const [openMenuId, setOpenMenuId] = useState(null);

        // Function to close menu when clicking outside
        const handleClickOutside = () => {
          setOpenMenuId(null);
        };
        const isOpen = openMenuId === row.id;

        const handleViewDetails = () => {
          console.log("View details for:", row.id);
          setOpenMenuId(null);
        };

        const handleAssignToMe = () => {
          console.log("Assign to me:", row.id);
          setOpenMenuId(null);
        };

        const handleChangeStatus = () => {
          console.log("Change status for:", row.id);
          setOpenMenuId(null);
        };

        const handleContactUser = () => {
          console.log("Contact user:", row.id);
          setOpenMenuId(null);
        };

        const handleDelete = () => {
          console.log("Delete:", row.id);
          setData(data.filter((item) => item.id !== row.id));
          setOpenMenuId(null);
        };

        return (
          <div className="flex justify-center relative">
            <div
              onMouseEnter={(e) => {
                e.stopPropagation();
                setTimeout(() => {
                  setOpenMenuId(isOpen ? null : row.id);
                }, 1000);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setTimeout(() => {
                  setOpenMenuId(null);
                }, 5000);
              }}
              className="text-gray-500 hover:text-primary p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <List className="h-4 w-4" />
            </div>

            {isOpen && (
              <>
                {/* Backdrop to capture outside clicks */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={handleClickOutside}
                />

                {/* Menu options */}
                <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-20 w-48 py-1">
                  <button
                    onClick={handleViewDetails}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={handleAssignToMe}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Assign to Me
                  </button>
                  <button
                    onClick={handleChangeStatus}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Change Status
                  </button>
                  <button
                    onClick={handleContactUser}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact User
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        );
      },
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
    // console.log("Row clicked:", row);
    redirect(`/admin/reservations/${row.ref_id}`);
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
