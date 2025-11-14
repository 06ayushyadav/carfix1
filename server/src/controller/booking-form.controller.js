import BookingForm from "../models/gairage/booking-form.js";
import User from "../models/user/user.js";
import Mechanic from "../models/mechanic.model.js";

/**
 * ✅ Create a new booking
 */

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
    console.error("❌ Error creating booking:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: err.message,
    });
  }
};


/**
 * ✅ Get all bookings (Admin)
 */
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

/**
 * ✅ Get bookings by logged-in user
 */
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

/**
 * ✅ Get bookings for a specific mechanic
 */
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

/**
 * ✅ Update booking status (Mechanic/Admin)
 */
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

/**
 * ✅ Delete booking (Admin/User)
 */
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingForm.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Allow delete only if same user or admin
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




// import Booking from "../models/gairage/booking-form.js";
// import Mechanic from "../models/mechanic.model.js";
// import User from "../models/user/user.js";

// /**
//  * ✅ Create Booking
//  */
// export const createBooking = async (req, res) => {
//   try {
//     const {
//       garageId,
//       userName,
//       userPhone,
//       userAddress,
//       carDetails,
//       serviceType,
//       date,
//       timeSlot,
//       pickupType,
//     } = req.body;

//     if (
//       !garageId ||
//       !userName ||
//       !userPhone ||
//       !userAddress ||
//       !carDetails?.make ||
//       !carDetails?.model ||
//       !carDetails?.year ||
//       !carDetails?.regNo ||
//       !serviceType ||
//       !date ||
//       !timeSlot
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const garage = await Mechanic.findById(garageId);
//     if (!garage) {
//       return res.status(404).json({ success: false, message: "Garage not found" });
//     }

//     const booking = new Booking({
//       garageId,
//       userName,
//       userPhone,
//       userAddress,
//       carDetails,
//       serviceType,
//       date,
//       timeSlot,
//       pickupType,
//     });

//     await booking.save();

//     res.status(201).json({
//       success: true,
//       message: "Booking created successfully!",
//       booking,
//     });
//   } catch (err) {
//     console.error("❌ Error creating booking:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create booking",
//       error: err.message,
//     });
//   }
// };

// /**
//  * ✅ Get All Bookings (Admin only)
//  */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("garageId", "name address chargePerHour")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, bookings });
//   } catch (err) {
//     console.error("❌ Error fetching bookings:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch bookings" });
//   }
// };

// /**
//  * ✅ Get Bookings by Garage (for that mechanic)
//  */
// export const getBookingsByGarage = async (req, res) => {
//   try {
//     const { garageId } = req.params;

//     const bookings = await Booking.find({ garageId })
//       .populate("garageId", "name address chargePerHour")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, bookings });
//   } catch (err) {
//     console.error("❌ Error fetching garage bookings:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch garage bookings" });
//   }
// };

// /**
//  * ✅ Get Bookings by Logged-In User
//  */
// export const getBookingsByUser = async (req, res) => {
//   try {
//     const userName = req.user.name;
//     const bookings = await Booking.find({ userName }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, bookings });
//   } catch (err) {
//     console.error("❌ Error fetching user bookings:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch user bookings" });
//   }
// };

// /**
//  * ✅ Update Booking Status (Mechanic/Admin)
//  */
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid booking status" });
//     }

//     const updatedBooking = await Booking.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!updatedBooking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Booking status updated successfully",
//       booking: updatedBooking,
//     });
//   } catch (err) {
//     console.error("❌ Error updating booking:", err);
//     res.status(500).json({ success: false, message: "Failed to update booking" });
//   }
// };

// /**
//  * ✅ Delete Booking (optional - admin or user cancel)
//  */
// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const booking = await Booking.findById(id);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     await booking.deleteOne();

//     res.status(200).json({ success: true, message: "Booking deleted successfully" });
//   } catch (err) {
//     console.error("❌ Error deleting booking:", err);
//     res.status(500).json({ success: false, message: "Failed to delete booking" });
//   }
// };
