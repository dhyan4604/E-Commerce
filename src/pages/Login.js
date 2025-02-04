import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Create the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("authToken", response.data.token); // Save the JWT token
      alert("Login successful!");
      navigate("/"); // Redirect to home page after successful login (change the path as needed)
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>

      <style>
        {`
          .login-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color:rgb(0, 0, 0);
          }

          .login-form {
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

          .login-btn {
            width: 100%;
            padding: 12px;
            background-color:rgb(255, 0, 0);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
          }

          .login-btn:hover {
            background-color:rgb(226, 81, 81);
          }

          .signup-link {
            text-align: center;
            margin-top: 15px;
          }

          .signup-link a {
            color:rgb(255, 255, 255);
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

export default Login;
