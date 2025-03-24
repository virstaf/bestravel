"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SlidingCard from "./ui/slidingCard";
import { testimonials } from "@/lib/data";
import { Dot } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { JoinDialog } from "./JoinDialog";

const Testimonials = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const increaseIndex = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const decreaseIndex = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      increaseIndex();
    }, 5000);
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="w-full py-12 bg-primary-foreground">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
        <div className="grid lg:grid-cols-2">
          <div className="image"></div>
          <div className="">
            <h2 className="text-sm uppercase font-bold text-center mb-6">
              ⭐ What Our Members Say
            </h2>
            <p>📢 Real testimonials from happy travelers!</p>
            <div className="slider-container relative mb-8 min-h-[200px] mx-auto group">
              <SlidingCard
                message={testimonials[sliderIndex].message}
                author={testimonials[sliderIndex].author}
                stars={testimonials[sliderIndex].stars}
              />
              <div className="flex justify-center gap-1 absolute bottom-0 left-1/2 transform -translate-x-1/2">
                {testimonials.map((_, idx) => (
                  <Dot
                    key={idx}
                    size={24}
                    className={`cursor-pointer ${
                      idx === sliderIndex ? "text-green-600" : "text-gray-400"
                    }`}
                    onClick={() => setSliderIndex(idx)}
                  />
                ))}
              </div>
              <div>
                <ArrowLeft
                  className="hidden absolute group-hover:block cursor-pointer top-[50%] left-2"
                  onClick={decreaseIndex}
                />
                <ArrowRight
                  className="hidden absolute group-hover:block cursor-pointer top-[50%] right-2"
                  onClick={increaseIndex}
                />
              </div>
            </div>
            {/* <Button>Join Now & Experience VIP Travel!</Button> */}
            <JoinDialog ButtonText={"Join Now & Experience VIP Travel!"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
