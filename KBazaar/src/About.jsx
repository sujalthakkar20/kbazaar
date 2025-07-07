import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-container">

      <section className="about-hero">
        <h1>About KBazaar</h1>
        <p>Your trusted destination for fashion, electronics & more.</p>
        <Link to="/shop" className="hero-shop-btn">Continue Shopping !!</Link>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At <strong>KBazaar</strong>, we believe shopping should be simple,
          affordable, and joyful. We deliver premium products, competitive
          pricing, and fast delivery—all under one digital roof.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2025 by a small team of tech-lovers and shopaholics, KBazaar
          began as a weekend side-project. Today we serve thousands of customers
          across India with an ever-growing catalog of hand-picked items.
        </p>
      </section>

      <section className="about-testimonials">
        <h2>What Our Customers Say....</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Absolutely love shopping on KBazaar! Fast delivery and genuine products every time."</p>
            <span>- Priya Sharma, Jahangirpura</span>
          </div>
          <div className="testimonial-card">
            <p>"Excellent customer service and the return process is super smooth. Highly recommend!"</p>
            <span>- Raj Mehta, Adajan</span>
          </div>
          <div className="testimonial-card">
            <p>"I got amazing deals on fashion products. The quality exceeded my expectations."</p>
            <span>- Sneha Kapoor, Katargam</span>
          </div>
          <div className="testimonial-card">
            <p>"Finally found a reliable online store for electronics. Everything was as described."</p>
            <span>- Samir Patel, Adajan</span>
          </div>
        </div>
      </section>

      <section className="about-features">
        <h2>Why Choose KBazaar?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <img src="delivery.png" alt="Fast Delivery" className="feature-icon" />
            <h3>Fast Delivery⚡</h3>
            <p>Get products at your doorstep within 48 hours in most cities.</p>
          </div>
          <div className="feature-card">
            <img src="return.png" alt="Seamless Returns" className="feature-icon" />
            <h3>Seamless Returns 🔄</h3>
            <p>Change of mind? Return within 7 days, hassle-free.</p>
          </div>
          <div className="feature-card">
            <img src="exclusive.png" alt="Exclusive Collections" className="feature-icon" />
            <h3>Exclusive Collections 🛍️</h3>
            <p>Shop curated products not available anywhere else.</p>
          </div>
          <div className="feature-card">
            <img src="trusted.png" alt="Trusted by Thousands" className="feature-icon" />
            <h3>Trusted by Thousands ⭐</h3>
            <p>Over 10,000+ verified buyers and counting across India.</p>
          </div>
        </div>
      </section>

      <section className="about-contact">
        {/* <h2>Contact Us</h2> */}
        <h2>Have questions or need support ? Reach out to us!</h2>
        <p>Email: support@kbazaar.com</p>
        <p>Phone: +91-7777777777</p>
      </section>
    </div>
  );
}

export default About;
