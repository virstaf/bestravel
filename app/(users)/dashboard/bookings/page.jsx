import DashHeader from "@/components/dash-header";
import React from "react";

const BookingsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="My Bookings"
        description="😎 Manage all your bookings"
      />
      <div className="w-full min-h-[calc(100vh-180px)] mx-auto flex flex-col justify-center">
        <p className="text-center">All bookings will be displayed here.</p>
      </div>
    </div>
  );
};

export default BookingsPage;
