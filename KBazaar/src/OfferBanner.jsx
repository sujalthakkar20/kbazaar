import React, { useEffect, useState } from "react";
import "./OfferBanner.css";

const images = [
  "/offer1.jpg",
  "/offer2.jpg",
  "/offer4.jpg",
  "/offer5.jpg",
  "/offer6.jpg",
];

function OfferBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-banner">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Offer ${index + 1}`}
          className={`carousel-image ${index === current ? "active" : ""}`}
        />
      ))}
    </div>
  );
}

export default OfferBanner;
