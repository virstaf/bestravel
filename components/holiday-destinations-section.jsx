import Link from "next/link";
import { Button } from "./ui/button";
import Destinations from "./ui/Destinations";
import { destinations } from "@/lib/data";

const HolidayDestinationsSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-primary/5 to-gray-white py-8 px-4 rounded-2xl">
      <div className="title flex justify-between">
        <h2 className="text-md font-bold uppercase text-primary mb-6">
          Holiday Destinations worth Exploring
        </h2>
        <Button asChild variant="secondary" className="tracking-wide">
          <Link href="#">See more</Link>
        </Button>
      </div>
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {destinations.map((item, index) => (
          <Destinations
            key={index}
            title={item.title}
            imgSrc={item.imgSrc}
            description={item.description}
            isFeatured={item.isFeatured}
          />
        ))}
      </div>
    </div>
  );
};

export default HolidayDestinationsSection;
