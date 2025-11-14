
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X,House, LogOut, User, Wrench, ShoppingBag, AlertTriangle } from "lucide-react";
// import { MdHomeFilled } from "react-icons/md";

import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../api/axios.js";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  function goToDashboard() {
    if (user?.role === "admin") navigate("/admin");
    else if (user?.role === "mechanic") navigate(`/mechanic-dashboard/${user._id}`);
    else navigate(`/dashboard/${user._id}`);
  }

  const navItems = [
    { name: "Home", path: "/", icon: House  },
    { name: "Book Services", path: "/all-booking-services", icon: Wrench },
    { name: "Shop Parts", path: "/shop-parts", icon: ShoppingBag },
    { name: "Emergency", path: "/emergency-booking", icon: AlertTriangle },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-2xl text-blue-600"
          >
           
            <div className="bg-gray-800 ">
              <span className="text-4xl">
              Car<span className="text-white text-4xl">Fix</span>
            </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1 font-medium transition duration-200 ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 shadow-sm transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={goToDashboard}
                  className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  <User size={18} />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-5 space-y-4 shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium text-lg"
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}

          {!user ? (
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white py-2 rounded-full font-semibold text-center hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="border border-blue-600 text-blue-600 py-2 rounded-full font-semibold text-center hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => {
                  goToDashboard();
                  setOpen(false);
                }}
                className="bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-red-500 text-white py-2 rounded-full font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}



