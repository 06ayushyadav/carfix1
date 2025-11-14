// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../api/axios.js";
// import { Wrench, MapPin, Car } from "lucide-react";

// const BookingForm = () => {
//   const { id } = useParams(); // mechanic id
//   const [mechanic, setMechanic] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     carMake: "",
//     carModel: "",
//     carYear: "",
//     carRegNo: "",
//     serviceType: "",
//     date: "",
//     timeSlot: "",
//     pickupType: "In-Garage",
//   });

//   // ✅ Fetch Mechanic Details
//   useEffect(() => {
//     const fetchMechanic = async () => {
//       try {
//         const res = await api.get(`/book/${id}`);
//         setMechanic(res.data.mechanic);
//       } catch (err) {
//         console.error("Error fetching mechanic:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMechanic();
//   }, [id]);

//   // ✅ Handle input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // ✅ Submit Booking
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const bookingData = {
//       mechanic: id,
//       carDetails: {
//         make: formData.carMake,
//         model: formData.carModel,
//         year: Number(formData.carYear),
//         regNo: formData.carRegNo,
//       },
//       serviceType: formData.serviceType,
//       date: formData.date,
//       timeSlot: formData.timeSlot,
//       pickupType: formData.pickupType,
//     };

//     console.log("📦 Booking Data:", bookingData);

//     try {
//       const res = await api.post("/booking-form/create", bookingData, {
//         withCredentials: true,
//       });
//       alert("✅ Booking created successfully!");
//       console.log("Booking created:", res.data);

//       // Reset
//       setFormData({
//         carMake: "",
//         carModel: "",
//         carYear: "",
//         carRegNo: "",
//         serviceType: "",
//         date: "",
//         timeSlot: "",
//         pickupType: "In-Garage",
//       });
//     } catch (err) {
//       console.error("❌ Error creating booking:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to create booking");
//     }
//   };

//   if (loading)
//     return <div className="text-center mt-16 text-gray-500">Loading mechanic details...</div>;

//   if (!mechanic)
//     return <div className="text-center mt-16 text-gray-500">Mechanic not found</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
//             <Wrench className="text-blue-500" /> Book Your Service
//           </h2>
//           <div className="text-right">
//             <p className="text-sm text-gray-500">Mechanic</p>
//             <h3 className="text-lg font-semibold text-gray-800">{mechanic.name}</h3>
//             <p className="text-sm text-gray-600 flex items-center gap-1">
//               <MapPin size={14} /> {mechanic.address || "Location unavailable"}
//             </p>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Car Details */}
//           <div>
//             <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 mb-3">
//               <Car size={18} /> Car Details
//             </h3>
//             <div className="grid sm:grid-cols-2 gap-6">
//               <input
//                 type="text"
//                 name="carMake"
//                 value={formData.carMake}
//                 onChange={handleChange}
//                 placeholder="Make (e.g., Honda)"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 name="carModel"
//                 value={formData.carModel}
//                 onChange={handleChange}
//                 placeholder="Model (e.g., City)"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="number"
//                 name="carYear"
//                 value={formData.carYear}
//                 onChange={handleChange}
//                 placeholder="Year (e.g., 2022)"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 name="carRegNo"
//                 value={formData.carRegNo}
//                 onChange={handleChange}
//                 placeholder="Registration No."
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           </div>

//           {/* Service Info */}
//           <div className="grid sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Service Type</label>
//               <select
//                 name="serviceType"
//                 value={formData.serviceType}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="">Select Service</option>
//                 <option value="Repair">Repair</option>
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="Tire Change">Tire Change</option>
//                 <option value="Diagnostics">Diagnostics</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Pickup Type</label>
//               <select
//                 name="pickupType"
//                 value={formData.pickupType}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="In-Garage">In-Garage</option>
//                 <option value="Pickup">Pickup</option>
//                 <option value="Drop">Drop</option>
//               </select>
//             </div>
//           </div>

//           {/* Date & Time */}
//           <div className="grid sm:grid-cols-2 gap-6 mt-4">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Time Slot</label>
//               <input
//                 type="time"
//                 name="timeSlot"
//                 value={formData.timeSlot}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           </div>

//           {/* Submit */}
//           <div className="pt-6">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
//             >
//               Confirm Booking
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;



// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import api from "../../api/axios.js";
// // import { Wrench, MapPin, Car } from "lucide-react";

// // const BookingForm = () => {
// //   const { id } = useParams(); // mechanic id (garageId)
// //   const [mechanic, setMechanic] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const [formData, setFormData] = useState({
// //     carMake: "",
// //     carModel: "",
// //     carYear: "",
// //     carRegNo: "",
// //     serviceType: "",
// //     date: "",
// //     timeSlot: "",
// //     pickupType: "In-Garage",
// //   });

// //   // Fetch mechanic details
// //   useEffect(() => {
// //     const fetchMechanic = async () => {
// //       try {
// //         const res = await api.get(`/book/${id}`);
// //         setMechanic(res.data.mechanic);
// //       } catch (err) {
// //         console.error("Error fetching mechanic:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchMechanic();
// //   }, [id]);

// //   // Handle input
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   // Submit booking
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const bookingData = {
// //       mechanic: id, 
// //       carDetails: {
// //         make: formData.carMake,
// //         model: formData.carModel,
// //         year: Number(formData.carYear),
// //         regNo: formData.carRegNo,
// //       },
// //       serviceType: formData.serviceType,
// //       date: formData.date,
// //       timeSlot: formData.timeSlot,
// //       pickupType: formData.pickupType,
// //     };

// //     console.log("Booking data:", bookingData);

// //     try {
// //       const res = await api.post("/booking-form/create", bookingData, {
// //         withCredentials: true,
// //       });
// //       alert("✅ Booking created successfully!");
// //       console.log("Booking created:", res.data);

// //       // Reset form
// //       setFormData({
// //         carMake: "",
// //         carModel: "",
// //         carYear: "",
// //         carRegNo: "",
// //         serviceType: "",
// //         date: "",
// //         timeSlot: "",
// //         pickupType: "In-Garage",
// //       });
// //     } catch (err) {
// //       console.error("Error creating booking:", err.response?.data || err.message);
// //       alert(err.response?.data?.message || "Failed to create booking");
// //     }
// //   };

// //   if (loading)
// //     return <div className="text-center mt-16 text-gray-500">Loading mechanic details...</div>;

// //   if (!mechanic)
// //     return <div className="text-center mt-16 text-gray-500">Mechanic not found</div>;

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12 px-4">
// //       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
// //         {/* Header */}
// //         <div className="flex items-center justify-between mb-8">
// //           <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
// //             <Wrench className="text-blue-500" /> Book Your Service
// //           </h2>
// //           <div className="text-right">
// //             <p className="text-sm text-gray-500">Mechanic</p>
// //             <h3 className="text-lg font-semibold text-gray-800">{mechanic.name}</h3>
// //             <p className="text-sm text-gray-600 flex items-center gap-1">
// //               <MapPin size={14} /> {mechanic.address || "Location unavailable"}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Booking Form */}
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Car Details */}
// //           <div>
// //             <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 mb-3">
// //               <Car size={18} /> Car Details
// //             </h3>
// //             <div className="grid sm:grid-cols-2 gap-6">
// //               <input
// //                 type="text"
// //                 name="carMake"
// //                 value={formData.carMake}
// //                 onChange={handleChange}
// //                 placeholder="Make (e.g., Honda)"
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               />
// //               <input
// //                 type="text"
// //                 name="carModel"
// //                 value={formData.carModel}
// //                 onChange={handleChange}
// //                 placeholder="Model (e.g., City)"
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               />
// //               <input
// //                 type="number"
// //                 name="carYear"
// //                 value={formData.carYear}
// //                 onChange={handleChange}
// //                 placeholder="Year (e.g., 2022)"
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               />
// //               <input
// //                 type="text"
// //                 name="carRegNo"
// //                 value={formData.carRegNo}
// //                 onChange={handleChange}
// //                 placeholder="Registration No."
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               />
// //             </div>
// //           </div>

// //           {/* Service Info */}
// //           <div className="grid sm:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Service Type</label>
// //               <select
// //                 name="serviceType"
// //                 value={formData.serviceType}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               >
// //                 <option value="">Select Service</option>
// //                 <option value="Repair">Repair</option>
// //                 <option value="Maintenance">Maintenance</option>
// //                 <option value="Tire Change">Tire Change</option>
// //                 <option value="Diagnostics">Diagnostics</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Pickup Type</label>
// //               <select
// //                 name="pickupType"
// //                 value={formData.pickupType}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               >
// //                 <option value="In-Garage">In-Garage</option>
// //                 <option value="Pickup">Pickup</option>
// //                 <option value="Drop">Drop</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* Date & Time */}
// //           <div className="grid sm:grid-cols-2 gap-6 mt-4">
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Date</label>
// //               <input
// //                 type="date"
// //                 name="date"
// //                 value={formData.date}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Time Slot</label>
// //               <input
// //                 type="time"
// //                 name="timeSlot"
// //                 value={formData.timeSlot}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
// //               />
// //             </div>
// //           </div>

// //           {/* Submit */}
// //           <div className="pt-6">
// //             <button
// //               type="submit"
// //               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
// //             >
// //               Confirm Booking
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingForm;



// // import React, { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import api from "../../api/axios.js";

// // export default function BookingForm() {
// //   const { garageId } = useParams(); 
// //   const navigate = useNavigate();
  
// //   const [form, setForm] = useState({
// //     userName: "",
// //     userPhone: "",
// //     userAddress: "",
// //     carMake: "",
// //     carModel: "",
// //     carYear: "",
// //     regNo: "",
// //     serviceType: "",
// //     date: "",
// //     timeSlot: "",
// //     pickupType: "In-Garage",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [msg, setMsg] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setLoading(true);
// //       await api.post("/bookings", {
// //         garageId, 
// //         userName: form.userName,
// //         userPhone: form.userPhone,
// //         userAddress: form.userAddress,
// //         carDetails: {
// //           make: form.carMake,
// //           model: form.carModel,
// //           year: form.carYear,
// //           regNo: form.regNo,
// //         },
// //         serviceType: form.serviceType,
// //         date: form.date,
// //         timeSlot: form.timeSlot,
// //         pickupType: form.pickupType,
// //       });
// //       setMsg("✅ Booking successful!");
// //       setTimeout(() => navigate("/"), 1500);
// //     } catch (err) {
// //       setMsg((err.response?.data?.message || "Failed to book"));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10">
// //       <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
// //         Book Service with Garage
// //       </h2>
// //       {msg && (
// //         <div
// //           className={`text-center mb-4 ${
// //             msg.startsWith("✅") ? "text-green-600" : "text-red-600"
// //           }`}
// //         >
// //           {msg}
// //         </div>
// //       )}
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* User info */}
// //         <input
// //           type="text"
// //           placeholder="Your Name"
// //           value={form.userName}
// //           onChange={(e) => setForm({ ...form, userName: e.target.value })}
// //           className="w-full p-2 border rounded"
// //           required
// //         />
// //         <input
// //           type="tel"
// //           placeholder="Phone Number"
// //           value={form.userPhone}
// //           onChange={(e) => setForm({ ...form, userPhone: e.target.value })}
// //           className="w-full p-2 border rounded"
// //           required
// //         />
// //         <input
// //           type="text"
// //           placeholder="Address"
// //           value={form.userAddress}
// //           onChange={(e) => setForm({ ...form, userAddress: e.target.value })}
// //           className="w-full p-2 border rounded"
// //           required
// //         />

