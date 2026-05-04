"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProfileAction } from "@/actions/profiles";

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { profile, error } = await getProfileAction();
        if (error || !profile) {
          setUserProfile(null);
        } else {
          setUserProfile(profile);
        }
      } catch (err) {
        console.error("Error fetching profile in context:", err);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile: userProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    return { profile: null, isLoading: true };
  }
  return context;
};

export default ProfileContext;
