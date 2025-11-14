import express from "express";
import Booking from "../models/booking.model.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Create booking
router.post("/", protect, async (req, res) => {
  try {
    const { carDetails, serviceType, date, timeSlot, pickupType } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      carDetails,
      serviceType,
      date,
      timeSlot,
      pickupType,
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get user's bookings
router.get("/my", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
