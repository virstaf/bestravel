import { getDealsAction } from "@/actions/deals";
import DashHeader from "@/components/dash-header";
import Deals from "@/components/DealsPage";

export const dynamic = "force-dynamic";

const DealsPage = async () => {
  const deals = (await getDealsAction()) || [];
  const featuredDeals = deals
    .filter((deal) => deal.partners.is_featured)
    .slice(0, 3);
  // console.log("Fetched featured deals:", featuredDeals);

  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="Explore Deals"
        description="🌍 Pick your next adventure?"
      />
      <div className="content min-w-full min-h-[calc(100vh-180px)] py-8">
        <Deals deals={deals} featuredDeals={featuredDeals} />
      </div>
    </div>
  );
};

export default DealsPage;
