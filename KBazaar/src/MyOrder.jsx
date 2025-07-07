import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrder.css";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterMonth, setFilterMonth] = useState(""); 
  const [filterYear, setFilterYear] = useState("");  

  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders?userId=${user.id}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const goBack = () => navigate(-1);

  const getFilteredOrders = () => {
    return orders.filter(order => {
      const date = new Date(order.createdAt);
      const month = String(date.getMonth() + 1).padStart(2, "0"); // e.g., "01"
      const year = String(date.getFullYear());

      return (
        (!filterMonth || filterMonth === month) &&
        (!filterYear || filterYear === year)
      );
    });
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="order-history-container">
      <button className="order-back-button" onClick={goBack}>← Back</button>
      <h2 style={{ margin: "15px" }}>My Orders</h2>

      <div className="order-filter">
        <label>
          Month:
          <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
            <option value="">All</option>
            {[...Array(12)].map((_, i) => {
              const monthValue = String(i + 1).padStart(2, "0");
              const monthName = new Date(0, i).toLocaleString("default", { month: "long" });
              return (
                <option key={monthValue} value={monthValue}>
                  {monthName}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Year:
          <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
            <option value="">All</option>
            {[...new Set(orders.map(order => new Date(order.createdAt).getFullYear()))]
              .sort((a, b) => b - a)
              .map(year => (
                <option key={year} value={year}>{year}</option>
              ))
            }
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p style={{ marginLeft: "70px" }}>No orders found.</p>
      ) : (
        <div className="order-list">
          {filteredOrders.map((order, index) => (
            <div className="order-card" key={index}>
              <h3>Order #{order.orderId || index + 1}</h3>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> {order.status || "Processing"}</p>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p>{item.title}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{(item.price * 50).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <h4>Total: ₹{order.totalAmount}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;
