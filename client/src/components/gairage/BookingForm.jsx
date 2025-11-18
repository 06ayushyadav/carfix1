import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.js";
import { Car, MapPin, Wrench } from "lucide-react";

const BookingForm = () => {
  const { id } = useParams(); // This is garageId
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userAddress: "",
    carMake: "",
    carModel: "",
    carYear: "",
    carRegNo: "",
    serviceType: "",
    date: "",
    timeSlot: "",
    pickupType: "In-Garage",
  });

  useEffect(() => {
    const fetchGarage = async () => {
      try {
        const res = await api.get(`/book/${id}`);
        setGarage(res.data.mechanic);
      } catch (err) {
        console.error("Error fetching garage:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGarage();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      //   mechanic: id,
      mechanic: garage.user,
      userName: formData.userName,
      userPhone: formData.userPhone,
      userAddress: formData.userAddress,
      carDetails: {
        make: formData.carMake,
        model: formData.carModel,
        year: formData.carYear,
        regNo: formData.carRegNo,
      },
      serviceType: formData.serviceType,
      date: formData.date,
      timeSlot: formData.timeSlot,
      pickupType: formData.pickupType,
    };

    try {
      const res = await api.post("/booking-form/create", bookingData, {
        withCredentials: true,
      });
      console.log("Booking created:", res.data);
      alert("Booking created successfully!");
      setFormData({
        userName: "",
        userPhone: "",
        userAddress: "",
        carMake: "",
        carModel: "",
        carYear: "",
        carRegNo: "",
        serviceType: "",
        date: "",
        timeSlot: "",
        pickupType: "In-Garage",
      });
    } catch (err) {
      console.error(
        "Error creating booking:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-gray-500">
        Loading garage details...
      </div>
    );
  }

  if (!garage) {
    return (
      <div className="text-center mt-20 text-gray-600">Garage not found</div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <Wrench className="text-blue-500" /> Book Service
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">Garage</p>
            <h3 className="text-lg font-semibold text-gray-800">
              {garage.name}
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin size={14} /> {garage.address || "Address not available"}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Details */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Address
            </label>
            <input
              type="text"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleChange}
              required
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Car Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 mb-4">
              <Car size={18} /> Car Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="carMake"
                value={formData.carMake}
                onChange={handleChange}
                placeholder="Make (e.g., Honda)"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                placeholder="Model (e.g., City)"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="carYear"
                value={formData.carYear}
                onChange={handleChange}
                placeholder="Year (e.g., 2020)"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="carRegNo"
                value={formData.carRegNo}
                onChange={handleChange}
                placeholder="Registration No."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Service Type
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Service</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Brake Service">Brake Service</option>
                <option value="Engine Repair">Engine Repair</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Full Inspection">Full Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Pickup Type
              </label>
              <select
                name="pickupType"
                value={formData.pickupType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="In-Garage">In-Garage</option>
                <option value="Pickup">Pickup</option>
                <option value="Drop">Drop</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Time Slot
              </label>
              <input
                type="time"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
