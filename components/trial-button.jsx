"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const TrialButton = ({ user, priceId, text = "Start 7-Day Trial" }) => {
  const [loading, setLoading] = useState(false);

  const handleStartTrial = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Trial activation error:", error);
    } finally {
      setLoading(false);
    }
  };
  // CTA Button
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
