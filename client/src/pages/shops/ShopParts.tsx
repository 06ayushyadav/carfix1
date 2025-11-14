import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import PartCard from "../../components/PartCard";
import { Key, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShopParts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res=await api.get(`/parts/allparts`)
        console.log(res.data)
        setParts(res.data);
      } catch (err) {
        console.error("Error fetching parts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParts();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 mt-14 px-6  ">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 md:mb-0">
          🛠️ Shop Car Parts
        </h1>

        <div className="relative">
          <Search size={18} className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search parts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 mt-20 animate-pulse">
          Loading parts...
        </div>
      ) : parts.length === 0 ? (
        <div className="text-center text-gray-400 py-20 bg-white shadow rounded-2xl">
          No parts found 😔
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {parts.map((p,) => (
            
            <Link key={p._id} to={`/parts/${p._id}`}>
              <PartCard key={p._id} part={p} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

