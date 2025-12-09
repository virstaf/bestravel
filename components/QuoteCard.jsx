"use client";

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

const QuoteCard = ({ quote }) => {
  const {
    quote_number,
    total_amount,
    status,
    currentStatus,
    valid_until,
    client_notes,
    created_at,
    trip_id,
  } = quote;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get status badge variant and icon
  const getStatusInfo = (status) => {
    const statusLower = status?.toLowerCase();
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
          label: status || "Unknown",
        };
    }
  };

  const statusInfo = getStatusInfo(currentStatus || status);

  // Check if quote is expired
  const isExpired = valid_until && new Date(valid_until) < new Date();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Quote #{quote_number}</CardTitle>
            <CardDescription className="mt-1">
              Created {formatDate(created_at)}
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
          <span className="text-2xl font-bold">
            {formatCurrency(total_amount)}
          </span>
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
              {formatDate(valid_until)}
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
};

export default QuoteCard;
