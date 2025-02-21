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
          }

          .title {
            font-size: 28px;
            font-weight: bold;
            color: #ff4b2b; /* Accent color */
            margin-bottom: 20px;
            text-transform: uppercase;
          }

          .orders-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .order-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .order-card h3 {
            margin: 0 0 10px;
            font-size: 20px;
            color: #ff4b2b;
          }

          .order-card p {
            margin: 5px 0;
          }

          .order-items {
            margin-top: 10px;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
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
            <h3>Order ID: {order._id}</h3>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <div className="order-items">
              <h4>Items:</h4>
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
