import DashHeader from "@/components/dash-header";
import ProductCard from "@/components/ui/productCard";
import SectionHeader from "@/components/ui/section-header";
import { hotDeals } from "@/lib/data";

const page = () => {
  return (
    <div className="mx-auto px-4 w-full h-full">
      <DashHeader
        page="Overview"
        description="🌴 Ready for your next adventure?"
      />
      <div className="min-w-full min-h-[calc(100vh-180px)]">
        <section className="my-6">
          <SectionHeader title="Hot Deals" link="/deal" />
          <p className="text-muted-foreground mb-4">
            Discover the best deals on travel, flights, and more. Don't miss out
            on these limited-time offers!
          </p>
          <div className="grid card-grid-container grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center justify-items-center">
            {hotDeals.slice(0, 4).map((deal, index) => (
              <ProductCard
                key={index}
                title={deal.title}
                description={deal.description}
                price={deal.price}
                id={deal.id}
                rating={deal.rating}
                imgSrc={deal.imgSrc}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
