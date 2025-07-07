import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    // Load from localStorage initially
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });


  const user = JSON.parse(sessionStorage.getItem("user"));
const wishlistKey = user ? `wishlist_${user.username}` : "wishlist_guest";

// Load wishlist
useEffect(() => {
  const stored = JSON.parse(sessionStorage.getItem(wishlistKey)) || [];
  setWishlistItems(stored);
}, [wishlistKey]);

// Save wishlist
useEffect(() => {
  sessionStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
}, [wishlistItems, wishlistKey]);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    if (!wishlistItems.find((p) => p.id === item.id)) {
      setWishlistItems([...wishlistItems, item]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
