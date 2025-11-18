
import React, { useEffect, useState, useContext } from "react";
import api from "../../api/axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import UserSidebar from "./UserSidebar.jsx";
import MyBooking from "../../components/user/MyBooking.jsx";
import { Mail, MapPin, Phone } from "lucide-react";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await api.get("/auth/me", { withCredentials: true });
      console.log(res.data)
      if (res.data.user) {
        const u = res.data.user;
        setForm({
          name: u.name ?? "",
          email: u.email ?? "",
          phone: u.phone ?? "",
          address: u.address ?? "",
        });
      }
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await api.put("/auth/update-user", form, { withCredentials: true });

      const updatedUser = res.data.user;
      setForm({
        name: updatedUser?.name ?? "",
        email: updatedUser?.email ?? "",
        phone: updatedUser?.phone ?? "",
        address: updatedUser?.address ?? "",
      });

      await fetchProfile();

      setMsg("Profile saved successfully ✅");
    } catch (err) {
      console.error("Error updating profile:", err.response?.data);
      setMsg("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row mt-16">
      <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6 md:p-10 flex flex-col items-center">
        {activeTab === "profile" && (
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
              My Profile
            </h2>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {form.name || "Unnamed User"}
              </h3>
              <div className="text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />{" "}
                  {form.email || "No email"}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-500" />{" "}
                  {form.phone || "No phone"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />{" "}
                  {form.address || "No address"}
                </p>
              </div>
            </div>

            {msg && (
              <div
                className={`mb-4 text-center p-2 rounded-lg ${
                  msg.startsWith("Error")
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name || ""}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email || ""}
                    disabled
                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={form.phone || ""}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Address
                  </label>
                  <textarea
                    rows="3"
                    value={form.address || ""}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "bookings" && <MyBooking />}
      </div>
    </div>
  );
}
