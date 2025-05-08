import { getFeaturedDealsAction } from "@/actions/deals";
import React from "react";
import DealsList from "./deals-list";

const DealsSection = async () => {
  //   const { data: deals, error } = await getFeaturedDealsAction();
  //   console.log("f deals::", deals);
  //   if (error) {
  //     return <div>Error: {error}</div>;
  //   }
  //   if (!deals || deals.length === 0) {
  //     return <div>No deals available</div>;
  //   }

  return <DealsList initialDeals={[]} featuredOnly />;
};

export default DealsSection;
