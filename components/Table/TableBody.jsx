// components/Table/TableBody.jsx
import React from 'react';

const TableBody = ({
  columns,
  data,
  striped,
  hover,
  onRowClick,
}) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className={`
            ${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            ${hover ? 'hover:bg-gray-100 transition-colors duration-150' : ''}
            ${onRowClick ? 'cursor-pointer' : ''}
          `}
          onClick={() => onRowClick && onRowClick(row)}
        >
          {columns.map((column) => (
            <td
              key={column.key}
              className={`
                px-6 py-4 whitespace-nowrap text-sm text-gray-900
                ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
              `}
            >
              {column.render ? column.render(row[column.key], row) : row[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;