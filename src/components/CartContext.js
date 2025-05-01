// CartContext.js
import React, { createContext, useState, useEffect } from 'react';
//import { saveCartToLocal } from '../utils/cart';
import { saveCartToLocal, getCartFromLocal } from '../utils/cart';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => getCartFromLocal());
 
  useEffect(() => {
    saveCartToLocal(cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find(item => item.product_id === product.product_id);
      if (existing) {
        return prevCart.map(item =>
          item.product_id  === product.product_id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
   
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter(item => item.product_id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
