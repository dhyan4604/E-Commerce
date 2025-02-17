import React from 'react';
import { BsArrowDownRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import Sidebar from './Sidebar'; // Import Sidebar component

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

const Dashboard = () => {
  const data = [];

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  return (
    <div>
      <style>
  {`
    /* Dashboard Container */
    .dashboard-container {
      display: flex;
      background-color: #000; /* Black background */
      color: white;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
    }

    /* Title Styling */
    .dashboard-container .title {
      font-size: 28px;
      font-weight: bold;
      color: #ff4b2b; /* Accent color for the title */
      margin-bottom: 20px;
      text-transform: uppercase;
      animation: fadeIn 0.8s ease-in-out;
    }

    /* Card Container for Dashboard */
    .card-container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    /* Individual Cards */
    .card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2); /* Red for card shadow */
      padding: 20px;
      width: calc(33.33% - 20px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: fadeIn 0.8s ease-in-out;
    }

    /* Card Description */
    .card .desc {
      font-size: 14px;
      color: white;
      margin-bottom: 5px;
    }

    /* Card Sub-title */
    .card .sub-title {
      font-size: 24px;
      font-weight: bold;
      color: white;
    }

    /* Card Footer */
    .card-footer {
      margin-top: 10px;
    }

    .card-footer h6 {
      font-size: 14px;
      margin: 0;
      display: flex;
      align-items: center;
    }

    .card-footer h6.green {
      color: #4caf50; /* Green for positive change */
    }

    .card-footer h6.red {
      color: #f44336; /* Red for negative change */
    }

    .card-footer p {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }

    /* Chart Title */
    .chart-title {
      font-size: 22px;
      font-weight: bold;
      color: #ff4b2b; /* Matching the button accent color */
      margin-bottom: 20px;
      animation: fadeIn 0.8s ease-in-out;
    }

    /* Chart Container */
    .chart-container {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2); /* Red for card shadow */
      animation: fadeIn 0.8s ease-in-out;
    }

    /* Table Styles */
    .ant-table {
      background: transparent !important;
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
      background: #ff4b2b; /* Red active pagination */
    }

    .ant-pagination-item-active a {
      color: white;
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      color: white;
    }

    /* Sidebar Styles for Dashboard */
    .sidebar-container {
      width: 240px;
      background-color: #333; /* Sidebar background */
      height: 100vh;
      padding: 20px;
    }

    .sidebar-item {
      color: white;
      padding: 10px 15px;
      margin: 10px 0;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .sidebar-item:hover {
      background-color: #ff4b2b; /* Sidebar hover color */
    }

    /* Main Content Area */
    .main-content {
      flex: 1;
      padding: 20px;
      background-color: #111; /* Dark background for main content */
    }

    /* Animation for fade-in */
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

      <div className="dashboard-container">
        <Sidebar /> {/* Sidebar added here */}
        <div className="main-content">
          <h3 className="title">Dashboard</h3>
          <div className="card-container">
            <div className="card">
              <div>
                <p className="desc">Total</p>
                <h4 className="sub-title">₹ 0</h4>
              </div>
              <div className="card-footer">
                <h6 className="green">
                  <BsArrowDownRight /> 0%
                </h6>
                <p className="desc">Compared to last month</p>
              </div>
            </div>
            <div className="card">
              <div>
                <p className="desc">Total</p>
                <h4 className="sub-title">₹ 0</h4>
              </div>
              <div className="card-footer">
                <h6 className="red">
                  <BsArrowDownRight /> 0%
                </h6>
                <p className="desc">Compared to last month</p>
              </div>
            </div>
            <div className="card">
              <div>
                <p className="desc">Total</p>
                <h4 className="sub-title">₹ 0</h4>
              </div>
              <div className="card-footer">
                <h6 className="green">
                  <BsArrowDownRight /> 0%
                </h6>
                <p className="desc">Compared to last month</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="chart-title">Income Statics</h3>
            <div className="chart-container">
              <Column {...config} />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-4">Recent Orders</h3>
            <Table columns={columns} dataSource={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
