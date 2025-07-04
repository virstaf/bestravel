import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const SubscribeGuard = async ({ children }) => {
  const { email } = await getUser();
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email.trim().toLowerCase()) // Add normalization
    .maybeSingle();

  console.log(profile);

  if (!profile || !profile.is_subscribed) {
    console.error("auth err!");
    redirect("/pricing");
  }

  // console.log("auth user:::", userObject.user_metadata);

  return <>{children}</>;
};
