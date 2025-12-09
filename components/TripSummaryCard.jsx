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
import { getStatusColor } from "@/lib/statusHelpers";

const TripSummaryCard = ({ trip, variant="full", className }) => {
  const displayStatus = trip.currentStatus || trip.status;
  
  return (
    <Card key={trip.id} className={`hover:shadow-lg transition-shadow ${className}`}>
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
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(displayStatus)}`}
          >
            {displayStatus.replace("_", " ")}
          </span>
          <div className="flex items-center justify-between gap-4" style={{ display: variant === "full" ? "flex" : "none" }}>
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
