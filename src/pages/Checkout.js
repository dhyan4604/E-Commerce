import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartContext from '../contexts/cart/cartContext';  // Assuming you have cart context
import { calculateTotal, displayMoney } from '../helpers/utils';  // Assuming helper functions
import axios from 'axios';

const Checkout = () => {
    const { cartItems } = useContext(cartContext);
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [loginModalVisible, setLoginModalVisible] = useState(false);

    // Fetch the user's profile (name and shipping address)
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:5000/api/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserProfile(response.data);  // Set profile data including name and shipping address
                } catch (error) {
                    console.error("Error fetching profile data", error);
                }
            } else {
                setLoginModalVisible(true);  // Show login modal if user is not logged in
            }
        };
        fetchUserProfile();
    }, []);

    // Calculate totals
    const cartQuantity = cartItems.length;

    const cartTotal = cartItems.map(item => item.originalPrice * item.quantity);
    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);

    const cartDiscount = cartItems.map(item => (item.originalPrice - item.finalPrice) * item.quantity);
    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);

    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);

    const [selectedPayment, setSelectedPayment] = useState('cash');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localStorage.getItem("authToken")) {
            setLoginModalVisible(true);  // Show login modal if not logged in
            return;
        }
        navigate('/order-confirmation', { 
            state: { 
                displayCartTotal, 
                displayCartDiscount, 
                displayTotalAmount 
            }
        });
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Redirect to login page
        setLoginModalVisible(false); // Hide the modal after redirect
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="payment-method">
                    <h3>Select Payment Method</h3>
                    <div className="payment-option">
                        <input
                            type="radio"
                            id="cash-on-delivery"
                            name="payment-method"
                            value="cash"
                            checked={selectedPayment === 'cash'}
                            onChange={() => setSelectedPayment('cash')}
                        />
                        <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                    </div>
                </div>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="order-details">
                        <p>Total Amount (Original Price): <span>{displayCartTotal}</span></p>
                        <p>Discount: <span>- {displayCartDiscount}</span></p>
                        <p>Shipping: <span>Free</span></p>
                        <p><b>Total Price: <span>{displayTotalAmount}</span></b></p>
                    </div>
                </div>

                <div className="shipping-info">
                    <h3>Shipping Information</h3>
                    {userProfile ? (
                        <>
                            <p><b>Name:</b> {userProfile.name}</p>
                            <p><b>Shipping Address:</b> {userProfile.shippingAddress}</p>
                        </>
                    ) : (
                        <p>Loading shipping information...</p>
                    )}
                </div>

                <div className="checkout-actions">
                    <button type="submit" className="btn-submit">Place Order</button>
                </div>
            </form>

            {/* Login Modal */}
            {loginModalVisible && (
                <div className="login-modal">
                    <div className="modal-content">
                        <p>You need to log in first to proceed with the checkout.</p>
                        <button onClick={handleLoginRedirect} className="btn-login">Login</button>
                    </div>
                </div>
            )}

<style>
  {`
    /* Checkout Page Container */
    .checkout-container {
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

    /* Header Styling */
    .checkout-container h2 {
        text-align: center;
        font-size: 36px;
        color: #ff4b2b;
        margin-bottom: 40px;
        font-weight: 700;
        text-transform: uppercase;
    }

    /* Checkout Sections */
    .checkout-section {
        background: rgba(255, 255, 255, 0.1);
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(255, 0, 0, 0.1);
        margin-bottom: 30px;
        animation: fadeIn 1s ease-in-out;
    }

    .checkout-section h3 {
        font-size: 24px;
        color: #ff4b2b;
        margin-bottom: 20px;
        font-weight: 600;
    }

    /* Payment Options */
    .payment-option {
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 18px;
        margin-bottom: 15px;
        transition: transform 0.2s ease;
    }

    .payment-option:hover {
        transform: scale(1.02);
    }

    .payment-option input {
        transform: scale(1.3);
        margin: 0;
    }

    .payment-option label {
        color: #ddd;
        font-weight: 500;
    }

    /* Order Summary */
    .order-details {
        font-size: 18px;
        color: #ddd;
        margin-bottom: 15px;
    }

    .order-details span {
        font-weight: 700;
        color: white;
    }

    .order-details p {
        margin: 10px 0;
    }

    /* Shipping Information */
    .shipping-info input {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 16px;
        transition: border-color 0.3s ease-in-out, transform 0.2s ease;
    }

    .shipping-info input:focus {
        border-color: #ff4b2b;
        outline: none;
        transform: scale(1.02);
    }

    /* Checkout Button */
    .checkout-actions {
        text-align: center;
    }

    .btn-submit {
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
    }

    .btn-submit:hover {
        transform: scale(1.05);
        background: linear-gradient(90deg, #d84315, #d32f2f);
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .checkout-container {
            padding: 20px;
        }

        .checkout-section {
            padding: 20px;
        }

        .btn-submit {
            width: 100%;
            max-width: none;
        }
    }

    /* Login Modal Styling */
    .login-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.6);
        animation: fadeIn 0.3s ease-in-out;
    }

    .modal-content {
        background: #222;
        padding: 25px;
        border-radius: 10px;
        text-align: center;
        color: white;
        box-shadow: 0 5px 15px rgba(255, 0, 0, 0.2);
    }

    .btn-login {
        padding: 12px 25px;
        font-size: 18px;
        background: linear-gradient(90deg, #ff4b2b, #ff416c);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .btn-login:hover {
        transform: scale(1.05);
        background: linear-gradient(90deg, #d84315, #d32f2f);
    }
  `}
</style>

        </div>
    );
};

export default Checkout;
