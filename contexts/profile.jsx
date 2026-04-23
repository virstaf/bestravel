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
import { getMeFromAPI } from "@/lib/api/auth";
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
        // 1. Try FastAPI path — user has a FastAPI JWT
        const token = getClientToken();

        if (token) {
          const { data, error } = await getMeFromAPI(token);

          if (!error && data) {
            setUser(data);
            setIsLoading(false);
            return;
          }

          // Token might be expired or invalid — clear it
          console.warn("[ProfileContext] FastAPI /me failed:", error);
        }

        // 2. Supabase A fallback — user logged in via legacy path
        //    Check if a Supabase session exists and use it to build a
        //    minimal user object for backward-compatible consumers.
        //    TODO: Remove once all users are on FastAPI.
        const { supabase } = await import("@/lib/supabase/client.js");
        const { data: session } = await supabase.auth.getSession();

        if (session?.session?.user) {
          const supabaseUser = session.session.user;
          // Construct a shape compatible with the rest of the app
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email,
            phone: supabaseUser.phone || null,
            user_type: supabaseUser.user_metadata?.role === "ADMIN" ? "ADMINUSER" : "APPUSER",
            channel: "WEB",
            is_kyc_completed: null,
            kyc: null,
            // Legacy profile fields mapped for backward compatibility
            full_name: supabaseUser.user_metadata?.full_name || null,
            name: supabaseUser.user_metadata?.full_name || null,
            // Flag so consuming code can know this user is on the old system
            isMigrationPending: true,
          });
        }
      } catch (err) {
        console.error("[ProfileContext] Failed to fetch user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

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
