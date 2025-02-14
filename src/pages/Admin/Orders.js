import React from 'react';
import { Table } from 'antd';


const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Brand Name',
    dataIndex: 'brand',
  },
  {
    title: 'Product Name',
    dataIndex: 'product',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Orders = () => {
  return (
    <div>
      <style>
        {`
          .orders-container {
            padding: 20px;
            font-family: 'Poppins', sans-serif;
            background-color: #000; /* Dark background */
            color: white;
            min-height: 100vh;
          }

          .orders-container .title {
            font-size: 28px;
            font-weight: bold;
            color: #ffd333; /* Accent color for the title */
            margin-bottom: 20px;
            text-transform: uppercase;
            animation: fadeIn 0.8s ease-in-out;
          }

          .ant-table {
            background: transparent !important; /* Transparent table background */
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(255, 211, 51, 0.2); /* Soft yellow glow */
          }

          .ant-table-thead > tr > th {
            background: rgba(255, 255, 255, 0.1); /* Header background */
            color: white;
            font-weight: bold;
            font-size: 16px;
            text-transform: uppercase;
          }

          .ant-table-tbody > tr > td {
            background: rgba(255, 255, 255, 0.05); /* Row background */
            color: white;
            font-size: 14px;
            transition: background 0.3s ease-in-out;
          }

          .ant-table-tbody > tr:hover > td {
            background: rgba(255, 255, 255, 0.15); /* Hover effect for rows */
          }

          .ant-pagination {
            margin-top: 16px;
          }

          .ant-pagination-item {
            background: rgba(255, 255, 255, 0.1);
            border: none;
          }

          .ant-pagination-item a {
            color: white;
          }

          .ant-pagination-item-active {
            background: #ffd333;
          }

          .ant-pagination-item-active a {
            color: white;
          }

          .ant-pagination-prev,
          .ant-pagination-next {
            color: white;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="orders-container">
        <h3 className="mb-4 title">Orders</h3>
        <div>
          <Table columns={columns} dataSource={[]} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
