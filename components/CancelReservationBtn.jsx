"use client";

import React from "react";
import { Button } from "./ui/button";
import { cancelReservation } from "@/actions/reservations";
import { toast } from "sonner";

const CancelReservationBtn = ({ resId }) => {
  const handleClick = async (resId) => {
    const data = await cancelReservation(resId);
    if (data.success) {
      toast.success("delete: ", { description: resId });
    } else {
      toast.error("Cancelling reservation failed!", {
        description: "Try again",
      });
    }
  };
  return (
    <Button variant="outline" onClick={() => handleClick(resId)}>
      Cancel
    </Button>
  );
};

export default CancelReservationBtn;
