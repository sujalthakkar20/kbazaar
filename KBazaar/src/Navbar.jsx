import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";


function Navbar() {
  /* ---------------- state ---------------- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("user")
  );

  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  /* ---------------- track login changes (storage event) ---------------- */
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!sessionStorage.getItem("user"));
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  /* ---------------- handlers ---------------- */
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
  // const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    sessionStorage.removeItem(`cart_${user.username}`);
    sessionStorage.removeItem(`wishlist_${user.username}`);
  }

  sessionStorage.clear();
  setIsLoggedIn(false);
  window.location="/login";
};

  /* ---------------- derived/user ---------------- */
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  /* ---------------- render ---------------- */
  return (
        <nav className="navbar">
         <Link to="/" className="navbar-logo">
          <img  src="/logo1.png" alt="KBazaar Logo" />
        </Link>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/shop" onClick={toggleMenu}>
          Shop
        </Link>
        <Link to="/about" onClick={toggleMenu}>
          About
        </Link>
        <Link to="/contact" onClick={toggleMenu}>
          Contact
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={toggleMenu}>
              Login
            </Link>
            <Link to="/register" onClick={toggleMenu}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="navbar-welcome">
              Welcome, {user?.username} !
            </span>
            <Link
              to="/profile"
              onClick={toggleMenu}
              className="nav-link"
            >
              Profile
            </Link>
            <Link
              to="/myorder"
              onClick={toggleMenu}
              className="nav-link"
            >
              Orders
            </Link>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </>
        )}

        <Link to="/wishlist" onClick={toggleMenu}>
          Wishlist ({wishlistItems.length})
        </Link>

      <Link to="/cart" className="cart-icon" onClick={toggleMenu}>
        <img src="cart.png" alt="Cart" className="cart-img" />
        {totalItems > 0 && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </Link>

      </div>
    </nav>
  );
}

export default Navbar;
