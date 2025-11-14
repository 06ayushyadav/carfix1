// src/components/Emergency.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import api from "../../api/axios.js";

// Custom marker icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [35, 35],
});

const garageIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [35, 35],
});

// Map auto-centering component
const MapUpdater = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords.lat && coords.lng) map.setView([coords.lat, coords.lng], 14);
  }, [coords, map]);
  return null;
};

const Emergency = () => {
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [garages, setGarages] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Get user location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          fetchNearby(latitude, longitude);
        },
        (err) => console.warn("Location denied:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitGarage = async (e) => {
  e.preventDefault();
  if (!coords.lat || !coords.lng) return setMsg("Please allow location access.");

  try {
    setLoading(true);
    const payload = {
      ...form,
      lat: coords.lat,
      lng: coords.lng,
      services: form.services
        ? form.services.split(",").map((s) => s.trim()).filter(Boolean)
        : []
    };
    const response = await api.post("/garages", payload);
    setMsg("Garage registered successfully!");
    setForm({ name: "", address: "", phone: "", services: "" });
    fetchNearby(coords.lat, coords.lng);
  } catch (err) {
    setMsg(err.response?.data?.message || "Error while registering");
  } finally {
    setLoading(false);
  }
};


  const fetchNearby = async (lat, lng) => {
    try {
      const res = await api.get(
        `/garages/near?lat=${lat}&lng=${lng}&maxDistance=8000`
      );
      setGarages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        fetchNearby(latitude, longitude);
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        🚨 Emergency Garage Assistance
      </h1>

      <form
        onSubmit={submitGarage}
        className="bg-white p-4 shadow rounded space-y-3 mb-6"
      >
        <div>
          <label className="block">Garage Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Services Offered (comma separated)</label>
          <input
            name="services"
            value={form.services || ""}
            onChange={(e) => setForm({ ...form, services: e.target.value })}
            placeholder="e.g. Towing, Tyre Change, Battery Jumpstart"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Your Location</label>
          <div className="flex space-x-2">
            <input
              type="text"
              readOnly
              className="flex-1 p-2 border rounded"
              value={
                coords.lat
                  ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
                  : "Not detected"
              }
            />
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="px-3 py-2 border rounded bg-blue-100 hover:bg-blue-200"
            >
              Use My Location
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Register Garage"}
        </button>
        {msg && (
          <p className="text-lg mt-2 text-green-600 font-semibold">{msg}</p>
        )}
      </form>

      {/* MAP SECTION */}
      {coords.lat && coords.lng ? (
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={14}
          style={{ height: "450px", width: "100%", borderRadius: "10px" }}
        >
          <MapUpdater coords={coords} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {/* User marker */}
          <Marker position={[coords.lat, coords.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Garage markers */}
          {garages.map((g, i) => (
            <Marker
              key={g._id || i}
              position={[g.location.coordinates[1], g.location.coordinates[0]]}
              icon={garageIcon}
            >
              <Popup>
                <div className="font-semibold">{g.name}</div>
                <div>{g.address}</div>
                <div>📞 {g.phone}</div>
                <div>{(g.distance / 1000).toFixed(2)} km away</div>
                <div className="mt-1 flex flex-col space-y-1">
                  <a
                    href={`tel:${g.phone}`}
                    className="text-blue-600 underline text-sm"
                  >
                    Call Now
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/maps/search/?api=1&query=${g.location.coordinates[1]},${g.location.coordinates[0]}`}
                    className="text-green-600 underline text-sm"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p className="text-gray-600">Getting your location...</p>
      )}
    </div>
  );
};

export default Emergency;
