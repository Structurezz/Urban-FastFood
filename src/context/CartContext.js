import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext();

// CartProvider component to wrap the app and provide the cart context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Add item to cart
  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart
  const removeItemFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
