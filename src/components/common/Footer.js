import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footSocial } from '../../data/footerData';



const Footer = () => {

    const [subValue, setSubValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubValue('');
        alert('Thankyou, you are subscribed to receive our daily newsletter');
    };

    const currYear = new Date().getFullYear();


    return (

        <footer id="footer">
            <div className="container">
                <div className="wrapper footer_wrapper">
                    <div className="foot_about">
                        <img src='./logo3.png' alt='logo' classname="logo"></img>
                        {/* <h2>
                            <Link to="/">AudioLoom</Link>
                        </h2> */}
                        <div className="foot_subs">
                            <p>Subscribe to our Email alerts to receive early discount offers, and new products info.</p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="input_field"
                                    placeholder="Email Address*"
                                    required
                                    value={subValue}
                                    onChange={(e) => setSubValue(e.target.value)}
                                />
                                <button type="submit" className="btn">Subscribe</button>
                            </form>
                        </div>
                    </div>

                    {/* {
                        footMenu.map(item => {
                            const { id, title, menu } = item;
                            return (
                                <div className="foot_menu" key={id}>
                                    <h4>{title}</h4>
                                    <ul>
                                        {
                                            menu.map(item => {
                                                const { id, link, path } = item;
                                                return (
                                                    <li key={id}>
                                                        <Link to={path}>{link}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })
                    } */}

                </div>
            </div>

            <div className="separator"></div>

            <div className="sub_footer">
                <div className="container">
                    <div className="sub_footer_wrapper">
                        <div className="foot_copyright">
                            <p>
                                {currYear} | AudioLoom. All Rights Reserved. |
                                {/*  <a href="https://gulshansongara.netlify.app/">Gulshan Songara</a> */}
                            </p>
                        </div>
                        <div className="foot_social">
                            {
                                <div className="foot_social">
                                    {footSocial.map((social) => (
                                        <a
                                            key={social.id}
                                            href={social.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;