import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Wrench, MapPin, IndianRupee } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function BookServices() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMechanics() {
      try {
        const res = await api.get("/mechanic/all");
        console.log(res.data.mechanics);
        setMechanics(res.data.mechanics || []);
      } catch (err) {
        console.error("Error fetching mechanics:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMechanics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading mechanics...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-12 mt-14">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Available Mechanics
      </h2>

      {mechanics.length === 0 ? (
        <p className="text-center text-gray-500">
          No mechanics available right now.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mechanics.map((m) => (
            <div
              key={m._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Photo */}
              <img
                src={m.storePhoto || "/mechanic-placeholder.jpg"}
                alt={m.name}
                className="w-full h-44 object-cover"
              />

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">{m.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Wrench size={16} className="mr-1" />
                  <span>{m.skills?.join(", ") || "General Services"}</span>
                </div>

                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{m.address || "Location unavailable"}</span>
                </div>

                <div className="flex items-center mt-3 font-semibold text-blue-600">
                  <IndianRupee size={16} className="mr-1" />
                  {m.chargePerHour || 0} /hr
                </div>

                {/* Button */}
                <Link to={`/booking-form/${m._id}`}>
                  <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
