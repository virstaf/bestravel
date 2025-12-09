"use client";

import DealCard from "@/components/deal-card";

export default function DealsList({ initialDeals: deals }) {
  if (deals?.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <h3 className="text-lg font-medium">No current deals available</h3>
        <p className="text-muted-foreground">
          Check back later for special offers
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}

