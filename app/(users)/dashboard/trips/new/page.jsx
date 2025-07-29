import React from "react";
import NewTripForm from "@/components/new-trip-form";
import DashHeader from "@/components/dash-header";

const NewTripPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="New Trip" description="😍 More adventure waiting!" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] my-2">
        <div className="w-full h-full flex items-center justify-center my-12">
          <NewTripForm />
        </div>
      </div>
    </div>
  );
};

export default NewTripPage;
