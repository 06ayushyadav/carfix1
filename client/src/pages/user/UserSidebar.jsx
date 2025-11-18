import React from "react";
import { LogOut, User, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0"; // delete cookie
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const tabs = [
    { name: "Profile", icon: <User size={18} />, key: "profile" },
    { name: "My Bookings", icon: <ClipboardList size={18} />, key: "bookings" },
  ];

  return (
    <div className="w-full md:w-64 bg-zinc-900 text-white flex md:flex-col items-center md:items-start p-5 rounded-r-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">User Panel</h2>

      <nav className="flex flex-row md:flex-col gap-3 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all text-left ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-blue-500 hover:text-white text-gray-300"
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
