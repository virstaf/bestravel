"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptQuote, rejectQuote } from "@/actions/quotes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

export default function UserQuoteActions({ quote }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptQuote(quote.id);
      toast.success("Quote accepted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error accepting quote:", error);
      toast.error("Failed to accept quote");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await rejectQuote(quote.id);
      toast.success("Quote rejected");
      router.refresh();
    } catch (error) {
      console.error("Error rejecting quote:", error);
      toast.error("Failed to reject quote");
    } finally {
      setLoading(false);
    }
  };

  const isExpired =
    quote.valid_until && new Date(quote.valid_until) < new Date();
  const canTakeAction = quote.status === "sent" && !isExpired;

  if (!canTakeAction) return null;

  return (
    <div className="flex gap-3">
      <Button
        onClick={handleAccept}
        disabled={loading}
        className="flex-1"
        size="lg"
      >
        <CheckCircle2 className="mr-2 h-5 w-5" />
        {loading ? "Processing..." : "Accept Quote"}
      </Button>
      <Button
        onClick={handleReject}
        disabled={loading}
        variant="outline"
        className="flex-1"
        size="lg"
      >
        <XCircle className="mr-2 h-5 w-5" />
        {loading ? "Processing..." : "Decline Quote"}
      </Button>
    </div>
  );
}
