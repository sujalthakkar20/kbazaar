import React from "react";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
   const navigate = useNavigate();
  
    const goBack = () => navigate("/shop");


  return (
    <div className="wishlist-container">
        {wishlistItems.length > 0 && (
          <div className="wback-button-wrapper">
              <button className="wback-button" onClick={goBack}>
                ← Back to Shop
              </button>
           </div>
        )}
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        {cartItems.length > 0 && (
          <Link to="/cart"
            className="wish-view-cart-button"
          >
            View Cart ({cartItems.length}) &#10095;
          </Link>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <h3>List for all your shopping needs.</h3>
          <p>No items in wishlist.</p>
          <Link to="/shop" className="wishlist-shop-btn">
            Find Your Favourite!!!
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => {
            const cartItem = cartItems.find((ci) => ci.id === product.id);
            return (
              <div key={product.id} className="wishlist-card">
           
                <button
                className="delete-wishlist-btn"
                onClick={() => removeFromWishlist(product.id)}
              >
                <img src="/delete.png" alt="Delete" />
              </button>

                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p className="product-category">{product.category}</p>
                <p>₹ {(product.price * 50).toFixed(2)}</p>

                <div className="wishlist-actions">
                  {cartItem ? (
                    <div className="wishlist-qty-controls">
                      <button
                        onClick={() => {
                          if (cartItem.quantity === 1) {
                            removeFromCart(product.id);
                          } else {
                            updateQuantity(product.id, cartItem.quantity - 1);
                          }
                        }}
                      >
                        −
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() => {
                          updateQuantity(product.id, cartItem.quantity + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-item-btn"
                      onClick={() => addToCart(product, 1)}
                    >
                      Add Item
                    </button>
                  )}

                {cartItem && (
                            <>
                                <span>
                              <button
                                className="remove-item-btn"
                                onClick={() => removeFromCart(product.id)}
                              >
                                Remove
                              </button>

                              <Link to="/cart"
                                className="go-to-cart-btn"
                              >
                                Go to Cart
                              </Link>
                                </span>
                            </>
                          )}

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
