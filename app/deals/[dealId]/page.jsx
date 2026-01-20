import { notFound } from "next/navigation";
import DealDetail from "@/components/deal-detail";
import { getDealByIdAction } from "@/actions/deals";
import NavBar from "@/components/nav-bar";
import LandingFooter from "@/components/LandingFooter";

export default async function PublicDealDetailPage({ params }) {
  const { dealId } = await params;
  const deal = await getDealByIdAction(dealId);

  if (!deal || deal.errorMessage) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="w-full min-h-[85vh] py-8 mt-20">
        <DealDetail deal={deal} isPublic={true} />
      </div>
      <LandingFooter />
    </div>
  );
}
