import React from 'react';

const Orders = () => {
  const orders = [
    {
      _id: '12345',
      totalPrice: 99.99,
      paymentMethod: 'Credit Card',
      address: '123 Main St, Springfield',
      phone: '555-1234',
      items: [
        { name: 'Headphones', quantity: 1, price: 49.99 },
        { name: 'Microphone', quantity: 1, price: 50.00 },
      ],
    },
    {
      _id: '67890',
      totalPrice: 149.99,
      paymentMethod: 'PayPal',
      address: '456 Elm St, Shelbyville',
      phone: '555-5678',
      items: [
        { name: 'Speaker', quantity: 1, price: 149.99 },
      ],
    },
  ];

  return (
    <div className="orders-container">
      <style>
        {`
          .orders-container {
            padding: 20px;
            background-color: #000; /* Black background */
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
            color: #ff4b2b; /* Accent color */
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
        `}
      </style>

      <h1 className="title">Your Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3>Order ID: {order._id}</h3>
              <p><strong>₹{order.totalPrice.toFixed(2)}</strong></p>
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
        ))}
      </div>
    </div>
  );
};

export default Orders;
