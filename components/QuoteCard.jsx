"use client";

import { memo, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { getShortDate } from "@/lib/getFormattedDate";

/**
 * Hoisted currency formatter for performance.
 */
const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

/**
 * Optimized QuoteCard component.
 * Uses React.memo to prevent unnecessary re-renders.
 * Uses useMemo for complex status and validity logic.
 */
const QuoteCard = memo(({ quote }) => {
  const {
    quote_number,
    total_amount,
    status,
    currentStatus,
    valid_until,
    client_notes,
    created_at,
  } = quote;

  // Format currency using hoisted formatter
  const formattedAmount = useMemo(
    () => currencyFormatter.format(total_amount || 0),
    [total_amount]
  );

  // Format dates using optimized utilities
  const formattedCreatedAt = useMemo(
    () => getShortDate(created_at),
    [created_at]
  );
  const formattedValidUntil = useMemo(
    () => getShortDate(valid_until),
    [valid_until]
  );

  // Memoize status info to avoid re-calculating on every render
  const statusInfo = useMemo(() => {
    const statusLower = (currentStatus || status)?.toLowerCase();
    switch (statusLower) {
      case "sent":
        return {
          variant: "default",
          icon: <FileText className="h-3 w-3" />,
          label: "Sent",
        };
      case "accepted":
        return {
          variant: "success",
          icon: <CheckCircle2 className="h-3 w-3" />,
          label: "Accepted",
        };
      case "rejected":
        return {
          variant: "destructive",
          icon: <XCircle className="h-3 w-3" />,
          label: "Rejected",
        };
      case "expired":
        return {
          variant: "secondary",
          icon: <Clock className="h-3 w-3" />,
          label: "Expired",
        };
      case "draft":
        return {
          variant: "outline",
          icon: <AlertCircle className="h-3 w-3" />,
          label: "Draft",
        };
      default:
        return {
          variant: "outline",
          icon: <FileText className="h-3 w-3" />,
          label: currentStatus || status || "Unknown",
        };
    }
  }, [currentStatus, status]);

  // Memoize expiration check
  const isExpired = useMemo(
    () => valid_until && new Date(valid_until) < new Date(),
    [valid_until]
  );

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Quote #{quote_number}</CardTitle>
            <CardDescription className="mt-1">
              Created {formattedCreatedAt}
            </CardDescription>
          </div>
          <Badge
            variant={statusInfo.variant}
            className="flex items-center gap-1"
          >
            {statusInfo.icon}
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total Amount */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium text-muted-foreground">
            Total Amount
          </span>
          <span className="text-2xl font-bold">{formattedAmount}</span>
        </div>

        {/* Validity */}
        {valid_until && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Valid until:</span>
            <span
              className={
                isExpired ? "text-destructive font-medium" : "font-medium"
              }
            >
              {formattedValidUntil}
            </span>
            {isExpired && (
              <Badge variant="destructive" className="ml-2">
                Expired
              </Badge>
            )}
          </div>
        )}

        {/* Client Notes */}
        {client_notes && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Notes from your advisor:
            </p>
            <p className="text-sm bg-muted/30 p-3 rounded-md whitespace-pre-wrap">
              {client_notes}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-6">
        <div className="flex gap-3 w-full">
          <Button asChild className="flex-1">
            <Link href={`/dashboard/bookings/${quote_number}`}>
              View Details
            </Link>
          </Button>
          {status === "sent" && !isExpired && (
            <>
              <Button variant="outline" className="flex-1">
                Accept
              </Button>
              <Button variant="outline" className="flex-1">
                Decline
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
});

QuoteCard.displayName = "QuoteCard";

export default QuoteCard;
