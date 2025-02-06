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
                /* Checkout Container */
                .checkout-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 40px auto;
                    padding: 40px;
                    background-color:rgb(2, 2, 2);
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    font-family: 'Arial', sans-serif;
                    color: #333;
                }

                /* Checkout Header */
                .checkout-container h2 {
                    text-align: center;
                    font-size: 36px;
                    color: white;
                    margin-bottom: 40px;
                    font-weight: 600;
                }

                /* Payment Method Section */
                .payment-method {
                    background-color: #f9f9f9;
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                    margin-bottom: 40px;
                }

                .payment-method h3 {
                    font-size: 24px;
                    color: #444;
                    margin-bottom: 20px;
                    font-weight: 500;
                }

                .payment-option {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-size: 18px;
                    margin-bottom: 15px;
                }

                .payment-option input {
                    transform: scale(1.4);
                    margin: 0;
                }

                .payment-option label {
                    color: #555;
                    font-weight: 400;
                }

                /* Order Summary Section */
                .order-summary {
                    background-color: #f9f9f9;
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                    margin-bottom: 40px;
                }

                .order-summary h3 {
                    font-size: 24px;
                    color: #444;
                    margin-bottom: 20px;
                    font-weight: 500;
                }

                .order-details {
                    font-size: 18px;
                    color: #555;
                    margin-bottom: 15px;
                }

                .order-details span {
                    font-weight: 600;
                    color: #000;
                }

                .order-details p {
                    margin: 10px 0;
                }

                /* Shipping Information Section */
                .shipping-info {
                    background-color: #f9f9f9;
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                    margin-bottom: 40px;
                }

                .shipping-info h3 {
                    font-size: 24px;
                    color: #444;
                    margin-bottom: 20px;
                    font-weight: 500;
                }

                /* Submit Button */
                .checkout-actions {
                    text-align: center;
                }

                .btn-submit {
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
                }

                .btn-submit:hover {
                    background-color:rgb(179, 0, 0);
                }

                /* Mobile Responsiveness */
                @media (max-width: 768px) {
                    .checkout-container {
                        padding: 20px;
                    }

                    .payment-method, .order-summary, .shipping-info {
                        padding: 20px;
                    }

                    .btn-submit {
                        width: 100%;
                        max-width: none;
                    }

                    .order-summary .total-price {
                        font-size: 18px;
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
                    background: rgba(0, 0, 0, 0.5);
                }

                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                }

                .btn-login {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #ff0000;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 20px;
                }

                .btn-login:hover {
                    background-color: #b30000;
                }
            `}
            </style>
        </div>
    );
};

export default Checkout;
