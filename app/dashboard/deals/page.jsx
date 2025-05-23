import DashHeader from "@/components/dash-header";
import Deals from "@/components/DealsPage";

const DealsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="Explore Deals"
        description="🌍 Pick your next adventure?"
      />
      <div className="content min-w-full min-h-[calc(100vh-180px)] py-8">
        <Deals />
      </div>
    </div>
  );
};

export default DealsPage;
