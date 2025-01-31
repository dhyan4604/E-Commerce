import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
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
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
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
        localStorage.removeItem("userToken"); // Remove token from localStorage
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
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Search</div>
                            </div>

                            <div className="cart_action">
                                <Link to="/cart">
                                    <AiOutlineShoppingCart />
                                    {cartQuantity > 0 && <span className="badge">{cartQuantity}</span>}
                                </Link>
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <Link to="/login">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                </Link>
                                {/* <div className="dropdown_menu">
                                    <h4>
                                        Hello! {userInfo ? (
                                            <Link to="/account">{userInfo.name || userInfo.mail}</Link>
                                        ) : 'Guest'}
                                    </h4>
                                    <p>Access account and manage orders</p>

                                    
                                        <button type="button" onClick={() => toggleForm(true)}>
                                            Login / Signup
                                        </button>
                                     
                                        <button type="button" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    

                                    <div className="separator"></div>
                                    <ul>
                                        {dropdownMenu.map(({ id, link, path }) => (
                                            <li key={id}>
                                                <Link to={path}>{link}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div> */}
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
