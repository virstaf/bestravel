import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const HotelCard = ({ hotel }) => {
  const imageSrc = hotel.image + hotel.id + ".jpg";

  return (
    <div className="min-w-[300px] md:min-w-[400px] h-full grid grid-cols-2 my-4 bg-white rounded-2xl shadow-md snap-start shrink-0">
      <div className="relative w-full h-48 rounded-l-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={hotel.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div className="">
          <h3 className="text-blue-800 text-lg font-bold">{hotel.name}</h3>
          <p className="text-muted-foreground text-sm tracking-tight leading-tight">
            {hotel.location}
          </p>
          <span className="flex gap-2">
            <Star className="text-yellow-500" />
            {parseInt(hotel.rating)}-Star Hotel
          </span>
        </div>
        <div className="text-blue-800">
          <span>GHS {hotel.price}/night</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
