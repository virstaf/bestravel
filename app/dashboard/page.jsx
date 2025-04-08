import DashHeader from "@/components/dash-header";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="Overview"
        description="🌴 Ready for your next adventure?"
      />
    </div>
  );
};

export default page;
