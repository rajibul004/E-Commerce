import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import logo from '../assets/logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white pt-16 pb-8 px-6 md:px-20 overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm text-white">
        
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className=" rounded-xl flex items-center justify-center transition-transform hover:scale-105">
              <img
                src={logo}
                alt="Riji EV Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">RIJI EV</h2>
              <p className="text-xs text-gray-400">Electric Vehicles</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            RIJI EV is a leading electric vehicle manufacturer in India, specializing in electric rickshaws, e-carts, and other sustainable mobility solutions.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-3 pt-2">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:scale-110 hover:bg-blue-600 transition-all duration-300">
              <FaFacebookF className="text-blue-400" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:scale-110 hover:bg-pink-600 transition-all duration-300">
              <FaInstagram className="text-pink-400" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:scale-110 hover:bg-blue-400 transition-all duration-300">
              <FaYoutube className="text-red-400" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white relative">
            Contact Information
            <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2 group">
              <FiMapPin className="text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <p className="text-gray-300 leading-relaxed">
                Fancy Market 2nd Floor, Tinkonia Bus Stand,<br />
                Bardhaman, West Bengal, 713101, India
              </p>
            </div>
            <div className="flex items-center space-x-2 group hover:text-green-400 transition-colors cursor-pointer">
              <FiPhone className="text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300">+91 86176 16397</span>
            </div>
            <div className="flex items-center space-x-2 group hover:text-blue-400 transition-colors cursor-pointer">
              <FiMail className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300">rijiev@gmail.com</span>
            </div>
            <div className="flex items-start space-x-2 group">
              <FiClock className="text-purple-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="text-gray-300">
                <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white relative">
            Products
            <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-green-400 pb-1">Explore Products</span></a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-green-400 pb-1">Accessories</span></a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white relative">
            Support
            <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-blue-400 pb-1">Connect Support</span></a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-blue-400 pb-1">Connect With Us</span></a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-blue-400 pb-1">Facebook</span></a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-blue-400 pb-1">Visit Us</span></a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-blue-400 pb-1">FAQ</span></a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white relative">
            Company
            <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-purple-400 pb-1">About Us</span></a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 group inline-block"><span className="border-b border-transparent group-hover:border-purple-400 pb-1">Our Team</span></a></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RIJI EV. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