// //         {/* Car info */}
// //         <div className="grid grid-cols-2 gap-3">
// //           <input
// //             type="text"
// //             placeholder="Car Make"
// //             value={form.carMake}
// //             onChange={(e) => setForm({ ...form, carMake: e.target.value })}
// //             className="p-2 border rounded"
// //             required
// //           />
// //           <input
// //             type="text"
// //             placeholder="Car Model"
// //             value={form.carModel}
// //             onChange={(e) => setForm({ ...form, carModel: e.target.value })}
// //             className="p-2 border rounded"
// //             required
// //           />
// //           <input
// //             type="number"
// //             placeholder="Year"
// //             value={form.carYear}
// //             onChange={(e) => setForm({ ...form, carYear: e.target.value })}
// //             className="p-2 border rounded"
// //             required
// //           />
// //           <input
// //             type="text"
// //             placeholder="Reg No."
// //             value={form.regNo}
// //             onChange={(e) => setForm({ ...form, regNo: e.target.value })}
// //             className="p-2 border rounded"
// //             required
// //           />
// //         </div>

// //         <select
// //           value={form.serviceType}
// //           onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
// //           className="w-full p-2 border rounded"
// //           required
// //         >
// //           <option value="">Select Service Type</option>
// //           <option value="Repair">Repair</option>
// //           <option value="Maintenance">Maintenance</option>
// //           <option value="Tire Change">Tire Change</option>
// //           <option value="Diagnostics">Diagnostics</option>
// //         </select>

