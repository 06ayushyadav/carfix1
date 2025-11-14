
import mongoose from "mongoose";

const MechanicSchema = new mongoose.Schema({
  user: {                          
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: { type: String, required: true },
  phone: { type: String },
  skills: [{ type: String }],     
  chargePerHour: { type: Number, default: 0 }, 
  address: { type: String, default: "" },
  storePhoto: { type: String, default: "" }, 
  available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Mechanic", MechanicSchema);
