import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import useProductDetail from "../../hooks/products/DetailsProduct";
import Loading from "../../components/modals/Loading";
import { useNavigate } from "react-router-dom";
import createCart from "../../hooks/order/CreateCartApi";
import getReviewsList from "../../hooks/products/GetProductReview";
import { FaStar } from "react-icons/fa";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { productDetail, loading, error } = useProductDetail(id);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [active, setActive] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("token") !== null
  );
  const displayStock = (stock) => (stock > 0 ? `Stok: ${stock}` : "Stok Habis");

  const fetchReviews = async () => {
    try {
      const reviewsResponse = await getReviewsList(id, 1, 3);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (productDetail) {
      setActive(productDetail.photos[0].url);
      setStatus(productDetail.status);
    }
  }, [productDetail]);

  // Varians state
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (productDetail && productDetail.variants) {
      setVariants(productDetail.variants);
      setSelectedVariant(productDetail.variants[0]); // Pilih varian pertama sebagai default
    }
  }, [productDetail]);

  // Handle pemilihan varian
  const handleSelectVariant = (variant) => {
    setSelectedSize(variant.size);
    setSelectedColor(variant.color);
    setSelectedVariant(variant);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      Math.min(selectedVariant.stock, prevQuantity + 1)
    );
  };

  const handleAddToCart = async () => {
    if (isUserLoggedIn) {
      if (status !== "Diarsipkan") {
        if (productDetail && selectedVariant && quantity) {
          try {
            const response = await createCart({
              product_id: productDetail.id,
              size: selectedSize,
              color: selectedColor,
              quantity,
            });

            alert("Produk berhasil ditambahkan ke keranjang!");
          } catch (error) {
            alert(
              "Gagal menambahkan produk ke keranjang. Silakan coba lagi nanti."
            );
          }
        } else {
          alert(
            "Silakan pilih varian, ukuran, warna, dan jumlah sebelum ditambahkan ke keranjang."
          );
        }
      } else {
        alert(
          "Produk ini telah diarsipkan dan tidak dapat ditambahkan ke keranjang."
        );
      }
    } else {
      navigate("/login");
    }
  };

  const handleCheckout = () => {
    if (isUserLoggedIn) {
      if (status !== "Diarsipkan") {
        if (productDetail && selectedVariant && quantity) {
          navigate("/order/checkout", {
            state: {
              orderDetails: {
                productId: productDetail.id,
                selectedSize,
                selectedColor,
                quantity,
              },
            },
          });
        } else {
          alert(
            "Silakan pilih varian, ukuran, warna, dan jumlah sebelum checkout."
          );
        }
      } else {
        alert("Produk ini telah diarsipkan dan tidak dapat dibeli.");
      }
    } else {
      navigate("/login");
    }
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
    <div className="container mx-auto bg-gray-100 p-4">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <div className="bg-white p-8 rounded-md shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="mb-4 md:mr-4 md:w-1/2">
              <img
                className="w-full h-80 md:max-w-full md:h-auto rounded-lg object-cover object-center"
                src={active}
                alt=""
              />
              <div className="grid grid-cols-5 gap-4 mt-4">
                {productDetail.photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      onClick={() => setActive(photo.url)}
                      src={photo.url}
                      className="h-24 w-24 max-w-full cursor-pointer rounded-lg object-cover object-center"
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
                <p className="mb-2 md:mb-0 text-red-500 font-semibold">
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
                <p className="text-sm md:ml-4 text-orange-500">
                  Diskon: Rp.{productDetail.discount}
                </p>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                {productDetail.description}
              </p>

              {variants.length > 0 && (
  <div className="mb-4">
    <p className="text-gray-700 mb-2 text-sm font-semibold">
      Pilih Varian:
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {variants.map((variant) => (
        <button
          key={variant.id}
          className={`border border-gray-300 px-2 py-1 rounded-md text-xs focus:outline-none focus:border-blue-500 ${
            selectedVariant && selectedVariant.id === variant.id
              ? "bg-blue-500 text-white"
              : ""
          }`}
          onClick={() => handleSelectVariant(variant)}
        >
          {variant.size} - {variant.color} ({displayStock(variant.stock)})
        </button>
      ))}
    </div>
  </div>
)}


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
                  onClick={handleAddToCart}
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
                      <span key={category.id}>{category.name}</span>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">Tidak ada kategori</p>
                )}
              </div>
              <button
                className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
                onClick={handleCheckout}
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <div className="bg-white p-8 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Ulasan</h3>
            <Link
              to={`/review/list/${id}`}
              className="text-blue-500 hover:underline"
            >
              Lihat Semua
            </Link>
          </div>
          <p className="text-gray-700">
            Total ulasan: {productDetail.total_reviews} ulasan
          </p>
          {/* Display Product Reviews or "Belum ada ulasan" message */}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {review.user.photo_profile ? (
                        <img
                          src={review.user.photo_profile}
                          alt={`${review.user.name}'s profile`}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300"></div>
                      )}
                    </div>
                    <span className="font-semibold text-lg ml-4">
                      {review.user.name}
                    </span>
                  </div>
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={18}
                        color={review.rating >= star ? "#FFD700" : "#C0C0C0"}
                      />
                    ))}
                  </div>
                </div>
                {review.photos.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {review.photos.map((photo) => (
                      <div key={photo.id}>
                        <img
                          className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                          src={photo.url}
                          alt={`review-photo-${photo.id}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center mt-4">
                  <span className="text-gray-600">{review.description}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada ulasan untuk produk ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
