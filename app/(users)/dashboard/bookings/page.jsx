import { getUserQuotes } from "@/actions/quotes";
import DashHeader from "@/components/dash-header";
import { getUser } from "@/lib/supabase/server";
import React from "react";

const BookingsPage = async () => {
  const user = await getUser();
  const quotes = await getUserQuotes(user.id);
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="My Bookings"
        description="😎 Manage all your bookings"
      />
      <div className="w-full min-h-[calc(100vh-180px)] mx-auto flex flex-col justify-center">
        {quotes.length > 0 ? (
          <pre>{JSON.stringify(quotes, null, 2)}</pre>
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
