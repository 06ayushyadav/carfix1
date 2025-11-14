import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      if (prev.find((p) => p._id === item._id)) return prev; // avoid duplicates
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p._id !== id));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
