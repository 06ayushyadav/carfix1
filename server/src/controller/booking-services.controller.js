import Booking from "../models/gairage/booking-services.js";

export const createBooking = async (req, res, next) => {
  try {
    const {
      garageId,
      userName,
      userPhone,
      userAddress,
      carDetails,
      serviceType,
      date,
      timeSlot,
      pickupType,
    } = req.body;

    if (!garageId)
      return res.status(400).json({ message: "Garage ID is required" });

    const booking = await Booking.create({
      garageId,
      userName,
      userPhone,
      userAddress,
      carDetails,
      serviceType,
      date,
      timeSlot,
      pickupType,
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    next(err);
  }
};

export const getBookingsByGarage = async (req, res, next) => {
  try {
    const { garageId } = req.params;
    const bookings = await Booking.find({ garageId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("garageId", "name address phone")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// booking status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};
