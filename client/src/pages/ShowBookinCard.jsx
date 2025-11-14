
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, MapPin, IndianRupee } from "lucide-react";
import api from "../api/axios.js";

const ShowBookingCard = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const res = await api.get("/book/all", { withCredentials: true });
        console.log(res.data);
        setMechanics(res.data.mechanics || []);
      } catch (err) {
        console.error("Error fetching mechanics:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading garages...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-12 mt-14">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Available Garages
      </h2>

      {mechanics.length === 0 ? (
        <p className="text-center text-gray-500">
          No garage booking cards available yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mechanics.map((m) => (
            <div
              key={m._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl border border-gray-100"
            >
              {/* Garage Owner Photo */}
              <img
                src={m.storePhoto || "/mechanic-placeholder.jpg"}
                alt={m.name}
                className="w-full h-48 object-cover"
              />

              {/* Info Section */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{m.name}</h3>

                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <Wrench size={16} className="mr-1 text-blue-500" />
                  <span>{m.skills?.join(", ") || "General Services"}</span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin size={16} className="mr-1 text-blue-500" />
                  <span>{m.address || "Location unavailable"}</span>
                </div>

                <div className="flex items-center mt-2 font-semibold text-blue-600">
                  <IndianRupee size={16} className="mr-1" />
                  {m.chargePerHour || 0} /hr
                </div>

                {/* Availability */}
                <div className="mt-3 mb-5">
                  {m.available ? (
                    <span className="text-green-600 font-medium">✅ Available</span>
                  ) : (
                    <span className="text-red-500 font-medium">❌ Unavailable</span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => navigate(`/gairage-details/${m._id}`)}
                    className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-all"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => navigate(`/booking-form/${m._id}`)}
                    className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowBookingCard;



// import React, { useEffect, useState } from "react";
// import { Wrench, MapPin, IndianRupee } from "lucide-react";
// import api from "../api/axios";

// const ShowBookingCard = () => {
//   const [mechanics, setMechanics] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMechanics = async () => {
//       try {
//         const res = await api.get("/book/all", {
//           withCredentials: true,
//         });
//         console.log(res.data)
//         setMechanics(res.data.mechanics || []);
//       } catch (err) {
//         console.error("Error fetching mechanics:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMechanics();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
//         Loading garages...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-12 mt-14">
//       <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
//         Available Garages
//       </h2>

//       {mechanics.length === 0 ? (
//         <p className="text-center text-gray-500">No garage booking cards available yet.</p>
//       ) : (
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {mechanics.map((m) => (
//             <div
//               key={m._id}
//               className="bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl border border-gray-100"
//             >
//               {/* Garage Owner Photo */}
//               <img
//                 src={m.storePhoto || "/mechanic-placeholder.jpg"}
//                 alt={m.name}
//                 className="w-full h-48 object-cover"
//               />

//               {/* Info Section */}
//               <div className="p-5">
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">{m.name}</h3>

//                 <div className="flex items-center text-gray-600 text-sm mb-1">
//                   <Wrench size={16} className="mr-1 text-blue-500" />
//                   <span>{m.skills?.join(", ") || "General Services"}</span>
//                 </div>

//                 <div className="flex items-center text-gray-600 text-sm mb-1">
//                   <MapPin size={16} className="mr-1 text-blue-500" />
//                   <span>{m.address || "Location unavailable"}</span>
//                 </div>

//                 <div className="flex items-center mt-2 font-semibold text-blue-600">
//                   <IndianRupee size={16} className="mr-1" />
//                   {m.chargePerHour || 0} /hr
//                 </div>

//                 {/* Availability */}
//                 <div className="mt-3">
//                   {m.available ? (
//                     <span className="text-green-600 font-medium">✅ Available</span>
//                   ) : (
//                     <span className="text-red-500 font-medium">❌ Unavailable</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowBookingCard;
