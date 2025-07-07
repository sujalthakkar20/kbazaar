import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Shop.css";
import { useCart } from "./CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "./WishlistContext";
import BannerText from "./BannerText";

function Shop() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const base = "https://kbazaar-alpha.vercel.app/";

        const categoryRes = await axios.get(`${base}/api/categories`);
        setCategories(categoryRes.data);

        const allProductRes = await axios.get(`${base}/api/getproducts`);
        setAllProducts(allProductRes.data);

        const filtered = selectedCategory
          ? allProductRes.data.filter((p) => p.category === selectedCategory)
          : allProductRes.data;

        setProducts(filtered);
        setError(null);
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = allProducts
        .filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title) => {
    const results = allProducts.filter((p) =>
      p.title.toLowerCase().includes(title.toLowerCase())
    );
    setProducts(results);
    setSearchQuery(title);
    setSuggestions([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(results);
    setSuggestions([]);
  };

  const renderStars = (rating = 0) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < full; i++) stars.push(<span key={"f" + i}>★</span>);
    if (half) stars.push(<span key="half">☆</span>);
    while (stars.length < 5) stars.push(<span key={"e" + stars.length}>☆</span>);
    return stars;
  };

  if (loading) return <div className="shop-loading">Loading products…</div>;
  if (error) return <div className="shop-error">{error}</div>;

  return (
    <>
       <BannerText />
         <div className="shop-subnavbar-wrapper">

      <form className="shop-search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search e.g. iPhone, Shoes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="shop-search-input"
        />
        <button type="submit" className="shop-search-button">
          <img src="search.png" alt="Search" className="shop-search-icon" />
        </button>

        {suggestions.length > 0 && (
          <ul className="shop-suggestions">
            {suggestions.map((item, i) => (
              <li key={i} onClick={() => handleSuggestionClick(item.title)}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="shop-subnavbar">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat, i) => (
          <button
            key={i}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  

      <div className="shop-container">
        {products.map((product) => {
          const cartItem = cartItems.find((ci) => ci.id === product.id);
          const isWishlisted = wishlistItems.find((item) => item.id === product.id);

          return (
            <div key={product.id} className="product-card">
              <div
                className="wishlist-icon"
                onClick={() =>
                  isWishlisted
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
              >
                {isWishlisted ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
              </div>

              <img
                className="product-image"
                src={product.image}
                alt={product.title}
                loading="lazy"
                onClick={() =>
                  navigate(`/productdetail/${product.id}`, {
                    state: { autoIncrease: true }
                  })
                }
              />

              <div className="product-info">
                <h3
                  className="product-title"
                  onClick={() =>
                    navigate(`/productdetail/${product.id}`, {
                      state: { autoIncrease: true }
                    })
                  }
                >
                  {product.title}
                </h3>
                <p className="product-category">{product.category}</p>

                <div className="product-rating">
                  {renderStars(product.rating?.rate)}
                  <span className="rating-value">
                    ({product.rating?.rate ?? 0})
                  </span>
                </div>

                <p className="product-price">
                  ₹ {(product.price * 50).toFixed(2)}
                </p>

                {cartItem ? (
                  <div className="quantity-controls">
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
                      onClick={() =>
                        updateQuantity(product.id, cartItem.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      style={{ backgroundColor: "#dc3545" }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    className="product-button"
                    onClick={() => addToCart(product, 1)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {cartItems.length > 0 && (
        <button
          className="view-cart-button"
          onClick={() => navigate("/cart")}
        >
          View Cart ({cartItems.length})  &#10095;
        </button>
      )}
    </>
  );
}
export default Shop; 
