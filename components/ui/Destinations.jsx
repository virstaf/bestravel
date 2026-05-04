import Image from "next/image";
import { isOptimizableImage } from "@/lib/image-utils";

/**
 * Destinations component to display a travel destination card.
 * Optimized with Next.js Image for better performance and LCP.
 */
const Destinations = ({
  title,
  imgSrc,
  description,
  isFeatured,
  priority = false,
}) => {
  if (!imgSrc) return null;

  return (
    <div className="my-2 bg-white shadow rounded-2xl overflow-hidden">
      {/*
        Optimization: Using next/image with fill and priority for LCP.
        Relative container is required for 'fill' prop.
      */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority={priority}
          unoptimized={!isOptimizableImage(imgSrc)}
          className="object-cover rounded-b-none hover:scale-105 transform transition duration-300 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Destinations;
