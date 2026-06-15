"use client";

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
      await cancelReservation(resId);
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
