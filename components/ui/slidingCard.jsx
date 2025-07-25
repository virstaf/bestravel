import React from "react";

const SlidingCard = ({ message, author, stars }) => {
  const totalStars = 5;
  const filledStars = Array(stars).fill("★").join("");
  const emptyStars = Array(totalStars - stars)
    .fill("☆")
    .join("");

  return (
    <div className="p-8 min-h-[225px] flex flex-col justify-evenly shadow rounded-2xl bg-white mx-auto mt-8">
      <p>{message}</p>
      <div className="flex justify-between gap-4">
        <div style={{ color: "gold" }}>
          {filledStars}
          <span style={{ color: "gray" }}>{emptyStars}</span>
        </div>
        <p className="text-right text-sm font-bold">{author}</p>
      </div>
    </div>
  );
};

export default SlidingCard;
