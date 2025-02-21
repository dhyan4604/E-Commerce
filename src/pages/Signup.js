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
    /* Modern & Animated Signup Page */
    .signup-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #000; /* Black background */
      font-family: 'Poppins', sans-serif;
      margin-top: 60px;
    }

    .signup-box {
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
      transition: border-color 0.3s ease-in-out, transform 0.2s ease;
    }

    input:focus {
      border-color: #ff4b2b;
      outline: none;
      transform: scale(1.02);
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }

    .success-message {
      color: green;
      font-size: 12px;
      margin-top: 5px;
    }

    .signup-btn {
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

    .signup-btn:hover {
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

export default Signup;
