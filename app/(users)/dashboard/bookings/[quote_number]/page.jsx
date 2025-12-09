import { getQuoteByNumber, getQuoteItemsByQuoteId } from "@/actions/quotes";
import DashHeader from "@/components/dash-header";
import UserQuoteActions from "@/components/UserQuoteActions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, User, Clock, Package } from "lucide-react";
import { notFound } from "next/navigation";

export default async function QuoteDetailPage({ params }) {
  const { quote_number } = await params;

  try {
    const quote = await getQuoteByNumber(quote_number);
    const quoteItems = await getQuoteItemsByQuoteId(quote.id);

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
        month: "long",
        year: "numeric",
      });
    };

    // Get status badge variant
    const getStatusVariant = (status) => {
      const statusLower = status?.toLowerCase();
      switch (statusLower) {
        case "sent":
          return "default";
        case "accepted":
          return "success";
        case "rejected":
          return "destructive";
        case "expired":
          return "secondary";
        case "draft":
          return "outline";
        default:
          return "outline";
      }
    };

    const isExpired =
      quote.valid_until && new Date(quote.valid_until) < new Date();

    return (
      <div className="container mx-auto px-4 w-full h-full">
        <DashHeader
          page={`Quote #${quote.quote_number}`}
          description="📋 Review your travel quote details"
        />

        <div className="w-full mx-auto py-6 space-y-6 max-w-5xl">
          {/* Quote Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    Quote #{quote.quote_number}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Created {formatDate(quote.created_at)}
                  </CardDescription>
                </div>
                <Badge
                  variant={getStatusVariant(
                    quote.currentStatus || quote.status
                  )}
                >
                  {quote.currentStatus || quote.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quote Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quote.valid_until && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Valid Until
                      </p>
                      <p
                        className={`font-medium ${isExpired ? "text-destructive" : ""}`}
                      >
                        {formatDate(quote.valid_until)}
                        {isExpired && " (Expired)"}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="font-medium">{quoteItems.length}</p>
                  </div>
                </div>
              </div>

              {/* Client Notes */}
              {quote.client_notes && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notes from your advisor:
                  </p>
                  <p className="text-sm bg-muted/30 p-4 rounded-md whitespace-pre-wrap">
                    {quote.client_notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quote Items */}
          <Card>
            <CardHeader>
              <CardTitle>Quote Items</CardTitle>
              <CardDescription>
                Detailed breakdown of services and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quoteItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="capitalize">
                          {item.reservation_type}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {item.category}
                        </Badge>
                      </div>
                      <h4 className="font-medium">{item.description}</h4>
                      {item.supplier && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Supplier: {item.supplier}
                        </p>
                      )}
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {formatCurrency(item.subtotal)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span>{formatCurrency(quote.total_amount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <UserQuoteActions quote={quote} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading quote:", error);
    notFound();
  }
}
