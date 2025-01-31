import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fullName || !email || !password || password !== confirmPassword) {
      setMessage("Please fill out all fields correctly.");
      return;
    }
  
    if (!email.trim()) {
      setMessage("Email is required.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup", // Endpoint of the backend
        { fullName, email: email.trim(), password },
        { withCredentials: true } // ✅ Allow credentials
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error signing up");
    }
  };
  
  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <style>
        {`
          .signup-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color:rgb(0, 0, 0);
          }

          .signup-form {
            background-color: #black;
            padding: 30px;
            border-radius: 8px;
            width: 100%;
            max-width: 400px;
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .form-group {
            margin-bottom: 15px;
          }

          label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
          }

          input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          .error-message {
            color: red;
            font-size: 12px;
          }

          .signup-btn {
            width: 100%;
            padding: 12px;
            background-color:rgb(252, 0, 0);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
          }

          .signup-btn:hover {
            background-color:rgb(225, 80, 80);
          }

          .signup-link {
            text-align: center;
            margin-top: 15px;
          }

          .signup-link a {
            color:rgb(240, 241, 242);
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
