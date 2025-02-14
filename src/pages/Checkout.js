import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartContext from "../contexts/cart/cartContext";
import axios from "axios";
import { calculateTotal, displayMoney } from "../helpers/utils";

const Checkout = () => {
  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery (COD)",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserProfile(response.data);
          setFormData((prev) => ({
            ...prev,
            name: response.data.name,
            address: response.data.shippingAddress,
            phone: response.data.phone,
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        alert("Please log in to continue.");
        navigate("/login");
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const totalPrice = calculateTotal(cartItems.map((item) => item.finalPrice * item.quantity));
  const displayTotalPrice = displayMoney(totalPrice);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("No items in cart!");
      return;
    }
    const cartTotal = cartItems.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
    const discount = cartItems.reduce((acc, item) => acc + item.discount * item.quantity, 0); // Assuming each item has a `discount` property
    const totalAmount = cartTotal - discount;
    navigate("/order-confirmation", {
      state: {
        cartTotal: `₹${cartTotal.toFixed(2)}`,
        discount: `₹${discount.toFixed(2)}`,
        totalAmount: `₹${totalAmount.toFixed(2)}`,
      },
    });
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <h2 className="checkout-header">Checkout</h2>
        <form onSubmit={handlePlaceOrder}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Payment Method:</label>
            <input
              type="text"
              value={formData.paymentMethod}
              disabled
              className="input-field"
            />
          </div>

          <h3 className="order-summary-title">Order Summary</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <p key={index}>
                {item.name} - ₹{item.finalPrice} x {item.quantity}
              </p>
            ))
          ) : (
            <p>No items in cart</p>
          )}
          <h3>Total: {displayTotalPrice}</h3>

          <button type="submit" className="btn-submit">Place Order</button>
        </form>
      </div>
      <style>{`
  .checkout-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000; /* Black background */
    font-family: 'Poppins', sans-serif;
  }

  .checkout-container {
    background: rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 16px;
    backdrop-filter: blur(15px);
    box-shadow: 0 12px 30px rgba(255, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeIn 0.8s ease-in-out, floatUp 1.5s infinite alternate;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes floatUp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-8px);
    }
  }

  .checkout-header {
    font-size: 2rem;
    font-weight: bold;
    color: #ff4b2b;
    margin-bottom: 20px;
    animation: fadeIn 1s ease-in-out;
  }

  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .form-group label {
    display: block;
    font-size: 14px;
    color: white;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .input-field {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 16px;
    transition: border-color 0.3s ease-in-out;
  }

  .input-field:focus {
    border-color: #ff4b2b;
    outline: none;
  }

  .order-summary-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    color: white;
  }

  .btn-submit {
    width: 100%;
    padding: 12px;
    background: linear-gradient(90deg, #ff4b2b, #ff416c);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .btn-submit:hover {
    transform: scale(1.05);
    background: linear-gradient(90deg, #d84315, #d32f2f);
  }
`}</style>
    </div>
  );
};

export default Checkout;
