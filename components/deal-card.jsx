"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, CalendarIcon } from "lucide-react";

export default function DealCard({ deal }) {
  // Calculate discount percentage if not provided
  const discountPercentage = deal.discount_percentage || 
    (deal.discount_amount && deal.original_price 
      ? Math.round((deal.discount_amount / deal.original_price) * 100)
      : null);

  // Calculate prices
  const originalPrice = deal.original_price || 1299;
  const discountedPrice = deal.discount_percentage
    ? originalPrice * (1 - deal.discount_percentage / 100)
    : deal.discount_amount
    ? originalPrice - deal.discount_amount
    : originalPrice * 0.69; // Default 31% off if no discount info

  const savings = originalPrice - discountedPrice;

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
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    
    const imageNumber = (hashCode(String(deal.id)) % 5) + 1;
    return `/images/deals/default-${imageNumber}.jpg`;
  };

  const imageUrl = getImageUrl();

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

  // Format validity date
  const validUntil = new Date(deal.end_date || deal.valid_until);
  const formattedDate = validUntil.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="overflow-hidden py-0 hover:shadow-xl transition-all duration-300 group">
      {/* Hero Image with Discount Badge */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={packageType}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={imageUrl.startsWith('http')}
        />
        {discountPercentage && (
          <Badge 
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-base font-medium shadow-lg"
          >
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

        {/* Inclusions */}
        <p className="text-sm text-muted-foreground">
          {getInclusionsText()}
        </p>

        {/* Validity Date */}
        <div className="flex items-center text-sm text-muted-foreground pt-1">
          <CalendarIcon className="h-4 w-4 mr-1.5" />
          <span>Valid until {formattedDate}</span>
        </div>

        {/* Pricing */}
        <div className="pt-2 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground line-through">
              £{originalPrice.toFixed(0)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-foreground">
                £{Math.round(discountedPrice)}
              </span>
              <span className="text-sm text-muted-foreground">per person</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-green-600">
                Save
              </span>
              <div className="text-base font-bold text-green-600">
                £{Math.round(savings)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          asChild 
          className="w-full bg-[#0a4275] hover:bg-[#083558] text-white font-semibold py-6 text-base"
        >
          <Link href={`/dashboard/deals/${deal.id}`}>
            Book Deal
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
