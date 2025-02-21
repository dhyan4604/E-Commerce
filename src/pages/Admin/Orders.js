import React from "react";
import Header from "./Header";



const Orders = () => {
  return (
    <div>
      <style>
        {`
          /* Orders Page */
          .orders-container {
            padding: 20px;
            font-family: 'Poppins', sans-serif;
            background-color: #000; /* Black background */
            color: white;
            min-height: 100vh;
           margin-top: 60px; /* Margin to avoid content overlap with fixed header */
           overflow-x: hidden; /* Prevent horizontal scroll */
          }

          /* Orders Page Title */
          .orders-container .title {
            font-size: 28px;
            font-weight: bold;
            color: #ff4b2b; /* Accent color for the title */
            margin-bottom: 20px;
            text-transform: uppercase;
            animation: fadeIn 0.8s ease-in-out;
          }

          /* Orders Table */
          .orders-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2); /* Red glow for the table */
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: fadeIn 0.8s ease-in-out;
          }

          /* Ant Design Table */
          .ant-table {
            background: transparent !important; /* Transparent table background */
            color: white;
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

          .ant-table-tbody > tr > td:first-child {
            font-weight: bold;
          }

          /* Responsive Styles for Smaller Screens */
          @media (max-width: 768px) {
            .orders-container {
              padding: 10px; /* Adjust padding */
            }

            .orders-container .title {
              font-size: 22px; /* Adjust title size */
            }

            .ant-table {
              overflow-x: auto; /* Enable horizontal scroll */
            }

            .ant-table-thead > tr > th {
              font-size: 14px; /* Adjust header font size */
            }

            .ant-table-tbody > tr > td {
              font-size: 12px; /* Adjust row font size */
            }

            .orders-table {
              padding: 15px; /* Adjust padding for smaller screens */
            }
          }

          @media (max-width: 480px) {
            .orders-container {
              padding: 8px; /* Reduced padding for very small screens */
            }

            .orders-container .title {
              font-size: 18px; /* Smaller title font size */
            }

            .ant-table-thead > tr > th {
              font-size: 12px; /* Smaller header font size */
            }

            .ant-table-tbody > tr > td {
              font-size: 10px; /* Smaller row font size */
            }

            .orders-table {
              padding: 10px; /* Adjust table padding */
            }
          }
        `}
      </style>

      <div className="orders-container">
        <Header />
        <h3 className="mb-4 title">Orders</h3>

      </div>
    </div>
  );
};

export default Orders;
