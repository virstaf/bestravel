"use client";

import { useCurrentUserEmail } from "@/hooks/use-current-user-email";
import { useRouter } from "next/navigation";

export const AuthGuard = ({ children }) => {
  const email = useCurrentUserEmail();

  const router = useRouter();

  if (!email) {
    router.replace("/auth/login");
  }
  return <>{children}</>;
};
