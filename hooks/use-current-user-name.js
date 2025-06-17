import { supabase } from "@/lib/supabase/client";
import { getUser } from "@/lib/supabase/server";
import { useEffect, useState } from "react";

export const useCurrentUserName = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchProfileName = async () => {
      const user = await getUser();

      const userEmail = user?.email;
      const splitEmail = userEmail.split("@");

      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("username")
        .eq("email", userEmail)
        .maybeSingle();
      if (userError) {
        console.error("Error fetching user profile:", userError);
      }
      console.log("userData:::", userData);
      if (userData && userData.username) {
        setName(userData.username);
        return;
      }
      if (splitEmail && splitEmail.length > 0) {
        // const  = splitEmail[0].charAt(0).toUpperCase() + splitEmail[0].slice(1);
        const firstChar = splitEmail[0].charAt(0).toUpperCase();
        const restOfName = splitEmail[0].slice(1).toLowerCase();
        const formattedName = firstChar + restOfName;

        // console.log("username:::", data.user?.user_metadata?.full_name);
        setName(data.user?.user_metadata?.full_name || formattedName);
        return;
      }
    };

    fetchProfileName();
  }, []);

  return name || "?";
};
