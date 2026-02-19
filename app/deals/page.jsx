import { getDealsAction } from "@/actions/deals";
import Deals from "@/components/DealsPage";
import NavBar from "@/components/nav-bar";
import LandingFooter from "@/components/LandingFooter";
import DealsHero from "@/components/DealsHero";
import DealsFilterBar from "@/components/DealsFilterBar";
import TrustStrip from "@/components/TrustStrip";
import DealAlertCTA from "@/components/DealAlertCTA";

export const dynamic = "force-dynamic";

const PublicDealsPage = async (props) => {
  const searchParams = await props.searchParams;
  const deals =
    (await getDealsAction({
      dest: searchParams.dest,
      maxPrice: searchParams.maxPrice,
      from: searchParams.from,
      to: searchParams.to,
      sort: searchParams.sort,
    })) || [];

  // Check if any filters are active
  const isFiltered = !!(
    searchParams.dest ||
    searchParams.maxPrice ||
    searchParams.from ||
    searchParams.to
  );

  const featuredDeals = deals.filter((deal) => deal.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section - Full Width */}
      <div className="pt-16">
        {" "}
        {/* Add padding for fixed navbar if needed, or remove if navbar is static */}
        <DealsHero />
      </div>

      {/* Sticky Filter Bar */}
      <DealsFilterBar />

      <div className="container mx-auto px-4 w-full h-full py-8">
        <div className="max-w-7xl mx-auto">
          {/* We removed the old header here */}

          <div
            className="content min-w-full min-h-[calc(100vh-180px)]"
            id="deals-grid"
          >
            <Deals
              deals={deals}
              featuredDeals={featuredDeals}
              isPublic={true}
              isFiltered={isFiltered}
            />
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Deal Alert CTA */}
      <DealAlertCTA />

      <LandingFooter />
    </div>
  );
};

export default PublicDealsPage;
