"use client";

import { useProfileContext } from "@/contexts/profile";

const ProfilePage = () => {
  const profile = useProfileContext();
  console.log("Profile context:", profile);
  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
