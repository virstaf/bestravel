import DealsList from "@/components/deals-list";

const Deals = ({
  featuredDeals = [],
  deals = [],
  isPublic = false,
  isFiltered = false,
}) => {
  // Deduplicate: Exclude featured deals from the "All" list if we are in normal browsing mode
  const displayedDeals = isFiltered
    ? deals
    : deals.filter((deal) => !featuredDeals.find((f) => f.id === deal.id));

  return (
    <div className="space-y-12">
      {isFiltered ? (
        /* Unified Search Results View */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Search Results
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Found {deals.length} deal{deals.length !== 1 ? "s" : ""}{" "}
                matching your criteria
              </p>
            </div>
          </div>
          <DealsList initialDeals={deals} isPublic={isPublic} />
        </div>
      ) : (
        /* Default Browsing View (Split Sections) */
        <>
          {featuredDeals.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-md font-bold uppercase text-primary tracking-wider">
                Featured Highlights
              </h2>
              <p className="text-muted-foreground">
                Special offers from our premium partners
              </p>
              <DealsList
                initialDeals={featuredDeals}
                featuredOnly
                limit={3}
                isPublic={isPublic}
              />
            </div>
          )}

          <div className="space-y-4 pt-4 border-t border-border/40">
            <h2 className="text-md font-bold uppercase text-primary tracking-wider">
              Explore All Deals
            </h2>
            <p className="text-muted-foreground">Browse all available offers</p>
            <DealsList initialDeals={displayedDeals} isPublic={isPublic} />
          </div>
        </>
      )}
    </div>
  );
};

export default Deals;
