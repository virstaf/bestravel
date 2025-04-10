import { Star } from "lucide-react";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({
  imgSrc,
  title,
  description,
  price,
  rating,
  id,
  ...styles
}) => {
  return (
    <div
      className={
        "rounded-2xl w-full max-w-[300px] sm:max-w-[250px] bg-white shadow-2xl flex flex-col overflow-hidden"
      }
    >
      <div className="img w-full relative h-[150px]">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="object-fit"
        />
      </div>
      <div className="meta flex flex-col justify-between h-[180px] p-4">
        <div className="flex flex-col">
          <h2 className="text-blue-800 text-lg font-bold">{title}</h2>
          <p className="text-muted-foreground text-sm tracking-tight leading-tight">
            {description}
          </p>
          <span className="flex gap-2">
            <Star className="text-yellow-500" />
            {rating}
          </span>
        </div>
        <div className="flex justify-between items-end">
          <div className="leading-tight">
            <p className="text-muted-foreground text-sm">Starts from</p>
            <h3 className="text-blue-800">GHS {price}</h3>
          </div>
          <div className="cta">
            <Button className="bg-blue-900" asChild>
              <Link href={`/dashboard/deal:${id}`}>View</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
