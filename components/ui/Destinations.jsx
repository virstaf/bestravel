import React from "react";

const Destinations = ({ title, imgSrc, description, isFeatured }) => {
  return (
    <div className="my-2 bg-white shadow rounded-2xl overflow-hidden">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-64 object-cover  rounded-b-none hover:scale-105 transform transition duration-300 ease-in-out"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Destinations;
