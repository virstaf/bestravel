import DashHeader from "@/components/dash-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { Button } from "react-day-picker";

const page = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="Reserve for Trip"
        description="😍 Get Resources for your Trip!"
      />
      <div className="content min-w-full min-h-[calc(100vh-180px)] my-2">
        {/* <TripDetail trip={trip} /> */}
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Reserve for Trip</h1>
          <p className="text-muted-foreground">
            This feature is coming soon! Stay tuned for updates.
          </p>
        </div>
        <Button asChild className="my-4">
          <Link href="/dashboard/trips">All Trips</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
