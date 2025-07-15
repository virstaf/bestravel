"use client";

import ProfileForm from "@/components/profile-form";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { getProfileAction } from "@/actions/profiles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Pricing from "./ui/pricing";
import { LoaderIcon } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { profile: profileData, error } = await getProfileAction();

      if (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        return;
      }
      setProfile(profileData);
      setLoading(false);
    };
    fetchProfile();
  }, []);
  if (!profile && loading) {
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-200 border border-gray-300 rounded-lg p-0.5 grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">My Account</TabsTrigger>
          <TabsTrigger value="subscription">My Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="general" id="general-settings">
          <h1 className="text-3xl font-bold mb-6 text-center">
            General Settings
          </h1>
          {!loading && profile && (
            <ProfileForm profile={profile} className=" p-4 max-w-3xl mx-auto" />
          )}
          {!loading && !profile && (
            <div className="text-red-500">Failed to load profile data.</div>
          )}
        </TabsContent>
        <TabsContent value="account" id="account-settings">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Account Settings
          </h1>
          {/* Account settings content goes here */}
        </TabsContent>
        <TabsContent value="subscription" id="subscription-settings">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Subscription Settings
          </h1>
          {/* Subscription settings content goes here */}
          <Pricing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
