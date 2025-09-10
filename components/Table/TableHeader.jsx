// components/Table/TableHeader.jsx
import React from "react";

const TableHeader = ({ columns, sortConfig, onSort }) => {
  return (
    <thead className="bg-secondary/20">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`
              px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
              ${column.sortable ? "cursor-pointer hover:bg-secondary/10" : ""}
              ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"}
            `}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div
              className={`flex items-center ${column.align === "center" ? "justify-center" : column.align === "right" ? "justify-end" : "justify-start"}`}
            >
              {column.header}
              {column.sortable && sortConfig?.key === column.key && (
                <span className="ml-1">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
