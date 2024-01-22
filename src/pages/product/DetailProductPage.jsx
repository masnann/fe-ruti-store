import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import useProductDetail from "../../hooks/products/DetailsProduct";
import Loading from "../../components/modals/Loading";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { productDetail, loading, error } = useProductDetail(id);

  const [active, setActive] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productDetail) {
      setActive(productDetail.photos[0].url);
    }
  }, [productDetail]);

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      Math.min(productDetail.stock, prevQuantity + 1)
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!productDetail) {
    return <p>Product not found</p>;
  }

  const filledStars = Array.from({
    length: Math.floor(productDetail.rating),
  }).map((_, index) => (
    <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
  ));

  const emptyStars = Array.from({
    length: 5 - Math.floor(productDetail.rating),
  }).map((_, index) => (
    <StarIcon key={index} className="w-5 h-5 text-gray-300" />
  ));

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-md shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="mb-4 md:mr-4 md:w-1/2">
              <img
                className="w-full h-auto rounded-lg object-cover object-center"
                src={active}
                alt=""
              />
              <div className="grid grid-cols-5 gap-4 mt-4">
                {productDetail.photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      onClick={() => setActive(photo.url)}
                      src={photo.url}
                      className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                      alt={`gallery-image-${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h2 className="text-xl md:text-3xl font-semibold mb-2 md:mb-0">
                  {productDetail.name}
                </h2>
                <p className="mb-2 md:mb-0 text-orange-600 font-semibold">
                  Rp. {productDetail.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row mb-2">
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="flex">
                    {filledStars}
                    {emptyStars}
                  </div>
                  <p className="ml-2 text-sm md:ml-4">{productDetail.rating}</p>
                </div>
                <p className="text-sm md:ml-4">
                  Diskon: Rp.{productDetail.discount}
                </p>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                {productDetail.description}
              </p>
              <p className="text-gray-700 mb-4 text-sm">
                Stok: {productDetail.stock}
              </p>
              <div className="flex flex-col md:flex-row items-center mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <button
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md mr-2 md:mr-4"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <span className="text-gray-700 text-sm">{quantity}</span>
                  <button
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md ml-2 md:ml-4"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-blue-500 text-white ml-0 mt-2 md:ml-6 md:mt-0 px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-auto"
                  onClick={() => alert("Add to Cart button clicked")}
                >
                 Tambah ke keranjang
                </button>
              </div>

              {/* Menampilkan kategori jika ada, atau informasi jika kategori null */}
              <div className="mb-4">
                <p className="text-gray-700 mb-2 text-sm font-semibold">
                  Kategori:
                </p>
                {productDetail.categories &&
                productDetail.categories.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {productDetail.categories.map((category) => (
                      <li key={category.id}>{category.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">Tidak ada kategori</p>
                )}
              </div>
              <button
                className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
                onClick={() => alert("Buy Now button clicked")}
              >
                Beli sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
