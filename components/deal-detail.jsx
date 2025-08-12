// components/DealDetail.js
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPinIcon, StarIcon } from "lucide-react";
import { ArrowLeftIcon } from "lucide-react";

export default function DealDetail({ deal }) {
  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/deals" className="flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Deals
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{deal.title}</CardTitle>
              <CardDescription>{deal.partners.name}</CardDescription>
            </div>
            {deal.partners.is_featured && (
              <Badge variant="secondary" className="flex items-center">
                <StarIcon className="h-3 w-3 mr-1" /> Featured Partner
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {deal.partners.images?.[0] && (
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image
                src={deal.partners.images[0]}
                alt={deal.partners.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Deal Details</h3>
              <div className="flex items-center">
                {deal.discount_percentage ? (
                  <Badge className="text-lg mr-3">
                    {deal.discount_percentage}% OFF
                  </Badge>
                ) : (
                  <Badge className="text-lg mr-3">
                    ${deal.discount_amount} OFF
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  Valid until {new Date(deal.end_date).toLocaleDateString()}
                </span>
              </div>

              {deal.promo_code && (
                <div>
                  <p className="text-sm text-muted-foreground">Promo Code:</p>
                  <code className="bg-muted px-3 py-2 rounded-md text-lg font-mono">
                    {deal.promo_code}
                  </code>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Partner Information</h3>
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{deal.partners.location}</span>
              </div>

              {deal.partners.website_url && (
                <div>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href={deal.partners.website_url} target="_blank">
                      Visit Website
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">About This Deal</h3>
            <p className="text-muted-foreground">{deal.description}</p>
          </div>

          {deal.terms_conditions && (
            <div className="space-y-2">
              <h3 className="font-medium">Terms & Conditions</h3>
              <p className="text-sm text-muted-foreground">
                {deal.terms_conditions}
              </p>
            </div>
          )}

          {deal.partners.amenities?.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {deal.partners.amenities.map((amenity, i) => (
                  <Badge key={i} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href={`/book?deal=${deal.id}`}>Book Now</Link>
          </Button>

          {deal.partners.contact_email && (
            <Button variant="outline" className="w-full" asChild>
              <Link href={`mailto:${deal.partners.contact_email}`}>
                Contact Partner
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
