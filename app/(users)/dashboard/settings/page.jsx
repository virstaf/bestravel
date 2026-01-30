import DashHeader from "@/components/dash-header";
import Settings from "@/components/settings-page";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 w-full h-full">
      <DashHeader
        page="Settings"
        description="Manage your account preferences and profile information"
      />
      <div className="mt-8">
        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
