import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import BannerSlider from "./BannerSlider";

function Home() {
  return (
    <div className="home-container">
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to KBazaar 🛍️</h1>
          <p>Your one-stop for shop everything fashionable and affordable!</p>
          <Link to="/shop" className="hero-button">Start Shopping</Link>
        </div>
      </section>

      <BannerSlider />

     <section className="features-section">
      <h2>Why Shop With Us?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <img src="delivery.png" alt="Delivery" className="feature-icon" />
          <h3>Fast Delivery 🚚</h3>
          <p>We deliver your orders quickly and safely.</p>
        </div>
        <div className="feature-card">
          <img src="best-price.png" alt="Best Prices" className="feature-icon" />
          <h3>Best Prices 💰</h3>
          <p>Unbeatable deals and discounts every day.</p>
        </div>
        <div className="feature-card">
          <img src="brand-image.png" alt="Top Brands" className="feature-icon" />
          <h3>Top Brands 🏷️</h3>
          <p>Shop from trusted and top-rated brands you love.</p>
        </div>
        <div className="feature-card">
          <img src="security-payment.png" alt="Secure Payments" className="feature-icon" />
          <h3>Secure Payments 🔒</h3>
          <p>100% secure and encrypted checkout process.</p>
        </div>
        <div className="feature-card">
          <img src="return.png" alt="Easy Returns" className="feature-icon" />
          <h3>Easy Returns 🔄</h3>
          <p>Hassle-free 7-day return policy for all orders.</p>
        </div>
      </div>
      </section>

      <section className="categories-section">
        <h2>Popular Categories</h2>
        <div className="categories-grid">

          <Link to="/shop/category/men's clothing" className="category-box">
            <img
              src="mens.jpg"
              alt="Men's Clothing"
              className="category-image"
            /> 
            <strong> Men's Clothing </strong>
          </Link>

          <Link to="/shop/category/women's clothing" className="category-box">
            <img
              src="Womens_clothing.jpg"
              alt="Women's Clothing"
              className="category-image"
            />
           <strong> Women's Clothing </strong>
          </Link>

            <Link to="/shop/category/furniture" className="category-box">
              <img src="furniture.jpg" alt="Furniture & Home Decor" className="category-image" 
               style={{"height":"205px", "width": "205px", "marginBottom": "50px"}}/>
            <strong>  Furniture & Home Decor </strong> 
            </Link>

            <Link to="/shop/category/footwear" className="category-box">
              <img src="footwear.jpg" alt="Footwear" className="category-image" />
             <strong> Footwear </strong> 
            </Link>
                
            <Link to="/shop/category/jewelery" className="category-box">
              <img
                src="Jewellery.jpg"
                alt="Jewelery"
                className="category-image"
              />
              <strong> Jewelery </strong>
            </Link> 

          <Link to="/shop/category/electronics" className="category-box">
            <img
              src="computer.jpg"
              alt="Electronics"
              className="category-image"
              style={{"height":"205px", "width": "205px", "marginBottom": "50px"}}
            />
            <strong> Electronics </strong>
          </Link>
          
            <Link to="/shop/category/mobiles" className="category-box">
              <img src="mobiles.jpg" alt="Mobiles" className="category-image" 
              style={{"height":"205px", "width": "205px", "marginBottom": "50px"}}/>
             <strong>  Mobiles </strong> 
            </Link>
          
            <Link to="/shop/category/home-appliances" className="category-box">
              <img src="appliances.jpg" alt="Home Appliances" className="category-image"
              style={{"height":"205px", "width": "205px", "marginBottom": "50px"}} />
             <strong> Home Appliances </strong> 
            </Link>

        </div>
      </section>
    </div>
  );
}

export default Home;
