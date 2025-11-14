import React from "react";
import { LogOut, User, IdCard,CircleFadingPlus,ShoppingBag,ShieldAlert } from "lucide-react";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function MechanicSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();


  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col p-4 space-y-4 md:sticky md:top-0">
      <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">
        Mechanic Panel
      </h2>

      <button
        onClick={() => setActiveTab("profile")}
        className={`flex items-center gap-3 p-2 rounded-lg transition ${
          activeTab === "profile"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <User size={20} /> Profile
      </button>

      <button
        onClick={() => setActiveTab("bookings")}
        className={`flex items-center gap-3 p-2 rounded-lg transition ${
          activeTab === "bookings"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <CircleFadingPlus size={20} />My Bookings
      </button>
      <button
        onClick={() => setActiveTab("sell")}
        className={`flex items-center gap-3 p-2 rounded-lg transition ${
          activeTab === "sell"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <ShoppingBag size={20} /> Sell Automobile Parts
      </button>
      <button
        onClick={() => setActiveTab("emergency")}
        className={`flex items-center gap-3 p-2 rounded-lg transition ${
          activeTab === "emergency"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <ShieldAlert size={20} /> Emergency
      </button>

      <button
        onClick={() => setActiveTab("createbookcard")}
        className={`flex items-center gap-3 p-2 rounded-lg transition ${
          activeTab === "createbookcard"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <IdCard size={20} /> Booking Card
      </button>

      <div className="flex-grow"></div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
