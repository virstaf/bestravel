import { supabase } from "@/lib/supabase/client";
import { getUser } from "@/lib/supabase/server";
import { useEffect, useState } from "react";

export const useCurrentUserImage = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      const { email } = await getUser();

      const { data: profile, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email.trim().toLowerCase()) // Add normalization
        .maybeSingle();

      const userImage =
        profile?.avatar_url || profile?.user_metadata?.avatar_url;

      setImage(userImage ?? null);
    };
    fetchUserImage();
  }, []);

  return image;
};
