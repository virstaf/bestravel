import DashHeader from "@/components/dash-header";
import Flights from "@/components/flights-page";

const FlightsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="VIP Flights" description="✈ Where are you going?" />
      <div className="content w-full min-h-[calc(100vh-180px)] mx-auto flex flex-col justify-center">
        <Flights />
      </div>
    </div>
  );
};

export default FlightsPage;
