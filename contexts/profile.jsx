"use client";

import { getProfileAction } from "@/actions/profiles";
import { createContext, useContext, useEffect, useState } from "react";

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    email: "",
    name: "",
  });
  useEffect(() => {
    const fetchProfile = async () => {
      const { profile, error } = await getProfileAction();
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
      if (profile) {
        setUserProfile(profile);
        console.log("Profile fetched:", profile);
      }
    };
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={userProfile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
export default ProfileContext;
