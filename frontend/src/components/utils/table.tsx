import React from "react";
import { Table } from "react-bootstrap";

interface TableCompProps {
  columns: string[];
  data: any[];
}

const TableComp: React.FC<TableCompProps> = ({ columns, data }) => {
  return (
    <div>
      <style>{`
        .custom-table {
          font-size: 14px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-top: 20px;
        }

        .custom-table th, .custom-table td {
          text-align: left;
          padding: 12px;
          vertical-align: middle;
        }

        .custom-table th {
          background-color: #16404D;
          color: white;
          font-weight: 600;
          border-bottom: 2px solid #0056b3;
        }

        .custom-table td {
          background-color: #f9f9f9;
          border-bottom: 1px solid #ddd;
        }

        .custom-table tr:hover {
          background-color: #f1f1f1;
        }

        .custom-table .table-striped tbody tr:nth-of-type(odd) {
          background-color: #fafafa;
        }

        .custom-table .table-hover tbody tr:hover {
          background-color: #e6f7ff;
        }

        .custom-table .table-bordered {
          border: 1px solid #ddd;
        }

        @media (max-width: 768px) {
          .custom-table th, .custom-table td {
            font-size: 12px;
            padding: 8px;
          }
        }
      `}</style>

      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComp;
