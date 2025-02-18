import React from "react";
import { NavLink } from "react-router-dom";
import { BsHouseDoor, BsPeople, BsBag, BsCart, BsClipboard, BsBox, BsBack, BsHouse } from "react-icons/bs";

const Header = () => {
  return (
    <div className="header">
      {/* Make the title a clickable link to the homepage */}
      <NavLink to="/" className="header-title">
        Admin Panel
      </NavLink>
      <nav className="header-nav">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "link")}>
          <BsHouseDoor className="icon" /> Dashboard
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => (isActive ? "active-link" : "link")}>
          <BsPeople className="icon" /> Customers
        </NavLink>
        <NavLink to="/brandlist" className={({ isActive }) => (isActive ? "active-link" : "link")}>
          <BsBag className="icon" /> Brandlist
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => (isActive ? "active-link" : "link")}>
          <BsCart className="icon" /> Orders
        </NavLink>
        <NavLink to="/productlist" className={({ isActive }) => (isActive ? "active-link" : "link")}>
          <BsClipboard className="icon" /> Productlist
        </NavLink>
        <NavLink to="/add-product" className={({ isActive }) => (isActive ? "active-link" : "link")}>
          <BsBox className="icon" /> Add Product
        </NavLink>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "link")}>
          <BsHouse className="icon" /> Home
        </NavLink>
      </nav>

      {/* Inject styles */}
      <style>
        {`
    /* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.1); /* Transparent background */
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Soft shadow effect */
  z-index: 100;
  backdrop-filter: blur(10px); /* Blurred background effect */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
}

/* Header Title - Clickable and redirects to the homepage */
.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #ff4b2b; /* Updated accent color to match 'Add Product' */
  margin: 0;
  text-align: center;
  text-decoration: none; /* Remove underline */
  animation: fadeIn 0.8s ease-in-out;
}

/* Header Navigation */
.header-nav {
  display: flex;
  gap: 20px;
}

/* Link Styles */
.link {
  color: white;
  font-size: 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.link:hover {
  background-color: #ff4b2b; /* Matching the 'Add Product' hover color */
  color: white;
}

.active-link {
  background-color: #ff4b2b; /* Matching the 'Add Product' active link color */
  color: white;
}

.icon {
  font-size: 20px;
}

/* Animation for fade-in effect */
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

/* Responsive Styles */
@media (max-width: 768px) {
  .header {
    padding: 10px 20px; /* Reduce padding for smaller screens */
  }

  .header-title {
    font-size: 20px; /* Slightly smaller title on mobile */
  }

  .header-nav {
    display: none; /* Hide navigation on mobile */
  }

  /* Add a hamburger menu or mobile navigation here if needed */
}

@media (max-width: 480px) {
  .header {
    padding: 10px 15px; /* Further reduce padding for very small screens */
  }

  .header-title {
    font-size: 18px; /* Even smaller title on very small screens */
  }

  .link {
    font-size: 14px; /* Smaller text size for links */
    padding: 8px 12px; /* Adjust padding for small screens */
  }
}

  `}
      </style>


    </div>
  );
};

export default Header;
