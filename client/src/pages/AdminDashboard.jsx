import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import AssignModal from "../components/AssignModal";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  async function fetchAll() {
    setLoading(true);
    try {
      const [bRes, mRes] = await Promise.all([
        api.get("/admin/bookings"),
        api.get("/admin/mechanics"),
      ]);
      setBookings(bRes.data.bookings);
      setMechanics(mRes.data.mechanics);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchAll(); }, []);

  async function updateStatus(id, status) {
    try {
      const res = await api.put(`/admin/bookings/${id}/status`, { status });
      setBookings((prev) => prev.map(b => b._id === id ? res.data.booking : b));
    } catch (err) { console.error(err); }
  }

  async function assignMechanic(bookingId, mechanicId) {
    try {
      const res = await api.put(`/admin/bookings/${bookingId}/assign`, { mechanicId });
      setBookings(prev => prev.map(b => b._id === bookingId ? res.data.booking : b));
      setSelectedBooking(null);
    } catch (err) { console.error(err); }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-4">
        {bookings.map(b => (
          <div key={b._id} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{b.serviceType} — {new Date(b.date).toLocaleDateString()}</div>
              <div className="text-sm text-gray-500">User: {b.user?.name} ({b.user?.email})</div>
              <div className="text-sm">Car: {b.carDetails?.make} {b.carDetails?.model} ({b.carDetails?.regNo})</div>
              <div className="text-sm">Time: {b.timeSlot}</div>
              <div className="text-sm">Pickup: {b.pickupType}</div>
              <div className="text-sm">Mechanic: {b.mechanic ? b.mechanic.name : "Not assigned"}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <select
                className="p-2 border rounded"
                value={b.status}
                onChange={(e) => updateStatus(b._id, e.target.value)}
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>

              <button
                onClick={() => setSelectedBooking(b)}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Assign Mechanic
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBooking && (
        <AssignModal
          booking={selectedBooking}
          mechanics={mechanics}
          onClose={() => setSelectedBooking(null)}
          onAssign={(mechId) => assignMechanic(selectedBooking._id, mechId)}
        />
      )}
    </div>
  );
}
