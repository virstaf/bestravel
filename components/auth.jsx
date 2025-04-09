"use client";

import { useCurrentUserEmail } from "@/hooks/use-current-user-email";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({ children }) => {
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await useCurrentUserEmail();
      console.log("auth guard::", email);
      if (!email) {
        redirect("/auth/login");
      }
    };
    fetchUserEmail();
  }, []);

  return <>{children}</>;
};
