import { getDealsAction } from "@/actions/deals";
import Deals from "@/components/DealsPage";
import NavBar from "@/components/nav-bar";
import LandingFooter from "@/components/LandingFooter";

export const dynamic = "force-dynamic";

const PublicDealsPage = async () => {
  const deals = (await getDealsAction()) || [];
  const featuredDeals = deals.filter((deal) => deal.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="container mx-auto px-4 w-full h-full mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Exclusive Travel Deals</h1>
            <p className="text-muted-foreground text-lg">
              Discover amazing travel packages at unbeatable prices
            </p>
          </div>
          <div className="content min-w-full min-h-[calc(100vh-180px)] py-8">
            <Deals
              deals={deals}
              featuredDeals={featuredDeals}
              isPublic={true}
            />
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default PublicDealsPage;
