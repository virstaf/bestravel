// "use client";

import { getUser } from "@/lib/supabase/server";
import useUserStore from "@/user.store";
import { redirect } from "next/navigation";

export const AuthGuard = async ({ children }) => {
  const user = await getUser();
  const { isLoading, fetchUser } = useUserStore.getState();

  fetchUser();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (!user) {
    console.error("auth err!");
    redirect("/auth/login");
  }

  return <>{children}</>;
};
