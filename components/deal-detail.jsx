// components/DealDetail.js
"use client";
import React, { useState, useMemo } from "react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { hashCode } from "@/utils/hash";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { hashCode } from "@/utils/hash";
import {
  MapPinIcon,
  CalendarIcon,
  ArrowLeftIcon,
  CheckCircle2,
} from "lucide-react";
import BookingDialog from "@/components/booking-dialog";
import { hashCode } from "@/utils/hash";
import { hashCode } from "@/utils/hash";

/**
 * Optimized DealDetail component with memoization.
 * Reduces redundant calculations for complex price logic and derived state.
 */
export default function DealDetail({ deal, isPublic = false }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Memoize all price and discount calculations
  const {
    discountedPrice,
    originalPrice,
    savings,
    discountPercentage,
    imageUrl,
  } = useMemo(() => {
    const calculateBaseDiscounted = (price) => {
      return deal.discount_percentage
        ? price * (1 - deal.discount_percentage / 100)
        : deal.discount_amount
          ? price - deal.discount_amount
          : price;
    };

    const priceOptions = [];
    const baseOriginal = deal.original_price || 1299;
    const baseSale = calculateBaseDiscounted(baseOriginal);
    priceOptions.push({ sale: baseSale, original: baseOriginal });

    if (deal.location_prices?.length > 0) {
      deal.location_prices.forEach((lp) => {
        if (lp.price) {
          const sPrice = parseFloat(lp.price);
          const oPrice = lp.original_price
            ? parseFloat(lp.original_price)
            : sPrice;
          if (!isNaN(sPrice)) {
            priceOptions.push({ sale: sPrice, original: oPrice });
          }
        }
      });
    }

    priceOptions.sort((a, b) => a.sale - b.sale);
    const bestOption = priceOptions[0];
    const original = bestOption.original;
    const sale = bestOption.sale;
    const saved = original - sale;
    const percentage =
      saved > 0 ? Math.round((saved / original) * 100) : null;

    // Get image URL
    let imgUrl = "/images/deals/default-1.jpg";
    if (deal.image_url) {
      imgUrl = deal.image_url;
    } else if (deal.partners?.images?.[0]) {
      imgUrl = deal.partners.images[0];
    } else if (deal.partners?.image_url) {
      imgUrl = deal.partners.image_url;
    } else {
      const imageNumber = (hashCode(String(deal.id)) % 5) + 1;
      imgUrl = `/images/deals/default-${imageNumber}.jpg`;
    }

    return {
      discountedPrice: sale,
      originalPrice: original,
      savings: saved,
      discountPercentage: percentage,
      imageUrl: imgUrl,
    };
  }, [deal]);

  // Memoize inclusions and other static info
  const info = useMemo(() => {
    const nights = deal.duration_nights || 4;
    const includesFlight = deal.includes_flight !== false;
    const includesHotel = deal.includes_hotel !== false;
    const includesTransfer = deal.includes_transfer || false;
    const packageType = deal.package_type || deal.title || "Travel Package";
    const location = deal.location || deal.partners?.location || "Destination";
    const title = deal.title || deal.package_type || "Travel Package";

    return {
      nights,
      includesFlight,
      includesHotel,
      includesTransfer,
      packageType,
      location,
      title,
    };
  }, [deal]);

  // Format dates for display
  const dates = useMemo(() => {
    return {
      formattedEndDate: new Date(deal.end_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      formattedStartDate: deal.travel_start_date
        ? new Date(deal.travel_start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : null,
      formattedTravelEndDate: deal.travel_end_date
        ? new Date(deal.travel_end_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : null,
    };
  }, [deal.end_date, deal.travel_start_date, deal.travel_end_date]);

  return (
    <>
      <div className="space-y-6 max-w-6xl mx-auto px-4">
        <div>
          <Button variant="outline" asChild>
            <Link
              href={isPublic ? "/deals" : "/dashboard/deals"}
              className="flex items-center"
            >
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
              alt={info.packageType}
              fill
              className="object-cover"
              priority
              // Only bypass optimization for external images from unknown hosts
              unoptimized={
                imageUrl.startsWith("http") && !isOptimizableImage(imageUrl)
              }
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
                  <span className="text-lg">{info.location}</span>
                </div>
                <CardTitle className="text-3xl">{info.title}</CardTitle>
                <p className="text-lg text-muted-foreground">
                  {[
                    info.includesFlight && "Flight",
                    info.includesHotel && `${info.nights}-night stay`,
                    info.includesTransfer && "Transfer",
                  ]
                    .filter(Boolean)
                    .join(" + ")}
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg space-y-2 min-w-[280px]">
                <div className="flex justify-between">
                  <div className="">
                    <span className="text-xs text-muted-foreground mb-1">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        £{originalPrice.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">
                        £{Math.round(discountedPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="text-green-600 font-semibold text-lg flex flex-col">
                    Save £{Math.round(savings)}
                    <span className="text-sm text-muted-foreground">
                      per person
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-medium text-foreground mr-2">
                  Booking Valid Until:
                </span>
                <span>{dates.formattedEndDate}</span>
              </div>

              {dates.formattedStartDate && (
                <div className="flex items-center text-blue-700">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium mr-2">Travel Window:</span>
                  <span>
                    {dates.formattedStartDate}
                    {dates.formattedTravelEndDate &&
                      ` - ${dates.formattedTravelEndDate}`}
                  </span>
                </div>
              )}
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {info.includesFlight && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Round-trip flights</span>
                  </div>
                )}
                {info.includesHotel && (
                  <>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>{info.nights}-night accommodation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Daily breakfast</span>
                    </div>
                  </>
                )}
                {info.includesTransfer && (
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
                  `Experience the magic of ${info.location} with this exclusive travel package. Enjoy comfortable accommodations, convenient flights, and unforgettable memories in one of the world's most beautiful destinations.`}
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
});

export default DealDetail;
