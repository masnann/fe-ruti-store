// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/footer/Footer";
import RegisterPage from "./pages/register/RegisterPage";
import About from "./components/home/About";
import SignUpForm from "./pages/register/SignupPage";
import SignInForm from "./pages/login/SigninPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className="flex-grow">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<SignInForm />} />
            <Route exact path="/signup" element={<RegisterPage />} />
            <Route exact path="/signups" element={<SignUpForm />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
