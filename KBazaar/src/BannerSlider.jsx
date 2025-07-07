import React, { useState, useEffect } from "react";
import "./BannerSlider.css";

function BannerSlider() {
  const banners = [
    "/banner3.jpg",
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner4.jpg",
    "/banner7.jpg",
    "/banner5.jpg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext(); 
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="banner-slider">
      <img src={banners[index]} alt="Promo Banner" className="banner-image" />

      <button className="banner-arrow left" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="banner-arrow right" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
}

export default BannerSlider;
