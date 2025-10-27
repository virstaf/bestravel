"use client";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { subscribeAction } from "@/actions/stripe";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const TrialButton = ({ user, priceId, text = "Start 7-Day Trial" }) => {
  const [loading, setLoading] = useState(false);

  const handleStartTrial = async () => {
    setLoading(true);
    const url = await subscribeAction(user, priceId);
    setLoading(false);
    if (url) {
      redirect(url);
    }
  };
  //   return <Button onClick={handleStartTrial} disabled={loading}>{text}</Button>;
  if (loading) {
    return (
      <Button disabled>
        <Loader2Icon className="animate-spin" />
        {text}
      </Button>
    );
  }
  return <Button onClick={handleStartTrial}>{text}</Button>;
};

export default TrialButton;
