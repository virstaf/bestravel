import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export const useCurrentUserEmail = () => {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      }
      setEmail(data.user?.email);
    };
    fetchUserEmail();
  }, []);
  return email;
};
