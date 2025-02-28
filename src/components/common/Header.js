import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineDashboard,
} from "react-icons/ai";
import commonContext from "../../contexts/common/commonContext";
import cartContext from "../../contexts/cart/cartContext";
import AccountForm from "../form/AccountForm";
import SearchBar from "./SearchBar";

const Header = () => {
  const { toggleSearch } = useContext(commonContext);
  const { cartItems } = useContext(cartContext);

  const [isSticky, setIsSticky] = useState(false);

  const userRole = localStorage.getItem("userRole"); // Get user role from localStorage
  const cartQuantity = cartItems.length;

  // Sticky Header on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login"; // Redirect to Login
  };

  return (
    <>
      <header id="header" className={isSticky ? "sticky" : ""}>
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

              {/* Profile Action */}
              <div className="user_action">
                <Link to="/profile">
                  <AiOutlineUser />
                </Link>
                <div className="tooltip">Profile</div>
              </div>

              {/* Admin Action - Visible Only for Admins */}
              {/* {userRole === "admin" && ( */}
                <div className="admin_action">
                  <Link to="/admin/dashboard">
                    <AiOutlineDashboard />
                  </Link>
                  <div className="tooltip">Admin</div>
                </div>
              {/* )} */}

             
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
