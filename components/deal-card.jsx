"use client";

import Link from "next/link";
import Image from "next/image";
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

export default function DealCard({ deal, isPublic = false }) {
  // Calculate prices logic with location support
  const calculateBaseDiscounted = (price) => {
    return deal.discount_percentage
      ? price * (1 - deal.discount_percentage / 100)
      : deal.discount_amount
        ? price - deal.discount_amount
        : price; // No automatic discount if not specified
  };

  // Find lowest price option
  const priceOptions = [];

  // Add base option
  const baseOriginal = deal.original_price || 1299;
  const baseSale = calculateBaseDiscounted(baseOriginal);
  priceOptions.push({
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
          priceOptions.push({ sale: sPrice, original: oPrice });
        }
      }
    });
  }

  // Sort by sale price ascending
  priceOptions.sort((a, b) => a.sale - b.sale);

  const bestOption = priceOptions[0];
  const originalPrice = bestOption.original;
  const discountedPrice = bestOption.sale;
  const savings = originalPrice - discountedPrice;

  // Calculate actual discount percentage from prices
  const discountPercentage =
    savings > 0 ? Math.round((savings / originalPrice) * 100) : null;

  // Find which location has the best price (if using location pricing)
  const bestLocationPrice = deal.location_prices?.find(
    (lp) => parseFloat(lp.price) === discountedPrice,
  );

  // Get image URL - use partner image or placeholder
  const getImageUrl = () => {
    if (deal.image_url) return deal.image_url;
    if (deal.partners?.images?.[0]) return deal.partners.images[0];
    if (deal.partners?.image_url) return deal.partners.image_url;

    // Use deal ID hash to determine which placeholder image to use (1-5)
    // This works with both numeric IDs and UUIDs
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    const imageNumber = (hashCode(String(deal.id)) % 5) + 1;
    return `/images/deals/default-${imageNumber}.jpg`;
  };

  const imageUrl = getImageUrl();

  // Format validity date (needed by badge and urgency functions)
  const validUntil = new Date(deal.end_date || deal.valid_until);

  // Determine badge type
  const getBadgeInfo = () => {
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
  };

  const badgeInfo = getBadgeInfo();

  // Rotating CTA copy
  const ctaCopyOptions = [
    "Lock in This Deal",
    "View Full Details",
    "Grab This Offer",
    "Book Before It's Gone",
  ];
  const ctaCopy =
    ctaCopyOptions[Math.floor(Math.random() * ctaCopyOptions.length)];

  // Urgency microcopy
  const getUrgencyText = () => {
    const daysUntilExpiry = Math.ceil(
      (validUntil - new Date()) / (1000 * 60 * 60 * 24),
    );

    if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
      return `Deal expires in ${daysUntilExpiry} day${daysUntilExpiry > 1 ? "s" : ""}`;
    }
    if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      return "Limited availability";
    }
    return "Prices may increase soon";
  };

  // Format location
  const location = deal.location || deal.partners?.location || "Destination";

  // Package type/title
  const packageType = deal.package_type || deal.title || "Travel Package";

  // Duration
  const nights = deal.duration_nights || 4;
  const includesFlight = deal.includes_flight !== false;
  const includesHotel = deal.includes_hotel !== false;
  const includesTransfer = deal.includes_transfer || false;

  // Build inclusions text
  const getInclusionsText = () => {
    const inclusions = [];
    if (includesFlight) inclusions.push("Flight");
    if (includesHotel) inclusions.push(`${nights}-night stay`);
    if (includesTransfer) inclusions.push("Transfer");

    if (inclusions.length === 0) return `${nights}-night package`;
    return inclusions.join(" + ");
  };

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
    <Card className="group overflow-hidden border-gray-200 shadow-premium hover:shadow-lg transition-all duration-300">
      {/* Top: Destination image + Savings badge */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageUrl}
          alt={packageType}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={imageUrl.startsWith("http")}
        />
        {discountPercentage && (
          <Badge className="absolute top-4 right-4 bg-accent-500 text-white border-none px-3 py-1 text-sm font-bold shadow-md rounded-lg">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Middle: Destination + Dates + Public price (strikethrough) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-h4 font-bold text-dark-900 truncate">
              {location}
            </h3>
            <span className="text-small text-gray-500 line-through">
              £{originalPrice.toFixed(0)}
            </span>
          </div>
          <div className="flex items-center text-small text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2 text-primary-500" />
            <span>
              {travelStartDate
                ? `${travelStartDate}${travelEndDate ? ` - ${travelEndDate}` : ""}`
                : `Valid until ${formattedDate}`}
            </span>
          </div>
        </div>

        {/* Bottom: Member price (bold) + "Save $XXX" */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
          <div className="space-y-0.5">
            <span className="text-micro uppercase tracking-wider font-bold text-primary-500">
              Member Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-h2 font-bold text-dark-900 leading-none">
                £{Math.round(discountedPrice)}
              </span>
              <span className="text-micro text-gray-500 font-medium">/pp</span>
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant="secondary"
              className="bg-success/10 text-success border-none font-bold"
            >
              Save £{Math.round(savings)}
            </Badge>
          </div>
        </div>

        {/* CTA: View Deal */}
        <Button asChild variant="default" className="w-full mt-4">
          <Link
            href={
              isPublic ? `/deals/${deal.id}` : `/dashboard/deals/${deal.id}`
            }
          >
            View Deal
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
