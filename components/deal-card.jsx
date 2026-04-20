"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { hashCode } from "@/utils/hash";
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
 * Optimized DealCard component with memoization to prevent redundant re-renders.
 */
const DealCard = memo(function DealCard({ deal, isPublic = false }) {
  // Simple values derived from props - kept simple as they are cheap
  const location = deal.location || deal.partners?.location || "Destination";
  const packageType = deal.package_type || deal.title || "Travel Package";
  const nights = deal.duration_nights || 4;
  const includesFlight = deal.includes_flight !== false;
  const includesHotel = deal.includes_hotel !== false;
  const includesTransfer = deal.includes_transfer || false;
  const includesBreakfast = deal.includes_breakfast || false;

  // Calculate prices logic with location support - memoized for performance
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
      const bestSavings = best.original - best.sale;
      const discount =
        bestSavings > 0 ? Math.round((bestSavings / best.original) * 100) : null;

      return {
        originalPrice: best.original,
        discountedPrice: best.sale,
        savings: bestSavings,
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

    // Use deal ID hash to determine which placeholder image to use (1-5)
    const imageNumber = (hashCode(String(deal.id)) % 5) + 1;
    return `/images/deals/default-${imageNumber}.jpg`;
  }, [
    deal.id,
    deal.image_url,
    deal.partners?.images,
    deal.partners?.image_url,
  ]);

  // Format validity date
  const validUntil = useMemo(
    () => new Date(deal.end_date || deal.valid_until),
    [deal.end_date, deal.valid_until],
  );

  // Memoize badge info
  const badgeInfo = useMemo(() => {
    const daysUntilExpiry = Math.ceil(
      (validUntil - new Date()) / (1000 * 60 * 60 * 24),
    );

    if (deal.is_featured) {
      return {
        text: "🔥 Hot Deal",
        className: "bg-orange-500 hover:bg-orange-600",
      };
    }
    if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      return {
        text: "⏰ Ending Soon",
        className: "bg-red-500 hover:bg-red-600",
      };
    }
    if (deal.is_most_booked) {
      return {
        text: "⭐ Most Booked",
        className: "bg-purple-500 hover:bg-purple-600",
      };
    }
    return null;
  }, [deal.is_featured, deal.is_most_booked, validUntil]);

  // Simple values derived from props
  const location = deal.location || deal.partners?.location || "Destination";
  const packageType = deal.title || "Travel Package";
  const nights = deal.duration_nights || 4;
  const includesFlight = deal.includes_flight !== false;
  const includesHotel = deal.includes_hotel !== false;
  const includesTransfer = deal.includes_transfer || false;

  // Build inclusions text - memoized to prevent redundant string manipulation
  const inclusionsText = useMemo(() => {
    const inclusions = [];
    if (includesFlight) inclusions.push("Flight");
    if (includesHotel) inclusions.push(`${nights}-night stay`);
    if (includesTransfer) inclusions.push("Transfer");

    if (inclusions.length === 0) return `${nights}-night package`;
    return inclusions.join(" + ");
  }, [includesFlight, includesHotel, includesTransfer, nights]);

  // Rotating CTA copy
  const ctaCopyOptions = [
    "Lock in This Deal",
    "View Full Details",
    "Grab This Offer",
    "Book Before It's Gone",
  ];
  // Deterministic selection based on deal ID to prevent hydration mismatch
  const ctaCopy =
    ctaCopyOptions[hashCode(String(deal.id)) % ctaCopyOptions.length];

  // Urgency microcopy
  const urgencyText = useMemo(() => {
    const daysUntilExpiry = Math.ceil(
      (validUntil - new Date()) / (1000 * 60 * 60 * 24),
    );

    if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
      return `Deal expires in ${daysUntilExpiry} day${daysUntilExpiry > 1 ? "s" : ""}`;
    } else if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      return "Limited availability";
    }
    return "Prices may increase soon";
  }, [validUntil]);

  // Format date for display
  const formattedEndDate = useMemo(
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
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // Only bypass Next.js optimization for unknown external hosts.
          unoptimized={
            imageUrl.startsWith("http") &&
            !imageUrl.includes("images.unsplash.com") &&
            !imageUrl.includes("ylpkcsmbsnowmbyxhbzw.supabase.co") &&
            !imageUrl.includes("drive.google.com")
          }
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

      <CardContent className="px-5 pt-5 pb-3 space-y-4">
        {/* Header: Title and Location (swapped order for visual hierarchy) */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2">
            {packageType}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="h-3.5 w-3.5 mr-1 text-primary/70" />
            <span className="font-medium truncate">{location}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {packageType}
        </h3>

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
          {includesBreakfast && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Coffee className="w-4 h-4 text-primary" />
              <span>Breakfast</span>
            </div>
          )}
        </div>

        {/* Dates Grid Box */}
        <div className="bg-muted/40 rounded-lg p-3 text-xs flex flex-col gap-2 border border-border/50">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarIcon className="h-3.5 w-3.5" /> Book by:
            </span>
            <span className="font-semibold text-foreground">
              {formattedDate}
            </span>
          </div>
          {travelStartDate && (
            <div className="flex items-center justify-between text-muted-foreground pt-2 border-t border-border/50">
              <span className="flex items-center gap-1.5 font-medium">
                <Plane className="h-3.5 w-3.5" /> Travel:
              </span>
              <span className="font-semibold text-foreground text-right">
                {travelStartDate}
                {travelEndDate ? ` - ${travelEndDate}` : ""}
              </span>
            </div>
          )}
        </div>

        {/* Pricing Area */}
        <div className="flex items-end justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-semibold mb-0.5 uppercase tracking-wider">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tighter text-foreground">
                £{Math.round(discountedPrice)}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                pp
              </span>
            </div>
          </div>

          {savings > 0 && (
            <div className="flex flex-col items-end">
              <span className="text-muted-foreground line-through decoration-muted-foreground/50 font-medium mb-1 text-xs">
                £{originalPrice.toFixed(0)}
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 px-2 py-0.5 rounded-md text-xs border border-emerald-200 dark:border-emerald-800">
                Save £{Math.round(savings)}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0 flex flex-col gap-3">
        <p className="text-xs text-orange-600 font-semibold text-center mt-1">
          ⚡ {urgencyText}
        </p>

        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-base shadow-md hover:shadow-lg transition-all"
        >
          <Link
            href={
              isPublic ? `/deals/${deal.id}` : `/dashboard/deals/${deal.id}`
            }
          >
            {ctaCopy}
          </Link>
        </Button>

        <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground font-medium">
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
