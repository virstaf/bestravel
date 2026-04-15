"use client";

import { useMemo, memo } from "react";
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

const DealCard = memo(({ deal, isPublic = false }) => {
  // Memoize all derived values to prevent redundant calculations on every re-render
  const {
    originalPrice,
    discountedPrice,
    savings,
    discountPercentage,
    imageUrl,
    badgeInfo,
    ctaCopy,
    urgencyText,
    validUntil,
  } = useMemo(() => {
    // Calculate prices logic with location support
    const calculateBaseDiscounted = (price) => {
      return deal.discount_percentage
        ? price * (1 - deal.discount_percentage / 100)
        : deal.discount_amount
          ? price - deal.discount_amount
          : price; // No automatic discount if not specified
    };

    // Find lowest price option
    const options = [];

    // Add base option
    const baseOriginal = deal.original_price || 1299;
    const baseSale = calculateBaseDiscounted(baseOriginal);
    options.push({
      sale: baseSale,
      original: baseOriginal,
    });

    // Add location options
    if (deal.location_prices?.length > 0) {
      deal.location_prices.forEach((lp) => {
        if (lp.price) {
          const sPrice = parseFloat(lp.price);
          const oPrice = lp.original_price
            ? parseFloat(lp.original_price)
            : sPrice;
          // Only add if it's a valid number
          if (!isNaN(sPrice)) {
            options.push({ sale: sPrice, original: oPrice });
          }
        }
      });
    }

    // Sort by sale price ascending
    options.sort((a, b) => a.sale - b.sale);

    const best = options[0];
    const orig = best.original;
    const sale = best.sale;
    const save = orig - sale;

    // Calculate actual discount percentage from prices
    const discPerc = save > 0 ? Math.round((save / orig) * 100) : null;

    // Get image URL - use partner image or placeholder
    const getUrl = () => {
      if (deal.image_url) return deal.image_url;
      if (deal.partners?.images?.[0]) return deal.partners.images[0];
      if (deal.partners?.image_url) return deal.partners.image_url;

      const imageNumber = (hashCode(String(deal.id)) % 5) + 1;
      return `/images/deals/default-${imageNumber}.jpg`;
    };

    const imgUrl = getUrl();

    // Format validity date (needed by badge and urgency functions)
    const validDate = new Date(deal.end_date || deal.valid_until);

    // Determine badge type
    const getBadge = () => {
      const daysUntilExpiry = Math.ceil(
        (validDate - new Date()) / (1000 * 60 * 60 * 24),
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
    };

    const badge = getBadge();

    // Rotating CTA copy - stabilized with hashCode to avoid hydration mismatch
    const ctaOptions = [
      "Lock in This Deal",
      "View Full Details",
      "Grab This Offer",
      "Book Before It's Gone",
    ];
    const cta = ctaOptions[hashCode(String(deal.id)) % ctaOptions.length];

    // Urgency microcopy
    const getUrgency = () => {
      const daysUntilExpiry = Math.ceil(
        (validDate - new Date()) / (1000 * 60 * 60 * 24),
      );

      if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
        return `Deal expires in ${daysUntilExpiry} day${daysUntilExpiry > 1 ? "s" : ""}`;
      }
      if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
        return "Limited availability";
      }
      return "Prices may increase soon";
    };

    return {
      originalPrice: orig,
      discountedPrice: sale,
      savings: save,
      discountPercentage: discPerc,
      imageUrl: imgUrl,
      badgeInfo: badge,
      ctaCopy: cta,
      urgencyText: getUrgency(),
      validUntil: validDate,
    };
  }, [deal]);

  // Format location
  const location = deal.location || deal.partners?.location || "Destination";

  // Package type/title
  const packageType = deal.package_type || deal.title || "Travel Package";

  // Duration
  const nights = deal.duration_nights || 4;
  const includesFlight = deal.includes_flight !== false;
  const includesHotel = deal.includes_hotel !== false;
  const includesTransfer = deal.includes_transfer || false;

  // Build inclusions text - memoized
  const inclusionsText = useMemo(() => {
    const inclusions = [];
    if (includesFlight) inclusions.push("Flight");
    if (includesHotel) inclusions.push(`${nights}-night stay`);
    if (includesTransfer) inclusions.push("Transfer");

    if (inclusions.length === 0) return `${nights}-night package`;
    return inclusions.join(" + ");
  }, [includesFlight, includesHotel, includesTransfer, nights]);

  // Format date for display
  const formattedDate = validUntil.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const travelStartDate = deal.travel_start_date
    ? new Date(deal.travel_start_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  const travelEndDate = deal.travel_end_date
    ? new Date(deal.travel_end_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

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
          unoptimized={
            imageUrl.startsWith("http") &&
            !imageUrl.includes("supabase.co") &&
            !imageUrl.includes("unsplash.com") &&
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
        {/* Discount badge */}
        {discountPercentage && (
          <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-base font-medium shadow-lg">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="px-6 py-0 space-y-3">
        {/* Location */}
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPinIcon className="h-4 w-4 mr-1.5" />
          <span className="font-medium">{location}</span>
        </div>

        {/* Package Title */}
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {packageType}
        </h3>

        {/* Inclusions Icons */}
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

        {/* Validity Date */}
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

        {/* Pricing */}
        <div className="pt-2 space-y-1">
          {/* <div className="flex items-baseline gap-2"> */}
          {/* <span className="text-sm text-muted-foreground line-through">
              £{originalPrice.toFixed(0)}
            </span> */}
          {/* </div> */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Starting from
              </span>
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
              <div className="text-base font-bold text-green-600">
                £{Math.round(savings)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-2 flex flex-col gap-3">
        {/* Urgency microcopy */}
        <p className="text-xs text-orange-600 font-medium text-center">
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

        {/* Confidence boosters */}
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
