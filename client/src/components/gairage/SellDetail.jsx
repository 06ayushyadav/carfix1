import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { ShoppingBag, ArrowLeft, X } from "lucide-react";

export default function SellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    async function fetchPart() {
      try {
        const res = await api.get(`/parts/${id}`);
        setPart(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load part details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchPart();
  }, [id]);

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPayment(false);
      alert("✅ Payment Successful! Thank you for your purchase.");
    }, 1500);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading part details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!part)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Part not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Part Details</h2>
          <div></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 flex justify-center">
            <img
              src={part.photo || "/placeholder.png"}
              alt={part.name}
              className="w-full max-w-md h-80 object-contain rounded-xl shadow-inner bg-white"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 p-8 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              {part.name}
            </h3>
            <p className="text-gray-700 text-lg">
              Category: <span className="font-medium">{part.category}</span>
            </p>
            <p className="text-gray-700 text-lg">
              Brand: <span className="font-medium">{part.brand}</span>
            </p>
            <p className="text-gray-700 leading-relaxed">
              {part.description || "No description available."}
            </p>

            <div className="text-2xl font-bold text-blue-600 mt-4">
              ₹ {part.price}
            </div>

            <div className="bg-gray-50 p-3 rounded-md border text-sm text-gray-600">
              <p>
                <span className="font-semibold">Compatibility:</span>{" "}
                {part.compatibility || "Universal"}
              </p>
              {part.condition && (
                <p>
                  <span className="font-semibold">Condition:</span>{" "}
                  {part.condition}
                </p>
              )}
              {part.sellBy && (
                <div className="mt-5 font-semibold">
                  <p>Seller: {part.sellBy.name}</p>
                  <p>Email: {part.sellBy.email}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition mt-6 w-full font-medium"
            >
              <ShoppingBag size={20} /> Buy Now
            </button>
          </div>
        </div>

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative">
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>

              {!paymentSuccess ? (
                <>
                  <h3 className="text-xl font-bold text-center text-blue-600 mb-4">
                    Complete Your Payment
                  </h3>
                  <form onSubmit={handlePayment} className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select
                      required
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                      <option value="upi">UPI</option>
                      <option value="card">Credit / Debit Card</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Enter UPI ID or Card Number"
                      required
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Pay ₹{part.price}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-green-600 text-5xl font-bold">✔</div>
                  <p className="text-lg font-semibold text-green-700">
                    Payment Successful!
                  </p>
                  <p className="text-gray-600 text-sm">
                    Thank you for shopping with CarFix 🚗
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
