import React, { useState, useContext } from "react";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await api.post("/auth/login", form, { withCredentials: true });
      const user = res.data?.user;

      if (!user || !user._id) throw new Error("Invalid response from server");

      // ✅ Save user in global context
      setUser(user);

      // ✅ Store important data in localStorage
      localStorage.setItem("userId", user._id);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      // ✅ Navigate based on role
      if (user.role === "mechanic") navigate(`/mechanic-dashboard/${user._id}`);
      else if (user.role === "user") navigate(`/dashboard/${user._id}`);
      else if (user.role === "admin") navigate(`/admin`);
      else navigate(`/`);
    } catch (error) {
      console.error(error);
      setErr(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col md:flex-row">
      {/* ---------- Left Section ---------- */}
      <div className="p-44 mt-20 md:w-1/2 rounded-t-full rounded-b-full bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-400 flex flex-col justify-center text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome Back to CarFix</h1>
          <p className="text-lg mb-6 leading-relaxed text-blue-100">
            Your trusted partner for car repairs, emergency support, and genuine
            auto parts — all in one place.
            <br />
            <span className="font-semibold">Login to continue your journey!</span>
          </p>
        </div>
      </div>

      {/* ---------- Right Section ---------- */}
      <div className="md:w-1/2 flex items-center justify-center p-8 mt-10">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Login to Your Account
          </h2>

          {err && (
            <div className="text-red-600 text-sm mb-3 text-center bg-red-50 p-2 rounded-lg">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}




// import React, { useState, useContext } from "react";
// import api from "../api/axios.js";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErr("");

//     try {
//       const res = await api.post("/auth/login", form, { withCredentials: true });
//       const user = res.data?.user;

//       if (!user || !user._id) throw new Error("Invalid response from server");
//       setUser(user);

//       if (user.role === "mechanic") navigate(`/mechanic-dashboard/${user._id}`);
//       else if (user.role === "user") navigate(`/dashboard/${user._id}`);
//       else if (user.role === "admin") navigate(`/admin`);
//       else navigate(`/`);
//     } catch (error) {
//       console.error(error);
//       setErr(error.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center flex-col md:flex-row  ">
//       {/* ---------- Left Section ---------- */}
//       <div className=" p-44 mt-20 md:w-1/2 rounded-t-full rounded-b-full bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-400 flex flex-col justify-center text-white ">
//         <div className="max-w-md mx-auto">
//           <h1 className="text-4xl font-bold mb-4">Welcome Back to AutoFix</h1>
//           <p className="text-lg mb-6 leading-relaxed text-blue-100">
//             Your trusted partner for car repairs, emergency support, and genuine
//             auto parts — all in one place.  
//             <br />
//             <span className="font-semibold">Login to continue your journey!</span>
//           </p>
//         </div>
//       </div>


//       <div className="md:w-1/2 flex items-center justify-center p-8 mt-10">
//         <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
//           <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
//             Login to Your Account
//           </h2>

//           {err && (
//             <div className="text-red-600 text-sm mb-3 text-center bg-red-50 p-2 rounded-lg">
//               {err}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="text-sm font-medium text-gray-700 mb-1 block">
//                 Email Address
//               </label>
//               <input
//                 required
//                 type="email"
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-gray-700 mb-1 block">
//                 Password
//               </label>
//               <input
//                 required
//                 type="password"
//                 placeholder="Enter your password"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="text-sm text-gray-600 mt-6 text-center">
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="text-blue-600 hover:underline font-medium"
//             >
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