// //         <div className="flex gap-3">
// //           <input
// //             type="date"
// //             value={form.date}
// //             onChange={(e) => setForm({ ...form, date: e.target.value })}
// //             className="p-2 border rounded w-1/2"
// //             required
// //             min={new Date().toISOString().split("T")[0]}
// //           />
// //           <input
// //             type="time"
// //             value={form.timeSlot}
// //             onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
// //             className="p-2 border rounded w-1/2"
// //             required
// //           />
// //         </div>

// //         <div className="flex gap-3 justify-center">
// //           {["Pickup", "Drop", "In-Garage"].map((type) => (
// //             <label
// //               key={type}
// //               className={`px-4 py-2 rounded-xl cursor-pointer border ${
// //                 form.pickupType === type
// //                   ? "bg-blue-500 text-white"
// //                   : "bg-gray-100 hover:bg-gray-200"
// //               }`}
// //             >
// //               <input
// //                 type="radio"
// //                 name="pickupType"
// //                 value={type}
// //                 checked={form.pickupType === type}
// //                 onChange={(e) =>
// //                   setForm({ ...form, pickupType: e.target.value })
// //                 }
// //                 className="hidden"
// //               />
// //               {type}
// //             </label>
// //           ))}
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
// //         >
// //           {loading ? "Booking..." : "Book Now"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
