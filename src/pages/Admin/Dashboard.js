import React, { useEffect, useState } from 'react';
import { BsArrowDownRight } from 'react-icons/bs';
import { Line } from '@ant-design/plots';
import Header from './Header';

const Dashboard = () => {
  const [users, setUsers] = useState([]); // State for users
  const [userGrowthData, setUserGrowthData] = useState([]); // State for dynamic graph data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users'); // Adjust to your backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data); // Set the user data

        // Generate dynamic graph data
        const growthData = data.map((user, index) => ({
          month: `User ${index + 1}`,
          count: 1,
        }));
        setUserGrowthData(growthData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const lineConfig = {
    data: userGrowthData, // Dynamic data
    xField: 'month',
    yField: 'count',
    color: '#ff4b2b',
    smooth: true,
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#ff4b2b',
        lineWidth: 2,
      },
    },
    lineStyle: {
      stroke: '#ff4b2b',
      lineWidth: 3,
    },
    xAxis: {
      label: {
        style: { fill: '#fff' },
      },
    },
    yAxis: {
      label: {
        style: { fill: '#fff' },
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      flex-direction: column; /* Default to column layout on smaller screens */
      margin-top: 100px; /* Margin to avoid content overlap with fixed header */
      overflow-x: hidden; /* Prevent horizontal scroll */
    }

    /* Title Styling */
    .dashboard-container .title {
      font-size: 28px;
      font-weight: bold;
      color: #ff4b2b; /* Accent color for the title */
      margin-bottom: 20px;
      text-transform: uppercase;
      animation: fadeIn 0.8s ease-in-out;
      text-align: center;
    }

    /* Card Container for Dashboard */
    .card-container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      justify-content: center; /* Center cards */
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
      min-width: 280px; /* Minimum width for smaller screens */
    }

    /* Chart Container */
    .chart-container {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2); /* Red for card shadow */
      animation: fadeIn 0.8s ease-in-out;
      margin-top: 20px;
    }

    .chart-title {
      text-align: center;
      margin-bottom: 15px;
      font-size: 22px;
      font-weight: bold;
      color: #ff4b2b;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .card {
        width: calc(50% - 20px); /* Two cards per row on medium screens */
      }
    }

    @media (max-width: 768px) {
      .card {
        width: 100%; /* Single card per row on smaller screens */
      }

      .card-container {
        gap: 10px; /* Reduce gap between cards */
      }

      .dashboard-container .title {
        font-size: 24px; /* Smaller font size for the title */
      }

      .chart-container {
        padding: 15px; /* Smaller padding for charts */
      }
    }

    @media (max-width: 480px) {
      .dashboard-container .title {
        font-size: 20px; /* Further reduce font size for the title */
      }

      .card {
        padding: 15px; /* Reduce padding in cards */
      }

      .chart-container {
        padding: 10px; /* Further reduce padding for charts */
      }
    }
  `}
</style>


      <div className="dashboard-container">
        <Header />
        <div className="main-content">
          <h3 className="title">Dashboard</h3>
          <div className="card-container">
            <div className="card">
              <div>
                <p className="desc">Total Users</p>
                <h4 className="sub-title">{users.length}</h4>
              </div>
              <div className="card-footer">
                <h6 className="green">
                  <BsArrowDownRight /> +{users.length}%
                </h6>
                <p className="desc">Compared to last month</p>
              </div>
            </div>
            <div className="card">
              <div>
                <p className="desc">Active Users</p>
                <h4 className="sub-title">{users.length}</h4>
              </div>
              <div className="card-footer">
                <h6 className="red">
                  <BsArrowDownRight /> +{users.length}%
                </h6>
                <p className="desc">Compared to last month</p>
              </div>
            </div>
            <div className="card">
              <div>
                <p className="desc">New Users</p>
                <h4 className="sub-title">{users.length}</h4>
              </div>
              <div className="card-footer">
                <h6 className="green">
                  <BsArrowDownRight /> +{users.length}%
                </h6>
                <p className="desc">Compared to last month</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="chart-title">Monthly User Growth</h3>
            <div className="chart-container">
              <Line {...lineConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
