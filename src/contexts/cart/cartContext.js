import React, { createContext, useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";

const cartContext = createContext();

// ✅ Load Cart from LocalStorage
const getCartFromStorage = () => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
};

// ✅ Initial State with LocalStorage
const initialState = {
    cartItems: getCartFromStorage(),
};

// Cart-Provider Component
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // ✅ Save Cart to LocalStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    // ✅ Function to Get Correct Image URL
    const getImageUrl = (item) => {
        if (item.imageUrls && item.imageUrls.length > 0) {
            return item.imageUrls[0].startsWith("/uploads")
                ? `http://localhost:5000${item.imageUrls[0]}` // Backend stored images
                : item.imageUrls[0]; // External images
        }
        if (item.imageUrl) {
            return item.imageUrl.startsWith("/uploads")
                ? `http://localhost:5000${item.imageUrl}`
                : item.imageUrl;
        }
        if (item.images && item.images.length > 0) {
            return `${process.env.PUBLIC_URL}/images/products/${item.images[0]}`; // ✅ Static images
        }
        return `${process.env.PUBLIC_URL}/images/products/default-product.jpg`; // ✅ Default fallback image
    };

    // ✅ Add Item to Cart
   const addItem = (item) => {
    const dynamicItem = {
        id: item._id || item.id, // Ensure correct ID
        title: item.title,
        finalPrice: item.finalPrice,
        originalPrice: item.originalPrice,
        imageUrls: item.imageUrls || [], // Store all dynamic images
        imageUrl: item.imageUrl || "",   // Store single dynamic image
        images: item.images || [],       // Store all static images
        quantity: 1,
    };
    dispatch({
        type: "ADD_TO_CART",
        payload: { item: dynamicItem },
    });
};


    // ✅ Remove Item from Cart
    const removeItem = (itemId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
    };

    // ✅ Increment Quantity
    const incrementItem = (itemId) => {
        dispatch({ type: "INCREMENT_ITEM", payload: { itemId } });
    };

    // ✅ Decrement Quantity
    const decrementItem = (itemId) => {
        dispatch({ type: "DECREMENT_ITEM", payload: { itemId } });
    };

    // ✅ Clear Cart
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    // Provide Context Values
    const values = {
        ...state,
        addItem,
        removeItem,
        incrementItem,
        decrementItem,
        clearCart,
    };

    return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
