import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { useCart } from "./CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const cartItem = cartItems.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(0);
  const [hasIncreased, setHasIncreased] = useState(false);

  const autoIncrease = location.state?.autoIncrease || false;

  // Fetch product from API
  useEffect(() => {
    axios.get(`https://kbazaar-alpha.vercel.app/api/products/${id}`)
      // .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setError("");
      })
      .catch(() => {
        setError("Product not found.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Reset on product change
  useEffect(() => {
    setHasIncreased(false);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [id, cartItem]);

  // Auto increase once on title click
  useEffect(() => {
    if (autoIncrease && !hasIncreased && !cartItem) {
      setQuantity(1);
      setHasIncreased(true);
    }
  }, [autoIncrease, hasIncreased, cartItem]);

  const goBack = () => navigate("/shop");

  //  Increase button
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  //  Decrease button
  const handleDecrease = () => {
    // setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
     if (cartItem && cartItem.quantity > 2) {  //logic
      updateQuantity(cartItem.id, cartItem.quantity - 1);
    } else if (cartItem && cartItem.quantity === 2) {   //logic
      removeFromCart(cartItem.id);
    }
  };

  //  Add to Cart button logic
  const handleAddToCart = () => {
    if (!product || quantity === 0) return;

    // If not in cart → add
    if (!cartItem) {
      addToCart(product, quantity);
    }
    // If in cart and quantity changed → update
    else if (cartItem.quantity !== quantity) {
      updateQuantity(product.id, quantity);
    }

    navigate("/cart");
  };

  if (loading) return <div className="detail-loading">Loading product...</div>;
  if (error) return <div className="detail-error">{error}</div>;

  return (
    <div className="detail-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={goBack}>
          ← Back to Shop
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <h2 className="detail-title">{product.title}</h2>
          <p className="detail-category">
            Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>

          <div className="detail-rating">
            Rating: {renderStars(product.rating.rate)}{" "}
            <span className="detail-rating-count">({product.rating.count})</span>
          </div>

          <h3 className="detail-price">₹ {(product.price * 50).toFixed(2)}</h3>
          <p className="detail-description">{product.description}</p>

          <div className="detail-actions">
            <div className="quantity-control">
              <button onClick={handleDecrease} className="qty-btn" disabled={quantity <= 1}>−</button>
              <span className="qty-value">{quantity}</span>
              <button onClick={handleIncrease} className="qty-btn">+</button>
            </div>

            <button className="detail-button" onClick={handleAddToCart}>
              {cartItem ? "Update Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//  Star rendering logic
const renderStars = (rate) => {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < full; i++) stars.push(<span key={i}>★</span>);
  if (half) stars.push(<span key="half">☆</span>);
  while (stars.length < 5) stars.push(<span key={"e" + stars.length}>☆</span>);

  return stars;
};

export default ProductDetail;
