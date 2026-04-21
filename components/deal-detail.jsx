// components/DealDetail.js
"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { hashCode } from "@/utils/hash";
import { isOptimizableImage } from "@/lib/image-utils";
import { calculateDealPrices } from "@/lib/deal-utils";
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
 * Uses centralized utilities for consistency and performance.
 */
const DealDetail = React.memo(function DealDetail({ deal, isPublic = false }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Memoize price calculations using centralized utility
  const { originalPrice, discountedPrice, savings, discountPercentage } =
    useMemo(() => calculateDealPrices(deal), [deal]);

  const dealHash = useMemo(() => hashCode(deal.id || "default"), [deal.id]);

  // Memoize image URL
  const imageUrl = useMemo(() => {
    if (deal.image_url) return deal.image_url;
    if (deal.partners?.images?.[0]) return deal.partners.images[0];
    if (deal.partners?.image_url) return deal.partners.image_url;

    // Use absolute value to avoid negative index from modulo
    const imageNumber = (Math.abs(dealHash) % 5) + 1;
    return `/images/deals/default-${imageNumber}.jpg`;
  }, [
    deal.image_url,
    deal.partners?.images,
    deal.partners?.image_url,
    dealHash,
  ]);

  const {
    location,
    title,
    packageType,
    nights,
    includesFlight,
    includesHotel,
    includesTransfer,
  } = useMemo(
    () => ({
      location: deal.location || deal.partners?.location || "Destination",
      title: deal.title || deal.package_type || "Travel Package",
      packageType: deal.package_type || deal.title || "Travel Package",
      nights: deal.duration_nights || 4,
      includesFlight: deal.includes_flight !== false,
      includesHotel: deal.includes_hotel !== false,
      includesTransfer: deal.includes_transfer || false,
    }),
    [deal],
  );

  const inclusionsSummary = useMemo(() => {
    const parts = [];
    if (includesFlight) parts.push("Flights");
    if (includesHotel) parts.push(`${nights} Nights Hotel`);
    if (includesTransfer) parts.push("Transfers");
    return parts.length > 0 ? parts.join(" • ") : "Custom Package";
  }, [includesFlight, includesHotel, includesTransfer, nights]);

  const { formattedEndDate, formattedStartDate, formattedTravelEndDate } =
    useMemo(
      () => ({
        formattedEndDate:
          deal.end_date || deal.valid_until
            ? new Date(deal.end_date || deal.valid_until).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric", year: "numeric" },
              )
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
      }),
      [
        deal.end_date,
        deal.valid_until,
        deal.travel_start_date,
        deal.travel_end_date,
      ],
    );

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
              alt={packageType}
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
                  <span className="text-lg">{location}</span>
                </div>
                <CardTitle className="text-3xl">{title}</CardTitle>
                <p className="text-lg text-muted-foreground">
                  {inclusionsSummary}
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

                  <div className="text-green-600 font-semibold text-lg flex flex-col text-right">
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
                <span>{formattedEndDate}</span>
              </div>

              {formattedStartDate && (
                <div className="flex items-center text-blue-700">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium mr-2">Travel Window:</span>
                  <span>
                    {formattedStartDate}
                    {formattedTravelEndDate && ` - ${formattedTravelEndDate}`}
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            

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
              <div className="content text-muted-foreground leading-relaxed">
                {(() => {
                  const desc = deal.description || `Experience the magic of ${location} with this exclusive travel package. Enjoy comfortable accommodations, convenient flights, and unforgettable memories in one of the world's most beautiful destinations.`;
                  
                  // Split the entire string by WhatsApp-style bold (*text*)
                  const parts = desc.split(/(\*[^*]+\*)/g);
                  
                  const elements = [];
                  let currentList = [];
                  let currentParagraph = [];
                  
                  const flushList = () => {
                    if (currentList.length > 0) {
                      elements.push(<ul key={`ul-${elements.length}`} className="list-none space-y-2 mt-2 mb-4">{currentList}</ul>);
                      currentList = [];
                    }
                  };

                  const flushParagraph = () => {
                    if (currentParagraph.length > 0) {
                      elements.push(<p key={`p-${elements.length}`}>{currentParagraph}</p>);
                      currentParagraph = [];
                    }
                  };

                  const flushAll = () => {
                    flushParagraph();
                    flushList();
                  };

                  parts.forEach((part, i) => {
                    if (part.startsWith('*') && part.endsWith('*')) {
                      const content = part.slice(1, -1).trim();
                      const lower = content.toLowerCase();
                      const isHeader = ['overview', 'why visit:', 'nearby attractions:', 'conclusion', 'conclusion:', 'itinerary', 'full payment', 'based on 2 adults'].includes(lower) || lower.endsWith(':');
                      
                      if (isHeader) {
                        flushAll();
                        elements.push(<h3 key={`h-${i}`} className="mt-6 mb-2 text-foreground font-semibold text-lg">{content}</h3>);
                      } else {
                        currentParagraph.push(<strong key={`s-${i}`} className="text-foreground font-semibold mr-1">{content}</strong>);
                      }
                    } else if (part.trim()) {
                      // Normal text: split by known bullet markers
                      const bulletSplit = part.split(/(?=[✔➡️●•])/g);
                      
                      bulletSplit.forEach((segment, j) => {
                        const trimmed = segment.trim();
                        if (!trimmed) return;
                        
                        let bulletMatch = null;
                        const bullets = ['✔', '➡️', '●', '•'];
                        for (const b of bullets) {
                          if (trimmed.startsWith(b)) {
                            bulletMatch = b;
                            break;
                          }
                        }

                        if (bulletMatch) {
                          flushParagraph();
                          currentList.push(
                            <li key={`li-${i}-${j}`} className="flex items-start gap-2">
                              <span className="mt-0.5 text-primary">{bulletMatch === '✔' ? '✓' : bulletMatch === '➡️' ? '→' : '•'}</span>
                              <span>{trimmed.slice(bulletMatch.length).trim().replace(/^:\s*/, '')}</span>
                            </li>
                          );
                        } else {
                          // Normal text block
                          flushList();
                          let text = trimmed;
                          // Remove dangling colon from headers like "*Conclusion* :"
                          if (text.startsWith(':')) {
                            text = text.slice(1).trim();
                          }
                          
                          // Double newlines mean a new paragraph
                          const pBlocks = text.split(/\r?\n\s*\r?\n/);
                          pBlocks.forEach((block, bIdx) => {
                            if (bIdx > 0) flushParagraph();
                            const cleanBlock = block.replace(/\r?\n/g, ' ').trim();
                            if (cleanBlock) {
                              currentParagraph.push(<span key={`t-${i}-${j}-${bIdx}`}>{cleanBlock} </span>);
                            }
                          });
                        }
                      });
                    }
                  });
                  
                  flushAll();
                  return elements;
                })()}
              </div>
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
                      <Link
                        href={deal.partners.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
