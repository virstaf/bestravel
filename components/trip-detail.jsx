// components/TripDetail.js
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CircleDollarSign } from "lucide-react";

export default function TripDetail({ trip }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this trip?")) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("trips").delete().eq("id", trip.id);

      if (error) throw error;

      router.push("/dashboard/trips");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="">
        <h1 className="text-3xl font-bold">{trip.title}</h1>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="relative overflow-hidden">
            {!trip.cover_image_url && (
              <div className="absolute z-0 top-0 bottom-0 right-0 left-0 clipPath heroBg overflow-hidden"></div>
            )}
            <CardHeader>
              <CardTitle>Trip Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 z-10">
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    trip.status === "completed"
                      ? "success"
                      : trip.status === "cancelled"
                        ? "destructive"
                        : "default"
                  }
                >
                  {trip.status.replace("_", " ")}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {format(new Date(trip.start_date), "PPP")} -{" "}
                  {format(new Date(trip.end_date), "PPP")}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {trip.adults} adults{" "}
                    {trip.children > 0 ? `, ${trip.children} children` : ""}
                  </span>
                </div>
              </div>

              {trip.budget && (
                <div className="flex items-center">
                  <CircleDollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Budget: £{trip.budget.toLocaleString()}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {trip.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{trip.description}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Link href={`/dashboard/trips/${trip.id}/reserve`}>
                  Reserve for Trip
                </Link>
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link href={`/dashboard/trips/${trip.id}/edit`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {trip.cover_image_url && (
            <Card>
              <CardHeader>
                <CardTitle>Cover Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={trip.cover_image_url}
                  alt="Trip cover"
                  className="rounded-md w-full h-auto"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
