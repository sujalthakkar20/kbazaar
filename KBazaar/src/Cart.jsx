import React from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import OfferBanner from "./OfferBanner";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("user");

  const handleOrderNow = () => {
    if (!isLoggedIn) {
      alert("Please log in to place an order.");
      navigate("/login");
    } else {
      navigate("/orderdetail");
    }
  };

  return (
    <>
      {cartItems.length > 0 && <OfferBanner />}

      <div className="cart-container">
    
        <div className="cart-header">
          <h2>Your Cart</h2>
          <Link to="/wishlist" className="wishlist-btn">Go to Wishlist</Link>
        </div>

        {cartItems.length > 0 && (
          <button className="clear-cart-button" onClick={clearCart}>
            Remove All
          </button>
        )}

        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <Link to="/shop">
              <button className="browse-button">Browse Products</button>
            </Link>
          </>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} width={80} />
                <div>
                  <h4>{item.title}</h4>
                  <p>Price: ₹{(item.price * 50).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.id, item.quantity - 1)
                          : removeFromCart(item.id)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p>Subtotal: ₹{(item.price * item.quantity * 50).toFixed(2)}</p>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <hr />
            <div className="cart-summary">
              <h3>Total Payable: ₹{(totalAmount * 50).toFixed(2)}</h3>
              <button className="order-now-button" onClick={handleOrderNow}>
                Order Now !!
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
