"use client";

import { useProfileContext } from "@/contexts/profile";
import { Loader2Icon } from "lucide-react";

const ProfilePage = () => {
  const { profile, isLoading } = useProfileContext();

  return (
    <div>
      <h1>Profile Page</h1>
      {!isLoading && profile ? (
        <div>
          <h2>{profile.full_name}</h2>
          <p>{profile.email}</p>
        </div>
      ) : (
        <p>
          <Loader2Icon className="animate-spin" />
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
