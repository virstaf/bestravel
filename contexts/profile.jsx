"use client";

/**
 * Auth / Profile Context — Phase 2 Migration
 *
 * Replaced the Supabase A `getProfileAction` with a direct call to
 * FastAPI `GET /v1/app/me` using the stored JWT token.
 *
 * User shape (from FastAPI AppUserResponse):
 * {
 *   id: string (UUID)
 *   email: string
 *   phone: string
 *   user_type: "APPUSER" | "ADMINUSER" | "MIDUSER"
 *   channel: "WEB" | "MOBILE" | "USSD"
 *   is_kyc_completed: boolean | null
 *   kyc: CustomerKYCResponse | null
 *   created_at: string (ISO datetime)
 *   last_login_at: string | null
 * }
 */

import { createContext, useContext, useEffect, useState } from "react";
import { getProfileAction } from "@/actions/profiles";
import { getClientToken } from "@/lib/session";

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children, initialProfile = null }) => {
  const [user, setUser] = useState(initialProfile);
  const [isLoading, setIsLoading] = useState(!initialProfile);

  useEffect(() => {
    // If we already have an initialProfile from the server, we can skip the
    // first client-side fetch unless we want to refresh it.
    if (initialProfile) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { profile, success, error } = await getProfileAction();

        if (success && profile) {
          setUser(profile);
          setIsLoading(false);
          return;
        }

        if (error) {
          console.warn("[ProfileContext] getProfileAction failed:", error);
        }
      } catch (err) {
        console.error("[ProfileContext] Failed to fetch user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [initialProfile]);

  return (
    <ProfileContext.Provider value={{ profile: user, user, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  const { isLoading, profile, user } = context || {};

  if (!isLoading && !profile) {
    return { isLoading: true, profile: null, user: null };
  }

  return { isLoading, profile, user };
};

export default ProfileContext;
