import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { CalendarDays, Clock, Car, Wrench, MapPin } from "lucide-react";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking-form/my", { withCredentials: true });
        console.log(res.data)
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center mt-16 text-gray-500">Loading your bookings...</div>;
  }

  if (bookings.length === 0) {
    return <div className="text-center mt-16 text-gray-600 text-lg">No bookings found yet.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">My Bookings</h2>

      <div className="max-w-5xl mx-auto grid gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-2xl transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Wrench className="text-blue-600" /> {b.serviceType}
              </h3>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  b.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : b.status === "Completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <p className="flex items-center gap-2">
                <Car size={18} className="text-blue-500" />
                <span>
                  {b.carDetails.make} {b.carDetails.model} ({b.carDetails.year})
                </span>
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays size={18} className="text-blue-500" />
                {new Date(b.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} className="text-blue-500" />
                {b.timeSlot}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-500" />
                {b.pickupType}
              </p>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Mechanic:</span>{" "}
                {b.mechanic?.name || "Not assigned yet"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
