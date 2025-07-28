"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "./button";
import { getUser } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";
import { useProfileContext } from "@/contexts/profile";
import { toast } from "sonner";
import { createPortalSessionAction } from "@/actions/stripe";
import { Loader } from "lucide-react";

const EditBillingDetails = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { profile, loading } = useProfileContext();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (profile && !loading) {
      setUserProfile(profile);
    }
  }, [profile, loading]);

  const router = useRouter();

  const editPaymentDetails = async () => {
    if (!userProfile) {
      toast.error("User profile is not defined.");
      console.error("User profile is not defined.");
      return;
    }

    startTransition(async () => {
      try {
        const url = await createPortalSessionAction(
          userProfile.stripe_customer_id
        );
        // console.log("Portal session created:", url);
        router.push(url);
      } catch (error) {
        console.error("Error creating portal session:", error);
        toast.error("Failed to create portal session.");
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <Button
        className="bg-primary px-8 py-4 text-white w-[180px]"
        onClick={editPaymentDetails}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          "Edit Billing Details"
        )}
      </Button>
    </div>
  );
};

export default EditBillingDetails;
