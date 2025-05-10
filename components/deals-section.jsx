import { getFeaturedDealsAction } from "@/actions/deals";
import DealsList from "./deals-list";

const DealsSection = ({ deals }) => {
  return (
    <div className="deals">
      <h2 className="text-md font-bold uppercase text-primary mb-4">
        Deals for you
      </h2>
      <DealsList featuredOnly initialDeals={deals} limit={3} />
    </div>
  );
};

export default DealsSection;

export async function getStaticProps() {
  try {
    const deals = await getFeaturedDealsAction({ limit: 3 });
    console.log("getStaticProps Deals:::", deals);

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
