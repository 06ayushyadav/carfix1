import BookingForm from "../models/gairage/booking-form.js";
import User from "../models/user/user.js";
import Mechanic from "../models/mechanic.model.js";


export const createBooking = async (req, res) => {
  try {
    const { carDetails, serviceType, date, timeSlot, pickupType, mechanic ,userPhone  } = req.body;

    if (!carDetails || !serviceType || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authorized" });
    }

    let assignedMechanic = null;
    if (mechanic) {
      const mechUser = await User.findById(mechanic);
      if (!mechUser || mechUser.role !== "mechanic") {
        return res.status(404).json({ success: false, message: "Mechanic not found or invalid." });
      }
      assignedMechanic = mechUser._id;
    }

    const booking = new BookingForm({
      user: userId,
      userPhone,
      carDetails,
      serviceType,
      date,
      timeSlot,
      pickupType,
      mechanic: assignedMechanic,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: err.message,
    });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingForm.find()
      .populate("user", "name email")
      .populate("mechanic", "name skills address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user?._id;

    const bookings = await BookingForm.find({ user: userId })
      .populate("mechanic", "name skills address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error("❌ Error fetching user bookings:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user bookings" });
  }
};


export const getMechanicBookings = async (req, res) => {
  try {
    const mechanicId = req.params.id;

    const bookings = await BookingForm.find({ mechanic: mechanicId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error("❌ Error fetching mechanic bookings:", err);
    res.status(500).json({ success: false, message: "Failed to fetch mechanic bookings" });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid booking status" });
    }

    const booking = await BookingForm.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking updated", booking });
  } catch (err) {
    console.error("❌ Error updating booking:", err);
    res.status(500).json({ success: false, message: "Failed to update booking" });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingForm.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await booking.deleteOne();
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting booking:", err);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
};
