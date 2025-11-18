import React, { useState } from "react";
import { Wrench, MapPin, IndianRupee, Upload, CheckCircle } from "lucide-react";
import api from "../../api/axios.js";

const CreateBookingCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skills: "",
    chargePerHour: "",
    address: "",
    storePhoto: null, 
    available: true,
  });

  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, storePhoto: file });

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const mechanicData = new FormData();
    mechanicData.append("name", formData.name);
    mechanicData.append("phone", formData.phone);
    mechanicData.append("skills", formData.skills);
    mechanicData.append("chargePerHour", formData.chargePerHour);
    mechanicData.append("address", formData.address);
    mechanicData.append("available", formData.available);
    if (formData.storePhoto) mechanicData.append("storePhoto", formData.storePhoto);

    const res = await api.post(
      "/book/create", 
      mechanicData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, 
      }
    );

    console.log("Mechanic created:", res.data);
    setSuccess(true);
    alert("Mechanic card created successfully!");
    setFormData({
      name: "",
      phone: "",
      skills: "",
      chargePerHour: "",
      address: "",
      storePhoto: null,
      available: true,
    });
  } catch (err) {
    console.error("Error creating mechanic:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to create mechanic");
  }
};

  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8 flex justify-center items-center gap-2">
          <Wrench className="text-blue-600" />
          Create Garage Booking Card
        </h2>

        {success && (
          <div className="flex items-center justify-center mb-6 text-green-600 font-medium gap-2">
            <CheckCircle size={20} />
            Booking card created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mechanic / Garage Owner Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Engine, Brakes, AC Repair"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Charge Per Hour */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <IndianRupee size={18} className="mr-1" /> Charge Per Hour
            </label>
            <input
              type="number"
              name="chargePerHour"
              value={formData.chargePerHour}
              onChange={handleChange}
              placeholder="Enter hourly charge"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <MapPin size={18} className="mr-1" /> Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter garage address"
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <Upload size={18} className="mr-1 text-blue-500" /> Upload Garage / Owner Photo
            </label>
            <input
              type="file"
              name="storePhoto"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-600 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md mx-auto"
              />
            )}
          </div>

          {/* Available Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="mr-2 w-4 h-4 accent-blue-600"
            />
            <label className="text-gray-700 font-medium">Currently Available</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Create Booking Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingCard;
