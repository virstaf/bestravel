"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, StarIcon, MapPinIcon } from "lucide-react";

export default function DealsList({ initialDeals: deals }) {
  // console.log("deals:", deals);
  if (deals?.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <h3 className="text-lg font-medium">No current deals available</h3>
        <p className="text-muted-foreground">
          Check back later for special offers
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal, index) => (
        <Card key={deal.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{deal.title}</CardTitle>
                <CardDescription>{deal.partners?.name}</CardDescription>
              </div>
              {/* {(deal.partners?.is_featured || partner[index]?.is_featured) && ( */}
              <Badge variant="secondary" className="flex items-center">
                <StarIcon className="h-3 w-3 mr-1" /> Featured
              </Badge>
              {/* )} */}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{deal.partners?.location}</span>
            </div>

            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                Valid until {new Date(deal.end_date).toLocaleDateString()}
              </span>
            </div>

            <div className="pt-2">
              {deal.discount_percentage ? (
                <Badge className="text-sm">
                  {deal.discount_percentage}% OFF
                </Badge>
              ) : (
                <Badge className="text-sm">${deal.discount_amount} OFF</Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground pt-2">
              {deal.description}
            </p>

            {deal.promo_code && (
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">Promo Code:</p>
                <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono">
                  {deal.promo_code}
                </code>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/dashboard/deals/${deal.id}`}>View Deal</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
