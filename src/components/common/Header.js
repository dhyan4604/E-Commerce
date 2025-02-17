import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineDashboard, // Import dashboard icon
} from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';

const Header = () => {
  const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
  const { cartItems } = useContext(cartContext);

  const [isSticky, setIsSticky] = useState(false);
  const [userInfo, setUserInfo] = useState(formUserInfo); // State to manage user info

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

              {/* User Action */}
              <div className="user_action">
                <Link to="/profile">
                  <span>
                    <AiOutlineUser />
                  </span>
                </Link>
                <div className="tooltip">Profile</div>
              </div>

              {/* Admin Action */}
              <div className="admin_action">
                <Link to="/admin/dashboard"> {/* Admin Dashboard Link */}
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
    </>
  );
};

export default Header;
