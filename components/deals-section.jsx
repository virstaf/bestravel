import { getFeaturedDealsAction } from "@/actions/deals";
import DealsList from "./deals-list";

/**
 * Performance Optimization:
 * This component now uses `getFeaturedDealsAction` with a limit of 3.
 * This shifts filtering (is_featured=true) and limiting to the database layer,
 * reducing the data transfer and memory overhead of fetching all deals
 * and filtering them in-memory.
 */
const DealsSection = async () => {
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
