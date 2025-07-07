// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Outlet } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import "./index.css";

import Register from './Register'
import Login from './Login'
import Shop from './Shop'
import Navbar from './Navbar'
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import ProductDetail from './ProductDetail'
import PageNotFound from './PageNotFound'
import Wishlist from "./Wishlist";
import UserProfile from './UserProfile';
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Thanku from "./Thanku"; 
import OrderDetail from "./OrderDetail";
import MyOrder from './MyOrder';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartProvider>   
    <WishlistProvider>
       <div className="app-wrapper">

     <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/category/:categoryName" element={<Shop/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path='/productdetail/:id' element={<ProductDetail/>}/>
        <Route path="/orderdetail" element={<OrderDetail />} />
        <Route path="/thankyou" element={<Thanku />} />
        <Route path="/myorder" element={<MyOrder />} />
     
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
       </div>
    </WishlistProvider>
  </CartProvider>
  </BrowserRouter>
)
