"use client";

import { useEffect, useState } from "react";
import SlidingCard from "./ui/slidingCard";
import { testimonialsData as testimonials } from "@/lib/data";
import { Dot } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import AutoPlayVideo from "./AutoPlayVideo";

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
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
        <div className="article">
          <h2 className="text-primary font-semibold text-xl text-center mb-6">
            What Our Members Say
          </h2>
          <p>Real testimonials from happy travelers!</p>
          <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-8">
            <div className="video bg-gray-50 h-[225px] overflow-hidden rounded-2xl shadow mb-6">
              <AutoPlayVideo source="/videos/woman-turning-in-sunlight.mp4" />
            </div>
            <div className="slider-container relative pb-4 mb-8 mx-auto group">
              <SlidingCard
                message={testimonials[sliderIndex].message}
                author={testimonials[sliderIndex].author}
                stars={testimonials[sliderIndex].stars}
              />
              <div className="flex justify-center gap-1 absolute bottom-8 left-1/2 transition-300 ease-in-out -translate-x-1/2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
