import Link from "next/link";
import React from "react";

const MetricCard = ({
  title,
  value,
  icon,
  link,
  description,
  status = "success",
}) => {
  const statusClasses = {
    success: "metric-card-success",
    warning: "metric-card-warning",
    error: "metric-card-error",
  };
  const statusClass = statusClasses[status] || statusClasses.success;

  return (
    <Link href={link}>
      <div
        className={`metric-card ${statusClass} p-4 rounded-lg shadow-md flex flex-col items-start gap-4 justify-evenly`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex justify-between items-center w-full px-4">
          {icon && React.createElement(icon, { className: "icon" })}
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <p className="text-sm text-muted-foreground italic">{description}</p>
      </div>
    </Link>
  );
};

export default MetricCard;
