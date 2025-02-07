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
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
        font-family: 'Poppins', sans-serif;
        color: white;
        animation: fadeIn 0.8s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Confirmation Header */
    .order-confirmation-container h2 {
        text-align: center;
        font-size: 36px;
        color: #ff4b2b;
        margin-bottom: 40px;
        font-weight: 700;
        text-transform: uppercase;
    }

    /* Thank You Message */
    .thank-you-message {
        font-size: 26px;
        text-align: center;
        color: #ff4b2b;
        font-weight: bold;
        margin-bottom: 20px;
        animation: fadeIn 1.2s ease-in-out;
    }

    /* Order Summary */
    .order-summary {
        background: rgba(255, 255, 255, 0.1);
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(255, 0, 0, 0.1);
        margin-bottom: 30px;
        animation: fadeIn 1s ease-in-out;
    }

    .order-summary h3 {
        font-size: 24px;
        color: #ff4b2b;
        margin-bottom: 20px;
        font-weight: 600;
    }

    .order-details {
        font-size: 18px;
        color: white;
        margin-bottom: 15px;
    }

    .order-details span {
        font-weight: 700;
        color: white;
    }

    .order-details p {
        margin: 10px 0;
    }

    /* Back to Shopping Button */
    .btn-back {
        padding: 14px 35px;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background: linear-gradient(90deg, #ff4b2b, #ff416c);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.3s ease, background 0.3s ease;
        width: 100%;
        max-width: 300px;
        margin: 30px auto;
        display: block;
        text-align: center;
    }

    .btn-back:hover {
        transform: scale(1.05);
        background: linear-gradient(90deg, #d84315, #d32f2f);
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .order-confirmation-container {
            padding: 20px;
        }

        .btn-back {
            width: 100%;
            max-width: none;
        }
    }
  `}
</style>

        </div>
    );
};

export default OrderConfirmation;
