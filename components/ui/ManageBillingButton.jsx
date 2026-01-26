"use client";

import { useState } from "react";
import { Button } from "./button";
import { createPortalSessionAction } from "@/actions/stripe";
import { useProfileContext } from "@/contexts/profile";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

const ManageBillingButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfileContext();

  const handleManageBilling = async () => {
    if (!profile?.stripe_customer_id) {
      toast.error("No billing information found");
      return;
    }

    setIsLoading(true);
    try {
      const portalUrl = await createPortalSessionAction(
        profile.stripe_customer_id,
      );
      if (portalUrl) {
        window.location.href = portalUrl;
      } else {
        toast.error("Failed to open billing portal");
      }
    } catch (error) {
      console.error("Error opening billing portal:", error);
      toast.error("Failed to open billing portal");
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile?.stripe_customer_id) {
    return null;
  }

  return (
    <Button
      onClick={handleManageBilling}
      disabled={isLoading}
      variant="outline"
      className="w-full sm:w-auto"
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ExternalLink className="mr-2 h-4 w-4" />
          Manage Billing
        </>
      )}
    </Button>
  );
};

export default ManageBillingButton;
