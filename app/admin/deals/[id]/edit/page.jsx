import { getDealByIdAction } from "@/actions/deals";
import DealForm from "@/components/admin/deal-form";
import { notFound } from "next/navigation";

export default async function EditDealPage({ params }) {
  const { id } = await params;
  const deal = await getDealByIdAction(id);

  if (!deal || deal.errorMessage) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Edit Deal</h1>
        <p className="text-gray-500">Update deal details and pricing.</p>
      </div>
      <DealForm initialData={deal} />
    </div>
  );
}
