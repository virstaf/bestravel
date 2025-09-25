"use client";

// pages/index.js
import React from "react";
import Table from "./Table/Table";
import { tierTableData } from "@/lib/data";

const TiersTable = ({ title }) => {
  const columns = [
    {
      key: "feature",
      header: "Feature",
      sortable: false,
      align: "left",
    },
    {
      key: "silver",
      header: "Silver (£12.99/mo) Annual £139",
      sortable: false,
    },
    {
      key: "gold",
      header: "Gold (£25.99/mo) Annual £275",
      sortable: false,
    },
    {
      key: "platinum",
      header: "Platinum (£45/mo) Annual £499",
      align: "right",
    },
  ];

  const data = tierTableData

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl text-muted-foreground px-4 font-semibold mb-6">
        {title}
      </h1>

      <Table
        columns={columns}
        data={data}
        striped={true}
        hover={true}
        pagination={true}
        // pageSize={5}
        onRowClick={handleRowClick}
        className="mb-8"
      />
    </div>
  );
};

export default TiersTable;
