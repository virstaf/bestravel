// components/DealDetail.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  MapPinIcon,
  CalendarIcon,
  ArrowLeftIcon,
  CheckCircle2,
} from "lucide-react";
import BookingDialog from "@/components/booking-dialog";

export default function DealDetail({ deal }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Calculate prices
  const originalPrice = deal.original_price || 1299;
  const discountPercentage =
    deal.discount_percentage ||
    (deal.discount_amount && originalPrice
      ? Math.round((deal.discount_amount / originalPrice) * 100)
      : 31);

  const discountedPrice = deal.discount_percentage
    ? originalPrice * (1 - deal.discount_percentage / 100)
    : deal.discount_amount
      ? originalPrice - deal.discount_amount
      : originalPrice * 0.69;

  const savings = originalPrice - discountedPrice;

  // Get image URL
  const getImageUrl = () => {
    if (deal.image_url) return deal.image_url;
    if (deal.partners?.images?.[0]) return deal.partners.images[0];
    if (deal.partners?.image_url) return deal.partners.image_url;

    // Use deal ID hash to determine which placeholder image to use (1-5)
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };

    const imageNumber = (hashCode(String(deal.id)) % 5) + 1;
    return `/images/deals/default-${imageNumber}.jpg`;
  };

  const imageUrl = getImageUrl();

  const location = deal.location || deal.partners?.location || "Destination";
  const packageType = deal.package_type || deal.title || "Travel Package";
  const nights = deal.duration_nights || 4;
  const includesFlight = deal.includes_flight !== false;
  const includesHotel = deal.includes_hotel !== false;
  const includesTransfer = deal.includes_transfer || false;

  return (
    <>
      <div className="space-y-6 max-w-6xl mx-auto px-4">
        <div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/deals" className="flex items-center">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Deals
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden pt-0">
          {/* Hero Image */}
          <div className="relative aspect-[21/9] w-full bg-muted">
            <Image
              src={imageUrl}
              alt={packageType}
              fill
              className="object-cover"
              priority
              unoptimized={imageUrl.startsWith("http")}
            />
            {discountPercentage && (
              <Badge className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-xl font-bold shadow-lg">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          <CardHeader className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span className="text-lg">{location}</span>
                </div>
                <CardTitle className="text-3xl">{packageType}</CardTitle>
                <p className="text-lg text-muted-foreground">
                  {[
                    includesFlight && "Flight",
                    includesHotel && `${nights}-night stay`,
                    includesTransfer && "Transfer",
                  ]
                    .filter(Boolean)
                    .join(" + ")}
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg space-y-2 min-w-[280px]">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    £{originalPrice.toFixed(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      £{Math.round(discountedPrice)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      per person
                    </span>
                  </div>
                </div>
                <div className="text-green-600 font-semibold text-lg">
                  Save £{Math.round(savings)}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center text-muted-foreground">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>
                Valid until{" "}
                {new Date(deal.end_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {includesFlight && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Round-trip flights</span>
                  </div>
                )}
                {includesHotel && (
                  <>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>{nights}-night accommodation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Daily breakfast</span>
                    </div>
                  </>
                )}
                {includesTransfer && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Airport transfers</span>
                  </div>
                )}
              </div>
            </div>

            {/* About This Deal */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">About This Deal</h3>
              <p className="text-muted-foreground leading-relaxed">
                {deal.description ||
                  `Experience the magic of ${location} with this exclusive travel package. Enjoy comfortable accommodations, convenient flights, and unforgettable memories in one of the world's most beautiful destinations.`}
              </p>
            </div>

            {/* Partner Information */}
            {deal.partners && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Partner Information</h3>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="font-medium">{deal.partners.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {deal.partners.location}
                  </p>
                  {deal.partners.website_url && (
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <Link href={deal.partners.website_url} target="_blank">
                        Visit Partner Website
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Promo Code */}
            {deal.promo_code && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Promo Code</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-2xl font-mono font-bold">
                    {deal.promo_code}
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use this code when booking to receive your discount
                  </p>
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            {deal.terms_conditions && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground">
                  {deal.terms_conditions}
                </p>
              </div>
            )}

            {/* Booking Button */}
            <div className="pt-4">
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-[#0a4275] hover:bg-[#083558] text-white font-semibold py-6 text-lg"
                size="lg"
              >
                Book This Deal Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BookingDialog
        deal={deal}
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
      />
    </>
  );
}
