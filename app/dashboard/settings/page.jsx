import DashHeader from "@/components/dash-header";
import Settings from "@/components/settings-page";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="Settings" description="⚙ Set your preferences" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] border">
        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
