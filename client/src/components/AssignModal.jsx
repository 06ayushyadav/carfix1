import React, { useState } from "react";

export default function AssignModal({ booking, mechanics, onClose, onAssign }) {
  const [selected, setSelected] = useState(mechanics[0]?._id || "");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h3 className="text-xl font-semibold mb-3">Assign Mechanic</h3>
        <div className="mb-4 text-sm">
          <div><strong>Booking:</strong> {booking.serviceType} on {new Date(booking.date).toLocaleDateString()}</div>
          <div className="mt-2"><strong>User:</strong> {booking.user?.name}</div>
        </div>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select Mechanic</option>
          {mechanics.map(m => (
            <option key={m._id} value={m._id}>
              {m.name} {m.available ? "" : "(busy)"}
            </option>
          ))}
        </select>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button
            onClick={() => { if (selected) onAssign(selected); }}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={!selected}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
