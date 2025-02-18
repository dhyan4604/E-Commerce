import React from 'react';
import { Table } from 'antd';
import Sidebar from './Sidebar'; 

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
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

const Productlist = () => {
  return (
    <div>
     <style>
  {`
    /* Product List Page */
.productlist-container {
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #000; /* Dark background */
  color: white;
  min-height: 100vh;
}

/* Product List Page Title */
.productlist-container .title {
  font-size: 28px;
  font-weight: bold;
  color: #ff4b2b; /* Accent color for the title */
  margin-bottom: 20px;
  text-transform: uppercase;
  animation: fadeIn 0.8s ease-in-out;
}

/* Ant Design Table */
.ant-table {
  background: transparent !important; /* Transparent table background */
  color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2); /* Red glow for the table */
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
  background: #ff4b2b; /* Active pagination with accent color */
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
  .productlist-container {
    padding: 15px; /* Reduced padding for medium-sized screens */
  }

  .productlist-container .title {
    font-size: 24px; /* Smaller title for medium screens */
  }

  .ant-table-thead > tr > th {
    font-size: 14px; /* Smaller font size for table headers */
  }

  .ant-table-tbody > tr > td {
    font-size: 12px; /* Smaller font size for table data */
  }

  .ant-pagination-item {
    font-size: 12px; /* Smaller pagination text */
  }
}

@media (max-width: 768px) {
  .productlist-container {
    padding: 10px; /* Further reduce padding for smaller screens */
  }

  .productlist-container .title {
    font-size: 20px; /* Smaller title for smaller screens */
  }

  .ant-table-thead > tr > th {
    font-size: 12px; /* Smaller font size for table headers */
  }

  .ant-table-tbody > tr > td {
    font-size: 12px; /* Smaller font size for table data */
  }

  .ant-pagination-item {
    font-size: 10px; /* Smaller pagination text */
  }

  .ant-table {
    box-shadow: none; /* Remove table shadow on smaller screens for cleaner look */
  }
}

@media (max-width: 480px) {
  .productlist-container {
    padding: 8px; /* Reduced padding for very small screens */
  }

  .productlist-container .title {
    font-size: 18px; /* Very small title for small screens */
  }

  .ant-table-thead > tr > th {
    font-size: 10px; /* Very small table header font size */
  }

  .ant-table-tbody > tr > td {
    font-size: 10px; /* Very small table data font size */
  }

  .ant-pagination-item {
    font-size: 8px; /* Very small pagination text */
  }
}

  `}
</style>

      <div className="productlist-container">
      <Sidebar /> 
        <h3 className="mb-4 title">Products</h3>
        <div>
          <Table columns={columns} dataSource={[]} />
        </div>
      </div>
    </div>
  );
};

export default Productlist;
