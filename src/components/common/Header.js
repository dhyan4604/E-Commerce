import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineDashboard,
} from 'react-icons/ai';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';

const Header = () => {
  const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
  const { cartItems } = useContext(cartContext);

  const [isSticky, setIsSticky] = useState(false);
  const [userInfo, setUserInfo] = useState(formUserInfo); // State to manage user info
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Handle sticky header on scroll
  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
    window.addEventListener('scroll', handleIsSticky);
    return () => {
      window.removeEventListener('scroll', handleIsSticky);
    };
  }, []);

  // Update user info when formUserInfo is updated in context
  useEffect(() => {
    setUserInfo(formUserInfo);
  }, [formUserInfo]);

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem('userToken'); // Remove token from localStorage
  };

  const cartQuantity = cartItems.length;

  return (
    <>
      <header id="header" className={isSticky ? 'sticky' : ''}>
        <div className="container">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link to="/">AudioLoom</Link>
            </h2>
            <nav className="nav_actions">
              {/* Search Action */}
              <div className="search_action">
                <span onClick={() => toggleSearch(true)}>
                  <AiOutlineSearch />
                </span>
                <div className="tooltip">Search</div>
              </div>

              {/* Cart Action */}
              <div className="cart_action">
                <Link to="/cart">
                  <AiOutlineShoppingCart />
                  {cartQuantity > 0 && <span className="badge">{cartQuantity}</span>}
                </Link>
                <div className="tooltip">Cart</div>
              </div>

              {/* Profile Dropdown */}
              <div className="user_action">
                <span
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="profile_icon"
                >
                  <AiOutlineUser />
                </span>
                {isDropdownOpen && (
                  <div className="profile_dropdown">
                    <Link to="/profile">Profile</Link>
                    <Link to="/order">Orders</Link>
                  
                  </div>
                )}
                <div className="tooltip">Profile</div>
              </div>

              {/* Admin Action */}
              <div className="admin_action">
                <Link to="/admin/dashboard">
                  <AiOutlineDashboard />
                </Link>
                <div className="tooltip">Admin</div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <SearchBar />
      <AccountForm />

      <style>
  {`
    .profile_icon {
      cursor: pointer;
      position: relative;
      color: white; /* White icon for dark background */
    }

    .profile_dropdown {
      position: absolute;
      top: 50px;
      right: 0;
      background: rgba(255, 255, 255, 0.1); /* Glassmorphism effect */
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2); /* Red glow */
      backdrop-filter: blur(10px); /* Blur effect */
      width: 180px;
      z-index: 1000;
      animation: fadeIn 0.3s ease-in-out;
    }

    .profile_dropdown a,
    .profile_dropdown button {
      display: block;
      padding: 12px 15px;
      text-decoration: none;
      color: white; /* White text for dark theme */
      background: none;
      border: none;
      text-align: left;
      width: 100%;
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
    }

    .profile_dropdown a:hover,
    .profile_dropdown button:hover {
      background-color: rgba(255, 255, 255, 0.2); /* Hover effect */
    }

    .profile_dropdown button {
      font-size: 16px;
      font-family: 'Poppins', sans-serif;
    }

    /* Animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
</style>

    </>
  );
};

export default Header;
