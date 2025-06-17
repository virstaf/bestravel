import { createClient, getUser } from "@/lib/supabase/server";
import ProfileForm from "@/components/profile-form";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const Settings = async () => {
  const { email } = await getUser();

  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email.trim().toLowerCase()) // Add normalization
    .maybeSingle();

  return (
    <div className="container py-8 px-8 mx-auto w-full h-full">
      <h1 className="text-3xl font-bold mb-6">General Settings</h1>
      {profile && <ProfileForm profile={profile} />}
      {!profile && (
        <div className="text-red-500">Failed to load profile data.</div>
      )}
    </div>
  );
};

export default Settings;
