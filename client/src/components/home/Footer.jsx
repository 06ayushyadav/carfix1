import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-blue-500 flex items-center gap-1"
          >
            
            <span className="text-4xl">
              Car<span className="text-white text-4xl">Fix</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            AutoFix is your trusted car service partner. From regular
            maintenance to emergency repair — we’ve got your car covered.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/book-service" className="hover:text-blue-400 transition">
                Book Service
              </Link>
            </li>
            <li>
              <Link to="/my-bookings" className="hover:text-blue-400 transition">
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-blue-400 transition">
                Shop Parts
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-white font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-400" />
              Mumbai, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-blue-400" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              support@autofix.com
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-white font-semibold mb-4">Follow Us</h2>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8"></div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} AutoFix. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link to="/privacy" className="hover:text-blue-400">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-blue-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
