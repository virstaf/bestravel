import DealsList from "@/components/deals-list";

const Deals = ({ featuredDeals, deals }) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-md font-bold uppercase text-primary">
          Featured Deals
        </h2>
        <p className="text-muted-foreground">
          Special offers from our premium partners
        </p>
        <DealsList initialDeals={featuredDeals} featuredOnly limit={3} />
      </div>

      <div className="space-y-4">
        <h2 className="text-md font-bold uppercase text-primary">
          All Current Deals
        </h2>
        <p className="text-muted-foreground">Browse all available offers</p>
        <DealsList initialDeals={deals} />
      </div>
    </div>
  );
};

export default Deals;
