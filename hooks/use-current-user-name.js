import { getUser } from "@/lib/supabase/server";
import { useEffect, useState } from "react";

export const useCurrentUserName = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchProfileName = async () => {
      const user = await getUser();

      const userEmail = user?.email;
      const username = user?.user_metadata?.username;
      const splitEmail = userEmail.split("@");
      setName(username || splitEmail[0]);
    };

    fetchProfileName();
  }, []);

  return name || "?";
};
