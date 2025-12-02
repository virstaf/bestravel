import React from "react";

const Status = ({ value }) => {
  return (
    <span
      className={`h-8 flex items-center font-mono tracking-wider justify-center px-4 rounded-full text-xs font-medium ${
        value === "confirmed" //when client has agreed to quote
          ? "bg-green-100 text-green-800"
          : value === "pending" // when client submits a reservaton
            ? "bg-orange-100 text-orange-800"
          : value === "planning" // 
            ? "bg-blue-100 text-blue-800"
            : value === "rejected" //
              ? "bg-red-100 text-red-800"
              : value === "cancelled" //
                ? "bg-gray-100 text-gray-800"
                : value === "in review" // when admin is working on it and has
                  ? "bg-blue-100 text-blue-800"
                  : value === "expired" // when quote validation
                    ? "bg-yellow-100 text-yellow-800"
                    : value === "active" // when client has paid
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
      }`}
    >
      {value[0].toUpperCase() + value.slice(1)}
    </span>
  );
};

export default Status;
