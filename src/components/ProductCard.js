// src/components/ProductCard.js

import React, { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colorOptions = {
    yellow: "#E6CA97",
    white: "#D9D9D9",
    rose: "#E1A4A9",
  };

  const imageUrl =
    product.images?.[selectedColor] || "https://via.placeholder.com/200";

  // Popülerlik skoruna göre tam/yarım/boş yıldızları oluşturur
  function renderStars(scoreOutOf5) {
    const fullCount = Math.floor(scoreOutOf5);
    const hasHalf = scoreOutOf5 - fullCount >= 0.5;
    const emptyCount = 5 - fullCount - (hasHalf ? 1 : 0);
    const stars = [];

    // Tam yıldızlar
    for (let i = 0; i < fullCount; i++) {
      stars.push(<span key={`full-${i}`} className="star full" />);
    }
    // Yarım yıldız
    if (hasHalf) {
      stars.push(<span key="half" className="star half" />);
    }
    // Boş yıldızlar
    for (let i = 0; i < emptyCount; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  }

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={imageUrl}
        alt={product.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/200";
        }}
      />

      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)} USD</p>

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
        <div className="stars">
          {renderStars(product.popularityScoreOutOf5)}
        </div>
        <span className="score-text">{product.popularityScoreOutOf5}/5</span>
      </div>
    </div>
  );
}
