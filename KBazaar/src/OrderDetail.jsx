import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderDetail.css";
import { useCart } from "./CartContext";

function OrderDetail() {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to place your order.");
      navigate("/login");
      return;
    }

    if (!phone || !address || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      userId: user.id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      phone,
      address,
      paymentMethod,
      status: "Pending",
      items: cartItems,
      totalAmount: (totalAmount * 50).toFixed(2),
    };

    try {
        setLoading(true);
      const res = await axios.post("http://localhost:5000/api/orders", order);
      if (res.data.success) {
        clearCart();
        navigate("/thankyou");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">
      <h2>Order Details</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <label>Name</label>
       <input
        value={
          user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : ""
        }
        readOnly
      />

        <label>Email</label>
      <input value={user?.email || ""} readOnly />


        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Address</label>
        <textarea
          placeholder="Delivery address"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label>Payment Method</label>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "card" && (
          <div className="payment-detail-box">
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="Card Holder Name" required />
            <input type="text" placeholder="MM/YY" required />
            <input type="text" placeholder="CVV" required />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="payment-detail-box">
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., example@upi)"
              required
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default OrderDetail;
