import { useProfileContext } from "@/contexts/profile";
import { useEffect, useState } from "react";

export const useCurrentUserImage = () => {
  const [image, setImage] = useState(null);
  const { profile, isLoading } = useProfileContext();

  useEffect(() => {
    const fetchUserImage = async () => {
      if (isLoading) {
        return null; // or a placeholder image
      }
      const userImage =
        profile?.avatar_url || profile?.user_metadata?.avatar_url;

      setImage(userImage ?? null);
    };
    fetchUserImage();
  }, []);

  return image;
};
