import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Calendar, Clock, User, Car, Wrench ,Phone,AtSign} from "lucide-react";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const mechanicId = localStorage.getItem("userId"); 
  
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

