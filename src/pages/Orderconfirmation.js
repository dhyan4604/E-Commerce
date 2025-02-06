import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
    const { state } = useLocation();
    const { displayCartTotal, displayCartDiscount, displayTotalAmount } = state || {};

    return (
        <div className="order-confirmation-container">
            <h2>Order Confirmation</h2>

            <div className="thank-you-message">
                <p>Thank you for your order! Your order has been placed successfully.</p>
            </div>

            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="order-details">
                    <p><strong>Total Amount (Original Price):</strong> <span>{displayCartTotal}</span></p>
                    <p><strong>Discount:</strong> <span>- {displayCartDiscount}</span></p>
                    <p><strong>Shipping:</strong> <span>Free</span></p>
                    <p><b>Total Price:</b> <span>{displayTotalAmount}</span></p> {/* Display total price here */}
                </div>
            </div>

            <Link to="/all-products" className="btn-back">Continue Shopping</Link>
            <style>
                {`
                  /* Order Confirmation Container */
                  .order-confirmation-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 40px auto;
                    padding: 40px;
                    background-color:rgb(0, 0, 0);
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    font-family: 'Arial', sans-serif;
                    color: #333;
                  }

                  /* Confirmation Header */
                  .order-confirmation-container h2 {
                    text-align: center;
                    font-size: 36px;
                    color: white;
                    margin-bottom: 40px;
                    font-weight: 600;
                  }

                  /* Confirmation Message */
                  .thank-you-message {
                    font-size: 24px;
                    text-align: center;
                    color:rgb(248, 4, 4);
                    margin-bottom: 20px;
                  }

                  /* Order Summary */
                  .order-summary {
                    background-color:rgb(0, 0, 0);
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                    margin-bottom: 40px;
                  }

                  .order-summary h3 {
                    font-size: 24px;
                    color: white;
                    margin-bottom: 20px;
                    font-weight: 500;
                  }

                  .order-details {
                    font-size: 18px;
                    color: white;
                    margin-bottom: 15px;
                  }

                  .order-details span {
                    font-weight: 600;
                    color: white;
                  }

                  .order-details p {
                    margin: 10px 0;
                  }

                  /* Back to Shopping Button */
                  .btn-back {
                    padding: 12px 30px;
                    font-size: 20px;
                    color: #fff;
                    background-color:rgb(255, 0, 0);
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    width: 100%;
                    max-width: 300px;
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                    text-align: center;
                    margin-top: 30px;
                  }

                  .btn-back:hover {
                    background-color: #0056b3;
                  }

                  /* Mobile Responsiveness */
                  @media (max-width: 768px) {
                    .order-confirmation-container {
                      padding: 20px;
                    }

                    .order-summary .total-price {
                      font-size: 18px;
                    }
                  }
                `}
            </style>
        </div>
    );
};

export default OrderConfirmation;
