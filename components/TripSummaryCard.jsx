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
import { getFormattedDate } from "@/lib/getFormattedDate";
import { MapPinIcon } from "./ui/MapPinIcon";
import { UsersRoundIcon } from "./ui/UsersRoundIcon";

const TripSummaryCard = ({ trip }) => {
  return (
    <Card key={trip.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{trip.title}</CardTitle>
        <CardDescription>{trip.destination}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          {getFormattedDate(trip.start_date)} -{" "}
          {getFormattedDate(trip.end_date)}
        </div>
        <div className="flex items-center text-sm">
          <MapPinIcon className="h-4 w-4 mr-2" />
          {trip.destination}
        </div>
        <div className="flex items-center text-sm">
          <UsersRoundIcon className="h-4 w-4 mr-2" />
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
          <div className="flex items-center justify-between gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/trips/${trip.id}`}>View Details</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/dashboard/trips/${trip.id}/reserve`}>
                Reserve for Trip
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripSummaryCard;
