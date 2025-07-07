import React, { useEffect, useState } from "react";
import "./BannerText.css";

const banners = [
  "🔥 60% Discount on Electronic Items!",
  "🎁 Buy 1 Get 1 Free on Fashion",
  "🚚 Free Delivery on Orders Above ₹500",
  "📱 Latest Smartphones at Best Prices",
  "💄 Big Beauty Sale – Up to 50% Off",
  "🏠 Home Essentials Mega Deals",
  "🎉 Exclusive Offers for Members Only!"
];

function BannerText() {
 const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % banners.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Tbanner-slider">
      <div className="Tbanner-text">{banners[index]}</div>
    </div>
  );
}

export default BannerText;
