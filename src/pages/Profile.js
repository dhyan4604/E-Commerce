import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");  // Updated to match backend field name
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch profile on component mount
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
          setShippingAddress(response.data.shippingAddress || ""); // Use shippingAddress from backend
          setOrderHistory(response.data.orderHistory || []);
        } catch (error) {
          console.error("Error fetching profile", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  // Handle image upload
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

  // Handle profile update (address, phone, billing address)
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken");
    try {
      setIsLoading(true);

      // Update address
      if (address !== profile.address) {
        await axios.post(
          "http://localhost:5000/api/update-address",
          { address },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Update phone number
      if (phoneNumber !== profile.phoneNumber) {
        await axios.post(
          "http://localhost:5000/api/update-phone-number",
          { phoneNumber },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Update shipping address
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
              {/* Profile Image */}
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

              {/* Select Image Button */}
              <div className="upload-btn-container">
                <label className="upload-btn">
                  Select Image
                  <input type="file" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            {/* Profile Edit Fields */}
            <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter delivery address"
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
                />
              </div>

              {/* Submit Changes */}
              <button className="submit-btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>

            {/* Order History Section */}
            <div className="order-history-section">
              <h3>Order History</h3>
              {orderHistory.length > 0 ? (
                <ul>
                  {orderHistory.map((order, index) => (
                    <li key={index}>
                      Order #{order.id} - {order.date} - {order.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found.</p>
              )}
            </div>

            {/* Logout Button */}
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
          /* Profile Page Styles */
          .profile-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: rgb(4, 4, 4);
            font-family: 'Arial', sans-serif;
          }

          .profile-container {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 700px;
            text-align: center;
          }

          .profile-header {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 30px;
          }

          .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #e0e0e0;
            display: flex;
            justify-content: center;
            align-items: center;
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
            background-color: #ccc;
            border-radius: 5px;
          }

          .upload-btn input {
            display: none;
          }

          .profile-info h2 {
            font-size: 24px;
            margin: 0;
            color: #333;
          }

          .profile-info p {
            font-size: 16px;
            color: #777;
          }

          .profile-edit-form {
            margin-top: 30px;
            text-align: left;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
          }

          .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            color: #333;
          }

          .form-group input:focus {
            border-color: rgb(151, 156, 160);
          }

          .submit-btn {
            width: 100%;
            padding: 12px;
            background-color: rgb(255, 0, 0);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
          }

          .submit-btn:hover {
            background-color: rgb(171, 91, 99);
          }

          .order-history-section {
            margin-top: 30px;
            text-align: left;
          }

          .order-history-section h3 {
            font-size: 20px;
            color: #333;
            margin-bottom: 10px;
          }

          .order-history-section ul {
            list-style-type: none;
            padding: 0;
          }

          .order-history-section li {
            font-size: 16px;
            margin-bottom: 10px;
          }

          .logout-btn {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            background-color: rgb(255, 0, 0);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s;
          }

          .logout-btn:hover {
            background-color: rgb(171, 91, 99);
          }

          .login-prompt {
            font-size: 16px;
            color: #333;
          }

          a {
            color: rgb(112, 117, 123);
            text-decoration: none;
          }

          a:hover {
            color: rgb(179, 0, 0);
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
