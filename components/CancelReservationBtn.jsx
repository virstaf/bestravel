"use client";

import React from "react";
import { Button } from "./ui/button";
import { cancelReservation } from "@/actions/reservations";
import { toast } from "sonner";

const CancelReservationBtn = ({
  resId,
  variant = "destructive",
  text = "Cancel",
}) => {
  const handleClick = async (resId) => {
    try {
      const { error } = await cancelReservation(resId);
      if (error) throw data.error;
      toast.success("Cancelled successfully", { description: resId });
    } catch (error) {
      toast.error("Cancelling reservation failed!", {
        description: "Please try again",
      });
    }
  };
  return (
    <Button variant={variant} onClick={() => handleClick(resId)}>
      {text}
    </Button>
  );
};

export default CancelReservationBtn;
