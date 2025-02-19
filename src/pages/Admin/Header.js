import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsHouseDoor,
  BsPeople,
  BsBag,
  BsCart,
  BsClipboard,
  BsBox,
  BsHouse,
  BsList,
} from "react-icons/bs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <NavLink to="/" className="header-title">
        Admin Panel
      </NavLink>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <BsList className="icon" />
      </button>
      <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          <BsHouseDoor className="icon" /> Dashboard
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          <BsPeople className="icon" /> Customers
        </NavLink>
        <NavLink
          to="/brandlist"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          <BsBag className="icon" /> Brandlist
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          <BsCart className="icon" /> Orders
        </NavLink>
        <NavLink
          to="/productlist"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          <BsClipboard className="icon" /> Productlist
        </NavLink>
        <NavLink
          to="/add-product"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          <BsBox className="icon" /> Add Product
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          <BsHouse className="icon" /> Home
        </NavLink>
      </nav>

      <style>
        {`
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 15px 25px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 100;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .header-title {
            font-size: 24px;
            font-weight: bold;
            color: #ff4b2b;
            margin: 0;
            text-align: center;
            text-decoration: none;
          }

          .header-nav {
            display: flex;
            gap: 20px;
            align-items: center;
          }

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
            background-color: #ff4b2b;
            color: white;
          }

          .active-link {
            background-color: #ff4b2b;
            color: white;
          }

          .icon {
            font-size: 20px;
          }

          .menu-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
          }

          @media (max-width: 768px) {
            .header {
              padding: 10px 20px;
            }

            .header-title {
              font-size: 20px;
            }

            .header-nav {
              display: none;
              flex-direction: column;
              gap: 15px;
              position: absolute;
              top: 60px;
              right: 10px;
              background: rgba(0, 0, 0, 0.9);
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
              opacity: 0;
              transform: translateY(-20px);
            }

            .header-nav.open {
              display: flex;
              opacity: 1;
              transform: translateY(0);
            }

            .menu-toggle {
              display: block;
            }
          }

          @media (max-width: 480px) {
            .header-title {
              font-size: 18px;
            }

            .link {
              font-size: 14px;
              padding: 8px 12px;
            }

            .icon {
              font-size: 18px;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
