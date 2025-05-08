import DashHeader from "@/components/dash-header";
import DealsList from "@/components/deals-list";
import DealsSection from "@/components/deals-section";
import HotelCard from "@/components/ui/hotelCard";
import ProductCard from "@/components/ui/productCard";
import SectionHeader from "@/components/ui/section-header";
import WelcomeCard from "@/components/welcome-card";
import { hotDeals, hotels } from "@/lib/data";

const page = () => {
  return (
    <div className="px-4 h-full w-full sm:w-[calc(100%-100px)]">
      <DashHeader
        page="Overview"
        description="🌴 Ready for your next adventure?"
        className="w-full mx-auto"
      />
      <div className="w-full min-h-[calc(100vh-180px)]">
        <section className="my-12">
          <WelcomeCard />
        </section>
        <section className="my-12">
          {/* <DealsSection /> */}
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
        <section className="my-12 max-w-full bg-gray-100 rounded-2xl p-4">
          <h2 className="text-md font-bold uppercase text-primary mb-4">
            Hotel Recommendations for You
          </h2>
          <div className="overflow-x-auto hide-scrollbar w-full px-4">
            <div className="flex gap-6 snap-x snap-mandatory">
              {hotels.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
