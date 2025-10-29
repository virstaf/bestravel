import { getDealsAction } from "@/actions/deals";
import DealsList from "./deals-list";

const DealsSection = async () => {
  const deals = await getDealsAction();
  const featuredDeals = deals
    .filter((deal) => deal.partners.is_featured)
    .slice(0, 3);
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

export async function getStaticProps() {
  try {
    const deals = await getFeaturedDealsAction({ limit: 3 });
    console.error("getStaticProps Deals:::", deals);

    return {
      props: {
        deals: deals || [], // Ensure deals is never undefined
      },
      revalidate: 300, // 5 minutes
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        deals: [], // Fallback empty array
      },
      revalidate: 60, // Try again sooner if error
    };
  }
}
