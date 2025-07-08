import React, { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      // in production you’d hit your Heroku/Vercel URL here instead of localhost
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1 className="page-title">Product List</h1>

      <div className="product-list-slider">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          /** default to 1 slide on the smallest widths */
          slidesPerView={1}
          navigation
          /** override at these breakpoints */
          breakpoints={{
            // from 640px up, show 2 cards
            640: { slidesPerView: 2 },
            // from 1024px up, show 4 cards
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.name}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
