import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h4>Get to Know Us</h4>
          <ul>
            <li><Link to="/about">About KBazaar</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect with Us</h4>
          <ul>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Start Shopping</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} KBazaar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
