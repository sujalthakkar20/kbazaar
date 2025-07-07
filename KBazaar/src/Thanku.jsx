import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "./CartContext";
import "./Thanku.css";

function Thanku() {
  const { clearCart } = useCart();
  const navigate = useNavigate(); 

  useEffect(() => {
    clearCart();
  }, []);

    const handleContinueShopping = () => {
      navigate("/shop"); 
    };
    
    const handleViewMyOrder = () => {
      navigate("/myorder"); 
    };


  return (
    <div className="order-container">
      <h1> Your Order Placed Successfully!</h1>
      <p>Thank you for shopping with KBazaar.</p>
      <div className="order-btn-group">

      <button className="order-shop-btn" onClick={handleContinueShopping}>
        Continue Shopping...
      </button>
      <button className="view-order-btn" onClick={handleViewMyOrder}>
          View My Orders
      </button>
      </div>
    </div>
  );
}

export default Thanku;
