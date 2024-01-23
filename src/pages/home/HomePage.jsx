import React, { useState, useEffect } from "react";
import Carousel from "../../components/carousel/Carousel";
import CategoryItem from "../../components/home/Category";
import ProductItem from "../../components/home/ProductItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getCarouselList from "../../hooks/homepage/CarouselApi";
import getCategoryList from "../../hooks/homepage/CategoryApi";
import { getProducts } from "../../hooks/products/GetAllProduct";
import { Link } from "react-router-dom";
import Loading from "../../components/modals/Loading"; 

const Home = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carouselResponse = await getCarouselList();
        setCarouselData(carouselResponse.data);

        const productResponse = await getProducts();
        setProductData(productResponse.data);

        const categoryResponse = await getCategoryList();
        setCategoryData(categoryResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      {/* Carousel */}
      <div className="mb-8">
        <Carousel data={carouselData} />
      </div>
      {/* Categories */}
      <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h3 className="text-2xl font-bold mb-4">Kategori</h3>
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Produk Baru</h3>
          <Link to="/product" className="text-blue-500 hover:underline">
            Lihat Semua
          </Link>
        </div>
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
