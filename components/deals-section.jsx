import { getFeaturedDealsAction } from "@/actions/deals";
import DealsList from "./deals-list";

const DealsSection = async () => {
  // Performance optimization: Fetch only featured deals at the database level instead of filtering in-memory
  const featuredDeals = await getFeaturedDealsAction({ limit: 3 });

  return (
    <div className="deals w-full bg-gradient-to-b from-secondary/5 to-gray-white py-8 px-4 rounded-2xl">
      <h2 className="text-md font-bold uppercase text-primary mb-4">
        Deals for you
      </h2>
      <DealsList initialDeals={featuredDeals} />
    </div>
  );
};

export default DealsSection;
