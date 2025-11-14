// models/Garage.js
import mongoose from "mongoose";

const garageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  
   services: {
    type: [String],
    default: []   
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  createdAt: { type: Date, default: Date.now }
});

// Create 2dsphere index for geo queries
garageSchema.index({ location: "2dsphere" });

export default mongoose.model("Garage", garageSchema);
