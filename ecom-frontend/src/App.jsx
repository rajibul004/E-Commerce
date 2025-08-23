import React from 'react';
import './App.css';
import Products from './components/products/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/shared/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast';
import Cart from './components/cart/Cart';
import LogIn from './components/auth/LogIn';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/auth/Register';
import Checkout from './components/checkout/Checkout';
import PaymentConfirmation from './components/checkout/PaymentConfirmation';
import Footer from './components/Footer';

// Import newly created profile and orders components
import Profile from './components/Profile/Profile';
import Orders from './components/Profile/Orders';

import AdminProduct from './components/admin_product/Products';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />

        {/* Main content and routes */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/cart' element={<Cart />} />

              {/* Profile and orders routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/orders" element={<Orders />} />

              <Route path="/admin/product" element={<AdminProduct />} />

              {/* Protected routes */}
              <Route path='/' element={<PrivateRoute />}>
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/order-confirm' element={<PaymentConfirmation />} />
              </Route>

              {/* Public routes with PrivateRoute wrapper */}
              <Route path='/' element={<PrivateRoute publicPage />}>
                <Route path='/login' element={<LogIn />} />
                <Route path='/register' element={<Register />} />
              </Route>
            </Routes>
          </main>

          {/* Footer always at the bottom */}
          <Footer />
        </div>
      </Router>

      {/* Toast notifications */}
      <Toaster position='bottom-center' />
    </React.Fragment>
  );
}

export default App;
