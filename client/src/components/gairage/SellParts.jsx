import React, { useState } from "react";
import api from "../../api/axios.js";

export default function SellParts() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    compatibility: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (photo) data.append("photo", photo);

      const token=localStorage.getItem("token")
      const res = await api.post("/parts", data, {
        headers: { "Content-Type": "multipart/form-data" , 
            Authorization:`Bearer ${token}`
         },
      });

      console.log(res.data)

      setMsg("✅ Part listed successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        compatibility: "",
      });
      setPhoto(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to list part. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Sell Automobile Parts
      </h2>

      {msg && (
        <div
          className={`mb-4 text-center text-sm rounded-md p-2 ${
            msg.startsWith("✅")
              ? "text-green-600 bg-green-50 border border-green-200"
              : "text-red-600 bg-red-50 border border-red-200"
          }`}
        >
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Part Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Part Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="e.g. Brake Pads, Engine Oil Filter"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            rows={3}
            placeholder="Write details about this part (condition, usage, etc.)"
          />
        </div>

        {/* Price & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter price"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="e.g. Bosch, TVS, Honda"
            />
          </div>
        </div>

        {/* Category & Compatibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Engine">Engine</option>
              <option value="Brakes">Brakes</option>
              <option value="Electrical">Electrical</option>
              <option value="Suspension">Suspension</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Compatibility
            </label>
            <input
              value={form.compatibility}
              onChange={(e) =>
                setForm({ ...form, compatibility: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="e.g. Maruti Suzuki Swift 2018-2022"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col md:flex-row items-center gap-6 border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
          <div className="w-40 h-40 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-inner">
            {preview ? (
              <img
                src={preview}
                alt="part"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                Preview
              </div>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Part Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200 cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-1">
              Max 3MB • JPG/PNG formats supported
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-gray-200 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-medium disabled:opacity-70"
          >
            {loading ? "Uploading..." : "List Part for Sale"}
          </button>
        </div>
      </form>
    </div>
  );
}
