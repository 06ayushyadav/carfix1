import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Calendar, Clock, User, Car, Wrench ,Phone,AtSign} from "lucide-react";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧩 Mechanic ID from backend user context (assuming login system)
  const mechanicId = localStorage.getItem("userId"); // or from context
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/booking-form/mechanic/${mechanicId}`, {
          withCredentials: true,
        });
        console.log(res.data);
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [mechanicId]);

  if (loading)
    return <div className="flex justify-center mt-20 text-gray-500 text-lg">Loading bookings...</div>;

  if (!bookings.length)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        No bookings found for your garage yet.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
        My Garage Bookings
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="text-blue-500" size={18} /> {b.user?.name || "Unknown User"}
              </h3>
              
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  b.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : b.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {b.status}
              </span>
            </div>
            {/* <h5>Email:{b.user.email} </h5>
            <p>Phone :{b.userPhone} </p> */}
            <p className="flex items-center gap-2">
                <AtSign size={16} className="text-blue-500" /> {b.user.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500" /> {b.userPhone}
              </p>

            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <Car size={16} className="text-blue-500" />
                {b.carDetails.make} {b.carDetails.model} ({b.carDetails.year})
              </p>
              <p className="flex items-center gap-2">
                <Wrench size={16} className="text-blue-500" /> {b.serviceType}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />{" "}
                {new Date(b.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-blue-500" /> {b.timeSlot}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Pickup:</span> {b.pickupType}
              </p>
            </div>

            <div className="mt-4 border-t pt-3 text-sm text-gray-500">
              Created on: {new Date(b.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;



// import React, { useEffect, useState } from "react";
// import api from "../api/axios.js";
// import { CalendarDays, Clock, Car, MapPin } from "lucide-react";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBookings() {
//       try {
//         const res = await api.get("/bookings/my");
//         setBookings(res.data || []);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBookings();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto mt-8 px-4 md:px-0">
//       <h2 className="text-3xl font-bold mb-6 text-blue-600 flex items-center gap-2">
//         <CalendarDays className="text-blue-500" size={28} />
//         My Bookings
//       </h2>

//       {loading ? (
//         <div className="text-center text-gray-500 py-10 animate-pulse">
//           Loading your bookings...
//         </div>
//       ) : bookings.length === 0 ? (
//         <div className="text-center text-gray-400 py-16 bg-white shadow rounded-2xl">
//           <p className="text-lg font-medium">No bookings found</p>
//           <p className="text-sm">You haven’t made any service bookings yet.</p>
//         </div>
//       ) : (
//         <div className="grid gap-5">
//           {bookings.map((b) => (
//             <div
//               key={b._id}
//               className="bg-white border border-gray-200 shadow-md rounded-2xl p-5 hover:shadow-lg transition-all duration-200"
//             >
//               {/* Top Row */}
//               <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-100 pb-3 mb-3">
//                 <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
//                   <Car size={20} />
//                   {b.serviceType}
//                 </div>
//                 <span
//                   className={`px-3 py-1 text-sm font-medium rounded-full ${
//                     b.status === "Pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : b.status === "Confirmed"
//                       ? "bg-blue-100 text-blue-700"
//                       : b.status === "Completed"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {b.status}
//                 </span>
//               </div>

//               {/* Details Section */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Clock size={16} className="text-blue-400" />
//                   <span>
//                     {new Date(b.date).toLocaleDateString()} • {b.timeSlot}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Car size={16} className="text-blue-400" />
//                   <span>
//                     {b.carDetails.make} {b.carDetails.model} ({b.carDetails.year})
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <MapPin size={16} className="text-blue-400" />
//                   <span>Pickup: {b.pickupType}</span>
//                 </div>
//               </div>

//               {/* Footer / Extra */}
//               {b.notes && (
//                 <div className="mt-3 text-gray-500 text-sm italic border-t border-gray-100 pt-2">
//                   “{b.notes}”
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// // import React, { useEffect, useState } from "react";
// // import api from "../api/axios.js";

// // export default function MyBookings() {
// //   const [bookings, setBookings] = useState([]);

// //   useEffect(() => {
// //     async function fetchBookings() {
// //       const res = await api.get("/bookings/my");
// //       setBookings(res.data);
// //     }
// //     fetchBookings();
// //   }, []);

// //   return (
// //     <div className="max-w-4xl mx-auto mt-10">
// //       <h2 className="text-3xl font-bold mb-4 text-blue-600">My Bookings</h2>
// //       <div className="grid gap-4">
// //         {bookings.map((b) => (
// //           <div
// //             key={b._id}
// //             className="p-4 bg-white shadow rounded-xl flex justify-between"
// //           >
// //             <div>
// //               <p className="font-semibold">{b.serviceType}</p>
// //               <p className="text-gray-500">
// //                 {new Date(b.date).toLocaleDateString()} ({b.timeSlot})
// //               </p>
// //               <p className="text-sm">
// //                 Car: {b.carDetails.make} {b.carDetails.model} ({b.carDetails.year})
// //               </p>
// //               <p className="text-sm">Pickup Type: {b.pickupType}</p>
// //             </div>
// //             <span
// //               className={`px-3 py-1 rounded-lg text-white ${
// //                 b.status === "Pending"
// //                   ? "bg-yellow-500"
// //                   : b.status === "Confirmed"
// //                   ? "bg-blue-600"
// //                   : b.status === "Completed"
// //                   ? "bg-green-600"
// //                   : "bg-red-500"
// //               }`}
// //             >
// //               {b.status}
// //             </span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import api from "../api/axios.js";

// export default function GarageDashboard({ garageId }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
  
//   console.log(garageId)
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/bookings/garage/${garageId}`);
//       setBookings(res.data);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     await api.patch(`/bookings/${id}`, { status });
//     fetchBookings();
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
//       <h2 className="text-2xl font-bold mb-4 text-blue-600">
//         Garage Dashboard — Bookings
//       </h2>
//       {loading && <p>Loading bookings...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Customer</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Car</th>
//               <th className="border p-2">Service</th>
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((b) => (
//               <tr key={b._id} className="border-t">
//                 <td className="p-2">{b.userName}</td>
//                 <td className="p-2">{b.userPhone}</td>
//                 <td className="p-2">
//                   {b.carDetails.make} {b.carDetails.model} ({b.carDetails.regNo})
//                 </td>
//                 <td className="p-2">{b.serviceType}</td>
//                 <td className="p-2">{b.date}</td>
//                 <td className="p-2 font-semibold">{b.status}</td>
//                 <td className="p-2 space-x-2">
//                   {["Confirmed", "Completed", "Cancelled"].map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => updateStatus(b._id, s)}
//                       className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // ✅ for getting garageId from URL
// import api from "../api/axios.js";

// export default function MyBooking() {
//   const { garageId } = useParams(); // ✅ Get garageId from route params
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Fetch bookings for that specific garage
//   const fetchBookings = async () => {
//     if (!garageId) return; // Prevent call if ID not yet available
//     try {
//       setLoading(true);
//       const res = await api.get(`/bookings/garage/${garageId}`);
//       console.log(res.data)
//       setBookings(res.data);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Update booking status (Confirmed, Completed, Cancelled)
//   const updateStatus = async (id, status) => {
//     try {
//       await api.patch(`/bookings/${id}`, { status });
//       fetchBookings(); // Refresh bookings list
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [garageId]); 

//   return (
//     <div className="max-w-5xl min-h-screen  mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
    

//       {/* Loading / Error states */}
//       {loading && <p className="text-gray-500">Loading bookings...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* If no bookings */}
//       {!loading && bookings.length === 0 && (
//         <p className="text-gray-500 text-center py-6">No bookings found yet.</p>
//       )}

//       {/* Bookings Table */}
//       {bookings.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Customer</th>
//                 <th className="border p-2">Phone</th>
//                 <th className="border p-2">Car</th>
//                 <th className="border p-2">Service</th>
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((b) => (
//                 <tr key={b._id} className="border-t hover:bg-gray-50">
//                   <td className="p-2">{b.userName}</td>
//                   <td className="p-2">{b.userPhone}</td>
//                   <td className="p-2">
//                     {b.carDetails.make} {b.carDetails.model} ({b.carDetails.regNo})
//                   </td>
//                   <td className="p-2">{b.serviceType}</td>
//                   <td className="p-2">
//                     {new Date(b.date).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 font-semibold text-blue-600">{b.status}</td>
//                   <td className="p-2 space-x-2">
//                     {["Confirmed", "Completed", "Cancelled"].map((s) => (
//                       <button
//                         key={s}
//                         onClick={() => updateStatus(b._id, s)}
//                         className="px-2 py-1 border rounded text-sm hover:bg-blue-50"
//                       >
//                         {s}
//                       </button>
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
