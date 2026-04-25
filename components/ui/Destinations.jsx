import { memo } from "react";
import Image from "next/image";
import { isOptimizableImage } from "@/lib/image-utils";

const Destinations = memo(({ title, imgSrc, description, isFeatured }) => {
  if (!imgSrc) return null;

  return (
    <div className="my-2 bg-white shadow rounded-2xl overflow-hidden">
      <div className="relative w-full h-64 overflow-hidden rounded-b-none">
        <Image
          src={imgSrc}
          alt={title || "Destination"}
          fill
          className="object-cover hover:scale-105 transform transition duration-300 ease-in-out"
          unoptimized={!isOptimizableImage(imgSrc)}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
});

Destinations.displayName = "Destinations";

export default Destinations;
