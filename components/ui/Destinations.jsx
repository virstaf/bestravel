
import Image from "next/image";
import { isOptimizableImage } from "@/lib/image-utils";

const Destinations = ({ title, imgSrc, description, isFeatured, priority = false }) => {
  return (
    <div className="my-2 bg-white shadow rounded-2xl overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority={priority}
          className="object-cover rounded-b-none hover:scale-105 transform transition duration-300 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={!isOptimizableImage(imgSrc)}
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
