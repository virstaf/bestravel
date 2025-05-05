// components/trip/OverviewCard.js
const OverviewCard = ({ trip }) => {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>{trip.destination}</CardTitle>
        <CardDescription>
          {format(trip.startDate, "MMM dd")} -{" "}
          {format(trip.endDate, "MMM dd yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Badge variant="outline">{trip.status}</Badge>
          <div className="flex items-center gap-2 text-sm">
            <UsersIcon className="h-4 w-4" />
            {trip.adults} adults, {trip.children} children
          </div>
        </div>
        <Progress value={tripProgress(trip)} className="mt-4" />
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
