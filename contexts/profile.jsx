"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProfileAction } from "@/actions/profiles";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const ProfileContext = createContext(null);

// Encryption key (store this in an environment variable)
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_PROFILE_ENCRYPTION_KEY;

export const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    is_subscribed: null,
    trialActive: false,
    trialEndDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Encrypt and store profile
  // const persistProfile = (profile) => {
  //   const encryptedData = CryptoJS.AES.encrypt(
  //     JSON.stringify(profile),
  //     ENCRYPTION_KEY
  //   ).toString();
  //   localStorage.setItem("encryptedProfile", encryptedData);
  //   Cookies.set("profileCacheValid", "true", { expires: 1 }); // 1-day cache
  // };

  // Retrieve and decrypt profile
  // const getPersistedProfile = () => {
  //   const encryptedData = localStorage.getItem("encryptedProfile");
  //   if (!encryptedData) return null;
  //   try {
  //     const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  //     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   } catch (error) {
  //     console.error("Decryption failed:", error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    const fetchProfile = async () => {
      // Skip fetch if cached data is valid
      // const cacheValid = Cookies.get("profileCacheValid");
      // const persistedProfile = getPersistedProfile();

      // if (cacheValid && persistedProfile) {
      //   setUserProfile(persistedProfile);
      //   setIsLoading(false);
      //   return;
      // }

      // Fetch fresh data
      const { profile, error } = await getProfileAction();
      if (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
        return;
      }
      if (profile) {
        setUserProfile(profile);
        // persistProfile(profile); // Encrypt and store
      }
      setIsLoading(false);
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
  const { isLoading, profile } = context || {};
  if (!isLoading && !profile) {
    return {
      isLoading: true,
      profile: null,
    };
  }
  return { isLoading, profile };
};
export default ProfileContext;
