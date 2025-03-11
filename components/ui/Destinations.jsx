import React from "react";

const Destinations = ({ title, imgSrc, description, isFeatured }) => {
  return (
    <div className="p-8 bg-white shadow rounded-2xl">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-64 object-cover rounded-2xl"
      />
      <h2 className="text-xl font-bold mt-4">{title}</h2>
      <p className="text-gray-600 mt-4">{description}</p>
    </div>
  );
};

export default Destinations;
