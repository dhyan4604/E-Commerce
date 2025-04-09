import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

const OrderConfirmation = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  const invoiceRef = useRef();

  if (!orderDetails) {
    return <h2>Error: No order details found.</h2>;
  }

  const downloadInvoice = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.5,
      filename: `AudioLoom_Invoice_${orderDetails.orderId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="order-confirmation-container">
      <h2>Order Confirmation</h2>

      <div className="thank-you-message">
        <p>Thank you for your order! Your order has been placed successfully.</p>
        <p className="delivery-time">
          Your items will be delivered within <strong>8-10 business days</strong>.
        </p>
      </div>

      <h3>Order ID: {orderDetails.orderId}</h3>
      <h3>Shipping Address: {orderDetails.address}</h3>
      <h3>Total Price: ₹{orderDetails.totalPrice}</h3>

      <h3>Items Purchased:</h3>
      <ul>
        {orderDetails.items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x ₹{item.price}
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button className="btn-download" onClick={downloadInvoice}>
          Download Invoice
        </button>
        <Link to="/all-products" className="btn-back">
          Continue Shopping
        </Link>
      </div>

      {/* Hidden Printable Invoice */}
      <div style={{ display: "none" }}>
        <div ref={invoiceRef} style={{ padding: "30px", fontFamily: "Arial" }}>
          <h2 style={{ textAlign: "center", color: "#333" }}>AudioLoom - Order Invoice</h2>
          <p style={{ textAlign: "center", marginBottom: "30px", color: "#555" }}>
            Thank you for shopping with us!
          </p>

          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Shipping Address:</strong> {orderDetails.address}</p>
          <p><strong>Total Price:</strong> ₹{orderDetails.totalPrice}</p>

          <h4 style={{ marginTop: "20px", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
            Items Purchased
          </h4>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>No.</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Item Name</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Quantity</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{index + 1}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.name}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.quantity}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: "30px", color: "#666", fontStyle: "italic", fontSize: "12px" }}>
            This is a system-generated invoice. No signature required.
          </p>
          <p style={{ color: "#555", fontSize: "12px" }}>
            Visit us again at www.audioloom.com
          </p>
        </div>
      </div>

      <style>
        {`
        .order-confirmation-container {
          width: 100%;
          max-width: 800px;
          margin: 40px auto;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          font-family: 'Poppins', sans-serif;
          color: white;
          text-align: center;
        }

        .thank-you-message {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 26px;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        ul li {
          font-size: 16px;
          margin-bottom: 5px;
          text-align: left;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        .btn-download, .btn-back {
          padding: 12px 25px;
          font-size: 18px;
          font-weight: bold;
          color: white;
          background: linear-gradient(90deg, #ff4b2b, #ff416c);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-download:hover, .btn-back:hover {
          background: linear-gradient(90deg, #d84315, #d32f2f);
        }
        `}
      </style>
    </div>
  );
};

export default OrderConfirmation;
