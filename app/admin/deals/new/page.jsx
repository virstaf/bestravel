import Link from "next/link";
import { Button } from "@/components/ui/button";
import DealForm from "@/components/admin/deal-form";

const NewDealPage = () => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Deal</h1>
        <p className="text-muted-foreground">
          Fill in the details to create a new travel deal.
        </p>
      </div>
      <DealForm />
    </div>
  );
};

export default NewDealPage;
