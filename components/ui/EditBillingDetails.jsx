"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { getUser } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";

const EditBillingDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const router = useRouter();
  const editPaymentDetails = () => {
    // Logic to edit payment details
    const url = `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}`;
    if (url && user?.email) {
      router.push(url + "?prefilled_email=" + user?.email);
    } else {
      console.error("Stripe customer portal URL or user email is not defined.");
    }
  };
  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <Button
        className="bg-primary px-8 py-4 text-white"
        onClick={editPaymentDetails}
      >
        Edit Billing Details
      </Button>
    </div>
  );
};

export default EditBillingDetails;
