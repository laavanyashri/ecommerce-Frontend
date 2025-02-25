import React, { createContext, useContext, useState } from "react";

// Create a context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartitems, setCart] = useState([]); // Store cart items

    // Function to add items to cart
    const addToCartCount = (item) => {
        setCart([...cartitems, item]);
    };

    // Function to remove item from cart
    const removeFromCart = (itemName) => {
        setCart(cartitems.filter((item) => item !== itemName));

    };


    const clearFromCart=()=>
    {
        setCart([])
    }
    return (
        <CartContext.Provider value={{ cartitems, addToCartCount, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
