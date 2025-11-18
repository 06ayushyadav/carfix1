
import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import api from "../../api/axios.js";

const makeIcon = (url, size = [36, 36]) =>
  new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
    popupAnchor: [0, -size[1] / 2],
  });

const userIcon = makeIcon("https://cdn-icons-png.flaticon.com/512/149/149060.png");
const garageIcon = makeIcon("https://cdn-icons-png.flaticon.com/512/2967/2967350.png");

const MapCenter = ({ center, zoom = 13 }) => {
  const map = useMap();
  useEffect(() => {
    if (center?.lat && center?.lng) {
      map.setView([center.lat, center.lng], zoom, { animate: true });
    }
  }, [center, map, zoom]);
  return null;
};

const EmergencyServices = () => {
  const [garages, setGarages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userCoords, setUserCoords] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedGarage, setSelectedGarage] = useState(null);

  const defaultCenter = { lat: 20.5937, lng: 78.9629 };

  useEffect(() => {
    fetchAllGarages();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => {},
        { enableHighAccuracy: true, maximumAge: 60000 }
      );
    }
  }, []);

  const fetchAllGarages = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/garages");
      setGarages(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load garages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(garages);
      return;
    }
    const q = search.toLowerCase();
    const list = garages.filter((g) =>
      [g.name, g.address, g.phone].some((f) => f?.toLowerCase().includes(q))
    );
    setFiltered(list);
  }, [search, garages]);

  const mapCenter = useMemo(() => {
    if (selectedGarage?.location?.coordinates) {
      const [lng, lat] = selectedGarage.location.coordinates;
      return { lat, lng };
    }
    return userCoords || defaultCenter;
  }, [selectedGarage, userCoords]);

  const onSelectGarage = (g) => {
    setSelectedGarage(g);
    const mapEl = document.getElementById("emergency-map");
    if (mapEl) mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative z-0 pt-24 pb-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
          🚨 Emergency Garage Finder
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Find the nearest garages to your current location in real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by name, address or phone..."
                className="flex-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedGarage(null);
                  setFiltered(garages);
                }}
                className="px-3 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                Clear
              </button>
              <button
                onClick={fetchAllGarages}
                className="px-3 py-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Refresh
              </button>
            </div>

            {/* Map */}
            <div
              id="emergency-map"
              className="rounded-xl overflow-hidden shadow-lg border"
              style={{ height: "520px" }}
            >
              <MapContainer
                center={[mapCenter.lat, mapCenter.lng]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <MapCenter center={mapCenter} zoom={13} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />

                {/* user marker */}
                {userCoords && (
                  <Marker position={[userCoords.lat, userCoords.lng]} icon={userIcon}>
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {/* garage markers */}
                {filtered.map((g) => {
                  const coords = g.location?.coordinates;
                  if (!coords || coords.length < 2) return null;
                  const [lng, lat] = coords;
                  return (
                    <Marker key={g._id || `${lat}-${lng}`} position={[lat, lng]} icon={garageIcon}>
                      <Popup>
                        <div className="text-sm">
                          <div className="font-semibold">{g.name}</div>
                          <div>{g.address}</div>
                          <div className="mt-1">
                            📞 <a href={`tel:${g.phone}`}>{g.phone}</a>
                          </div>
                          {g.services?.length > 0 && (
                            <div className="mt-1">
                              <strong>Services:</strong> {g.services.join(", ")}
                            </div>
                          )}
                          <div className="mt-2">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Open in Google Maps
                            </a>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>

          {/* Garage List */}
          <div className="space-y-3">
            <div className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Showing</div>
                <div className="font-semibold text-lg">{filtered.length} garages</div>
              </div>
              <button
                onClick={() => (userCoords ? setSelectedGarage(null) : alert("User location not available."))}
                className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-100"
              >
                Center on Me
              </button>
            </div>

            <div className="overflow-y-auto bg-white rounded-lg border shadow-sm" style={{ maxHeight: 400 }}>
              {loading && <div className="p-4 text-center">Loading garages...</div>}
              {error && <div className="p-4 text-red-600">{error}</div>}
              {!loading && filtered.length === 0 && <div className="p-4 text-center">No garages found.</div>}

              {filtered.map((g) => {
                const coords = g.location?.coordinates || [];
                const [lng, lat] = coords;
                return (
                  <div
                    key={g._id}
                    onClick={() => onSelectGarage(g)}
                    className={`p-4 border-b cursor-pointer  transition ${
                      selectedGarage?._id === g._id ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold">{g.name}</div>
                    <div className="text-sm text-gray-600">{g.address}</div>
                    <div className="text-sm mt-1">
                      📞 <a href={`tel:${g.phone}`}>{g.phone}</a>
                    </div>
                    {g.services?.length > 0 && (
                      <div className="text-sm mt-1 text-gray-600">
                        🧰 {g.services.join(", ")}
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <a
                        href={`tel:${g.phone}`}
                        className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-100"
                      >
                        Call
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm px-3 py-1 border rounded-lg z-50 hover:bg-gray-100"
                      >
                        Map
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
