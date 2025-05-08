// components/DealsList.js
"use client";
import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, StarIcon, MapPinIcon } from "lucide-react";

export default function DealsList({
  initialDeals = [],
  featuredOnly = false,
  limit = null,
}) {
  const [deals, setDeals] = useState(initialDeals);
  const [partner, setPartner] = useState([]);
  const [loading, setLoading] = useState(!initialDeals.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialDeals.length) return;

    const fetchDeals = async () => {
      try {
        setLoading(true);
        let url = "/api/deals?";
        if (featuredOnly) url += "featured=true&";
        if (limit) url += `limit=${limit}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch deals");

        const data = await response.json();
        // console.log("deals::: ", data[0].partner);
        setDeals(data);
        setPartner(() => data.map((deal) => deal.partner));
      } catch (err) {
        setError(err.message);
      } finally {
        console.log("partner:::", partner);
        setLoading(false);
      }
    };

    fetchDeals();
  }, [featuredOnly, limit, initialDeals.length]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(limit || 3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-4/5 mt-2" />
              <Skeleton className="h-4 w-3/5 mt-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading deals: {error}
      </div>
    );
  }

  if (!deals.length) {
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
                {/* <CardDescription>{partner[index].name}</CardDescription> */}
                <CardDescription>Air Lounge</CardDescription>
              </div>
              {/* {partner[index].is_featured && ( */}
              <Badge variant="secondary" className="flex items-center">
                <StarIcon className="h-3 w-3 mr-1" /> Featured
              </Badge>
              {/*  )} */}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              {/* <span>{partner[index].location}</span> */}
              <span>Adabraka</span>
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
              <Link href={`/deals/${deal.id}`}>View Deal</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>

    // <div className="troubleshoot">
    //   <span>troubleshooting</span>
    // </div>
  );
}
