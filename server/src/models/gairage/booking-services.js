import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  userAddress: { type: String, required: true },
  carDetails: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    regNo: { type: String, required: true },
  },
  serviceType: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  pickupType: {
    type: String,
    enum: ["Pickup", "Drop", "In-Garage"],
    default: "In-Garage",
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("BookingServices", bookingSchema);
