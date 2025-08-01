"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "./button";
import { getUser } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";
import { useProfileContext } from "@/contexts/profile";
import { toast } from "sonner";
import { createPortalSessionAction } from "@/actions/stripe";
import { Loader } from "lucide-react";
import { findPlanByPriceId } from "@/lib/constants";

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
    // console.log(userProfile?.stripe_customer_id);
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
        if (!url) {
          router.push(process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL);
        }
        // console.log("Portal session created:", url);
        router.push(url);
      } catch (error) {
        console.error("Error creating portal session:", error);
        toast.error("Failed to create portal session.");
      }
    });
  };

  // const getPlan = () => {
  //   const plan = findPlanByPriceId("price_1Rfn1yLAxh7V2BxL8bcMhPvL");
  //   console.log(plan);
  // };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {userProfile?.stripe_customer_id ? (
        <Button
          className="bg-primary px-8 py-4 text-white w-[180px]"
          onClick={editPaymentDetails}
          // onClick={getPlan}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            "Edit Billing Details"
          )}
        </Button>
      ) : (
        <div className="text-gray-500">
          <p>
            You do not have a billing profile set up. Subscribe to a plan first
            to manage your billing details.
          </p>
        </div>
      )}
    </div>
  );
};

export default EditBillingDetails;
