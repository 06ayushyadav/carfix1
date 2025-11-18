import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function PartCard({ part }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden ">
      <img
        src={part.photo}
        alt={part.name}
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{part.name}</h3>
        <p className="text-sm text-gray-500 mb-1">Brand: {part.brand}</p>
        <p className="text-sm text-gray-500">Category: {part.category}</p>
        <p className="text-blue-600 font-bold text-lg mt-2">₹{part.price}</p>
        <button 
        className="mt-3 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Show Detail
        </button>
        
      </div>
    </div>
  );
}
