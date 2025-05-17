import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile-form";

const Settings = async () => {
  const supabase = createClient();

  const user = getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = (await supabase)
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  //   const getProfile = async () => {
  //     await (
  //       await supabase
  //     )
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", user.id)
  //       .single()
  //       .then((res) => {
  //         if (res.error) {
  //           console.error("Error fetching profile:", res.error);
  //           return null;
  //         }
  //         return res.data;
  //       });
  //   };

  //   const profile = await getProfile();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      <ProfileForm profile={profile} />
    </div>
  );
};

export default Settings;
