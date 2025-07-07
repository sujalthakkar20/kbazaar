import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfile.css"; 
import { useCart } from "./CartContext"; 
import { useWishlist } from "./WishlistContext";

function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { wishlistItems} = useWishlist();
  

  // Load user from sessionStorage
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // if not logged in, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location="/login";
    // navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img
          src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="User"
          className="profile-avatar"
        />
        <h2>{user.firstName} {user.lastName}</h2>
        <p>{user.email}</p>

        <nav className="profile-nav">
          <Link to="/">🏠 Home</Link>
          <Link to="/myorder">📦 My Orders</Link>
          <Link to="/wishlist">❤️ Wishlist ({wishlistItems.length})</Link>
          <Link to="/cart">🛒 My Cart ({totalCartItems} items)</Link>
          <Link to="/shop">🛍️ Shop Now</Link>
          <button onClick={handleLogout}>🚪 Logout</button>
        </nav>
      </div>

      <div className="profile-content">
        <h2>Hello... {user.username} !!</h2>
        <p>Here you can manage your orders, wishlist, and account info.</p>
      </div>
    </div>
  );
}

export default UserProfile;
