import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!authToken) throw new Error("Unauthorized: No Token Found");

        const response = await axios.get("http://localhost:5000/api/all-orders", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authToken]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/update-status/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status.");
    }
  };

  return (
    <div>
      <style>
        {`
          .orders-container {
            padding: 20px;
            font-family: 'Poppins', sans-serif;
            background-color: #000;
            color: white;
            min-height: 100vh;
            margin-top: 60px;
            overflow-x: auto;
          }

          .orders-container .title {
            font-size: 28px;
            font-weight: bold;
            color: #ff4b2b;
            margin-bottom: 20px;
            text-transform: uppercase;
            animation: fadeIn 0.8s ease-in-out;
          }

          .orders-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: fadeIn 0.8s ease-in-out;
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            color: white;
          }

          th, td {
            padding: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            text-align: left;
          }

          th {
            background: rgba(255, 255, 255, 0.1);
            font-weight: bold;
            text-transform: uppercase;
          }

          tr:hover {
            background: rgba(255, 255, 255, 0.15);
          }

          .product-name {
            color: white;
            cursor: pointer;
            font-weight: bold;
            display: inline-block;
          }

          .product-name:hover {
            color: #ff4b2b;
          }

          .order-details {
            display: none;
            background: rgba(255, 255, 255, 0.1);
            padding: 10px;
            margin-top: 5px;
            border-radius: 5px;
          }

          .order-details.expanded {
            display: block;
          }

          .status {
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: bold;
            border: none;
            outline: none;
            color: white;
          }

          .status-pending {
            background-color: orange;
            color: black;
          }

          .status-shipped {
            background-color: #1e88e5;
          }

          .status-delivered {
            background-color: #2e7d32;
          }

          .status-cancelled {
            background-color: #c62828;
          }

          select.status {
            font-size: 14px;
            cursor: pointer;
          }

          .loading, .no-orders, .error-message {
            text-align: center;
            font-size: 18px;
            margin-top: 20px;
            color: #ff4b2b;
          }

          @media (max-width: 768px) {
            .orders-container {
              padding: 10px;
            }
            .orders-container .title {
              font-size: 22px;
            }
            th, td {
              font-size: 14px;
              padding: 10px;
            }
          }

          @media (max-width: 480px) {
            .orders-container {
              padding: 8px;
            }
            .orders-container .title {
              font-size: 18px;
            }
            th, td {
              font-size: 12px;
              padding: 8px;
            }
          }
        `}
      </style>

      <div className="orders-container">
        <Header />
        <h3 className="mb-4 title">All Orders</h3>

        {loading ? (
          <p className="loading">Loading orders...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Product(s)</th>
                  <th>Customer</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr>
                      <td>
                        <span className="product-name" onClick={() => toggleOrderDetails(order._id)}>
                          {order.items.length > 1
                            ? `${order.items[0].name} +${order.items.length - 1} more`
                            : order.items[0].name}
                        </span>
                      </td>
                      <td>{order.userId?.name || "Guest"}</td>
                      <td>₹{order.totalPrice.toFixed(2)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`status status-${(order.status || "pending").toLowerCase()}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>

                    {expandedOrder === order._id && (
                      <tr className="order-details expanded">
                        <td colSpan="5">
                          <h4>Products in Order:</h4>
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.name} (x{item.quantity}) - ₹{item.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
