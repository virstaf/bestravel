import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const AuthGuard = async ({ children }) => {
  const userObject = await getUser();

  // if (!userObject) {
  //   console.error("auth err!");
  //   redirect("/auth/login");
  // }

  // console.log("auth user:::", userObject.user_metadata);

  return <>{children}</>;
};
