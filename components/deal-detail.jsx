// components/DealDetail.js
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { hashCode } from "@/utils/hash";
import { isOptimizableImage } from "@/lib/image-utils";
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

/**
 * Optimized DealDetail component with memoization.
 * Reduces redundant calculations for complex price logic and derived state.
 * Uses shared image optimization utility.
 */
export default function DealDetail({ deal, isPublic = false }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const dealIdStr = String(deal.id);
  const dealHash = useMemo(() => hashCode(dealIdStr), [dealIdStr]);

  // Memoize price calculations
  const { originalPrice, discountedPrice, savings, discountPercentage } =
    useMemo(() => {
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
      const best = priceOptions[0];
      const savings = best.original - best.sale;
      const discount =
        savings > 0 ? Math.round((savings / best.original) * 100) : null;

      return {
        originalPrice: best.original,
        discountedPrice: best.sale,
        savings,
        discountPercentage: discount,
      };
    }, [
      deal.discount_percentage,
      deal.discount_amount,
      deal.original_price,
      deal.location_prices,
    ]);

  // Memoize image URL
  const imageUrl = useMemo(() => {
    if (deal.image_url) return deal.image_url;
    if (deal.partners?.images?.[0]) return deal.partners.images[0];
    if (deal.partners?.image_url) return deal.partners.image_url;

    // Use absolute value to avoid negative index from modulo
    const imageNumber = (Math.abs(dealHash) % 5) + 1;
    return `/images/deals/default-${imageNumber}.jpg`;
  }, [deal.image_url, deal.partners?.images, deal.partners?.image_url, dealHash]);

  const info = useMemo(
    () => ({
      location: deal.location || deal.partners?.location || "Destination",
      title: deal.title || deal.package_type || "Travel Package",
      packageType: deal.package_type || deal.title || "Travel Package",
      nights: deal.duration_nights || 4,
      includesFlight: deal.includes_flight !== false,
      includesHotel: deal.includes_hotel !== false,
      includesTransfer: deal.includes_transfer || false,
    }),
    [
      deal.location,
      deal.partners?.location,
      deal.title,
      deal.package_type,
      deal.duration_nights,
      deal.includes_flight,
      deal.includes_hotel,
      deal.includes_transfer,
    ],
  );

  const dates = useMemo(() => {
    const end = deal.end_date || deal.valid_until;
    return {
      formattedEndDate: end
        ? new Date(end).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Open-ended",
      formattedStartDate: deal.travel_start_date
        ? new Date(deal.travel_start_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : null,
      formattedTravelEndDate: deal.travel_end_date
        ? new Date(deal.travel_end_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : null,
    };
  }, [deal.end_date, deal.valid_until, deal.travel_start_date, deal.travel_end_date]);

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
              unoptimized={!isOptimizableImage(imageUrl)}
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
}
