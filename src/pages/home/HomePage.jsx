import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHomePageContent } from "../../hooks/homepage/Home";
import Carousel from "../../components/carousel/Carousel"
import CategoryItem from "../../components/home/Category"
import ProductItem from "../../components/home/ProductItem"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

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
        <Carousel data={carouselData} />
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
            <CategoryItem key={category.id} category={category} />
          ))}
        </Slider>
      </div>

      {/* Products */}
      <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h3 className="text-xl font-bold mb-4">Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productData.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
