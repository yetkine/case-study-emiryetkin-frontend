import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colorOptions = {
    yellow: "#E6CA97",
    white: "#D9D9D9",
    rose: "#E1A4A9",
  };

  const imageUrl =
    product.images && product.images[selectedColor]
      ? product.images[selectedColor]
      : "https://via.placeholder.com/200"; // Yedek görsel

  const renderStars = (score, uniqueId) => {
    const stars = [];
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
      const fillPercent = Math.min(Math.max(score - i, 0), 1) * 100;
      const gradientId = `star-gradient-${uniqueId}-${i}`;

      stars.push(
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={`url(#${gradientId})`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="0%" stopColor="#f0c06e" />
              <stop offset={`${fillPercent}%`} stopColor="#f0c06e" />
              <stop offset={`${fillPercent}%`} stopColor="#e0e0e0" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>
          </defs>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/200";
        }}
      />

      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price} USD</p>

      <div className="color-selector">
        {Object.entries(colorOptions).map(([color, hex]) => (
          <button
            key={color}
            className={`color-dot ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: hex }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      <p className="product-gold-label">
        {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold
      </p>

      <div className="product-rating">
        <div className="star-container">
          {renderStars(
            product.popularityScoreOutOf5,
            product.id || product.name || Math.random()
          )}
        </div>
        <span className="score-text">{product.popularityScoreOutOf5}/5</span>
      </div>
    </div>
  );
}

export default ProductCard;
