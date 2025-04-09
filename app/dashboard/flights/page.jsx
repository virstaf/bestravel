import DashHeader from "@/components/dash-header";

const FlightsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader page="VIP Flights" description="✈ Where are you going?" />
      <div className="content min-w-full min-h-[calc(100vh-180px)] border"></div>
    </div>
  );
};

export default FlightsPage;
