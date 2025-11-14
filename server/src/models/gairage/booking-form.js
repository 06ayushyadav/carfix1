import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userPhone:{
      type:String,
    },
    carDetails: {
      make: String,
      model: String,
      year: Number,
      regNo: String,
    },
    serviceType: {
      type: String,
      enum: [
        "Repair",
        "Maintenance",
        "Tire Change",
        "Diagnostics",
        "Oil Change",
        "Brake Service",
        "Engine Repair",
        "AC Repair",
        "Full Inspection",
      ],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
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

    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookingForm", bookingSchema);
