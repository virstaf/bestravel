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
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="max-w-4xl mx-auto bg-muted/50 border rounded-lg p-1 grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-background"
          >
            My Account
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="data-[state=active]:bg-background"
          >
            My Subscription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" id="account-settings" className="mt-0">
          {!profile && (
            <div className="text-red-500 text-center">
              Failed to load profile data.
            </div>
          )}
          {profile && <ProfileForm profile={profile} />}
        </TabsContent>

        <TabsContent
          value="subscription"
          id="subscription-settings"
          className="mt-0"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Subscription Settings</h2>
            <SubscriptionSettings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
