import React from "react";
import MetricCard from "./metric-card";

const MetricList = ({ metrics }) => {
  return (
    <section className="w-full flex flex-col mb-8">
      <h2 className="mb-4 text-sm uppercase font-bold text-muted-foreground hidden">
        Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            status={metric.status}
          />
        ))}
      </div>
    </section>
  );
};

export default MetricList;
