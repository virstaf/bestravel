import { getUserQuotes } from "@/actions/quotes";
import DashHeader from "@/components/dash-header";
import QuoteCard from "@/components/QuoteCard";
import { getUser } from "@/lib/supabase/server";
import React from "react";

const BookingsPage = async () => {
  const user = await getUser();
  const quotes = await getUserQuotes(user.id);

  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="My Quotes"
        description="📋 View and manage your travel quotes"
      />
      <div className="w-full min-h-[calc(100vh-180px)] mx-auto py-6">
        {quotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No quotes yet</h3>
            <p className="text-muted-foreground">
              Your travel quotes will appear here once they're ready.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
