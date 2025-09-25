import { notFound } from "next/navigation";
import DealDetail from "@/components/deal-detail";
import { getDealByIdAction } from "@/actions/deals";

export default async function DealDetailPage({ params }) {
  const { dealId } = await params;
  const deal = await getDealByIdAction(dealId);

  if (deal.length === 0) {
    return notFound;
  }

  return (
    <div className="w-full min-h-[85vh] py-8">
      <DealDetail deal={deal} />
    </div>
  );
}
