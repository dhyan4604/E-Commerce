import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => { // setUser added
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          setIsLoading(true);
          const response = await axios.get("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProfile(response.data);
          setImage(response.data.profileImage || null);
          setAddress(response.data.address || "");
          setPhoneNumber(response.data.phoneNumber || "");
          setShippingAddress(response.data.shippingAddress || "");
          setOrderHistory(response.data.orderHistory || []);
          setUser(response.data); // Added setUser
        } catch (error) {
          console.error("Error fetching profile", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user, setUser]); // Added setUser dependency

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Refresh the page to reflect the logged-out state
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post("http://localhost:5000/api/upload-profile-image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setImage(response.data.profileImage);
        alert("Profile image updated successfully!");
      } catch (error) {
        console.error("Error uploading image", error);
        alert("Failed to upload image");
      }
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken");
    try {
      setIsLoading(true);

      if (address !== profile.address) {
        await axios.post(
          "http://localhost:5000/api/update-address",
          { address },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (phoneNumber !== profile.phoneNumber) {
        await axios.post(
          "http://localhost:5000/api/update-phone-number",
          { phoneNumber },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (shippingAddress !== profile.shippingAddress) {
        await axios.post(
          "http://localhost:5000/api/update-shipping-address",
          { shippingAddress },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : profile ? (
          <>
            <div className="profile-header">
              <div className="profile-image">
                {image ? (
                  <img src={`http://localhost:5000${image}`} alt="Profile" />
                ) : (
                  <span>No profile image</span>
                )}
              </div>
              <div className="profile-info">
                <h2>{profile.name}</h2>
                <p>{profile.email}</p>
              </div>
              <div className="upload-btn-container">
                <label className="upload-btn">
                  Select Image
                  <input type="file" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="shipping">Shipping Address</label>
                <input
                  type="text"
                  id="shipping"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                  className="input-field"
                />
              </div>

              <button className="submit-btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>

            <div className="order-history-section">
              <h3>Order History</h3>
              {orderHistory.length > 0 ? (
                <ul>
                  {orderHistory.map((order, index) => (
                    <li key={index} className="order-item">
                      Order #{order.id} - {order.date} - {order.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found.</p>
              )}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p className="login-prompt">
            Please <a href="/login">Login</a> to see your profile.
          </p>
        )}
      </div>
      <style>
  {`
    /* Profile Page - Modern & Elegant Design */
    .profile-page {
      display: flex;
      justify-content: center;
      align-items: flex-start; /* Align at the top */
      min-height: 100vh;
      background: #000; /* Black background */
      font-family: 'Poppins', sans-serif;
      padding: 60px 20px; /* Increased top spacing for margin */
    }

    .profile-container {
      background: rgba(255, 255, 255, 0.1);
      padding: 30px 20px; /* Decreased padding */
      border-radius: 12px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 500px; /* Decreased box width */
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: fadeIn 0.8s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Remaining styles unchanged */
    .profile-header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px; /* Increased spacing */
      margin-bottom: 30px;
    }

    .profile-info h2 {
      font-size: 28px;
      margin: 0;
      color: white; /* Header text color updated */
    }

    .profile-info p {
      font-size: 16px;
      color: #c5c6c7;
    }

    .profile-image {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #222;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
      transition: transform 0.3s ease-in-out;
    }

    .profile-image:hover {
      transform: scale(1.08);
    }

    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }


    .upload-btn-container {
      margin-top: 10px;
    }

    .upload-btn {
      cursor: pointer;
      padding: 10px 20px;
      background: linear-gradient(90deg, #ff4b2b, #ff416c);
      border-radius: 8px;
      color: white;
      font-weight: bold;
      font-size: 14px;
      transition: transform 0.3s ease, background 0.3s ease;
      border: none;
    }

    .upload-btn:hover {
      transform: scale(1.05);
      background: linear-gradient(90deg, #d84315, #d32f2f);
    }

    .upload-btn input {
      display: none;
    }

    .profile-edit-form {
      margin-top: 30px;
      text-align: left;
      animation: fadeIn 1s ease-in-out;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-size: 16px;
      color: white;
      margin-bottom: 8px;
    }

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      font-size: 16px;
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
      transition: border-color 0.3s ease;
    }

    .form-group input:focus {
      border-color: #ff4b2b;
      outline: none;
    }

    .submit-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(90deg, #ff4b2b, #ff416c);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.3s ease, background 0.3s ease;
    }

    .submit-btn:hover {
      transform: scale(1.05);
      background: linear-gradient(90deg, #d84315, #d32f2f);
    }

    .order-history-section {
      margin-top: 40px;
      text-align: left;
      animation: fadeIn 1.2s ease-in-out;
    }

    .order-history-section h3 {
      font-size: 20px;
      color: white;
      margin-bottom: 10px;
    }

    .order-history-section ul {
      list-style-type: none;
      padding: 0;
      color: white;
    }

    .order-history-section li {
      font-size: 16px;
      margin-bottom: 10px;
      padding: 12px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.1);
      transition: transform 0.3s, background 0.3s;
    }

    .order-history-section li:hover {
      transform: scale(1.02);
      background: rgba(255, 255, 255, 0.2);
      color: #ff4b2b;
    }

    .logout-btn {
      width: 100%;
      padding: 14px;
      margin-top: 20px;
      background: linear-gradient(90deg, #ff4b2b, #ff416c);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      transition: transform 0.3s ease, background 0.3s ease;
    }

    .logout-btn:hover {
      transform: scale(1.05);
      background: linear-gradient(90deg, #d84315, #d32f2f);
    }

    .login-prompt {
      font-size: 16px;
      color: white;
      margin-top: 15px;
    }

    a {
      color: rgb(169, 175, 195);
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #ff1a1a;
    }
  `}
</style>


    </div>
  );
};

export default Profile;
