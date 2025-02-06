import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData);

      // Save JWT token to localStorage upon successful signup
      localStorage.setItem("authToken", response.data.token);

      setSuccess("Signup successful! Redirecting to login...");
      setError("");

      // Clear form data
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      setError("Error during signup. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="signup-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
      <style>
        {`
          .signup-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: rgb(4, 4, 4);
            font-family: Arial, sans-serif;
          }

          .signup-box {
            background-color: black;
            padding: 30px;
            border-radius: 8px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
            color: white;
          }

          .form-group {
            margin-bottom: 15px;
          }

          label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            color: white;
          }

          input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            font-size: 14px;
          }

          .error-message {
            color: red;
            font-size: 12px;
          }

          .success-message {
            color: green;
            font-size: 12px;
          }

          .signup-btn {
            width: 100%;
            padding: 12px;
            background-color: rgb(252, 0, 0);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
          }

          .signup-btn:hover {
            background-color: rgb(225, 80, 80);
          }

          .signup-link {
            text-align: center;
            margin-top: 15px;
          }

          .signup-link a {
            color: rgb(240, 241, 242);
            text-decoration: none;
          }

          .signup-link a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
