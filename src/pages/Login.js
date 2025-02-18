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
    /* Modern & Animated Login Page */
    .login-page {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #000; /* Black background */
      font-family: 'Poppins', sans-serif;
    }

    .login-form {
      background: rgba(255, 255, 255, 0.1);
      padding: 35px;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: fadeIn 0.8s ease-in-out, floatUp 1.5s infinite alternate;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes floatUp {
      from { transform: translateY(0); }
      to { transform: translateY(-8px); }
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: white;
      font-size: 24px;
      font-weight: bold;
      animation: fadeIn 1s ease-in-out;
    }

    .form-group {
      margin-bottom: 20px;
      text-align: left;
    }

    label {
      display: block;
      font-size: 14px;
      color: white;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 16px;
      transition: border-color 0.3s ease-in-out;
    }

    input:focus {
      border-color: #ff4b2b;
      outline: none;
    }

    .login-btn {
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

    .login-btn:hover {
      transform: scale(1.05);
      background: linear-gradient(90deg, #d84315, #d32f2f);
    }

    .signup-link {
      text-align: center;
      margin-top: 15px;
      font-size: 14px;
      color: white;
    }

    .signup-link a {
      color: #ff4b2b;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    .signup-link a:hover {
      color: #ff1a1a;
      text-decoration: underline;
    }
  `}
</style>

    </div>
  );
};

export default Login;
