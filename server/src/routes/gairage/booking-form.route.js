import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getMechanicBookings,
  updateBookingStatus,
  deleteBooking,
} from "../../controller/booking-form.controller.js";

import { protect, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Create booking (User)
router.post("/create", protect, authorizeRoles("user", "admin"), createBooking);
// router.post("/create",  createBooking);


// ✅ All bookings (Admin)
router.get("/all", protect, authorizeRoles("admin"), getAllBookings);

// ✅ User bookings
router.get("/my", protect, authorizeRoles("user", "admin"), getUserBookings);

// ✅ Mechanic bookings
router.get("/mechanic/:id", protect, authorizeRoles("mechanic", "admin","user"), getMechanicBookings);

// ✅ Update booking status
router.put("/update-status/:id", protect, authorizeRoles("mechanic", "admin"), updateBookingStatus);

// ✅ Delete booking
router.delete("/delete/:id", protect, authorizeRoles("user", "admin"), deleteBooking);

export default router;
