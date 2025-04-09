import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!authToken) throw new Error("Unauthorized: No Token Found");

        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authToken]);

  return (
    <div className="orders-container">
      <style>
        {`
          .orders-container {
            padding: 20px;
            background-color: #000;
            color: white;
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .title {
            font-size: 32px;
            font-weight: bold;
            color: #ff4b2b;
            margin-bottom: 20px;
            text-transform: uppercase;
            text-align: center;
          }

          .orders-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
            max-width: 600px;
          }

          .order-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .order-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }

          .order-card h3 {
            margin: 0;
            font-size: 20px;
            color: #ff4b2b;
          }

          .order-details p {
            margin: 5px 0;
          }

          .order-items {
            margin-top: 10px;
          }

          .order-items h4 {
            margin-bottom: 10px;
            color: #ff4b2b;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .order-item:last-child {
            border-bottom: none;
          }

          /* Status Styling */
          .status {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 5px;
            font-weight: bold;
            text-transform: capitalize;
            margin-top: 5px;
          }

          .status-pending {
            background-color: orange;
            color: black;
          }

          .status-shipped {
            background-color: blue;
            color: white;
          }

          .status-delivered {
            background-color: green;
            color: white;
          }

          .status-cancelled {
            background-color: red;
            color: white;
          }
        `}
      </style>

      <h1 className="title">Your Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const status = order.status || "Pending";
            return (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <h3>Order ID: {order._id}</h3>
                  <div style={{ textAlign: "right" }}>
                    <p><strong>₹{order.totalPrice.toFixed(2)}</strong></p>
                    <span className={`status status-${status.toLowerCase()}`}>{status}</span>
                  </div>
                </div>

                <div className="order-details">
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                  <p><strong>Delivery Address:</strong> {order.address}</p>
                  <p><strong>Contact:</strong> {order.phone}</p>
                </div>

                <div className="order-items">
                  <h4>Items Ordered:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>₹{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
