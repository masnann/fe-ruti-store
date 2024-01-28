// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/footer/Footer";
import About from "./components/home/About";
import SignUpForm from "./pages/register/SignupPage";
import SignInForm from "./pages/login/SigninPage";
import GetAllArticle from "./pages/article/GetAllArticle";
import DetailArticle from "./pages/article/DetailsArtilce";
import CartPage from "./pages/order/CartPage";
import ProductDetailPage from "./pages/product/DetailProductPage";
import CheckoutPage from "./pages/order/CheckoutPage";
import AddressSelectionPage from "./pages/profile/GetAddress";
import GetAllProduct from "./pages/product/GetAllProduct";
import ProfilePage from "./pages/profile/ProfilePage";
import GetAllOrderUser from "./pages/profile/GetAllOrderUserPage";
import AddReviewForm from "./pages/review/AddReviewPage";
import ProductReviewPage from "./pages/review/ProductReviewPage";
import OrderByCart from "./pages/order/OrderByCart";
import OrderDetailPage from "./pages/profile/OrderDetailsPage";
import GetAllProductRecomendaton from "./pages/product/GetProductRecomendation";
import FloatingButton from "./components/modals/Chatbot";


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Router>
        <div className="flex-grow">
          <Navbar />
          <FloatingButton />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<SignInForm />} />
            <Route exact path="/signup" element={<SignUpForm />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/article" element={<GetAllArticle />} />
            <Route exact path="/article/details/:id" element={<DetailArticle />} />
            <Route exact path="/order/cart" element={<CartPage />} />
            <Route exact path="/order/checkout" element={<CheckoutPage />} />
            <Route exact path="/order/checkout/cart" element={<OrderByCart />} />
            <Route exact path="/product/" element={<GetAllProduct />} />
            <Route exact path="/product/details/:id" element={<ProductDetailPage />} />
            <Route exact path="/product/recommendation" element={<GetAllProductRecomendaton />} />
            <Route exact path="/user/profile" element={<ProfilePage />} />   
            <Route exact path="/user/profile/address" element={<AddressSelectionPage />} />         
            <Route exact path="/user/profile/orders" element={<GetAllOrderUser />} />   
            <Route exact path="/user/profile/orders/details/:id" element={<OrderDetailPage />} />  
            <Route exact path="/review/create/:orderDetailsId/:productId" element={<AddReviewForm />} />
            <Route exact path="/review/list/:id" element={<ProductReviewPage />} />        
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
