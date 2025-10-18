import { getFormattedDate } from "@/lib/getFormattedDate";
import { Button } from "./button";

const QuoteItem = ({ reservation, addQuoteItem }) => {
  const type = reservation.type;
  return (
    <>
      <div>
        <span className="capitalize font-medium">{reservation.type}</span>
        <p className="text-sm text-gray-600">
          {type === "flight"
            ? `${reservation.details?.departureCity} - ${reservation.details?.arrivalCity}`
            : type === "hotel"
              ? `${reservation.details?.city}, ${reservation.details?.preferredHotel} - ${reservation.details?.roomType}, ${getFormattedDate(reservation.details?.checkIn)} to ${getFormattedDate(reservation.details?.checkOut)}`
              : type === "transfer"
                ? `${reservation.details?.pickupLocation} - ${reservation.details?.dropoffLocation}`
                : "No details"}
        </p>
      </div>
      <Button
        onClick={() => addQuoteItem(reservation.id, reservation.type)}
      >
        Add Option
      </Button>
    </>
  );
};

export default QuoteItem;
