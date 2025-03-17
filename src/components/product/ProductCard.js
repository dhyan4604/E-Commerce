import React, { useContext } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import useActive from '../../hooks/useActive';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = (props) => {
    const { _id, id, imageUrls, images, title, info, finalPrice, originalPrice, rateCount } = props;
    const { addItem } = useContext(cartContext);
    const { active, handleActive, activeClass } = useActive(false);

    // Handling Add-to-cart
    const handleAddItem = () => {
        addItem({ ...props });
        handleActive(_id || id); // Supports both API & static products

        toast.success(`${title} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        });

        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };

    // ✅ Ensure price formatting
    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);

    // ✅ Handle Image Display for Both API & Static Data
    const productImage = imageUrls?.[0] || images?.[0] || "/placeholder.jpg";

    return (
        <div className="card products_card">
            <figure className="products_img">
                <Link to={`/product-details/${_id || id}`}>
                    <img src={productImage} alt={title} />
                </Link>
            </figure>

            <div className="products_details">
                {/* ✅ Display star rating dynamically */}
                <span className="rating_star">
                    {[...Array(rateCount || 0)].map((_, i) => <IoMdStar key={i} />)}
                </span>

                <h3 className="products_title">
                    <Link to={`/product-details/${_id || id}`}>{title}</Link>
                </h3>
                <h5 className="products_info">{info}</h5>
                <div className="separator"></div>

                <h2 className="products_price">
                    {newPrice} &nbsp;
                    <small><del>{oldPrice}</del></small>
                </h2>

                <button
                    type="button"
                    className={`btn products_btn ${activeClass(_id || id)}`}
                    onClick={handleAddItem}
                >
                    {active ? 'Added' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
