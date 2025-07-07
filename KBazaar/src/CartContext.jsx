import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("kbazaar_cart");
    return stored ? JSON.parse(stored) : []; 

  });
  const user = JSON.parse(sessionStorage.getItem("user"));
const storageKey = user ? `cart_${user.username}` : "cart_guest";

// Load cart from storage
useEffect(() => {
  const storedCart = JSON.parse(sessionStorage.getItem(storageKey)) || [];
  setCartItems(storedCart);
}, [storageKey]);

// Save cart to storage on changes
useEffect(() => {
  sessionStorage.setItem(storageKey, JSON.stringify(cartItems));
}, [cartItems, storageKey]);


  useEffect(() => {
    localStorage.setItem("kbazaar_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

   const removeFromCart = (id) => {
      setCartItems(prev => prev.filter(item => item.id !== id));
    };
    
    const updateQuantity = (id, newQty) => {
  if (newQty < 1) return;
  setCartItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    )
  );
};

const clearCart = () => {
  setCartItems([]);
};
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);



  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
<CartContext.Provider
  value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount,  totalItems }}
>
      {children}
    </CartContext.Provider>
  );
}
