import React, { useEffect, useState, useContext } from "react";
import api from "../../api/axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import MechanicSidebar from "./MechanicSidebar.jsx";
import MyBookings from "../MyBooking.jsx";
import SellParts from "../../components/gairage/SellParts.jsx";
import Emergency from "../../components/gairage/Emergency.jsx";
import { useParams } from "react-router-dom";
import CreateBookingCard from "../../components/gairage/CreateBookingCard.jsx";

export default function MechanicDashboard() {
  const { user } = useContext(AuthContext);
  const { garageId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: "",
    chargePerHour: "",
    address: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/mechanic/me");
        if (res.data.mechanic) {
          const m = res.data.mechanic;
          setForm({
            name: m.name || "",
            phone: m.phone || "",
            skills: (m.skills || []).join(", "),
            chargePerHour: m.chargePerHour || "",
            address: m.address || "",
          });
          setPreview(m.storePhoto || "");
        }
      } catch (err) {
        console.log("no profile", err?.response?.data);
      }
    }
    fetchProfile();
  }, []);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setPhotoFile(file || null);
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
    setLoading(true);
    setMsg("");
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("skills", form.skills);
      data.append("chargePerHour", form.chargePerHour);
      data.append("address", form.address);
      if (photoFile) data.append("storePhoto", photoFile);

      const res = await api.post("/mechanic/me", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Profile saved successfully ✅");
      if (res.data.mechanic?.storePhoto)
        setPreview(res.data.mechanic.storePhoto);
    } catch (err) {
      console.error(err);
      setMsg(
        "Error saving profile: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row  mt-20 ">
      <MechanicSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Section */}
      <div className="flex-1 w-full">
        <div className="bg-zinc-900 flex items-center justify-between text-white px-6 py-3">
          <h2 className="text-blue-500 font-bold text-3xl">
            Mechanic Dashboard
          </h2>
          <p>{form.name}</p>
        </div>

        {/* Conditional Rendering */}

        {activeTab === "bookings" ? (
          <div className="p-6">
            <MyBookings />
          </div>
        ) : activeTab === "sell" ? (
          <div className="p-6">
            <SellParts />
          </div>
        ) : activeTab === "createbookcard" ? (
          <div className="p-6">
            <CreateBookingCard/>
          </div>
        ) : activeTab === "emergency" ? (
          <div className="p-6">
            <Emergency />
          </div>
        ) : (
          <div className="flex-1 p-6 flex justify-center">
            {/* PROFILE FORM */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mt-4 md:mt-0">
              <p className="text-center text-gray-500 mb-6 text-sm">
                Manage your profile, skills, and hourly rates efficiently.
              </p>

              {msg && (
                <div className="mb-4 text-green-600 bg-green-50 border border-green-200 rounded-md p-2 text-center text-sm">
                  {msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Charge (₹ / hour)
                    </label>
                    <input
                      type="number"
                      value={form.chargePerHour}
                      onChange={(e) =>
                        setForm({ ...form, chargePerHour: e.target.value })
                      }
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                      placeholder="Hourly charge"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Skills
                    </label>
                    <input
                      value={form.skills}
                      onChange={(e) =>
                        setForm({ ...form, skills: e.target.value })
                      }
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                      placeholder="e.g. Engine Repair, Tire Change"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Address / Workshop Location
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                    rows={3}
                    placeholder="Enter your workshop address"
                  />
                </div>

                {/* Photo */}
                <div className="flex flex-col md:flex-row gap-6 items-center border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                  <div className="w-48 h-32 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-inner">
                    {preview ? (
                      <img
                        src={preview}
                        alt="store"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                        Store photo preview
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Store Photo
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
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-medium disabled:opacity-70"
                  >
                    {loading ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
