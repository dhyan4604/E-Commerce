import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          setIsLoading(true);
          const profileResponse = await axios.get("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setProfile(profileResponse.data);
          setImage(profileResponse.data.profileImage || null);
          setAddress(profileResponse.data.address || "");
          setPhoneNumber(profileResponse.data.phoneNumber || "");
          setShippingAddress(profileResponse.data.shippingAddress || "");
          setUser(profileResponse.data);
        } catch (error) {
          console.error("Error fetching profile", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    window.location.reload();
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

      await axios.post(
        "http://localhost:5000/api/update-profile",
        { address, phoneNumber, shippingAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
              <label className="upload-btn">
                Upload New Image
                <input type="file" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="profile-edit-form">
              <div className="form-group">
                <label>Delivery Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <input
                  type="text"
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
          /* Profile Page */
          .profile-page {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #000;
            font-family: 'Poppins', sans-serif;
            padding: 80px 20px;
          }

          .profile-container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 500px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .profile-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
          }

          .profile-info h2 {
            font-size: 24px;
            margin: 10px 0;
            color: white;
          }

          .profile-info p {
            font-size: 16px;
            color: #c5c6c7;
          }

          .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #222;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
          }

          .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .upload-btn {
            cursor: pointer;
            padding: 10px 20px;
            background: linear-gradient(90deg, #ff4b2b, #ff416c);
            border-radius: 8px;
            color: white;
            font-weight: bold;
            font-size: 14px;
            border: none;
            margin-top: 10px;
          }

          .profile-edit-form {
            text-align: left;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .form-group label {
            display: block;
            font-size: 14px;
            color: white;
            margin-bottom: 5px;
          }

          .form-group input {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            color: white;
            background-color: rgba(255, 255, 255, 0.1);
          }

          .submit-btn, .logout-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(90deg, #ff4b2b, #ff416c);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            margin-top: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
