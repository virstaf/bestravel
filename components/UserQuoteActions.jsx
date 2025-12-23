"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptQuote, rejectQuote } from "@/actions/quotes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UserQuoteActions({ quote }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [reason, setReason] = useState("too_expensive");
  const [customNote, setCustomNote] = useState("");

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
      await rejectQuote(quote.id, reason, customNote);
      setIsRejectOpen(false);
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

      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex-1"
            size="lg"
            disabled={loading}
          >
            <XCircle className="mr-2 h-5 w-5" />
            Decline Quote
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Decline Quote</DialogTitle>
            <DialogDescription>
              Please let us know why you are declining this quote so we can
              improve our service.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div>
                <h4 className="mb-3 text-sm font-medium">
                  Reason for declining
                </h4>
                <div className="grid gap-3">
                  {[
                    { id: "too_expensive", label: "Too expensive" },
                    { id: "found_better", label: "Found a better offer" },
                    { id: "plans_changed", label: "Plans changed" },
                    { id: "other", label: "Other" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        id={option.id}
                        name="rejectReason"
                        value={option.id}
                        checked={reason === option.id}
                        onChange={(e) => setReason(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label
                        htmlFor={option.id}
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">
                  Additional details {reason !== "other" && "(optional)"}
                </Label>
                <Textarea
                  id="message"
                  placeholder={
                    reason === "other"
                      ? "Please specify..."
                      : "Any feedback you'd like to share..."
                  }
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Decline"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
