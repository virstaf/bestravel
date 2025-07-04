// components/TripsList.js
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { MapPin } from "lucide-react";
import { UsersIcon } from "lucide-react";
import { getUser } from "@/lib/supabase/server";

const TripsList = ({ initialTrips = [], limit }) => {
  const [trips, setTrips] = useState(initialTrips);
  const [loading, setLoading] = useState(!initialTrips.length);
  const [error, setError] = useState(null);
  const [tripLink, setTripLink] = useState("");

  // Optional: Fetch trips client-side if needed
  useEffect(() => {
    if (initialTrips.length) return;

    const fetchTrips = async () => {
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("Not authenticated");

        const { data, error } = await supabase
          .from("trips")
          .select("*")
          .eq("user_id", user.id)
          .order("start_date", { ascending: true });

        if (error) throw error;

        setTrips(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [initialTrips.length]);

  // Optional: Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("trips_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "trips",
        },
        (payload) => {
          setTrips((current) => {
            const newTrips = [...current];
            const index = newTrips.findIndex((t) => t.id === payload.new.id);

            if (payload.eventType === "DELETE") {
              if (index >= 0) newTrips.splice(index, 1);
            } else if (index >= 0) {
              newTrips[index] = payload.new;
            } else {
              newTrips.push(payload.new);
            }

            return newTrips;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { email } = await getUser();
        const isSubscribed = await supabase
          .from("profiles")
          .select("is_subscribed")
          .eq("email", email)
          .maybeSingle();
        console.log("User subscription status:", isSubscribed);

        if (isSubscribed.data?.is_subscribed) {
          setTripLink("/dashboard/trips/new");
        } else {
          setTripLink("/pricing");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setTripLink("/pricing");
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (!trips.length) {
    return (
      <div className="text-center py-12 space-y-4">
        <h3 className="text-lg font-medium">No trips planned yet</h3>
        <p className="text-muted-foreground">
          Start planning your next adventure
        </p>
        <Link href={tripLink}>
          <Button>Create New Trip</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trips.slice(0, limit ? limit : trips.length).map((trip) => (
        <Card key={trip.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{trip.title}</CardTitle>
            <CardDescription>{trip.destination}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(trip.start_date).toLocaleDateString()} -{" "}
              {new Date(trip.end_date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              {trip.destination}
            </div>
            <div className="flex items-center text-sm">
              <UsersIcon className="h-4 w-4 mr-2" />
              {trip.adults} adults{" "}
              {trip.children > 0 ? `, ${trip.children} children` : ""}
            </div>
            <div className="flex justify-between items-center pt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  trip.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : trip.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {trip.status.replace("_", " ")}
              </span>
              <Link href={`/dashboard/trips/${trip.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TripsList;
