"use client";

import ProfileForm from "@/components/profile-form";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LoaderIcon } from "lucide-react";
import { useProfileContext } from "@/contexts/profile";
import SubscriptionSettings from "./subscription-settings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { profile, isLoading } = useProfileContext();

  if (isLoading) {
    return (
      <div className="container py-8 px-8 mx-auto w-full h-full">
        <div className="text-center text-gray-500">
          Loading profile...
          <div className="text-center w-full flex justify-center mt-4">
            <LoaderIcon className="inline-block animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-8 mx-auto w-full h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="max-w-4xl mx-auto bg-gray-200 border border-gray-300 rounded-lg p-0.5 grid w-full grid-cols-2 mb-4">
          {/* <TabsTrigger value="general">General</TabsTrigger> */}
          <TabsTrigger value="account">My Account</TabsTrigger>
          <TabsTrigger value="subscription">My Subscription</TabsTrigger>
        </TabsList>

        {/* <TabsContent value="general" id="general-settings">
          <h1 className="text-3xl font-bold mb-6 text-center">
            General Settings
          </h1>
        </TabsContent> */}
        <TabsContent value="account" id="account-settings">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Account Settings
          </h1>
          {/* Account settings content goes here */}
          {!profile && (
            <div className="text-red-500">Failed to load profile data.</div>
          )}
          {profile && (
            <ProfileForm profile={profile} className=" p-4 max-w-3xl mx-auto" />
          )}
        </TabsContent>
        <TabsContent value="subscription" id="subscription-settings">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Subscription Settings
          </h1>
          <section>
            <SubscriptionSettings />
          </section>
          {/* <Pricing /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
