import React, { useEffect, useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { Line } from '@ant-design/plots';
import Header from './Header';

const Dashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalProducts: 0,
    orders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/summary');
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const revenueData = data.orders.map((order, index) => ({
    month: `Order ${index + 1}`,
    revenue: order.totalPrice || 0,
  }));

  const lineConfig = {
    data: revenueData,
    xField: 'month',
    yField: 'revenue',
    color: '#00ff88',
    smooth: true,
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#00ff88',
        lineWidth: 2,
      },
    },
    xAxis: { label: { style: { fill: '#fff' } } },
    yAxis: { label: { style: { fill: '#fff' } } },
    lineStyle: { stroke: '#00ff88', lineWidth: 3 },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <style>
        {`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          background: #0f0f0f;
          min-height: 100vh;
          color: white;
          padding: 100px 20px 40px;
          font-family: 'Poppins', sans-serif;
        }

        .title {
          font-size: 36px;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 700;
          background: linear-gradient(to right, #ff4b2b, #ff416c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.8s ease;
        }

        .card-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 25px;
          margin-bottom: 40px;
        }

        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 25px;
          min-width: 260px;
          width: calc(33.33% - 30px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
        }

        .desc {
          font-size: 14px;
          opacity: 0.7;
        }

        .sub-title {
          font-size: 28px;
          font-weight: 600;
          margin-top: 8px;
        }

        .card-footer {
          margin-top: 15px;
        }

        .green {
          color: #00ff88;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
        }

        .chart-container {
          background: rgba(255, 255, 255, 0.05);
          padding: 30px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          margin-top: 20px;
          animation: fadeIn 1s ease;
        }

        .chart-title {
          text-align: center;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #ff4b2b;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .card {
            width: calc(50% - 30px);
          }
        }

        @media (max-width: 768px) {
          .card {
            width: 100%;
          }

          .chart-container {
            padding: 20px;
          }

          .title {
            font-size: 28px;
          }

          .chart-title {
            font-size: 20px;
          }
        }
      `}
      </style>

      <div className="dashboard-container">
        <Header />
        <h3 className="title">Admin Dashboard</h3>

        <div className="card-container">
          <Card title="Total Users" value={data.totalUsers} />
          <Card title="Total Revenue" value={`₹${data.totalRevenue}`} />
          <Card title="Total Products" value={data.totalProducts} />
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Monthly Revenue Growth</h3>
          <Line {...lineConfig} />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="card">
    <div>
      <p className="desc">{title}</p>
      <h4 className="sub-title">{value}</h4>
    </div>
    <div className="card-footer">
      <h6 className="green">
        <BsArrowUpRight /> +10%
      </h6>
      <p className="desc">Compared to last month</p>
    </div>
  </div>
);

export default Dashboard;
