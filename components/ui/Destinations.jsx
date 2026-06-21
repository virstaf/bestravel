import { memo } from "react";
import Image from "next/image";
import { isOptimizableImage } from "@/lib/image-utils";

/**
 * Destinations component memoized to prevent unnecessary re-renders when
 * featured destinations grid is filtered or parent components re-render.
 */
const Destinations = memo(
  ({ title, imgSrc, description, isFeatured, priority = false }) => {
    if (!imgSrc) return null;

    return (
      <div className="my-2 bg-white shadow rounded-2xl overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imgSrc}
            alt={title}
            fill
            priority={priority}
            unoptimized={!isOptimizableImage(imgSrc)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-b-none hover:scale-105 transform transition duration-300 ease-in-out"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  }
);

Destinations.displayName = "Destinations";

export default Destinations;
