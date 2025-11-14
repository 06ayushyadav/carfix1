import express from "express";
import Booking from "../models/booking.model.js";
import Mechanic from "../models/mechanic.model.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require admin
router.use(protect);
router.use(authorizeRoles("admin"));

// GET all bookings (with optional query filters)
router.get("/bookings", async (req, res) => {
  try {
    const { status, serviceType } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (serviceType) filter.serviceType = serviceType;

    const bookings = await Booking.find(filter)
      .populate("user", "name email")
      .populate("mechanic", "name phone skills")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update booking status
router.put("/bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("mechanic", "name phone");
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Assign mechanic to booking
router.put("/bookings/:id/assign", async (req, res) => {
  try {
    const { mechanicId } = req.body;
    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) return res.status(404).json({ message: "Mechanic not found" });

    // Optionally set mechanic unavailable
    mechanic.available = false;
    await mechanic.save();

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { mechanic: mechanic._id, status: "Confirmed" },
      { new: true }
    ).populate("mechanic", "name phone skills");

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CRUD Mechanics
router.get("/mechanics", async (req, res) => {
  try {
    const mechanics = await Mechanic.find().sort({ name: 1 });
    res.json({ success: true, mechanics });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/mechanics", async (req, res) => {
  try {
    const { name, phone, skills } = req.body;
    const mech = await Mechanic.create({ name, phone, skills });
    res.status(201).json({ success: true, mechanic: mech });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

export default router;
