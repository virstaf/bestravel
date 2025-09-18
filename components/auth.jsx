import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const AuthGuard = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user?.role === "ADMIN") {
    redirect("/admin");
  }

  if (user) {
    return <>{children}</>;
  }
};
