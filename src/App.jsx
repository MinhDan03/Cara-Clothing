import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { BrowserRouter, Routes, Route, NavLink, Navigate  } from "react-router-dom";
import Home from './components/home/Home';
import Shop from './components/shop/Shop';
import Blog from './components/blog/Blog';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Cart from './components/cart/Cart';
import ProductDetail from './components/productDetail/ProductDetail';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import CheckOut from './components/checkout/CheckOut';
import ThankYou from './components/thankyou/ThankYou';
import Login from './components/login/Login';
import Register from './components/register/Register';
import LoginAdmin from './admin/components/login/LoginAdmin';
import Dashboard from './admin/components/Dashboard';
import ForgotPassword from './components/login/ForgotPassword';
import { useSelector } from 'react-redux';
import OTP from './components/login/OTP';
import ResetPassword from './components/login/ResetPassword';
import './App.css'

function App() {
  // const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
  // console.log(isAuthenticated);
  const adminRole = useSelector((state)=> state.authAdmin.admin);
  const isAuthenticated = useSelector((state)=> state.authAdmin.isAuthenticated);
  // console.log(adminRole);
  // console.log(isAuthenticated);
  return (
    <BrowserRouter>
    <>
    <Routes>
          {/* Routes cho trang admin */}
          <Route
            path="/admin/*"
            element={
              isAuthenticated === true ? 
              <>
                <main>
                  <Routes>
                    <Route path="/*" element={<Dashboard />}/> {/* 👈 Renders at /app/ */}
                  </Routes>
                </main>
              </>
              : <Navigate to="/loginAdmin"/>
        
            }
          />
          {/* Routes cho trang khách hàng */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <main>
                  <ScrollToTop />
                  <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/" exact element={<Home />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/productDetail/:id" element={<ProductDetail />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/shopAll" element={<Shop />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/blog" element={<Blog />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/about" element={<About />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/contact" element={<Contact />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/cart" element={<Cart />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/checkout" element={<CheckOut />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/thankyou" element={<ThankYou />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/login" element={<Login />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/register" element={<Register />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/LoginAdmin" element={<LoginAdmin />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/forgotPassword" element={<ForgotPassword />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/verifyOTP" element={<OTP />}/> {/* 👈 Renders at /app/ */}
                    <Route path="/reset-password" element={<ResetPassword />}/> {/* 👈 Renders at /app/ */}

                    {/* ... */}
                    {/* Redirect khi đường dẫn không khớp */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
    </>
    </BrowserRouter>
  )
}

export default App
