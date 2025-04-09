import DashHeader from "@/components/dash-header";

const DealsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="Explore Deals"
        description="🌍 Pick your next adventure?"
      />
      <div className="content min-w-full min-h-[calc(100vh-180px)] border"></div>
    </div>
  );
};

export default DealsPage;
