import { memo } from "react";

/**
 * SlidingCard component optimized with React.memo.
 * This component is used in a slider that updates every 5 seconds,
 * so memoization helps avoid unnecessary re-renders of the card content.
 */
const SlidingCard = memo(({ message, author, stars }) => {
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
});

SlidingCard.displayName = "SlidingCard";

export default SlidingCard;
