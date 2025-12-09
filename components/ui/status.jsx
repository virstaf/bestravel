import React from "react";
import { getStatusColor } from "@/lib/statusHelpers";

const Status = ({ value }) => {
  if (!value) return null;
  
  return (
    <span
      className={`h-8 flex items-center font-mono tracking-wider justify-center px-4 rounded-full text-xs font-medium ${getStatusColor(value)}`}
    >
      {value[0].toUpperCase() + value.slice(1)}
    </span>
  );
};

export default Status;
