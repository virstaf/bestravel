"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { hashCode } from "@/utils/hash";
import { isOptimizableImage } from "@/lib/image-utils";
import { calculateDealPrices } from "@/lib/deal-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  CalendarIcon,
  Plane,
  Hotel,
  Car,
  Coffee,
  Shield,
  Lock,
} from "lucide-react";

/**
 * Optimized DealCard component with memoization.
 * Prevents redundant re-renders and centralizes complex logic.
 */
const DealCard = memo(function DealCard({ deal, isPublic = false, priority = false }) {
  // Memoize price calculations using centralized utility
  const { originalPrice, discountedPrice, savings, discountPercentage } = useMemo(
    () => calculateDealPrices(deal),
    [deal],
  );

  // Memoize image URL
  const imageUrl = useMemo(() => {
    if (deal.image_url) return deal.image_url;
    if (deal.partners?.images?.[0]) return deal.partners.images[0];
    if (deal.partners?.image_url) return deal.partners.image_url;

    const imageNumber = (hashCode(String(deal.id)) % 5) + 1;
    return `/images/deals/default-${imageNumber}.jpg`;
  }, [deal.id, deal.image_url, deal.partners?.images, deal.partners?.image_url]);

  // Format validity date
  const validUntil = useMemo(
    () => new Date(deal.end_date || deal.valid_until),
    [deal.end_date, deal.valid_until],
  );

  // Simple values derived from props
  const location = deal.location || deal.partners?.location || "Destination";
  const packageType = deal.package_type || deal.title || "Travel Package";
  const nights = deal.duration_nights || 4;
  const includesFlight = deal.includes_flight !== false;
  const includesHotel = deal.includes_hotel !== false;
  const includesTransfer = deal.includes_transfer || false;

  // Memoize badge info
  const badgeInfo = useMemo(() => {
    const daysUntilExpiry = Math.ceil((validUntil - new Date()) / (1000 * 60 * 60 * 24));

    if (deal.is_featured) {
      return { text: "🔥 Hot Deal", className: "bg-orange-500 hover:bg-orange-600" };
    }
    if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      return { text: "⏰ Ending Soon", className: "bg-red-500 hover:bg-red-600" };
    }
    if (deal.is_most_booked) {
      return { text: "⭐ Most Booked", className: "bg-purple-500 hover:bg-purple-600" };
    }
    return null;
  }, [deal.is_featured, deal.is_most_booked, validUntil]);

  // Rotating CTA copy - deterministic based on deal ID
  const ctaCopy = useMemo(() => {
    const ctaCopyOptions = [
      "Lock in This Deal",
      "View Full Details",
      "Grab This Offer",
      "Book Before It's Gone",
    ];
    return ctaCopyOptions[hashCode(String(deal.id)) % ctaCopyOptions.length];
  }, [deal.id]);

  // Urgency microcopy
  const urgencyText = useMemo(() => {
    const daysUntilExpiry = Math.ceil((validUntil - new Date()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
      return `Deal expires in ${daysUntilExpiry} day${daysUntilExpiry > 1 ? "s" : ""}`;
    } else if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      return "Limited availability";
    }
    return "Prices may increase soon";
  }, [validUntil]);

  // Format date for display
  const formattedDate = useMemo(
    () =>
      validUntil.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [validUntil],
  );

  const travelStartDate = useMemo(
    () =>
      deal.travel_start_date
        ? new Date(deal.travel_start_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : null,
    [deal.travel_start_date],
  );

  const travelEndDate = useMemo(
    () =>
      deal.travel_end_date
        ? new Date(deal.travel_end_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : null,
    [deal.travel_end_date],
  );

  return (
    <Card className="overflow-hidden py-0 hover:shadow-xl transition-all duration-300 group">
      {/* Hero Image with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={packageType}
          fill
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={!isOptimizableImage(imageUrl)}
        />
        {/* Top-left badge */}
        {badgeInfo && (
          <Badge
            className={`absolute top-4 left-4 ${badgeInfo.className} text-white px-3 py-1.5 text-sm font-semibold shadow-lg`}
          >
            {badgeInfo.text}
          </Badge>
        )}
        {discountPercentage && (
          <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-base font-medium shadow-lg">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="px-6 py-0 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground mt-4">
          <MapPinIcon className="h-4 w-4 mr-1.5" />
          <span className="font-medium">{location}</span>
        </div>

        <h3 className="text-lg font-semibold text-foreground leading-tight">{packageType}</h3>

        <div className="flex items-center gap-3 py-2">
          {includesFlight && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Plane className="w-4 h-4 text-primary" />
              <span>Flight</span>
            </div>
          )}
          {includesHotel && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Hotel className="w-4 h-4 text-primary" />
              <span>Hotel</span>
            </div>
          )}
          {includesTransfer && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Car className="w-4 h-4 text-primary" />
              <span>Transfer</span>
            </div>
          )}
          {deal.includes_breakfast && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Coffee className="w-4 h-4 text-primary" />
              <span>Breakfast</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-sm text-muted-foreground pt-1">
          <CalendarIcon className="h-4 w-4 mr-1.5" />
          <span>Valid until {formattedDate}</span>
        </div>

        {travelStartDate && (
          <div className="flex items-center text-sm text-blue-600 font-medium pt-0.5">
            <CalendarIcon className="h-4 w-4 mr-1.5" />
            <span>
              Travel: {travelStartDate}
              {travelEndDate ? ` - ${travelEndDate}` : ""}
            </span>
          </div>
        )}

        <div className="pt-2 space-y-1">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Starting from</span>
              <span className="text-3xl font-bold text-foreground">
                £{Math.round(discountedPrice)}
              </span>
              <span className="text-sm text-muted-foreground">per person</span>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  £{originalPrice.toFixed(0)}
                </span>
              </div>
              <span className="text-sm font-semibold text-green-600">Save</span>
              <div className="text-base font-bold text-green-600">£{Math.round(savings)}</div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-2 flex flex-col gap-3">
        <p className="text-xs text-orange-600 font-medium text-center">⚡ {urgencyText}</p>

        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-base shadow-md hover:shadow-lg transition-all"
        >
          <Link href={isPublic ? `/deals/${deal.id}` : `/dashboard/deals/${deal.id}`}>
            {ctaCopy}
          </Link>
        </Button>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure checkout</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
});

export default DealCard;
