import React from 'react';
// import { Table } from 'antd';
import Header from './Header';

// const columns = [
//   {
//     title: 'SNo',
//     dataIndex: 'key',
//   },
//   {
//     title: 'Brand Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//   },
// ];

const Brandlist = () => {
  return (
    <div>
      <style>
        {`
          /* Brandlist Page */
.brandlist-page {
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #000; /* Black background */
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column; /* Stack elements on smaller screens */
  margin-top: 60px; /* Margin to avoid content overlap with fixed header */
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* Brandlist Page Title */
.brandlist-page .title {
  font-size: 28px;
  font-weight: bold;
  color: #ff4b2b; /* Highlighted brand title color */
  margin-bottom: 20px;
  text-transform: uppercase;
  animation: fadeIn 0.8s ease-in-out;
}

/* Brandlist Table */
.brandlist-table {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
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

/* Pagination Styles */
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
  background: #ff4b2b;
}

.ant-pagination-item-active a {
  color: white;
}

.ant-pagination-prev,
.ant-pagination-next {
  color: white;
}

/* Fade In Animation */
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

/* Responsive Styles */
@media (max-width: 1024px) {
  .brandlist-page {
    padding: 15px;
  }

  .brandlist-page .title {
    font-size: 24px; /* Smaller title on medium screens */
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    font-size: 14px; /* Slightly smaller table text */
  }

  .ant-pagination-item {
    font-size: 14px; /* Smaller pagination text */
  }
}

@media (max-width: 768px) {
  .brandlist-page {
    padding: 10px;
  }

  .brandlist-page .title {
    font-size: 20px; /* Smaller title on small screens */
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    font-size: 12px; /* Smaller table text */
  }

  .ant-pagination-item {
    font-size: 12px; /* Smaller pagination text */
  }

  .ant-pagination {
    margin-top: 10px; /* Reduced margin on small screens */
  }
}

@media (max-width: 480px) {
  .brandlist-page {
    padding: 10px;
  }

  .brandlist-page .title {
    font-size: 18px; /* Even smaller title for mobile screens */
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    font-size: 10px; /* Smaller table text */
  }

  .ant-pagination-item {
    font-size: 10px; /* Smaller pagination text */
  }

  .ant-pagination {
    margin-top: 8px; /* Reduced margin for pagination */
  }
}

        `}
      </style>

      <div className="brandlist-page">
      <Header /> 
        <h3 className="mb-4 title">Brands</h3>
       
      </div>
    </div>
  );
};

export default Brandlist;
