import { getFeaturedDealsAction } from "@/actions/deals";
import DealsList from "./deals-list";

/**
 * Optimized DealsSection component.
 * Moves filtering (is_featured: true) and limiting (3 deals) to the database level
 * to reduce memory usage, bandwidth, and processing time.
 */
const DealsSection = async () => {
  const { success, data: featuredDeals, error } = await getFeaturedDealsAction({ limit: 3 });

  return (
    <div className="deals w-full bg-gradient-to-b from-secondary/5 to-gray-white py-8 px-4 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold uppercase text-primary">
          Deals for you
        </h2>
        {error && (
          <span className="text-xs text-red-500 font-medium">
            (Offline: Showing limited results)
          </span>
        )}
      </div>
      
      {!success && featuredDeals.length === 0 ? (
        <div className="bg-white/50 border border-dashed border-gray-200 rounded-xl p-8 text-center">
          <p className="text-muted-foreground">Unable to load current deals. Please try again later.</p>
        </div>
      ) : (
        <DealsList initialDeals={featuredDeals} />
      )}
    </div>
  );
};

export default DealsSection;
