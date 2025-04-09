import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartContext from "../contexts/cart/cartContext"; // Import cart context
import axios from "axios";
import { calculateTotal, displayMoney } from "../helpers/utils";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(cartContext); // Add clearCart to reset the cart after placing an order

  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery (COD)",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Check if the user is logged in
    if (!token) {
      alert("You must be logged in to proceed to checkout.");
      navigate("/login"); // Redirect to login if not logged in
    } else {
      // Fetch user profile data if logged in
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserProfile(response.data);
          setFormData((prev) => ({
            ...prev,
            name: response.data.name || "",
            address: response.data.shippingAddress || "",
            phone: response.data.phone || "", // Dynamically fetch phone number from profile
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchUserProfile();
    }
  }, [navigate]);

  // Calculate the total price
  const totalPrice = calculateTotal(cartItems.map((item) => item.finalPrice * item.quantity));
  const displayTotalPrice = displayMoney(totalPrice);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
    if (cartItems.length === 0) {
      alert("No items in cart!");
      return;
    }
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }
  
    // Creating the correct orderDetails
    const orderDetails = {
      orderId: Math.floor(Math.random() * 1000000), // Generate a random Order ID
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.title,
        quantity: item.quantity,
        price: item.finalPrice,
      })),
      totalPrice,
      address: formData.address,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (status) => status < 400, // Treat any status < 400 as success
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        clearCart(); // Reset cart after order
        navigate("/order-confirmation", { state: { orderDetails } }); // Pass correct orderDetails
      }
    } catch (error) {
      console.error("Error placing order:", error.response || error.message);
      alert("Failed to place order. Please try again.");
    }
  };
  

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <h2 className="checkout-header">Checkout</h2>
        <div className="checkout-content">
          <div className="checkout-form">
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
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
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

              <button type="submit" className="btn-submit">
                Place Order
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h3 className="order-summary-title">Order Summary</h3>
            <div className="separator"></div>
            <div className="product_names">
              <b>Products:</b>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.title} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <h3>Total: {displayTotalPrice}</h3>
          </div>
        </div>
      </div>
      <style>{`
        .checkout-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #000;
          font-family: 'Poppins', sans-serif;
        }

        .checkout-container {
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 16px;
          backdrop-filter: blur(15px);
          box-shadow: 0 12px 30px rgba(255, 0, 0, 0.2);
          width: 100%;
          max-width: 900px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .checkout-content {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .checkout-form {
          flex: 1;
          padding-right: 20px;
        }

       

        .checkout-header {
          font-size: 2rem;
          font-weight: bold;
          color: #ff4b2b;
          margin-bottom: 20px;
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
        }

        .checkout-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
    font-family: 'Poppins', sans-serif;
  }

  .checkout-container {
    background: rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 16px;
    backdrop-filter: blur(15px);
    box-shadow: 0 12px 30px rgba(255, 0, 0, 0.2);
    width: 100%;
    max-width: 900px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .checkout-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .checkout-form {
    flex: 1;
    padding-right: 20px;
  }

  .order-summary {
    flex: 1;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .order-summary-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ff4b2b;
    text-align: center;
    text-transform: uppercase;
  }

  .separator {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin: 20px 0;
  }

  .product_names {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .product_names ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .product_names li {
    font-size: 1rem;
    font-weight: 500;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
    padding-bottom: 8px;
  }

  .product_names b {
    font-weight: bold;
    color: #ff416c;
  }

  .order-summary p {
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    color: #f1f1f1;
  }

  .order-summary h3 {
    font-size: 1.5rem;
    color: #ff4b2b;
    text-align: center;
    font-weight: bold;
    margin-top: 20px;
  }

        
      `}</style>
    </div>
  );
};

export default Checkout;
