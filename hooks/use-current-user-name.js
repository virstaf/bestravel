import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export const useCurrentUserName = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchProfileName = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      }
      setName(data.user?.email ?? "?");
    };

    fetchProfileName();
  }, []);

  return name || "?";
};
