import React from "react";
import { Button } from "./ui/button";

const Testimonials = () => {
  return (
    <div className="w-full py-8 border bg-gray-200">
      <div className="content px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-sm uppercase font-bold text-center mb-6">
          ⭐ What Our Members Say
        </h2>
        <p>📢 Real testimonials from happy travelers!</p>
        <div>Slider...</div>
        <Button>Join Now & Experience VIP Travel!</Button>
      </div>
    </div>
  );
};

export default Testimonials;
