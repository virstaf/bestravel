import DealsList from "./deals-list";

/**
 * Optimized DealsSection component.
 * Now a presentational component that receives featuredDeals as a prop,
 * supporting parallel data fetching at the page level.
 */
const DealsSection = ({ featuredDeals }) => {
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
