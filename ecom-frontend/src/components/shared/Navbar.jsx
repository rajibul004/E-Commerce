import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/cart", label: "Cart", icon: <FaShoppingCart size={20} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
        {/* Logo only */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex items-center gap-8">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition duration-200 ${
                  path === to
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {icon ? (
                  <Badge
                    showZero
                    badgeContent={to === "/cart" ? cart?.length || 0 : 0}
                    color="secondary"
                  >
                    {icon}
                  </Badge>
                ) : null}
                <span>{label}</span>
              </Link>
            </li>
          ))}

          <li>
            {user?.id ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:from-purple-700 hover:to-pink-600 transition"
              >
                <FaSignInAlt size={18} />
                <span>Login</span>
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden p-2 rounded-md text-purple-600"
        >
          {navbarOpen ? <RxCross2 className="text-3xl" /> : <IoIosMenu className="text-3xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-300 overflow-hidden ${
          navbarOpen ? "max-h-screen py-5 px-6" : "max-h-0"
        } bg-white/90 backdrop-blur-md shadow-md border-t`}
      >
        <ul className="flex flex-col gap-4">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setNavbarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${
                  path === to
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "text-gray-800 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {icon ? (
                  <Badge
                    showZero
                    badgeContent={to === "/cart" ? cart?.length || 0 : 0}
                    color="secondary"
                  >
                    {icon}
                  </Badge>
                ) : null}
                <span>{label}</span>
              </Link>
            </li>
          ))}

          <li>
            {user?.id ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                onClick={() => setNavbarOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:from-purple-700 hover:to-pink-600 transition"
              >
                <FaSignInAlt size={18} />
                <span>Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
