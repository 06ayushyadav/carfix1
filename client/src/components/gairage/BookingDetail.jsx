import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.js";

const BookingDetail = () => {
  const { id } = useParams();
  const [garage, setGarage] = useState(null);

  useEffect(() => {
    const fetchGarage = async () => {
      const res = await api.get(`/book/${id}`);
      console.log(res.data)
      setGarage(res.data.mechanic);
    };
    fetchGarage();
  }, [id]);

  if (!garage) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-20 bg-white shadow-lg p-8 rounded-2xl">
      <img src={garage.storePhoto} alt={garage.name} className="w-full h-64 object-cover rounded-xl mb-5" />
      <h2 className="text-3xl font-bold text-blue-600 mb-3">{garage.name}</h2>
       <p className="text-gray-600 mb-2"><strong>Contact:</strong> {garage.phone}</p>
      <p className="text-gray-600 mb-2"><strong>Skills:</strong> {garage.skills.join(", ")}</p>
      <p className="text-gray-600 mb-2"><strong>Address:</strong> {garage.address}</p>
      <p className="text-gray-600 mb-2"><strong>Charge:</strong> ₹{garage.chargePerHour}/hr</p>
      <p className="text-gray-600 mb-2"><strong>Status:</strong> {garage.available ? "Available" : "Unavailable"}</p>
    </div>
  );
};

export default BookingDetail;
