import { getFeaturedDealsAction } from "@/actions/deals";
import DealsList from "@/components/deals-list";

const Deals = ({ featuredDeals, allDeals }) => {
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
        <DealsList initialDeals={allDeals} />
      </div>
    </div>
  );
};

export default Deals;

export async function getStaticProps() {
  try {
    const featuredDeals = await getFeaturedDealsAction({
      featured: true,
      limit: 2,
    });

    const allDeals = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/deals?limit=10`
    );

    return {
      props: {
        featuredDeals: await featuredDeals.json(),
        allDeals: await allDeals.json(),
      },
      revalidate: 300, // 5 minutes
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        featuredDeals: [], // Fallback empty array
        allDeals: [], // Fallback empty array
      },
      revalidate: 60, // Try again sooner if error
    };
  }
}
