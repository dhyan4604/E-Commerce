import React, { useContext, useMemo } from "react";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import QuantityBox from "../common/QuantityBox";

const CartItem = (props) => {
    const { _id, id, imageUrl, imageUrls, images, title, info, finalPrice, originalPrice, quantity, path } = props;
    const productId = _id || id; // Handle dynamic products with _id

    const { removeItem } = useContext(cartContext);

    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);

    // ✅ Load image according to your backend route ("/uploads/")
    const imageSrc = useMemo(() => {
        if (imageUrls?.length > 0) {
            return imageUrls[0].startsWith("/uploads")
                ? `http://localhost:5000${imageUrls[0]}` // Dynamic images from backend
                : imageUrls[0]; // External images
        }
        if (imageUrl) {
            return imageUrl.startsWith("/uploads")
                ? `http://localhost:5000${imageUrl}`
                : imageUrl;
        }
        if (images?.length > 0) {
            return images[0]; // Use first image from images array
        }
        return "/placeholder.jpg"; // Fallback image
    }, [imageUrls, imageUrl, images]);

    return (
        <div className="cart_item">
            <figure className="cart_item_img">
                <Link to={`${path}${productId}`}>
                    <img
                        src={imageSrc}
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                        alt="product-img"
                    />
                </Link>
            </figure>
            <div className="cart_item_info">
                <div className="cart_item_head">
                    <h4 className="cart_item_title">
                        <Link to={`/product-details/${productId}`}>
                            {title} {info}
                        </Link>
                    </h4>
                    <div className="cart_item_del">
                        <span onClick={() => removeItem(productId)}>
                            <TbTrash />
                        </span>
                        <div className="tooltip">Remove Item</div>
                    </div>
                </div>

                <h2 className="cart_item_price">
                    {newPrice} &nbsp;
                    <small>
                        <del>{oldPrice}</del>
                    </small>
                </h2>

                <QuantityBox itemId={productId} itemQuantity={quantity} />
            </div>
        </div>
    );
};

export default CartItem;
