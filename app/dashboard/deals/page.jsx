import DashHeader from "@/components/dash-header";
import Destinations from "@/components/ui/Destinations";
import SectionHeader from "@/components/ui/section-header";
import { destinations } from "@/lib/data";

const DealsPage = () => {
  return (
    <div className="container mx-auto px-4 w-full h-full">
      <DashHeader
        page="Explore Deals"
        description="🌍 Pick your next adventure?"
      />
      <div className="content min-w-full min-h-[calc(100vh-180px)]">
        <section>
          <SectionHeader title="Hotel Recommendations for you" link="#" />
          <div className="grid grid-cols-1 sm:max-w-[500px] mx-auto lg:max-w-full lg:grid-cols-3 gap-6 mt-8">
            {destinations
              .filter((item) => item.isFeatured)
              .map((destination, idx) => (
                <Destinations
                  key={idx}
                  title={destination.title}
                  imgSrc={destination.imgSrc}
                  description={destination.description}
                  isFeatured={destination.isFeatured}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DealsPage;
