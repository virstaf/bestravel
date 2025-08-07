"use client";

import { useState, useEffect } from "react";
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
import useUserStore from "@/user.store";
import { fetchTrips } from "@/actions/trips";

const TripsList = ({ initialTrips = [], limit }) => {
  const [trips, setTrips] = useState(initialTrips);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripLink, setTripLink] = useState("/pricing");
  const { user, isSubscribed } = useUserStore.getState();

  // useEffect(() => {
  //   const loadUser = async () => {
  //     await fetchUser();
  //   };
  //   loadUser();
  // }, []);

  useEffect(() => {
    const getTrips = async () => {
      try {
        setLoading(true);
        const data = await fetchTrips(user?.id);
        setTrips(data || []);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getTrips();
  }, []);

  useEffect(() => {
    if (isSubscribed) {
      setTripLink("/dashboard/trips/new");
    } else {
      setTripLink("/pricing");
    }
  }, [isSubscribed]);

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
