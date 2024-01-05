import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHomePageContent } from "../../hooks/homepage/Home";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchHomePageContent(token)
      .then((data) => {
        setCarouselData(data.carousel);
        setCategoryData(data.category);
        setProductData(data.product);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [navigate]);

  return (
    <div className="container mx-auto">
      {/* Carousel */}
      <div className="mb-8">
        <Slider
          dots={true} // Menampilkan titik navigasi
          infinite={true} // Mengaktifkan geser tak terbatas
          autoplay={true} // Mengaktifkan autoplay
          autoplaySpeed={3000} // Kecepatan autoplay (dalam milidetik)
          speed={500} // Kecepatan animasi (dalam milidetik)
          slidesToShow={1} // Jumlah slide yang ditampilkan dalam satu waktu
          slidesToScroll={1} // Jumlah slide yang digulirkan setiap kali tombol digunakan
          className="carousel"
        >
          {carouselData.map((item) => (
            <div key={item.id} className="carousel-item">
              <img className="w-full" src={item.photo} alt={item.name} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Categories */}
      <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h3 className="text-2xl font-bold mb-4">Categories</h3>
        <Slider
          infinite={false}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          className="category-slider"
        >
          {categoryData.map((category) => (
            <div key={category.id} className="category-slider-item">
              <div
                className="rounded-lg overflow-hidden shadow-sm p-2"
                style={{ borderRadius: "12px" }}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={category.photo}
                    alt={category.name}
                    className="w-full h-40 object-cover object-center mb-2"
                    style={{ borderRadius: "12px" }}
                  />
                  <div className="text-center">
                    <p className="text-lg font-semibold">{category.name}</p>
                    <p className="text-gray-700">
                      Total Products: {category.total_product}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Products */}
      <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h3 className="text-xl font-bold mb-4">Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productData.map((product) => (
            <div key={product.id} className="product">
              <img
                src={product.photos.url}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="text-lg font-semibold mt-2">{product.name}</p>
              <p>Price: {product.price}</p>
              <p>Rating: {product.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
