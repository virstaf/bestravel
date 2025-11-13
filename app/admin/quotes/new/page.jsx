import AddQuoteForm from "@/components/AddQuoteForm";
import NavSummary from "@/components/NavSummary";
import { getAdminUser } from "@/lib/supabase/admin/server";
import React from "react";

const NewQuotePage = async () => {
  const pathname = "/admin/quotes/new";
  const user = await getAdminUser();
  const adminId = user?.sub;

  return (
    <div className="relative w-full h-full p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <h1 className="text-2xl font-bold text-muted-foreground">
        Create New Quote
      </h1>
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        Create a new quote for a trip
      </h2>
      <div className="w-full flex justify-center">
        <AddQuoteForm adminId={adminId} />
      </div>
    </div>
  );
};

export default NewQuotePage;
