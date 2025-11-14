
import React, { useState, useContext } from "react";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await api.post("/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      const user = res.data?.user;
      if (!user || !user._id) throw new Error("Invalid response from server");

      setUser(user);

      if (user.role === "mechanic")
        navigate(`/login`);
      else if (user.role === "user") navigate(`/login`);
      else if (user.role === "admin") navigate(`/admin`);
      else navigate(`/`);
    } catch (error) {
      console.error(error);
      setErr(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col md:flex-row">
      {/* ---------- Left Section ---------- */}
      <div className="p-44 mt-20 md:w-1/2 rounded-t-full rounded-b-full bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-400 flex flex-col justify-center text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">Join the CarFix Family</h1>
          <p className="text-lg mb-6 leading-relaxed text-blue-100">
            Whether you’re a car owner or a mechanic,  
            AutoFix helps you connect, book services, and find genuine parts with ease.  
            <br />
            <span className="font-semibold">Register now and get started!</span>
          </p>
        </div>
      </div>

      {/* ---------- Right Section ---------- */}
      <div className="md:w-1/2 flex items-center justify-center p-8 mt-20">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Create an Account
          </h2>

          {err && (
            <div className="text-red-600 text-sm mb-3 text-center bg-red-50 p-2 rounded-lg">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Select Role
              </label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="user">User (Car Owner)</option>
                <option value="mechanic">Mechanic (Garage Owner)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
